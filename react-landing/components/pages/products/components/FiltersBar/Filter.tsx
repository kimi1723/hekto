import { type FormEvent, type ReactNode } from "react";

import Subtitle from "@/components/shared/Typography/Subtitle";
import Checkbox from "@/components/shared/Checkbox/Index";
import Stars from "@/components/shared/Stars/Index";

import { MAX_STARS } from "@/helpers/constants/constants";

import { handleParamsChange } from "@/helpers/utils/utils";
import { Navigation } from "@/helpers/types/navigation";
import { type BgVariantsKeys } from "@/helpers/constants/colors";

interface TextValueElement {
  text: string;
  value?: string;
  element?: never;
}

interface ElementValue {
  element: ReactNode;
  value: string;
  text?: never;
}

export type FilterElement = TextValueElement | ElementValue;

interface FilterProps extends Navigation {
  name: string;
  queryParamKey: string;
  variant: BgVariantsKeys;
  elements: FilterElement[];
}

const Filter = ({
  name,
  queryParamKey,
  variant,
  elements,
  router,
  searchParams,
}: FilterProps) => {
  const queryParamValue = searchParams.get(queryParamKey);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();

    handleParamsChange({
      key: queryParamKey,
      value,
      searchParams,
      router,
    });
  };

  const content = elements.map(({ text, element, value }) => {
    if (queryParamKey.toLowerCase() === "rating") {
      const transformedValue = +(value as string);
      const emptyStars = MAX_STARS - transformedValue;

      element = (
        <div className="flex gap-2">
          <Stars count={transformedValue} name={`${value}-star`} />
          {emptyStars !== 0 && (
            <Stars name={`${emptyStars}-star-empty`} active={false} />
          )}
        </div>
      );
    }

    const btnContent = element || <span className="capitalize">{text}</span>;
    const currElParamValue = (value || text)!.toLowerCase() as string;
    const isActive = queryParamValue?.toLowerCase() === currElParamValue;

    return (
      <li key={value || text}>
        <form onSubmit={(e) => handleSubmit(e, currElParamValue)}>
          <button className="flex gap-2">
            <Checkbox isActive={isActive} variant={variant} />
            {btnContent}
          </button>
        </form>
      </li>
    );
  });

  return (
    <li>
      <Subtitle
        el="h2"
        variant="tertiary"
        className="pb-2 mb-6 w-max border-b border-b-black capitalize"
      >
        {name}
      </Subtitle>

      <ul className="flex flex-col gap-4">{content}</ul>
    </li>
  );
};

export default Filter;
