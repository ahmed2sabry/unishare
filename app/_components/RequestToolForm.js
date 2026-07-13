"use client";
import Form from "@/app/_components/Form";
import { useGetTool } from "../_lib/hooks/useGetTool";
import { useRequestTool } from "../_lib/hooks/useRequestTool";
import SpinnerMini from "./SpinnerMini";
import { useState } from "react";
import { useRouter } from "next/navigation";

function RequestToolForm({ id }) {
  const { isPending, tool } = useGetTool(id);
  const { requestTool, isRequesting } = useRequestTool();
  const [isRequested, setIsRequested] = useState(false);
  const router = useRouter();
  if (isRequested)
    return (
      <div className="flex flex-col p-4 items-center lg:max-w-2xl lg:mx-auto ">
        <img src="/push-notifications.svg" alt="successful" className="mb-10" />
        <div className="flex flex-col gap-2 items-center px-8 text-center">
          <h2 className="font-bold text-xl leading-none">
            Your request has been sent!
          </h2>
          <p className="font-normal text-sm px-5 text-gray-light">
            Track notifications, you will be notified once the owner responds.
          </p>
        </div>
        <div className="flex flex-col gap-4 self-stretch items-center mt-10">
          <button
            onClick={() => router.replace("/profile/requests/sent")}
            className="btn-primary self-stretch"
          >
            View My Requests
          </button>
          <button
            onClick={() => router.replace("/")}
            className="text-base cursor-pointer text-primary-500 hover:text-primary-600 transition-all duration-300 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col p-4 lg:max-w-5xl lg:mx-auto lg:mt-14">
      {/* tool info */}
      {isPending ? (
        <div className="flex flex-col gap-3 border border-[#e5e7eb] rounded-3xl p-4 mb-8 animate-pulse">
          {/* Tool Main Info Skeleton */}
          <div className="flex gap-2.25 items-center">
            {/* Image Skeleton */}
            <div className="bg-gray-200 rounded-xl w-17.5 h-13.5 shrink-0" />

            {/* Title & Price Skeleton */}
            <div className="flex flex-col gap-2 w-full">
              {/* Title */}
              <div className="h-3.5 bg-gray-300 rounded w-1/2" />
              {/* Price */}
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>

          {/* Owner Info Skeleton */}
          <div className="h-3.5 bg-gray-200 rounded w-2/5 mt-1" />
        </div>
      ) : (
        <div className="flex flex-col gap-3  border border-[#d9d9d9] rounded-3xl p-4 mb-8">
          <div className="flex gap-2.25 items-center ">
            <img
              src={tool.imageUrl}
              alt={tool.title}
              className="rounded-xl w-17.5 h-13.5"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-normal leading-none">{tool.title}</h3>
              <p className="text-xs font-semibold">
                <span className="text-base"> {tool.dailyPrice}</span> EGP/day
              </p>
            </div>
          </div>
          <h3 className="text-sm font-medium">Owned by by {tool?.ownerName}</h3>
        </div>
      )}
      {/* request form  */}
      <h3 className="text-base font-normal leading-none mb-3">
        Select Rental period
      </h3>
      <Form
        onSubmit={(data) => {
          const finalData = { ...data, toolId: Number(id) };
          requestTool(finalData, {
            onSuccess: () => {
              setIsRequested(true);
            },
          });
        }}
      >
        <Form.Step index={0}>
          <Form.DateFiled startDateName="startAt" endDateName="endAt" />
          {/* <Form.Field
            name="collegeId"
            rules={{ required: "this field is req" }}
          >
            <Form.Label>Select Location</Form.Label>
            <Form.Error />
            <Form.Select
              options={[
                { id: 1, name: "faculty of depression" },
                { id: 2, name: "aya, you do not know how much i love u" },
              ]}
            />
          </Form.Field> */}
        </Form.Step>
        <Form.RentalSummary
          startDateName="startAt"
          endDateName="endAt"
          price={tool?.dailyPrice}
          insurance={tool?.insuranceAmount}
        />
        {/* FIXME: */}
        <div className="flex flex-col gap-2 items-center">
          <button
            type="submit"
            className="btn-primary self-stretch"
            disabled={isRequesting}
          >
            {isRequesting ? <SpinnerMini /> : "Send Request"}
          </button>
          <button
            onClick={() => router.back()}
            type="button"
            className="text-red-600 cursor-pointer hover:text-red-700 transition-all duration-300 hover:underline "
          >
            cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export default RequestToolForm;
