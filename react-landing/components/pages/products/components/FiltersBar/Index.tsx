import { useQuery } from "@tanstack/react-query";

import Filter from "./Filter";

import { ProductsPage } from "@/helpers/constants/query-keys";
import { Navigation } from "@/helpers/types/navigation";
import { fetchProductsPage } from "@/server/helpers/utils/fetch-data/fetch-page";

const FiltersBar = (navigation: Navigation) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [ProductsPage.Filters],
    queryFn: () => fetchProductsPage("filters"),
  });

  return (
    <ul className="flex flex-col gap-12">
      {isPending && <p>Loading filters...</p>}

      {isError && <p>Error occured! {error.message}</p>}

      {data &&
        data.map((filter) => (
          <Filter
            key={filter.queryParamKey}
            {...{ ...filter, ...navigation }}
          />
        ))}
    </ul>
  );
};

export default FiltersBar;
