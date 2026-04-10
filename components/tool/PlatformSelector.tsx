"use client";

import { motion } from "framer-motion";

export type Platform =
  | "Instagram Post"
  | "Instagram Stories"
  | "LinkedIn"
  | "YouTube"
  | "Facebook"
  | "WhatsApp Status"
  | "Twitter / X"
  | "TikTok"
  | "Pinterest";

const PLATFORMS: { id: Platform; emoji: string; label: string }[] = [
  { id: "Instagram Post", emoji: "📸", label: "Instagram Post" },
  { id: "Instagram Stories", emoji: "📱", label: "Instagram Stories" },
  { id: "LinkedIn", emoji: "💼", label: "LinkedIn" },
  { id: "YouTube", emoji: "🎬", label: "YouTube" },
  { id: "Facebook", emoji: "👥", label: "Facebook" },
  { id: "WhatsApp Status", emoji: "💬", label: "WhatsApp Status" },
  { id: "Twitter / X", emoji: "🐦", label: "Twitter / X" },
  { id: "TikTok", emoji: "🎵", label: "TikTok" },
  { id: "Pinterest", emoji: "📌", label: "Pinterest" },
];

interface PlatformSelectorProps {
  value: Platform | null;
  onChange: (platform: Platform) => void;
}

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
      {PLATFORMS.map((platform) => {
        const isSelected = value === platform.id;
        return (
          <motion.button
            key={platform.id}
            type="button"
            onClick={() => onChange(platform.id)}
            whileTap={{ scale: 0.97 }}
            className={`
              flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center
              transition-all duration-150 cursor-pointer
              ${
                isSelected
                  ? "bg-primary-light border-primary text-primary font-semibold shadow-soft"
                  : "bg-surface border-border text-foreground hover:border-primary/40 hover:bg-surface-elevated"
              }
            `}
          >
            <span className="text-2xl leading-none">{platform.emoji}</span>
            <span className="text-xs leading-tight">{platform.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
