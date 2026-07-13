"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteToolAction } from "../actions/deleteToolAction";
import { editToolAction } from "../actions/editToolAction";

export function useEditTool() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editTool } = useMutation({
    mutationFn: ({ id, editData }) => editToolAction({ id, editData }),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["my-tools"] });
        toast.success(
          `succefully updated the item ${data.data.id} ${data.data.title}`,
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete");
    },
  });

  return { isEditing, editTool };
}
