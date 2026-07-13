"use client";

import { format, differenceInDays } from "date-fns";
import { useCancelByBorrower } from "../_lib/hooks/useCancelByBorrower";
import SpinnerMini from "./SpinnerMini";
import { useCheckout } from "../_lib/hooks/useCheckout";
import Link from "next/link";
import Modal from "./Modal";
import LeaveReview from "./LeaveReview";
import Image from "next/image";

function SentReqItem({ request }) {
  const { isCanceling, cancelByBorrower } = useCancelByBorrower();
  const { isCheckingOut, checkout, checkoutRequestId } = useCheckout();
  const isThisItemCheckingOut =
    isCheckingOut && checkoutRequestId === request.id;
  /* pending */
  if (request.status === "PendingApproval") {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded-3xl shadow-item ">
        <div className="flex items-center bg-pending/20 gap-2 py-1 px-2 rounded-full self-start">
          <span className="w-2.5 h-2.5 rounded-full  bg-pending"></span>
          <span className="text-pending text-sm font-normal">Pending</span>
        </div>

        {/* flex */}
        <div className="flex flex-col gap-3">
          {/* flex item */}
          <div className="flex gap-2.25 items-center">
            <div className="relative w-[82px] h-[63px] ">
              <Image
                fill
                src={request.toolImageUrl}
                alt={request.toolTitle}
                className=" rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-normal">{request.toolTitle}</span>
              <span className="text-base font-semibold">
                {request.totalAmount} EGP
              </span>
              <span className="text-sm font-normal text-[#b4b4b4] ">
                {/* Mar 3 - Mar 6 (3 days) */}
                {format(new Date(request.startDate), "MMM d")} -{" "}
                {format(new Date(request.endDate), "MMM d")} (
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days)
              </span>
            </div>
          </div>
          <p className="font-medium text-sm">Owned by {request.ownerName}</p>
        </div>
        {/* <div className="flex gap-2"> */}
        <button
          onClick={() => cancelByBorrower(request.id)}
          disabled={isCanceling}
          className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-[#f1f1f1] rounded-full text-base font-medium text-decline"
        >
          {isCanceling ? <SpinnerMini /> : "Cancel Request"}
        </button>
        {/* </div> */}
      </div>
    );
  }

  if (request.status === "Canceled") {
    return (
      <div className="relative flex flex-col gap-3 p-4 bg-white rounded-3xl shadow-item grayscale opacity-75 contrast-75 select-none pointer-events-none">
        <div className="flex items-center bg-gray-100 gap-2 py-1 px-2 rounded-full self-start">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
          <span className="text-gray-500 text-sm font-normal">Cancelled</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2.25 items-center">
            <div className="relative w-[82px] h-[63px] ">
              <Image
                fill
                src={request.toolImageUrl}
                alt={request.toolTitle}
                className=" rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-normal text-gray-700">
                {request.toolTitle}
              </span>
              <span className="text-base font-semibold text-gray-500 line-through">
                {request.totalAmount} EGP
              </span>
              <span className="text-sm font-normal text-[#b4b4b4]">
                {format(new Date(request.startDate), "MMM d")} -{" "}
                {format(new Date(request.endDate), "MMM d")} ({""}
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days)
              </span>
            </div>
          </div>
          <p className="font-medium text-sm text-gray-400">
            owned by {request.ownerName}
          </p>
        </div>

        <div className="self-end text-sm font-medium text-gray-400 italic py-2">
          This request has been cancelled
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-12 border-2 border-dashed border-gray-300 text-gray-300 font-bold uppercase tracking-wider text-xs px-2 py-1 rounded pointer-events-none">
          Void
        </div>
      </div>
    );
  }

  // approved
  if (request.status === "ApprovedByOwner") {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded-3xl shadow-item ">
        <div className="flex items-center bg-approved/20 gap-2 py-1 px-2 rounded-full self-start">
          <span className="w-2.5 h-2.5 rounded-full  bg-approved"></span>
          <span className="text-approved text-sm font-normal">Approved</span>
        </div>

        {/* flex */}
        <div className="flex flex-col gap-3">
          {/* flex item */}
          <div className="flex gap-2.25 items-center">
            <div className="relative w-[82px] h-[63px] ">
              <Image
                fill
                src={request.toolImageUrl}
                alt={request.toolTitle}
                className=" rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-normal">{request.toolTitle}</span>
              <span className="text-base font-semibold">
                {request.totalAmount} EGP
              </span>
              <span className="text-sm font-normal text-[#b4b4b4] ">
                {/* Mar 3 - Mar 6 (3 days) */}
                {format(new Date(request.startDate), "MMM d")} -{" "}
                {format(new Date(request.endDate), "MMM d")} (
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days)
              </span>
            </div>
          </div>
          <p className="font-medium text-sm">Owned by {request.ownerName}</p>
        </div>

        <button
          onClick={() => checkout(request.id)}
          disabled={isCheckingOut}
          className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-approved rounded-full text-base font-medium text-white hover:bg-approved/80 transition-all duration-200"
        >
          {isThisItemCheckingOut ? <SpinnerMini /> : "Checkout"}
        </button>
      </div>
    );
  }

  // paid status

  if (request.status === "Paid") {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded-3xl shadow-item ">
        <div className="flex items-center bg-paid/20 gap-2 py-1 px-2 rounded-full self-start">
          <span className="w-2.5 h-2.5 rounded-full  bg-paid"></span>
          <span className="text-paid text-sm font-normal">Paid</span>
        </div>

        {/* flex */}
        <div className="flex flex-col gap-3">
          {/* flex item */}
          <div className="flex gap-2.25 items-center">
            <div className="relative w-[82px] h-[63px] ">
              <Image
                fill
                src={request.toolImageUrl}
                alt={request.toolTitle}
                className=" rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-normal">{request.toolTitle}</span>
              <span className="text-base font-semibold">
                {request.totalAmount} EGP
              </span>
              <span className="text-sm font-normal text-[#b4b4b4] ">
                {/* Mar 3 - Mar 6 (3 days) */}
                {format(new Date(request.startDate), "MMM d")} -{" "}
                {format(new Date(request.endDate), "MMM d")} (
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days)
              </span>
            </div>
          </div>
          <p className="font-medium text-sm">Owned by {request.ownerName}</p>
        </div>

        <Link
          href={`/VerifyPickup`}
          // onClick={() => checkout(request.id)}
          // disabled={isCheckingOut}
          className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-paid rounded-full text-base font-medium text-white hover:bg-paid/80 transition-all duration-200 text-center"
        >
          Verify Pickup
          {/* {isThisItemCheckingOut ? <SpinnerMini /> : "Checkout"} */}
        </Link>
      </div>
    );
  }

  // pickedUp status
  if (request.status === "PickedUp") {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded-3xl shadow-item ">
        <div className="flex items-center bg-paid/20 gap-2 py-1 px-2 rounded-full self-start">
          <span className="w-2.5 h-2.5 rounded-full  bg-active"></span>
          <span className="text-active text-sm font-normal">Active</span>
        </div>

        {/* flex */}
        <div className="flex flex-col gap-3">
          {/* flex item */}
          <div className="flex gap-2.25 items-center">
            <div className="relative w-[82px] h-[63px] ">
              <Image
                fill
                src={request.toolImageUrl}
                alt={request.toolTitle}
                className=" rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-normal">{request.toolTitle}</span>
              <span className="text-base font-semibold">
                {request.totalAmount} EGP
              </span>
              <span className="text-sm font-normal text-[#b4b4b4] ">
                {/* Mar 3 - Mar 6 (3 days) */}
                {format(new Date(request.startDate), "MMM d")} -{" "}
                {format(new Date(request.endDate), "MMM d")} (
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days)
              </span>
            </div>
          </div>
          <p className="font-medium text-sm">Owned by {request.ownerName}</p>
        </div>

        {/* <Link
          href={`/VerifyPickup`}
          onClick={() => checkout(request.id)}
          disabled={isCheckingOut}
          className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-active rounded-full text-base font-medium text-white hover:bg-active/80 transition-all duration-200 text-center"
        >
          Return Tool
        </Link> */}
      </div>
    );
  }

  // returned status
  if (request.status === "Returned") {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded-3xl shadow-item ">
        <div className="flex items-center bg-gray-light/20 gap-2 py-1 px-2 rounded-full self-start">
          <span className="w-2.5 h-2.5 rounded-full  bg-gray-light"></span>
          <span className="text-gray-light text-sm font-normal">Completed</span>
        </div>

        {/* flex */}
        <div className="flex flex-col gap-3">
          {/* flex item */}
          <div className="flex gap-2.25 items-center">
            <div className="relative w-[82px] h-[63px] ">
              <Image
                fill
                src={request.toolImageUrl}
                alt={request.toolTitle}
                className=" rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-normal">{request.toolTitle}</span>
              <span className="text-base font-semibold">
                {request.totalAmount} EGP
              </span>
              <span className="text-sm font-normal text-[#b4b4b4] ">
                {/* Mar 3 - Mar 6 (3 days) */}
                {format(new Date(request.startDate), "MMM d")} -{" "}
                {format(new Date(request.endDate), "MMM d")} (
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days)
              </span>
            </div>
          </div>
          <p className="font-medium text-sm">Owned by {request.ownerName}</p>
        </div>
        <Modal>
          <Modal.Open opens="review">
            <button className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-primary-500 rounded-full text-base font-medium text-white hover:bg-primary-600 transition-all duration-200">
              Leave Review
            </button>
          </Modal.Open>
          <Modal.Window name="review">
            {/* <ConfirmDelete
                    resourceName="tool"
                    onConfirm={() => deleteTool(item.id)}
                    disabled={isDeleting}
                  /> */}
            <LeaveReview id={request.id} variant="borrower" />
          </Modal.Window>
        </Modal>
      </div>
    );
  }
}

export default SentReqItem;
