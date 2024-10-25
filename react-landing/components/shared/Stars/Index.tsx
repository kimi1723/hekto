import Icon from "@/components/shared/GetSvg/Index";
import { activeStar, star } from "@/helpers/constants/icons";

interface StarsProps {
  count?: number;
  name?: string;
  active?: boolean;
}

export const Stars = ({
  count = 1,
  name = "star",
  active = true,
}: StarsProps) =>
  Array.from({ length: count }, (_, i) => i).map((i) => (
    <Icon
      key={name ? `${name}-${i}` : `star-${i}`}
      id={active ? activeStar : star}
      className={active ? "text-secondary" : "text-grey-2"}
    />
  ));

export default Stars;
