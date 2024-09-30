import { useState, useEffect } from "react";

interface DropDownMenuProps {
  id: string;
  items: string[];
  activeElement: string;
  onClick: (el: string) => void;
  isVisible: boolean;
  className?: string;
}

const DropDownMenu = ({
  id,
  items,
  activeElement,
  onClick,
  isVisible,
  className = "",
}: DropDownMenuProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      setIsExiting(false);
    } else if (isRendered) {
      setIsExiting(true);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isRendered]);

  return isRendered ? (
    <menu
      id={id}
      className={`absolute flex flex-col gap-2 -mx-2 p-2 min-w-full bg-tertiary rounded z-0 ${
        isVisible
          ? "animate-dropdown"
          : isExiting
          ? "animate-dropdown-exit"
          : "hidden"
      } ${className}`}
    >
      {items
        .filter((item) => item !== activeElement)
        .map((inactiveItem) => (
          <li key={inactiveItem}>
            <button
              className="hocus:text-primary transition-colors focus:outline-none"
              onClick={() => onClick(inactiveItem)}
              disabled={isAnimating}
            >
              {inactiveItem}
            </button>
          </li>
        ))}
    </menu>
  ) : null;
};

DropDownMenu.displayName = "DropDownMenu";

export default DropDownMenu;
