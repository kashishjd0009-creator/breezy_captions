import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — BreezyCaptions",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Acceptable use
            </h2>
            <p>
              BreezyCaptions is provided as a free tool for creating social media
              captions. You may use it for personal, commercial, or business purposes.
              You may not use it to generate spam, hateful content, or content that
              violates any applicable laws.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Content ownership
            </h2>
            <p>
              The captions generated are yours to use freely. We do not claim any
              copyright over AI-generated output. You are responsible for reviewing
              content before publishing.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Service availability
            </h2>
            <p>
              We provide this service on a best-effort basis. We do not guarantee
              100% uptime and reserve the right to change or discontinue features
              at any time.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Limitation of liability
            </h2>
            <p>
              BreezyCaptions is provided &quot;as is&quot; without warranty. We are not liable
              for any losses resulting from your use of AI-generated content.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
