"use client";

import { useQuery } from "@tanstack/react-query";

import { getToolAction } from "../actions/getToolAction";

export function useGetTool(id) {
  //   const { logout } = useAuthStore();
  const { isPending, data: tool } = useQuery({
    queryKey: ["tool", id],
    queryFn: () => getToolAction(id),
  });

  return { isPending, tool };
}
