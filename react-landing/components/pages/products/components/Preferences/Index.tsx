import Select, { SingleValue } from "react-select";

import Icon from "@/components/shared/GetSvg/Index";

import { Navigation } from "@/helpers/types/navigation";
import { handleParamsChange } from "@/helpers/utils/utils";
import { viewList, viewGrid } from "@/helpers/constants/icons";

interface PreferencesProps extends Navigation {
  limit: number;
  sortBy?: string;
  view: string;
}
type SelectOptions = {
  value: string;
  label: string;
};

const limitOptions: SelectOptions[] = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
];

const sortByOptions: SelectOptions[] = [
  { value: "high-to-low", label: "Price: High -> Low" },
  { value: "low-to-high", label: "Price: Low -> High" },
];

const Preferences = ({
  limit,
  sortBy,
  view,
  router,
  searchParams,
}: PreferencesProps) => {
  const handleChange = (
    selectedOption: SingleValue<SelectOptions>,
    key: string
  ) => {
    if (selectedOption)
      handleParamsChange({
        key,
        value: selectedOption.value,
        router,
        searchParams,
      });
  };

  const handleClick = (value: "list" | "grid") =>
    handleParamsChange({ key: "view", value, router, searchParams });

  return (
    <form className="flex gap-16 items-center">
      <div className="flex gap-4 items-center">
        <label htmlFor="change-limit">Per Page</label>
        <Select
          name="limits"
          id="change-limit"
          options={limitOptions}
          onChange={(selectedOption) => handleChange(selectedOption, "limit")}
          defaultValue={limitOptions.find(
            ({ value }) => value === String(limit)
          )}
          isClearable={false}
          aria-labelledby="change-limit"
          aria-required="true"
        />
      </div>

      <div className="flex gap-4 items-center">
        <label htmlFor="sorty-by">Sort By</label>

        <Select
          name="sort-bys"
          id="sort-by"
          options={sortByOptions}
          onChange={(selectedOption) => handleChange(selectedOption, "sort-by")}
          defaultValue={sortByOptions.find(({ value }) => value === sortBy)}
          isClearable={false}
          aria-labelledby="sorty-by"
          aria-required="true"
        />
      </div>

      <div
        role="group"
        aria-labelledby="change-view-label"
        className="flex gap-4 items-center"
      >
        <p id="change-view-label">View</p>
        <button
          type="button"
          aria-pressed={view === "grid"}
          onClick={() => handleClick("grid")}
        >
          <Icon
            id={viewGrid}
            height={24}
            width={24}
            className={view === "grid" ? "text-primary" : ""}
          />
        </button>
        <button
          type="button"
          aria-pressed={view === "list"}
          onClick={() => handleClick("list")}
        >
          <Icon
            id={viewList}
            height={24}
            width={24}
            className={view === "list" ? "text-primary" : ""}
          />
        </button>
      </div>
    </form>
  );
};

export default Preferences;
