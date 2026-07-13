"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";

import toast from "react-hot-toast";
import { getProfileInfoAction } from "../actions/getProfileInfo";

export function useGetProfileInfo() {
  //   const { logout } = useAuthStore();
  const { isPending, data: profileInfo } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileInfoAction,
  });

  // you can through isError

  return { isPending, profileInfo };
}
