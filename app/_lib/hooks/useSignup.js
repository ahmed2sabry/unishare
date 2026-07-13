"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerUserAction } from "../actions/actions";

export function useSignup() {
  const router = useRouter();

  const { isPending, mutate: signup } = useMutation({
    mutationFn: registerUserAction,
    onSuccess: (data) => {
      if (data?.success) {
        router.push("/auth/signup/confirm");
      }
    },
  });

  return { isPending, signup };
}
