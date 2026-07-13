"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { getCategoryAction } from "../actions/getCategoryAction";

export function useGetCategoryTools({ id }) {
  //   const { logout } = useAuthStore();
  const { isPending, data: tools } = useQuery({
    queryKey: ["tools", id],
    queryFn: () => getCategoryAction(params, id),
    onSuccess: (data) => {
      console.log("tools", data);
    },
    onError: async (err) => {
      console.log("getCategory error", err);
      // FIXME:
      //   await logout();
    },
  });

  return { isPending, tools };
}
