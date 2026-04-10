"use client";

export type Tone = "Funny" | "Inspiring" | "Professional" | "Casual" | "Promotional";

const TONES: { id: Tone; emoji: string }[] = [
  { id: "Funny", emoji: "😄" },
  { id: "Inspiring", emoji: "✨" },
  { id: "Professional", emoji: "💼" },
  { id: "Casual", emoji: "😊" },
  { id: "Promotional", emoji: "🎯" },
];

interface ToneSelectorProps {
  value: Tone | null;
  onChange: (tone: Tone) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => {
        const isSelected = value === tone.id;
        return (
          <button
            key={tone.id}
            type="button"
            onClick={() => onChange(tone.id)}
            className={`
              inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium
              transition-all duration-150 cursor-pointer
              ${
                isSelected
                  ? "bg-primary border-primary text-white shadow-soft"
                  : "bg-surface border-border text-foreground hover:border-primary/50 hover:bg-surface-elevated"
              }
            `}
          >
            <span>{tone.emoji}</span>
            {tone.id}
          </button>
        );
      })}
    </div>
  );
}
