import { ReactNode } from "react";

export interface DropdownMenuProps<T extends string | number> {
  id: string;
  isVisible: boolean;
  elements: Readonly<T[]>;
  activeElement: T | ReactNode;
  setActiveElement: (element: T) => void;
  className?: string;
  layoutId?: string;
  isOtherMenuVisible?: boolean;
}
