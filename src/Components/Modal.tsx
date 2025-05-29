import clsx from "clsx";
import { FC, HTMLAttributes, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  open: boolean;
  onClose: () => void;
  className?: string;
  closeOnOutsideClick?: boolean;
}

const Modal: FC<Props> = ({
  open,
  onClose,
  className,
  children,
  closeOnOutsideClick = true,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (open && closeOnOutsideClick) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, closeOnOutsideClick]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          {...rest}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "bg-white max-w-4xl w-full rounded-xl shadow-lg p-6 relative",
              className
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
