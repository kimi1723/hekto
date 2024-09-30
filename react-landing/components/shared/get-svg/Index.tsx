import { FC } from "react";

import type { IconValues } from "@/helpers/constants/icons";

export interface GetSvgProps {
  id: IconValues;
  className?: string;
  width?: number;
  height?: number;
  spritePath?: string;
}

const GetSvg: FC<GetSvgProps> = ({
  id,
  className = "",
  width = "16",
  height = "16",
  spritePath = "icons.svg",
  ...props
}) => {
  return (
    <svg className={className} width={width} height={height} {...props}>
      <use href={`${spritePath}#${id}`} />
    </svg>
  );
};

export default GetSvg;
