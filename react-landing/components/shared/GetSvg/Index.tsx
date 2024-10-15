import type { IconValues } from "@/helpers/constants/icons";

export interface GetSvgProps {
  id: IconValues;
  className?: string;
  width?: number;
  height?: number;
  spritePath?: string;
  fill?: string;
}

const GetSvg = ({
  id,
  className = "",
  width = 16,
  height = 16,
  spritePath = "icons.svg",
  ...props
}: GetSvgProps) => {
  return (
    <svg className={className} width={width} height={height} {...props}>
      <use href={`${spritePath}#${id}`}></use>
    </svg>
  );
};

export default GetSvg;
