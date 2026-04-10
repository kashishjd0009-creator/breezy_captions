import Groq from "groq-sdk";
import type { AIProvider, GenerateOptions } from "./types";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const groqProvider: AIProvider = {
  async generateStream(options: GenerateOptions): Promise<ReadableStream<string>> {
    const model =
      options.model ?? process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

    const stream = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: options.prompt }],
      max_tokens: options.maxTokens ?? 600,
      temperature: options.temperature ?? 0.8,
      stream: true,
    });

    return new ReadableStream<string>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
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
