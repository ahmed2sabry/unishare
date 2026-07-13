"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { cancelByOwnerAction } from "../actions/cancelByOwnerAction";

export function useCancelByOwner() {
  const queryClient = useQueryClient();
  const { isPending: isCanceling, mutate: cancelByOwner } = useMutation({
    mutationFn: cancelByOwnerAction,
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

  return { isCanceling, cancelByOwner };
}
