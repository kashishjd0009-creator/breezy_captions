"use client";

import { Lock, Sparkles } from "lucide-react";

const TEASER_FEATURES = [
  "3 or 5 caption variations — pick the best one",
  "Brand voice — make every caption sound like you",
  "Multi-platform generation in one click",
  "Hashtag strategy: Trending · Niche · Brand",
  "Hook suggestions + platform-specific posting tips",
];

export function PremiumOutputTeaser() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-accent/40 bg-accent-light p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-accent" />
        <span className="text-sm font-semibold text-foreground">
          Want more? Pro Mode is coming soon.
        </span>
      </div>
      <ul className="space-y-1.5 mb-4">
        {TEASER_FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock size={11} className="text-accent shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        Pro credits will be available to purchase. Free tier always stays free.
      </p>
    </div>
  );
}
