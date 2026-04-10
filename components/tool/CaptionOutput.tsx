"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { parseOutput } from "@/lib/parse-output";
import { AdSlot } from "@/components/ui/AdSlot";
import { FEATURES } from "@/lib/config/features";
import { PremiumOutput } from "./premium/PremiumOutput";
import { PremiumOutputTeaser } from "./premium/PremiumOutputTeaser";

interface CaptionOutputProps {
  completion: string;
  isLoading: boolean;
  onReset: () => void;
}

export function CaptionOutput({ completion, isLoading, onReset }: CaptionOutputProps) {
  const [captionCopied, setCaptionCopied] = useState(false);
  const [allCopied, setAllCopied] = useState(false);

  const { caption, hashtags } = parseOutput(completion);

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(
      hashtags.length > 0 ? `${caption}\n\n${hashtags.join(" ")}` : caption
    );
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const handleCopyHashtag = (tag: string) => {
    navigator.clipboard.writeText(tag);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="bg-surface rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Your Caption</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
            >
              {allCopied ? <Check size={12} /> : <Copy size={12} />}
              {allCopied ? "Copied!" : "Copy All"}
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Caption
            </div>
            <button
              type="button"
              onClick={handleCopyCaption}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {captionCopied ? <Check size={11} /> : <Copy size={11} />}
              {captionCopied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="text-sm text-foreground leading-relaxed min-h-[3rem]">
            {isLoading && !caption ? (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <span className="inline-block w-1 h-4 bg-primary rounded-sm animate-pulse" />
                Generating your caption...
              </span>
            ) : (
              <>
                {caption}
                {isLoading && (
                  <span className="inline-block w-1 h-4 bg-primary rounded-sm animate-pulse ml-0.5 align-middle" />
                )}
              </>
            )}
          </div>
        </div>

        {(hashtags.length > 0 || (isLoading && caption)) && (
          <div className="px-5 pb-5">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Hashtags
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleCopyHashtag(tag)}
                  title="Click to copy"
                  className="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {FEATURES.premium.enabled && <PremiumOutput />}

      {!FEATURES.premium.enabled && FEATURES.premium.teaserVisible && (
        <PremiumOutputTeaser />
      )}

      <AdSlot placement="tool-below-output" />

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw size={14} />
          Generate another caption
        </button>
      </div>
    </motion.div>
  );
}
