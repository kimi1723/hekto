import { FC, InputHTMLAttributes, ReactNode } from "react";

import Button from "../button/Index";

interface InputButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  action: () => void;
  className?: string;
  icon?: boolean;
  buttonLabel?: string;
}

const InputButton: FC<InputButtonProps> = ({
  children,
  action,
  className = "",
  buttonLabel,
  icon,
  ...props
}) => {
  return (
    <form action={action} className={`relative ${className}`}>
      <input
        className={`text-body-sm py-3 pl-4 pr-[70px] font-lato border border-solid border-grey-2 rounded-lg focus:outline-none`}
        {...props}
      />

      <Button
        className="absolute top-0.5 right-0.5"
        icon={icon}
        aria-label={buttonLabel}
      >
        {children}
      </Button>
    </form>
  );
};

export default InputButton;
