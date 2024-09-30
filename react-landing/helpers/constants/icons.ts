const ICON_IDS = {
  envelopeId: "envelope",
  phoneCallId: "phone-call",
  chevronDown: "chevron-down",
  user: "user",
  heart: "heart",
  cart: "cart",
  search: "search",
} as const;

export const {
  envelopeId,
  phoneCallId,
  chevronDown,
  user,
  heart,
  cart,
  search,
} = ICON_IDS;

export type IconValues = (typeof ICON_IDS)[keyof typeof ICON_IDS];

export default ICON_IDS;
