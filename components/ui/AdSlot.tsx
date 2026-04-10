"use client";

import { FEATURES } from "@/lib/config/features";
import { AD_PROVIDER } from "@/lib/ads/index";
import { AdSenseSlot } from "@/lib/ads/adsense";
import type { AdPlacement } from "@/lib/ads/types";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export function AdSlot({ placement, className }: AdSlotProps) {
  if (!FEATURES.ads.enabled || AD_PROVIDER === "none") return null;

  if (AD_PROVIDER === "adsense") {
    return <AdSenseSlot placement={placement} className={className} />;
  }

  return null;
}
