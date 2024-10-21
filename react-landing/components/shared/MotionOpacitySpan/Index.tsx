import { motion } from "framer-motion";

import { type ReactNode } from "react";

const MotionOpacitySpan = ({ children }: { children: ReactNode }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.span>
);

export default MotionOpacitySpan;
