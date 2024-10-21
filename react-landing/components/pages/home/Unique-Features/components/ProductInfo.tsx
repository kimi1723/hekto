import Button from "@/components/shared/Button/Index";
import useCartMutation from "@/helpers/queries/Cart/useCartMutation";

import { Product } from "@/server/helpers/types/data-types";

const ProductInfo = ({
  id,
  name,
  originalPrice,
  img: { src, alt },
  ...props
}: Product) => {
  const cartMutation = useCartMutation({
    id,
    name,
    originalPrice,
    img: { src, alt },
    ...props,
  });

  const handleAddToCart = () => cartMutation.mutate(undefined);

  return (
    <div className="flex gap-4 items-center">
      <Button onClick={handleAddToCart}>Add To Cart</Button>
      <p className="font-josefin text-body-sm">
        {name}
        <span className="block">${originalPrice.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default ProductInfo;
