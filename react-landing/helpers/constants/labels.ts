export const LABELS_DATA = {
  default: {
    classes: "text-[1rem] leading-[1.25rem] font-normal",
  },
  bold: {
    classes: "text-[1rem] leading-[1.25rem] font-bold",
  },
  sm: {
    classes: "text-[0.875rem] leading-[1rem] font-normal",
  },
} as const;

export interface LabelsProps {
  variant?: keyof typeof LABELS_DATA;
}
