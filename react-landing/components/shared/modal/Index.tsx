import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, isOpen, onClose, className = "" }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionConfig
          transition={{ type: "spring", duration: 0.75, bounce: 0 }}
        >
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          ></motion.div>

          <motion.dialog
            className={`fixed top-1/2 ${className} z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: "-50%" }}
            exit={{ opacity: 0 }}
            open={isOpen}
          >
            {children}
          </motion.dialog>
        </MotionConfig>
      )}
    </AnimatePresence>
  );
};

export default Modal;
