"use client";

import { Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PRO_FEATURES = [
  "3 or 5 caption variations per generation",
  "Brand voice — define your unique personality",
  "Target audience targeting",
  "Custom call-to-action weaving",
  "Post goal optimization (Engagement, Traffic, Awareness...)",
  "Multi-platform generation in one click",
  "Hashtag strategy: Trending · Niche · Brand groups",
  "Hook suggestions — the perfect opening line",
  "Platform-specific posting tips",
];

export function ProTeaserSection() {
  return (
    <section id="pricing" className="py-20 bg-surface">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-accent-light border-2 border-accent rounded-2xl p-8 shadow-card"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            Pro Mode — Coming Soon
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Unlock the full caption toolkit
          </h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Go beyond basic captions. Pro mode gives you the professional-grade
            tools to craft content that actually converts.
          </p>

          <ul className="text-left space-y-2.5 mb-8">
            {PRO_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                <Lock size={14} className="text-accent mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled
            className="w-full py-3 px-6 rounded-xl bg-accent text-white font-semibold text-sm opacity-60 cursor-not-allowed"
          >
            Coming Soon — Join the Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
}
