const ICON_IDS = {
  envelopeId: "envelope",
  phoneCallId: "phone-call",
  chevronDown: "chevron-down",
  user: "user",
  heart: "heart",
  heartActive: "heart-active",
  cart: "cart",
  search: "search",
  zoom: "zoom",
  check: "check",
  plus: "plus",
} as const;

export const {
  envelopeId,
  phoneCallId,
  chevronDown,
  user,
  heart,
  heartActive,
  cart,
  search,
  zoom,
  check,
  plus,
} = ICON_IDS;

export type IconValues = (typeof ICON_IDS)[keyof typeof ICON_IDS];

export default ICON_IDS;
