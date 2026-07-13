"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { useSubmitOwnerReview } from "../_lib/hooks/useSubmitOwnerReview";
import SpinnerMini from "./SpinnerMini";
import { useSubmitBorrowerReview } from "../_lib/hooks/useSubmitBorrowerReview";

function LeaveReview({ onCloseModal, id, variant = "owner" }) {
  const [toolRating, setToolRating] = useState("");
  const [ownerRating, setOwnerRating] = useState("");
  const [toolReview, setToolReview] = useState("");
  const [ownerReview, setOwnerReview] = useState("");
  const { isSubmittingReview, submitReview } = useSubmitOwnerReview();
  const { isSubmittingReviewBorrower, submitReviewBorrower } =
    useSubmitBorrowerReview();

  if (variant === "borrower") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const reviewData = {
            lendingRequestId: id,
            toolRating: toolRating,
            toolComment: toolReview,
            ownerRating: ownerRating,
            ownerComment: ownerReview,
          };
          console.log("reviewData", reviewData);
          submitReviewBorrower(reviewData, {
            onSuccess: () => onCloseModal?.(),
          });
        }}
      >
        <div className="flex flex-col gap-4  ">
          <img
            src="/leave-review.svg"
            alt="leave review"
            className="w-24 h-24 self-center"
          />
          <div className="flex flex-col gap-1.5 items-center">
            <h2 className="font-bold text-xl"> How was your experience?</h2>
            <p className="text-sm font-normal text-gray-light">
              Give 1 to 5 stars about your experience.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {/* 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-normal text-gray-light">
                  Tool Rating
                </span>
                <StarRating
                  onSetRating={setToolRating}
                  size={24}
                  color="#264fa8"
                />
              </div>
              <textarea
                rows={4}
                className={`resize-none rounded-2xl placeholder:text-sm placeholder:text-[#9C9C9C] border-gray-lighter border px-4 py-3  w-full focus:outline-none focus:ring-1 focus:ring-primary-500  focus:bg-white"}`}
                placeholder="Tell others about your experience with this tool..."
                value={toolReview}
                onChange={(e) => setToolReview(e.target.value)}
              />
            </div>
            {/* 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-normal text-gray-light">
                  Owner Rating
                </span>
                <StarRating
                  onSetRating={setOwnerRating}
                  size={24}
                  color="#264fa8"
                />
              </div>
              <textarea
                rows={4}
                className={`resize-none rounded-2xl placeholder:text-sm placeholder:text-[#9C9C9C] border-gray-lighter border px-4 py-3  w-full focus:outline-none focus:ring-1 focus:ring-primary-500  focus:bg-white"}`}
                placeholder="Tell others about your experience with this owner..."
                value={ownerReview}
                onChange={(e) => setOwnerReview(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              disabled={isSubmittingReviewBorrower}
              className="btn-primary "
            >
              {isSubmittingReviewBorrower ? <SpinnerMini /> : "Submit"}
            </button>
            {/* <button
            className="inline cursor-pointer px-2 py-3 border-gray-200 bg-white hover:bg-gray-200 transition-all duration-300"
            onClick={onCloseModal}
          >
            cancel
          </button> */}
            <button
              type="button"
              disabled={isSubmittingReviewBorrower}
              onClick={onCloseModal}
              className="text-decline font-base font-normal cursor-pointer self-center hover:underline underline-offset-2 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const reviewData = {
          lendingRequestId: id,
          borrowerRating: toolRating,
          comment: toolReview,
        };
        console.log("reviewData", reviewData);
        submitReview(reviewData, {
          onSuccess: () => onCloseModal?.(),
        });
      }}
    >
      <div className="flex flex-col gap-4  ">
        <img src="/leave-review.svg" alt="leave review" />
        <div className="flex flex-col gap-1.5 items-center">
          <h2 className="font-bold text-xl"> How was your experience?</h2>
          <p className="text-sm font-normal text-gray-light">
            Give 1 to 5 stars about your experience.
          </p>
          <StarRating onSetRating={setToolRating} size={24} color="#264fa8" />
        </div>
        <textarea
          rows={4}
          className={`resize-none rounded-2xl placeholder:text-sm placeholder:text-[#9C9C9C] border-gray-lighter border px-4 py-3  w-full focus:outline-none focus:ring-1 focus:ring-primary-500  focus:bg-white"}`}
          placeholder="Tell others about your experience with this customer..."
          value={toolReview}
          onChange={(e) => setToolReview(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <button disabled={isSubmittingReview} className="btn-primary ">
            {isSubmittingReview ? <SpinnerMini /> : "Submit"}
          </button>
          {/* <button
            className="inline cursor-pointer px-2 py-3 border-gray-200 bg-white hover:bg-gray-200 transition-all duration-300"
            onClick={onCloseModal}
          >
            cancel
          </button> */}
          <button
            type="button"
            disabled={isSubmittingReview}
            onClick={onCloseModal}
            className="text-decline font-base font-normal cursor-pointer self-center hover:underline underline-offset-2 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default LeaveReview;
