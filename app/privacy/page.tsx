import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — BreezyCaptions",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              What we collect
            </h2>
            <p>
              BreezyCaptions does not require account creation. We do not collect
              your name, email address, or personal details to use the tool.
            </p>
            <p className="mt-2">
              When you generate a caption, the platform, tone, and description you
              enter are sent to our AI provider (Groq) to generate your response.
              This data is not stored by BreezyCaptions after your session ends.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Usage limits
            </h2>
            <p>
              To prevent abuse, we track the number of generations in your{" "}
              {"browser's"} local storage. This data never leaves your device and is reset hourly.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Third-party services
            </h2>
            <p>
              We use Groq for AI generation. Please review{" "}
              <a
                href="https://groq.com/privacy-policy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"Groq's privacy policy"}
              </a>{" "}
              for details on how they handle data.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Cookies
            </h2>
            <p>
              We do not use tracking cookies. We use browser localStorage only
              for generation limit tracking, which is functional, not advertising.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
            <p>
              Questions? Email us at privacy@breezycaptions.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
