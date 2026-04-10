export interface GenerateOptions {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIProvider {
  generateStream(options: GenerateOptions): Promise<ReadableStream<string>>;
}
