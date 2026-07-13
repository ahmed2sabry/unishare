"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategoriesAction } from "../actions/getCategoriesAction";

export function useGetCategroies(id) {
  const { isPending, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAction(id),
  });

  return { isPending, categories };
}
