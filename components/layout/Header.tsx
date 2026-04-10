import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <BrandLogo size="md" />
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>
        <Link
          href="/tool"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors shadow-soft"
        >
          Try Free →
        </Link>
      </div>
    </header>
  );
}
