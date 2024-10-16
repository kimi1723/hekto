import { useQuery } from "@tanstack/react-query";

import fetchUserData from "@/server/helpers/utils/fetch-data/fetch-user";
import { User } from "@/helpers/constants/query-keys";

const useUserQuery = () =>
  useQuery({
    queryKey: User.All,
    queryFn: () => fetchUserData(),
  });

export default useUserQuery;
