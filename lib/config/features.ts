export const FEATURES = {
  ads: {
    enabled: false,
    provider: "none" as "none" | "adsense" | "carbon",
    placements: {
      toolBelowOutput: "tool-below-output",
      toolSidebar: "tool-sidebar",
    },
    adsense: {
      publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "",
      slots: {
        toolBelowOutput: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_OUTPUT ?? "",
        toolSidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
      },
    },
  },
  generation: {
    limit: 10,
    resetPeriod: "hourly" as "never" | "daily" | "hourly" | "session",
  },
  premium: {
    enabled: false,
    teaserVisible: true,
  },
} as const;

export type AdPlacement = "tool-below-output" | "tool-sidebar";
export type ResetPeriod = "never" | "daily" | "hourly" | "session";
