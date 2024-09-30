import { ReactNode, ElementType } from "react";

interface ChildrenComponentProps {
  children: ReactNode;
  el?: ElementType;
  className?: string;
}

export default ChildrenComponentProps;
