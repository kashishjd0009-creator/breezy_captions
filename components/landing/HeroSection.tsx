"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(107,158,122,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            ✨ Free Forever · No Sign-Up Required
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
            The perfect caption,{" "}
            <span className="text-primary">every single time</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pick your platform, describe your vibe, and get a ready-to-post
            caption with hashtags in seconds. No more staring at a blank screen.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tool"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary-hover transition-all shadow-soft hover:shadow-card hover:-translate-y-0.5"
            >
              Generate a Caption — Free ✨
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Instagram", "TikTok", "LinkedIn", "YouTube", "Twitter / X"].map((p) => (
              <span key={p} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
