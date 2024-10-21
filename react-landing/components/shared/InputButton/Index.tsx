import { InputHTMLAttributes } from "react";

import Button, { type ButtonProps } from "../Button/Index";

interface InputButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  buttonLabel?: string;
  buttonProps?: ButtonProps;
}

const InputButton = ({
  children,
  buttonLabel,
  icon,
  buttonProps,
  ...props
}: InputButtonProps) => (
  <>
    <input
      className={`text-body-sm py-3 pl-4 pr-[70px] font-lato w-full border border-solid border-grey-2 rounded-lg focus:outline-none`}
      {...props}
    />

    <Button
      className="absolute top-0.5 right-0.5"
      {...buttonProps}
      icon={icon}
      aria-label={buttonLabel}
    >
      {children}
    </Button>
  </>
);

export default InputButton;
