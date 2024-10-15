import { useQuery } from "@tanstack/react-query";

import fetchUserData from "@/server/helpers/utils/fetch-data/fetch-user";
import { USER_KEYS } from "@/helpers/constants/query-keys";

const useUserQuery = () =>
  useQuery({
    queryKey: USER_KEYS,
    queryFn: () => fetchUserData(),
  });

export default useUserQuery;
