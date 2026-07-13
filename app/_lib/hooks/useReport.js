"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { reportAction } from "../actions/reportAction";

export function useReport() {
  const { isPending, mutate } = useMutation({
    mutationFn: reportAction,
    onSuccess: (data) => {
      toast.success(data?.message || "the report submitted succefully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  return {
    isPending,
    mutate,
  };
}
