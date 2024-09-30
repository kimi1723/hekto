import { FC } from "react";

import DropDownMenu from "../Index";
import Icon from "../../get-svg/Index";
import InlineButton from "../../inline-button/Index";

import { chevronDown } from "@/helpers/constants/icons";

interface ButtonDropDownProps {
  id: string;
  items: string[];
  activeItem: string;
  isVisible: boolean;
  onToggle: () => void;
  onSelect: (item: string) => void;
  after?: boolean;
}

const IconDropDown: FC<ButtonDropDownProps> = ({
  id,
  items,
  activeItem,
  isVisible,
  onToggle,
  onSelect,
}) => (
  <>
    <InlineButton
      onClick={onToggle}
      className="gap-1 z-20"
      variant="primaryLight"
      aria-controls={id}
      aria-expanded={isVisible}
    >
      {activeItem}
      <Icon
        id={chevronDown}
        className={`transition-transform duration-300 ${
          isVisible ? "rotate-180" : ""
        }`}
      />
    </InlineButton>

    <DropDownMenu
      id={id}
      items={items}
      activeElement={activeItem}
      isVisible={isVisible}
      onClick={onSelect}
    />
  </>
);

export default IconDropDown;
