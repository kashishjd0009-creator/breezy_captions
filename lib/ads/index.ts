// ← THE ONLY FILE TO CHANGE when switching ad providers.
// To activate AdSense: change provider to "adsense" and set FEATURES.ads.enabled = true.
// To activate Carbon: change provider to "carbon" and implement carbon.ts.

export { type AdSlotProps } from "./types";

export const AD_PROVIDER = "none" as "none" | "adsense" | "carbon";
