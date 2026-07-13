"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestToolAction } from "../actions/requestToolAction";
import toast from "react-hot-toast";

export function useRequestTool() {
  const { mutate: requestTool, isPending: isRequesting } = useMutation({
    mutationFn: (data) => requestToolAction(data),

    // onSuccess: (data) => {
    //   toast.success(data.message);
    // },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { requestTool, isRequesting };
}
