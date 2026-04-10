export type AdPlacement = "tool-below-output" | "tool-sidebar";

export interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}
