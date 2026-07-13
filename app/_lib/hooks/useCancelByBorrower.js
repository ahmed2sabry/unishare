"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { cancelByBorrowerAction } from "../actions/cancelByBorrowerAction";

export function useCancelByBorrower() {
  const queryClient = useQueryClient();
  const { isPending: isCanceling, mutate: cancelByBorrower } = useMutation({
    mutationFn: cancelByBorrowerAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lending-requests", "sent"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete");
    },
  });

  return { isCanceling, cancelByBorrower };
}
