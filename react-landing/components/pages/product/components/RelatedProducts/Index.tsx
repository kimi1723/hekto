import useProductsQuery from "@/helpers/queries/Products/useProductsQuery";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import Product from "@/components/shared/Product/Index";

import { Products } from "@/helpers/constants/query-keys";

const RelatedProducts = () => {
  const { data, isPending, isError, error } = useProductsQuery(
    Products.Trending
  );

  return (
    <Section className="flex flex-col gap-10 py-[100px]">
      <Heading variant="secondary">Related products</Heading>

      <div className="flex gap-8">
        {isPending && (
          <p className="text-center">Loading related products...</p>
        )}

        {isError && (
          <p className="text-center">Error occured! {error.message}</p>
        )}

        {data &&
          data.map(({ id, ...p }) => (
            <Product
              key={id}
              id={id}
              motionId={`related-product-${id}`}
              {...{
                ...p,
                img: {
                  height: 232,
                  width: 304,
                  ...p.img,
                },
                discountedPrice: undefined,
              }}
            />
          ))}
      </div>
    </Section>
  );
};

export default RelatedProducts;
