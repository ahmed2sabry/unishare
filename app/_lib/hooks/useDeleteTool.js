"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteToolAction } from "../actions/deleteToolAction";

export function useDeleteTool() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteTool } = useMutation({
    mutationFn: deleteToolAction,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["my-tools"] });
        toast.success(`succefully deleted the item`);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete");
    },
  });

  return { isDeleting, deleteTool };
}
