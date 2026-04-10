"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { useState } from "react";

const SAMPLE_CAPTION =
  "Introducing something we've been quietly building for months — and it's finally here. 🎉 Our new bamboo water bottles are reusable, gorgeous, and built to last a lifetime. Because the planet deserves better, and honestly, so do your hydration habits. Ready to make the swap?";

const SAMPLE_HASHTAGS = [
  "#SustainableLiving",
  "#BambooBottle",
  "#EcoFriendly",
  "#ReusableProducts",
  "#GreenLifestyle",
  "#ZeroWaste",
  "#SustainableStyle",
  "#CleanLiving",
  "#ProductLaunch",
  "#EcoConscious",
  "#PlasticFree",
  "#ShopSustainable",
];

export function SampleOutputSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${SAMPLE_CAPTION}\n\n${SAMPLE_HASHTAGS.join(" ")}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            See what {"you'll"} get
          </h2>
          <p className="mt-3 text-muted-foreground text-base">
            A sample caption for an Instagram Post about a sustainable product
            launch — Promotional tone.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface rounded-2xl shadow-card border border-border overflow-hidden"
        >
          <div className="px-6 pt-5 pb-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📸</span>
              <span className="text-sm font-semibold text-foreground">
                Instagram Post
              </span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-accent-light text-accent text-xs font-semibold">
                Promotional
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-surface-elevated"
            >
              <Copy size={13} />
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>

          <div className="px-6 py-5">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Caption
            </div>
            <p className="text-foreground text-sm leading-relaxed">{SAMPLE_CAPTION}</p>
          </div>

          <div className="px-6 pb-6">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Hashtags
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_HASHTAGS.map((tag) => (
                <span
                  key={tag}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      void navigator.clipboard.writeText(tag);
                    }
                  }}
                  className="px-2.5 py-1 rounded-full bg-primary-light text-primary text-xs font-medium cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => navigator.clipboard.writeText(tag)}
                  title="Click to copy"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
