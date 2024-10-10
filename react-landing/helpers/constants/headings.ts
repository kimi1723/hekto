export const HEADINGS_DATA = {
  primary: {
    el: "h1",
    classes: "text-[3.25rem] leading-[4rem] font-josefin",
  },
  secondary: {
    el: "h2",
    classes: "text-[2.75rem] leading-[3.25rem] font-josefin",
  },
  tertiary: {
    el: "h3",
    classes: "text-[2.25rem] leading-[2.75rem] font-josefin",
  },
  quaternary: {
    el: "h4",
    classes: "text-[1.75rem] leading-[2.25rem] font-josefin",
  },
} as const;

export interface HeadingsProps {
  id?: string;
  variant: keyof typeof HEADINGS_DATA;
}
