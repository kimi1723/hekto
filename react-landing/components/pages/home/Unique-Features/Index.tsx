"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { motion } from "framer-motion";

import { useProductQuery } from "@/helpers/queries/Products/useProductsQuery";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import ProductInfo from "./components/ProductInfo";

import { Home } from "@/helpers/constants/query-keys";
import { fetchHomePage } from "@/server/helpers/utils/fetch-data/fetch-page";
import { type Product } from "@/server/helpers/types/data-types";

import productBg from "@/public/images/home/unique-features/product-bg.png";

const UniqueFeatures = () => {
  const {
    data: pageData,
    isPending: isPagePending,
    isError: isPageError,
    error: pageError,
  } = useQuery({
    queryKey: [Home.UniqueProduct],
    queryFn: () => fetchHomePage("uniqueProduct"),
  });

  const {
    data: productData,
    isPending: isProductPending,
    isError: isProductError,
    error: productError,
  } = useProductQuery(pageData?.id as number, { enabled: !!pageData });

  if (isPagePending)
    return <p className="text-center">Loading section data...</p>;

  if (isPageError || isProductError) {
    const errorMessage = isPageError
      ? pageError.message
      : productError!.message;

    return <p className="text-center">Error occured! {errorMessage}</p>;
  }

  const { title, descriptionList } = pageData;

  const { img } = (productData as Product) || {};

  return (
    <div className="bg-[#F1F0FF]">
      <Section className="flex gap-[33px]">
        <div className="relative flex-shrink-0 flex items-center justify-center w-[640px] h-[576px]">
          <Image
            src={productBg}
            alt=""
            className="absolute top-[36.38px] left-[44px]"
            height={449.62}
            width={481}
          />

          {!isProductPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                height={576}
                width={640}
                className="max-w-none z-10"
              />
            </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-12 pt-[97px]">
          <Heading variant="tertiary">{title}</Heading>

          <ul className="flex flex-col gap-4">
            {descriptionList.map((item, i) => (
              <li key={item} className={`text-grey-3 ${getDot(i)}`}>
                {item}
              </li>
            ))}
          </ul>

          {!isProductPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <ProductInfo {...(productData as Product)} />
            </motion.div>
          )}
        </div>
      </Section>
    </div>
  );
};

const getDot = (index: number) => {
  const basicDotClasses = `before:mr-4 before:content-[''] before:inline-block before:aspect-square before:h-[11px] before:rounded-full`;
  let dotColor: string = "before:bg-primary";

  switch (index % 3) {
    case 1:
      dotColor = "before:bg-info";
      break;
    case 2:
      dotColor = "before:bg-success";
      break;
  }

  return `${basicDotClasses} ${dotColor}`;
};

export default UniqueFeatures;
