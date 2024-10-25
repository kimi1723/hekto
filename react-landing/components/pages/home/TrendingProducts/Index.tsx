"use client";

import useProductsQuery from "@/helpers/queries/Products/useProductsQuery";

import Product from "@/components/shared/Product/Index";
import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";

import { Products } from "@/helpers/constants/query-keys";

const TrendingProducts = () => {
  const { data, isPending, isError, error } = useProductsQuery(
    Products.Trending
  );

  const trendingProducts = data ? data.data : [];

  return (
    <Section className="my-[100px]">
      <Heading variant="secondary" className="text-center mb-[72px]">
        Trending products
      </Heading>

      {isPending && <p className="text-center">Loading trending products...</p>}

      {isError && <p className="text-center">Error occured! {error.message}</p>}

      {data && (
        <div className="flex gap-8">
          {trendingProducts.map(({ id, ...data }) => (
            <Product
              key={id}
              id={id}
              motionId={`trending-product-${id}`}
              className="pt-4 px-4"
              buttonMenu={false}
              viewDetailsButton={false}
              {...{
                ...data,
                img: {
                  height: 232,
                  width: 272,
                  ...data.img,
                },
                code: undefined,
              }}
            />
          ))}
        </div>
      )}
    </Section>
  );
};

export default TrendingProducts;
