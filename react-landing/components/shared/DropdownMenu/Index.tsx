import { DropdownMenuProps } from "@/helpers/types/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";

const DropdownMenu = <T extends string | number>({
  id,
  isVisible,
  elements,
  activeElement,
  className = "",
  layoutId,
  isOtherMenuVisible,
  setActiveElement,
}: DropdownMenuProps<T>) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: isOtherMenuVisible ? 0 : -15,
      filter: "blur(2px)",
    },
    visible: { opacity: 1, y: 0, filter: "blur(0)" },
    exit: { opacity: 0, y: 0, filter: "blur(2px)" },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.menu
          id={id}
          role="menu"
          layoutId={layoutId}
          className={`absolute flex gap-2 -mx-2 p-2 min-w-full bg-tertiary rounded z-0 ${className}`}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        >
          {elements
            .filter((item) => item !== activeElement)
            .map((inactiveItem) => (
              <li key={inactiveItem} role="menuitem">
                <button
                  className="hocus:text-primary transition-colors focus:outline-none"
                  onClick={() => setActiveElement(inactiveItem)}
                >
                  {inactiveItem}
                </button>
              </li>
            ))}
        </motion.menu>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
