import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, type ReactNode } from "react";

interface CarouselProps {
  id: string;
  direction: 1 | -1;
  view: number;
  displayedData: ReactNode;
  isPending?: boolean;
  isError?: boolean;
  error?: Error | null;
  handleDisplayPending?: () => ReactNode;
  handleDisplayError?: (error: Error) => ReactNode;
  initial?: boolean;
  initialDuration?: number;
  initialSlideIn?: number | string;
  className?: string;
}

const Carousel = ({
  id,
  direction,
  view,
  isPending,
  isError,
  error,
  displayedData,
  handleDisplayPending,
  handleDisplayError,
  initial = true,
  initialDuration,
  initialSlideIn = 0,
  className = "",
  ...props
}: CarouselProps) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const duration = initialDuration || 1;

  useEffect(() => {
    if (Array.isArray(displayedData) && displayedData.length === 0) return;

    if (displayedData) setIsFirstRender(false);
  }, [displayedData]);

  if (isPending && handleDisplayPending) return handleDisplayPending();

  if (isError && handleDisplayError) return handleDisplayError(error as Error);

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      filter: "blur(2px)",
      x: isFirstRender ? 0 : `${100 * direction}%`,
      y: isFirstRender ? initialSlideIn : 0,
    }),
    visible: {
      opacity: 1,
      filter: "blur(0)",
      x: 0,
      y: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      filter: "blur(2px)",
      x: `${-100 * direction}%`,
    }),
  };

  return (
    <AnimatePresence mode="popLayout" initial={initial} custom={direction}>
      <motion.section
        key={view}
        id={id}
        aria-live="polite"
        className={className}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", duration, bounce: 0 }}
        {...props}
      >
        {displayedData}
      </motion.section>
    </AnimatePresence>
  );
};

export default Carousel;
