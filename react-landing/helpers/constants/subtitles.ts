export const SUBTITLES_DATA = {
  primary: {
    classes: "text-[1.625rem] leading-[2rem] font-bold",
  },
  secondary: {
    classes: "text-[1.375rem] leading-[1.75rem] font-bold",
  },
  tertiary: {
    classes: "text-[1.25rem] leading-[1.5rem] font-bold",
  },
  quaternary: {
    classes: "text-[1rem] leading-[1.25rem] font-semibold",
  },
} as const;

export interface SubtitlesProps {
  variant?: keyof typeof SUBTITLES_DATA;
}
