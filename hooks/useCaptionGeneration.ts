"use client";

import { useState, useCallback } from "react";

export interface CaptionGenerateRequest {
  platform: string;
  tone: string;
  description: string;
}

interface UseCaptionGenerationReturn {
  completion: string;
  isLoading: boolean;
  error: string | null;
  generate: (request: CaptionGenerateRequest) => Promise<void>;
  setError: (error: string | null) => void;
  setCompletion: (completion: string) => void;
}

export function useCaptionGeneration(): UseCaptionGenerationReturn {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (request: CaptionGenerateRequest) => {
    setIsLoading(true);
    setError(null);
    setCompletion("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          typeof body.error === "string"
            ? body.error
            : `Request failed with status ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error("Response body is empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setCompletion(accumulated);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { completion, isLoading, error, generate, setError, setCompletion };
}
