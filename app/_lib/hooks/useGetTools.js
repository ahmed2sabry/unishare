"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";

export function useGetTools() {
  const { logout } = useAuthStore();
  const { isPending, data: tools } = useQuery({
    queryKey: ["tools"],
    queryFn: () => getTools(params),
    onSuccess: (data) => {
      console.log("tools", data);
    },
    onError: async (err) => {
      // FIXME:
      await logout();
    },
  });

  return { isPending, tools };
}
