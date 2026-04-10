"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    emoji: "📱",
    title: "Pick your platform",
    description:
      "Choose from Instagram, TikTok, LinkedIn, YouTube, and more. Each platform gets captions tailored to its unique norms and character limits.",
  },
  {
    number: "02",
    emoji: "✍️",
    title: "Describe your post",
    description:
      "Tell us what the post is about — a product launch, a lifestyle moment, a behind-the-scenes peek. A couple of sentences is all it takes.",
  },
  {
    number: "03",
    emoji: "🚀",
    title: "Copy and post",
    description:
      "Get a platform-perfect caption plus a curated set of hashtags. Copy it with one click and you're ready to post — done.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            From blank screen to perfect post
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps. Under 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative bg-background rounded-2xl p-6 shadow-soft border border-border"
            >
              <div className="text-4xl mb-4">{step.emoji}</div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                Step {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
