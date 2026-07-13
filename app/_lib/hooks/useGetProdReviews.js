"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getProdReviewsAction } from "../actions/getProdReviewsAction";

export function useGetProdReviews(id) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews", id],
    queryFn: getProdReviewsAction,
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
