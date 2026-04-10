"use client";

import { FEATURES } from "@/lib/config/features";
import type { AdSlotProps } from "./types";

export function AdSenseSlot({ placement, className }: AdSlotProps) {
  const slotId =
    placement === "tool-below-output"
      ? FEATURES.ads.adsense.slots.toolBelowOutput
      : FEATURES.ads.adsense.slots.toolSidebar;

  if (!slotId || !FEATURES.ads.adsense.publisherId) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={FEATURES.ads.adsense.publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
