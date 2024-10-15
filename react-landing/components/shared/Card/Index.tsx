import ChildrenComponentProps from "@/helpers/types/children-component-props";

const Card = ({
  children,
  className = "",
  el = "div",
  ...props
}: ChildrenComponentProps) => {
  const CardEl = el;

  return (
    <CardEl
      className={`rounded-lg shadow-md hocus:shadow-lg focus:outline-none transition-all ${className}`}
      {...props}
    >
      {children}
    </CardEl>
  );
};

export default Card;
