// ← THE ONLY FILE TO CHANGE when switching AI providers.
// To switch to OpenAI: import { openaiProvider } and export it as `aiProvider`.
// To switch to Gemini: import { geminiProvider } and export it as `aiProvider`.

import { groqProvider } from "./groq";

export { groqProvider as aiProvider };
export type { AIProvider, GenerateOptions } from "./types";
