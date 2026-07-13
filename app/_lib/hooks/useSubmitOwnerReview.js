"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { submitOwnerReviewAction } from "../actions/submitOwnerReviewAction";

export function useSubmitOwnerReview() {
  const { isPending: isSubmittingReview, mutate: submitReview } = useMutation({
    mutationFn: submitOwnerReviewAction,
    onSuccess: (data) => {
      // TODO: Handle success response if needed
      toast.success(`succefully submitted the review`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  return { isSubmittingReview, submitReview };
}
