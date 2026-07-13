"use client";

import { format, differenceInDays } from "date-fns";
import { useCancelByOwner } from "../_lib/hooks/useCancelByOwner";
import { useAcceptReq } from "../_lib/hooks/useAcceptReq";
import SpinnerMini from "./SpinnerMini";
import Modal from "./Modal";
import Link from "next/link";
import QRReturnScanner from "./QRReturnScanner";
import LeaveReview from "./LeaveReview";
import ReportModal from "./ReportModal";
import Image from "next/image";

function ReceivedReqItem({ request }) {
  const { isCanceling, cancelByOwner } = useCancelByOwner();
  const { isAccepting, acceptReq } = useAcceptReq();
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
          <p className="font-medium text-sm">
            Requested by {request.borrowerName}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={isCanceling}
            onClick={() => cancelByOwner(request.id)}
            className="flex-1 py-2 cursor-pointer  px-4 bg-[#f1f1f1] rounded-full text-base font-medium text-decline"
          >
            {isCanceling ? <SpinnerMini /> : "Decline"}
          </button>

          <button
            disabled={isAccepting}
            onClick={() => acceptReq(request.id)}
            className="flex-1 py-2 px-4 bg-primary-500 rounded-full text-base font-medium text-white cursor-pointer"
          >
            {isAccepting ? <SpinnerMini /> : "Accept"}
          </button>
        </div>
      </div>
    );
  }

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
                Ends in:{" "}
                {differenceInDays(
                  new Date(request.endDate),
                  new Date(request.startDate),
                )}{" "}
                days
              </span>
            </div>
          </div>
          <p className="font-medium text-sm">
            Rented by {request.borrowerName}
          </p>
        </div>
        {/* <div className="flex gap-2">
          <button
            disabled={isCanceling}
            onClick={() => cancelByOwner(request.id)}
            className="flex-1 py-2 cursor-pointer  px-4 bg-[#f1f1f1] rounded-full text-base font-medium text-decline"
          >
            {isCanceling ? <SpinnerMini /> : "Decline"}
          </button>

          <button
            disabled={isAccepting}
            onClick={() => acceptReq(request.id)}
            className="flex-1 py-2 px-4 bg-primary-500 rounded-full text-base font-medium text-white cursor-pointer"
          >
            {isAccepting ? <SpinnerMini /> : "Accept"}
          </button>
        </div> */}
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
          <p className="font-medium text-sm">
            Requested by {request.borrowerName}
          </p>
        </div>

        <QRReturnScanner />
      </div>
    );
  }

  // returned
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
          <p className="font-medium text-sm">
            Requested by {request.borrowerName}
          </p>
        </div>
        <div className="flex gap-2">
          <Modal>
            {/* Report */}
            <Modal.Open opens="report">
              <button className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 border border-red-200 text-red-600 rounded-full text-base font-medium bg-white hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  ></path>
                </svg>
                Report
              </button>
            </Modal.Open>
            <Modal.Window name="report">
              <ReportModal id={request.id} />
            </Modal.Window>
            {/* Review */}
            <Modal.Open opens="review">
              <button className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-primary-500 rounded-full text-base font-medium text-white hover:bg-primary-600 transition-all duration-200">
                Leave Review
              </button>
            </Modal.Open>
            <Modal.Window name="review">
              <LeaveReview id={request.id} />
            </Modal.Window>
          </Modal>
        </div>
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
            Requested by {request.borrowerName}
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
          <p className="font-medium text-sm">
            Requested by {request.borrowerName}
          </p>
        </div>
      </div>
    );
  }
}

export default ReceivedReqItem;
