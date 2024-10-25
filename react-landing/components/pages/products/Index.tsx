"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import useProductsQuery from "@/helpers/queries/Products/useProductsQuery";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import InlineLink from "@/components/shared/InlineLink/Index";
import FiltersBar from "./components/FiltersBar/Index";
import Preferences from "./components/Preferences/Index";
import InlineButton from "@/components/shared/InlineButton/Index";
import Label from "@/components/shared/Typography/Label";
import DisplayedProducts from "./components/DisplayedProducts/Index";

import { MAIN_NAV_PAGES } from "@/helpers/constants/pages";
import { handleParamsChange } from "@/helpers/utils/utils";
import { ProductSortBy } from "@/server/helpers/types/data-types";

const Products = ({
  page: initialPage,
  limit: initialLimit,
  sortBy: initialSort,
  price: initialPrice,
}: {
  page: number;
  limit: number;
  sortBy?: ProductSortBy;
  price?: string;
}) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || initialLimit;
  const page = Number(searchParams.get("page")) || initialPage;
  const sortBy = searchParams.get("sort-by") || initialSort;
  const price = searchParams.get("price") || initialPrice;
  const view = searchParams.get("view") || "list";

  const { data, isPending, isError, error } = useProductsQuery(
    "all",
    page,
    limit,
    sortBy,
    price
  );
  const {
    home: { name: homePageName, path: homePagePath },
    products: { name: productsPageName, path: productsPagePath },
  } = MAIN_NAV_PAGES;
  const { data: products, totalPages } = data || {};
  const navigation = { router, searchParams };

  const isActive = path === productsPagePath;

  const handlePageChange = (newPage: number) =>
    handleParamsChange({
      key: "page",
      value: newPage.toString(),
      router,
      searchParams,
    });

  return (
    <Section className="flex flex-col gap-20 items-center pt-14 pb-[100px]">
      <header className="flex flex-col gap-6 items-center">
        <Heading variant="primary">{productsPageName}</Heading>
        <menu className="flex gap-8 items-center">
          <li className="relative after:content-[''] after:absolute after:aspect-square after:h-1 after:bg-[#D9D9D9] after:top-1/2 after:-right-4 after:rounded-full after:translate-x-full">
            <InlineLink href={homePagePath}>{homePageName}</InlineLink>
          </li>
          <li>
            <InlineLink
              href={productsPagePath}
              className={isActive ? "text-primary" : ""}
            >
              {productsPageName}
            </InlineLink>
          </li>
        </menu>
      </header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-end gap-8"
      >
        <Preferences {...{ limit, sortBy, view, ...navigation }} />
        <div className="flex gap-[172px]">
          <FiltersBar {...navigation} />

          {isPending && <p>Loading products...</p>}

          {isError && <p>Error occured! {error.message}</p>}

          <AnimatePresence>
            {products && (
              <DisplayedProducts
                {...{ products, view, sortBy, searchParams }}
              />
            )}
          </AnimatePresence>
        </div>

        {totalPages && (
          <menu className="flex gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i).map((i) => (
              <InlineButton
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                variant="white"
                className={`flex justify-center aspect-square h-8 hocus:bg-primary-light ${
                  i + 1 === page ? "text-white bg-primary" : ""
                }`}
              >
                <Label el="span">{i + 1}</Label>
              </InlineButton>
            ))}
          </menu>
        )}
      </motion.main>
    </Section>
  );
};

export default Products;
