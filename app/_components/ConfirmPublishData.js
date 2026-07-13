"use client";
import { GoCheckCircleFill } from "react-icons/go";
import { usePublishStore } from "../_lib/store/usePublishStore";
import { fetchWithAuth } from "../_lib/data-services";
import { useAuthStore } from "../_lib/store/useAuthStore";
import { publishProductAction } from "../_lib/actions/actions";
import { usePublishTool } from "../_lib/hooks/usePublishTool";
import SpinnerMini from "./SpinnerMini";

function ConfirmPublishData() {
  const { publishData } = usePublishStore();

  const { mutatePublish, isPending } = usePublishTool();

  return (
    <div className="grid grid-cols-1 gap-8 p-4 lg:max-w-2xl lg:mx-auto">
      <img
        src={
          publishData?.image
            ? URL.createObjectURL(publishData.image)
            : "/placeholder.png"
        }
        alt="medical box"
        className="w-full rounded-xl"
      />

      <div className="flex flex-col divide-y divide-[#E1E1E1]">
        <div className="pb-5">
          <h2 className="text-base font-medium mb-2">{publishData?.title}</h2>
          <p className="text-gray-light text-sm font-normal">
            {publishData?.description}
          </p>
        </div>
        <ul className=" pt-5 flex flex-col gap-4">
          <li className="text-sm font-medium">
            <span className="text-primary-500">Category:</span> Medical
          </li>
          <li className="text-sm font-medium">
            <span className="text-primary-500">Daily Price:</span>{" "}
            {publishData?.dailyPrice} EGP/day
          </li>
          <li className="text-sm font-medium">
            <span className="text-primary-500">Insurance amount:</span>{" "}
            {publishData?.insuranceAmount} EGP
          </li>
          <li className="text-sm font-medium flex items-center gap-1">
            <GoCheckCircleFill className="text-green-500 text-base" />

            <span>
              {" "}
              Available from{" "}
              {publishData?.availableFrom?.toISOString().split("T")[0]} to{" "}
              {publishData?.availableTo?.toISOString().split("T")[0]}
            </span>
          </li>
        </ul>
      </div>
      {/* button */}
      <div className="flex flex-col  gap-4">
        <button
          onClick={() => mutatePublish(publishData)}
          className="btn-primary"
        >
          {isPending ? <SpinnerMini /> : "Confirm Publish"}
        </button>

        <button className="text-decline font-base font-normal cursor-pointer self-center hover:underline underline-offset-2 transition-all duration-200">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmPublishData;
