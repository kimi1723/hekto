import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface UseCarouselProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  dataPerView?: number;
  handleDisplayData: (data: T[]) => ReactNode;
}

const useCarousel = <T>({
  queryKey,
  queryFn,
  dataPerView = 1,
  handleDisplayData,
}: UseCarouselProps<T>) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn,
  });
  const [view, setView] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const startIndex = view * dataPerView;
  const dataToDisplay = data?.slice(startIndex, startIndex + dataPerView) || [];
  const views = Math.ceil((data?.length || 0) / dataPerView);
  const controlsArr = Array.from({ length: views }, (_, i) => i);

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
