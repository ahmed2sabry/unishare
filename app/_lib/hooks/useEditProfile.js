"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editProfileAction } from "../actions/editProfileAction";
import { useRouter } from "next/navigation";

export function useEditProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isPending: isEditing, mutate: editProfile } = useMutation({
    mutationFn: editProfileAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data);
      router.push("/profile/tools");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  return { isEditing, editProfile };
}
