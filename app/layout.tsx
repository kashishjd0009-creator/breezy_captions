import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://breezycaptions.com"),
  title: "BreezyCaptions — AI Caption Generator for Social Media",
  description:
    "Generate ready-to-post social media captions with hashtags in seconds. Pick your platform, describe your topic, and get the perfect caption — free.",
  keywords: [
    "social media caption generator",
    "AI caption generator",
    "Instagram captions",
    "LinkedIn captions",
    "TikTok captions",
    "hashtag generator",
    "content creator tools",
    "caption writer",
  ],
  authors: [{ name: "BreezyCaptions" }],
  creator: "BreezyCaptions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://breezycaptions.com",
    title: "BreezyCaptions — AI Caption Generator",
    description:
      "Pick your platform, describe your vibe, get the perfect caption instantly. Free forever.",
    siteName: "BreezyCaptions",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BreezyCaptions — AI Caption Generator",
    description:
      "Generate perfect social media captions with hashtags in seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
