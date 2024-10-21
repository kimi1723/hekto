import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { Products } from "@/helpers/constants/query-keys";
import { fetchProduct } from "@/server/helpers/utils/fetch-data/fetch-products";
import { type Product } from "@/server/helpers/types/data-types";

type UseProductQueryOptions = Omit<
  UseQueryOptions<Product | undefined, Error>,
  "queryKey"
>;

const useProductQuery = (id: number, options?: UseProductQueryOptions) =>
  useQuery({
    queryKey: [Products.Individual(id)],
    queryFn: () => fetchProduct(id),
    ...options,
  });

export default useProductQuery;
