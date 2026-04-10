"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PlatformSelector, type Platform } from "./PlatformSelector";
import { ToneSelector, type Tone } from "./ToneSelector";
import { FEATURES } from "@/lib/config/features";
import { PremiumForm } from "./premium/PremiumForm";

interface CaptionFormProps {
  onGenerate: (data: { platform: Platform; tone: Tone; description: string }) => void;
  isLoading: boolean;
  isLimitReached: boolean;
  remaining: number | null;
}

export function CaptionForm({
  onGenerate,
  isLoading,
  isLimitReached,
  remaining,
}: CaptionFormProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [tone, setTone] = useState<Tone | null>(null);
  const [description, setDescription] = useState("");

  const canSubmit =
    !isLoading &&
    !isLimitReached &&
    platform !== null &&
    tone !== null &&
    description.trim().length >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !platform || !tone) return;
    onGenerate({ platform, tone, description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Platform <span className="text-destructive">*</span>
        </label>
        <PlatformSelector value={platform} onChange={setPlatform} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Caption Tone <span className="text-destructive">*</span>
        </label>
        <ToneSelector value={tone} onChange={setTone} />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Describe your post <span className="text-destructive">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-2">
          {"What's"} the post about? Give us the vibe, the topic, the moment.
        </p>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. A photo of my morning coffee with a book — cozy Sunday vibes. Soft lighting, a cream linen throw in the background."
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated text-foreground text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
        <div className="text-right text-xs text-muted-foreground mt-1">
          {description.length}/500
        </div>
      </div>

      {FEATURES.premium.enabled && <PremiumForm />}

      <div className="flex items-center justify-between gap-4">
        {remaining !== null && (
          <p className="text-xs text-muted-foreground">
            {remaining > 0 ? (
              <span>
                <span className="font-semibold text-foreground">{remaining}</span> free{" "}
                {remaining === 1 ? "generation" : "generations"} remaining
              </span>
            ) : (
              <span className="text-destructive">
                Hourly limit reached. Check back soon!
              </span>
            )}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-card hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-soft"
        >
          {isLoading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Generating...
            </>
          ) : (
            "✨ Generate Caption"
          )}
        </button>
      </div>
    </form>
  );
}
