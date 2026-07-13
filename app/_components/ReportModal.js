"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useReport } from "../_lib/hooks/useReport";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";
import { ImageUpload } from "./ImageUpload";

function ReportModal({ onCloseModal, id }) {
  const { isPending, mutate } = useReport();
  const [images, setImages] = useState([]);
  const handleImageCapture = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };
  const handleWheel = (e) => e.target.blur();
  const handleSubmitAllData = (data) => {
    if (images.length === 0) {
      toast.error(
        "Please capture at least one image of the tool to prove its condition!",
      );
      return;
    }
    const reportDate = {
      ...data,
      id,
      images,
    };

    // console.log(reportDate);

    mutate(reportDate, {
      onSuccess: () => onCloseModal?.(),
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitAllData)}
      className="flex flex-col gap-4 w-75"
    >
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-base text-gray-dark" htmlFor="reason">
            Reason
          </label>

          {errors?.reason && (
            <span className="text-red-500 text-sm">
              {errors?.reason.message}
            </span>
          )}
        </div>
        <textarea
          rows={3}
          placeholder="write the reson"
          className={`resize-none rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border px-4 py-2  w-full focus:outline-none focus:ring-1 focus:ring-primary-500 `}
          id="reason"
          {...register("reason", {
            required: "reason is required",
          })}
        />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-base text-gray-dark" htmlFor="amount">
            Claimed Amount
          </label>

          {errors?.amount && (
            <span className="text-red-500 text-sm">
              {errors?.amount.message}
            </span>
          )}
        </div>
        <input
          placeholder="i dont what to write here"
          onWheel={handleWheel}
          type="number"
          className={`rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2  w-full focus:outline-none focus:ring-1  focus:ring-primary-500 `}
          id="amount"
          {...register("amount", {
            required: "amount is required",
          })}
        />
      </div>

      <ImageUpload
        images={images}
        setImages={setImages}
        handleImageCapture={handleImageCapture}
      />
      <div className="flex flex-col gap-2">
        <button disabled={isPending} className="btn-primary ">
          {isPending ? <SpinnerMini /> : "Report"}
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={onCloseModal}
          className="text-decline font-base font-normal cursor-pointer self-center hover:underline underline-offset-2 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  //      const { mutate, isPending } = useMutation({
  //     mutationFn: async (formData) => {
  //       return await verifyPickupAction(formData);
  //     },
  //     onSuccess: () => {
  //       toast.success("the pickup has been verified successfully!");
  //       setQrCode("");
  //       setImages([]);
  //       router.replace("/profile/requests/sent");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message || "Failed to verify pickup");
  //     },
  //   });

  //     const handleSubmitAllData = () => {
  //     if (images.length === 0) {
  //       toast.error(
  //         "Please capture at least one image of the tool to prove its condition!",
  //       );
  //       return;
  //     }

  //     const formData = new FormData();

  //     formData.append("QrCode", qrCode);
  //     images.forEach((file) => {
  //       formData.append("Images", file);
  //     });

  //     mutate(formData);
  //   };

  //   return (
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //   const reviewData = {
  //     lendingRequestId: id,
  //     toolRating: toolRating,
  //     toolComment: toolReview,
  //     ownerRating: ownerRating,
  //     ownerComment: ownerReview,
  //   };
  //   submitReviewBorrower(reviewData, {
  //     onSuccess: () => onCloseModal?.(),
  //   });
  //   }}
  // >
}

export default ReportModal;
