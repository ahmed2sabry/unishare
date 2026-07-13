"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { submitBorrowerReviewAction } from "../actions/submitBorrowerReviewAction";

export function useSubmitBorrowerReview() {
  const {
    isPending: isSubmittingReviewBorrower,
    mutate: submitReviewBorrower,
  } = useMutation({
    mutationFn: submitBorrowerReviewAction,
    onSuccess: (data) => {
      //  TODO: Handle success response if needed
      toast.success(`succefully submitted the review`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  return { isSubmittingReviewBorrower, submitReviewBorrower };
}
