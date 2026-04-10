"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaptionForm } from "./CaptionForm";
import { CaptionOutput } from "./CaptionOutput";
import { useCaptionGeneration, type CaptionGenerateRequest } from "@/hooks/useCaptionGeneration";
import { useGenerationLimit } from "@/hooks/useGenerationLimit";
import type { Platform } from "./PlatformSelector";
import type { Tone } from "./ToneSelector";

export function CaptionToolClient() {
  const [phase, setPhase] = useState<"form" | "output">("form");
  const [formKey, setFormKey] = useState(0);

  const { completion, isLoading, error, generate, setError, setCompletion } =
    useCaptionGeneration();
  const { isLimitReached, remaining, increment } = useGenerationLimit();

  const handleGenerate = async (data: {
    platform: Platform;
    tone: Tone;
    description: string;
  }) => {
    const request: CaptionGenerateRequest = {
      platform: data.platform,
      tone: data.tone,
      description: data.description,
    };

    setPhase("output");
    await generate(request);
    increment();
  };

  const handleReset = () => {
    setPhase("form");
    setCompletion("");
    setError(null);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {phase === "form" ? (
          <motion.div
            key={`form-${formKey}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25 }}
          >
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-destructive">
                {error}
              </div>
            )}
            <CaptionForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isLimitReached={isLimitReached}
              remaining={remaining}
            />
          </motion.div>
        ) : (
          <motion.div
            key="output"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {error ? (
              <div className="text-center py-8">
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-destructive inline-block">
                  {error}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-muted-foreground hover:text-foreground underline mt-2"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <CaptionOutput
                completion={completion}
                isLoading={isLoading}
                onReset={handleReset}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
