import ChildrenComponentProps from "@/helpers/types/children-component-props";

const Card = ({
  children,
  className = "",
  el = "div",
  ...props
}: ChildrenComponentProps) => {
  const El = el;

  return (
    <El
      className={`rounded-lg shadow-md hocus:shadow-lg focus:outline-none transition-all ${className}`}
      {...props}
    >
      {children}
    </El>
  );
};

export default Card;
