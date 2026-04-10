import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CaptionToolClient } from "@/components/tool/CaptionToolClient";
import { AdSlot } from "@/components/ui/AdSlot";
import { FEATURES } from "@/lib/config/features";

export const metadata: Metadata = {
  title: "Caption Generator — BreezyCaptions",
  description:
    "Generate the perfect social media caption for Instagram, TikTok, LinkedIn, and more. Free, instant, and tailored to your platform.",
};

export default function ToolPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Caption Generator
            </h1>
            <p className="mt-2 text-muted-foreground text-base max-w-md mx-auto">
              Pick your platform, describe your post, and get a ready-to-paste
              caption with hashtags.
            </p>
          </div>

          <div
            className={`flex gap-8 justify-center ${FEATURES.ads.enabled && FEATURES.ads.provider !== "none" ? "lg:justify-start" : ""}`}
          >
            <div className="w-full max-w-2xl">
              <div className="bg-surface rounded-2xl shadow-card border border-border p-6 sm:p-8">
                <CaptionToolClient />
              </div>
            </div>

            {FEATURES.ads.enabled && FEATURES.ads.provider !== "none" && (
              <div className="hidden lg:block w-64 shrink-0 pt-2">
                <AdSlot placement="tool-sidebar" />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
