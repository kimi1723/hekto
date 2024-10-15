import { motion } from "framer-motion";
import { type ReactNode } from "react";

import InlineButton from "@/components/shared/InlineButton/Index";
import DropdownMenu from "@/components/shared/DropdownMenu/Index";
import Icon from "@/components/shared/GetSvg/Index";

import { chevronDown } from "@/helpers/constants/icons";
import { type DropdownMenuProps } from "@/helpers/types/dropdown-menu";

interface DropdownProps<T extends string | number>
  extends Omit<DropdownMenuProps<T>, "className" | "layoutId"> {
  toggleMenu: () => void;
}

const Dropdown = <T extends string | number>({
  id,
  isVisible,
  isOtherMenuVisible,
  elements,
  activeElement,
  toggleMenu,
  setActiveElement,
}: DropdownProps<T>) => (
  <motion.li layout className="relative">
    <InlineButton
      onClick={toggleMenu}
      className="gap-1 z-20"
      variant="primaryLight"
      aria-controls={id}
      aria-haspopup="true"
      aria-expanded={isVisible}
    >
      {activeElement as ReactNode}
      <Icon
        id={chevronDown}
        className={`transition-transform duration-500 ${
          isVisible ? "rotate-180" : ""
        }`}
      />
    </InlineButton>

    <DropdownMenu
      className="flex-col"
      layoutId="top-bar-menu"
      {...{
        id,
        isVisible,
        elements,
        activeElement,
        isOtherMenuVisible,
        setActiveElement,
      }}
    />
  </motion.li>
);

export default Dropdown;
