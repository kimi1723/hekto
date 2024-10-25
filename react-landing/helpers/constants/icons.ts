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
  pen: "pen",
  calendar: "calendar",
  facebook: "fb",
  twitter: "tw",
  instagram: "ig",
  star: "star",
  activeStar: "star-active",
  viewGrid: "view-grid",
  viewList: "view-grid-active",
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
  pen,
  calendar,
  facebook,
  twitter,
  instagram,
  star,
  activeStar,
  viewGrid,
  viewList,
} = ICON_IDS;

export const SOCIALS = [facebook, twitter, instagram];

export type IconValues = (typeof ICON_IDS)[keyof typeof ICON_IDS];

export default ICON_IDS;
