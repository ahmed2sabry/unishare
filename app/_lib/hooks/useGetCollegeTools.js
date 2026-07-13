"use client";

import { useQuery } from "@tanstack/react-query";

import { getToolAction } from "../actions/getToolAction";
import { getCollegeToolsAction } from "../actions/getCollegeToolsAction";

export function useGetCollegeTools() {
  const { isPending, data: tools } = useQuery({
    queryKey: ["college-tools"],
    queryFn: getCollegeToolsAction,
  });

  return { isPending, tools };
}
