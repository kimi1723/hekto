export const buttonSizes = {
  sm: "py-[11px] px-4",
  default: "py-4 p-10",
} as const;

export const buttonColors = {
  primary: "bg-primary hocus:bg-primary-dark",
  success: "bg-success hocus:bg-success-dark",
} as const;

export type ButtonSizesProps = keyof typeof buttonSizes;

export type ButtonColorsProps = keyof typeof buttonColors;

export interface ButtonStyles {
  size?: keyof typeof buttonSizes;
  color?: keyof typeof buttonColors;
}
