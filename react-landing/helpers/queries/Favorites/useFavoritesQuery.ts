import { useQuery } from "@tanstack/react-query";

import { fetchFavorites } from "@/server/helpers/utils/fetch-data/fetch-user";
import { User } from "@/helpers/constants/query-keys";

const useFavoritesQuery = () =>
  useQuery({
    queryKey: [User.Favorites],
    queryFn: () => fetchFavorites(),
  });

export default useFavoritesQuery;
