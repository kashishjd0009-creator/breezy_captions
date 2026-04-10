"use client";

import { useState, useEffect, useCallback } from "react";
import { FEATURES } from "@/lib/config/features";

interface GenerationLimitState {
  count: number;
  resetAt: number | null;
}

const STORAGE_KEY = "breezycaptions_gen_limit";

function getResetMs(period: string): number {
  switch (period) {
    case "hourly":
      return 60 * 60 * 1000;
    case "daily":
      return 24 * 60 * 60 * 1000;
    case "session":
      return 0;
    default:
      return 0;
  }
}

export function useGenerationLimit() {
  const [state, setState] = useState<GenerationLimitState>({
    count: 0,
    resetAt: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: GenerationLimitState = JSON.parse(stored);
        const now = Date.now();

        if (parsed.resetAt && now >= parsed.resetAt) {
          const newState: GenerationLimitState = { count: 0, resetAt: null };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
          setState(newState);
        } else {
          setState(parsed);
        }
      } catch {
        setState({ count: 0, resetAt: null });
      }
    }
  }, []);

  const increment = useCallback(() => {
    setState((prev) => {
      const limit = FEATURES.generation.limit;
      const period = FEATURES.generation.resetPeriod;

      let resetAt = prev.resetAt;
      if (!resetAt && period !== "never" && period !== "session") {
        resetAt = Date.now() + getResetMs(period);
      }

      const next: GenerationLimitState = {
        count: prev.count + 1,
        resetAt,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }

      return next;
    });
  }, []);

  const isLimitReached =
    FEATURES.generation.limit !== null &&
    state.count >= FEATURES.generation.limit;

  const remaining =
    FEATURES.generation.limit !== null
      ? Math.max(0, FEATURES.generation.limit - state.count)
      : null;

  return { count: state.count, isLimitReached, remaining, increment };
}
