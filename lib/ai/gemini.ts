import type { AIProvider, GenerateOptions } from "./types";

export const geminiProvider: AIProvider = {
  async generateStream(_unused: GenerateOptions): Promise<ReadableStream<string>> {
    void _unused;
    throw new Error(
      "Gemini provider is not yet configured. Install @ai-sdk/google and implement this stub."
    );
  },
};
