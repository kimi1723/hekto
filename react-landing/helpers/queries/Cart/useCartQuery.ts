import { useQuery } from "@tanstack/react-query";

import { fetchCart } from "@/server/helpers/utils/fetch-data/fetch-user";
import { User } from "@/helpers/constants/query-keys";

const useCartQuery = () =>
  useQuery({
    queryKey: [User.Cart],
    queryFn: () => fetchCart(),
  });

export default useCartQuery;
