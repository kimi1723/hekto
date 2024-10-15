import { useQuery } from "@tanstack/react-query";

import { fetchCart } from "@/server/helpers/utils/fetch-data/fetch-user";
import { CART_KEY } from "@/helpers/constants/query-keys";

const useCartQuery = () =>
  useQuery({
    queryKey: [CART_KEY],
    queryFn: () => fetchCart(),
  });

export default useCartQuery;
