import { useQuery } from "@tanstack/react-query";

import { fetchFavorites } from "@/server/helpers/utils/fetch-data/fetch-user";
import { FAVORITES_KEY } from "@/helpers/constants/query-keys";

const useFavoritesQuery = () =>
  useQuery({
    queryKey: [FAVORITES_KEY],
    queryFn: () => fetchFavorites(),
  });

export default useFavoritesQuery;
