import { ElementType, HTMLAttributes } from "react";

interface ChildrenComponentProps extends HTMLAttributes<ElementType> {
  el?: ElementType;
  className?: string;
}

export default ChildrenComponentProps;
