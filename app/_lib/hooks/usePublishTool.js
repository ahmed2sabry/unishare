"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishProductAction } from "../actions/actions";
import toast from "react-hot-toast";
import { publishProduct } from "../data-services";
import { useRouter } from "next/navigation";
import { usePublishStore } from "../store/usePublishStore";

export function usePublishTool(type) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutate: mutatePublish } = useMutation({
    mutationFn: publishProductAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-tools"] });
      queryClient.invalidateQueries({ queryKey: ["college-tools"] });
      queryClient.invalidateQueries({ queryKey: ["maylike"] });
      toast.success(data.success);

      if (type !== "modal") {
        // FIXME: delete this
        usePublishStore.getState().triggerFormReset();
        router.push("/");
        // window.location.href = "/";
      }
    },
    onError: (error) => {
      console.log("erdes", error);
      toast.error(error.message || "Failed to publish product");
    },
  });

  return { isPending, mutatePublish };
}
