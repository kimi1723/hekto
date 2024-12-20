import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface UseCarouselProps<T> {
  queryKey: string[];
  queryFn: () => Promise<{ data: T[]; totalPages: number } | T[]>;
  handleDisplayData: (data: T[]) => ReactNode;
  dataPerView?: number;
  customFilter?: keyof T;
}

const useCarousel = <T>({
  queryKey,
  queryFn,
  handleDisplayData,
  dataPerView = 1,
  customFilter,
}: UseCarouselProps<T>) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn,
  });
  const extractedData = Array.isArray(data) ? data : data?.data || [];

  const [view, setView] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const startIndex = view * dataPerView;
  const dataToDisplay =
    extractedData?.slice(startIndex, startIndex + dataPerView) || [];
  const views = Math.ceil((extractedData?.length || 0) / dataPerView);
  const uniqueControlValues =
    customFilter && data
      ? Array.from(new Set(extractedData.map((item) => item[customFilter])))
      : [];
  const controlsArr = Array.from({ length: views }, (_, i) =>
    customFilter ? uniqueControlValues[i] : i
  );

  const handleViewChange = (nextView: number) => {
    setDirection(nextView > view ? 1 : -1);
    setView(nextView);
  };

  return {
    props: {
      direction,
      view,
      isPending,
      isError,
      error,
      displayedData: handleDisplayData(dataToDisplay),
    },
    view,
    controlsArr,
    handleViewChange,
  };
};

export default useCarousel;
