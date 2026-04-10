import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function BrandLogo({ size = "md", href = "/" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const content = (
    <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
      <span className="text-primary">Breezy</span>
      <span className="text-foreground">Captions</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
        <span className="text-2xl">🌿</span>
        {content}
      </Link>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-2xl">🌿</span>
      {content}
    </span>
  );
}
