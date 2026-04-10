import type { AIProvider, GenerateOptions } from "./types";

export const openaiProvider: AIProvider = {
  async generateStream(_unused: GenerateOptions): Promise<ReadableStream<string>> {
    void _unused;
    throw new Error(
      "OpenAI provider is not yet configured. Install @ai-sdk/openai and implement this stub."
    );
  },
};
