"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReviewsAction } from "../actions/getMyReviewsAction";

export function useGetMyReviews() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviewsAction,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
  });

  return {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
