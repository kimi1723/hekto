import { InputHTMLAttributes } from "react";

import Button from "../Button/Index";

interface InputButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  buttonLabel?: string;
}

const InputButton = ({
  children,
  buttonLabel,
  icon,
  ...props
}: InputButtonProps) => (
  <>
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
  </>
);

export default InputButton;
