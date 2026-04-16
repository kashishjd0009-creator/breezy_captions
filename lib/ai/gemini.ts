import type { AIProvider, GenerateOptions } from "./types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
const DEFAULT_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.5-flash-lite";

function isServiceUnavailableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("503 Service Unavailable") ||
    message.toLowerCase().includes("high demand")
  );
}

export const geminiProvider: AIProvider = {
  async generateStream(options: GenerateOptions): Promise<ReadableStream<string>> {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY.");
    }

    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
      { text: options.prompt },
    ];
    if (options.image) {
      parts.push({
        inlineData: {
          mimeType: options.image.mimeType,
          data: options.image.base64Data,
        },
      });
    }

    const selectedModel = options.model ?? process.env.GEMINI_MODEL ?? DEFAULT_MODEL;

    let stream;
    try {
      stream = await client
        .getGenerativeModel({ model: selectedModel })
        .generateContentStream(parts);
    } catch (error) {
      const canFallback =
        selectedModel !== FALLBACK_MODEL && isServiceUnavailableError(error);
      if (!canFallback) throw error;

      stream = await client
        .getGenerativeModel({ model: FALLBACK_MODEL })
        .generateContentStream(parts);
    }

    return new ReadableStream<string>({
      async start(controller) {
        try {
          for await (const chunk of stream.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(text);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });
  },
};
