export interface GenerateOptions {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  image?: {
    mimeType: string;
    base64Data: string;
  };
}

export interface AIProvider {
  generateStream(options: GenerateOptions): Promise<ReadableStream<string>>;
}
