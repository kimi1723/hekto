import { type LinkProps } from "next/link";
import { type ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import ButtonLink from "../button-link/Index";

const variants = {
  visible: {
    opacity: 1,
    scale: 1,
    translateX: "-50%",
    translateY: "-100%",
    filter: "blur(0)",
  },
  hidden: {
    opacity: 0,
    scale: 0,
    translateX: "-50%",
    translateY: "-100%",
    filter: "blur(3px)",
  },
};

interface MotionButtonLinkProps extends LinkProps {
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

const MotionButtonLink = ({
  children,
  href,
  isActive,
  className = "",
}: MotionButtonLinkProps) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        className={`absolute capitalize left-1/2 ${className}`}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      >
        <ButtonLink size="sm" variant="quinary" color="success" href={href}>
          {children}
        </ButtonLink>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MotionButtonLink;
