import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/components/shared/GetSvg/Index";

import { check } from "@/helpers/constants/icons";
import { BG_VARIANTS, type BgVariantsKeys } from "@/helpers/constants/colors";

const Checkbox = ({
  isActive,
  variant,
}: {
  isActive: boolean;
  variant: BgVariantsKeys;
}) => {
  const { active, inactive } = BG_VARIANTS[variant];

  return (
    <div
      className={`aspect-square h-4 text-white transition-colors duration-300 ${
        isActive ? active : inactive
      }`}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <Icon id={check} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

export default Checkbox;
