import { useRef, useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(cb: () => void) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) cb();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cb]);

  return ref;
};

export default useClickOutside;
