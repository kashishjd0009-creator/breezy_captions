import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <BrandLogo size="sm" href="/" />
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              AI-powered caption generation for creators who want to spend less
              time writing and more time creating.
            </p>
          </div>
          <nav className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <Link href="/tool" className="hover:text-foreground transition-colors">
              Caption Generator
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} BreezyCaptions. Built for creators.
        </div>
      </div>
    </footer>
  );
}
