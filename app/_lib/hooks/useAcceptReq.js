"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { acceptReqAction } from "../actions/acceptReqAction";

export function useAcceptReq() {
  const queryClient = useQueryClient();
  const { isPending: isAccepting, mutate: acceptReq } = useMutation({
    mutationFn: acceptReqAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["lending-requests", "received"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete");
    },
  });

  return { isAccepting, acceptReq };
}
