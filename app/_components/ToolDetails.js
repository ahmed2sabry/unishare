"use client";
import { notFound, useRouter } from "next/navigation";
import { CiBookmark } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { useGetTool } from "../_lib/hooks/useGetTool";
import SavedButton from "./SavedButton";
import ProdReviews from "./ProdReviews";
import { FaStar } from "react-icons/fa6";
import { format } from "date-fns";
import { useGetProfileInfo } from "../_lib/hooks/useGetProfileInfo";
import Image from "next/image";

function ToolDetails({ id }) {
  const { isPending, tool } = useGetTool(id);
  const { isPending: profilePending, profileInfo } = useGetProfileInfo();

  console.log(tool, profileInfo);

  const router = useRouter();

  if (isPending || profilePending) {
    return (
      <div className="max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-6 p-4 animate-pulse">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-64 md:h-80 w-full bg-gray-200 rounded-xl" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-12" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
        {/* Right Column Skeleton */}
        <div className="flex flex-col gap-6 border border-gray-100 p-4 rounded-2xl h-fit">
          <div className="h-5 bg-gray-300 rounded w-28" />
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-11 bg-gray-300 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!tool) {
    notFound();
  }

  return (
    <div className=" p-4 lg:px-18 flex flex-col gap-6 lg:gap-14 lg:grid lg:grid-cols-3 lg:items-start">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <div className="overflow-hidden">
          <div className="relative w-full h-70 md:h-120 lg:h-140  ">
            <Image
              fill
              src={tool?.imageUrl}
              alt={tool.title}
              className="rounded-xl"
            />
          </div>
        </div>

        {/* tool info */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl md:text-2xl">{tool.title}</h2>
            <div className="text-gray-light flex items-center gap-1 text-sm md:text-base">
              <FaStar className="text-[#f9cc4f]" /> {tool.averageRating}
            </div>
          </div>
          <p className="text-gray-light font-normal text-sm md:text-base leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="h-full lg:col-span-1">
        <div className="flex flex-col gap-6 lg:border lg:border-gray-200/80 lg:p-6 lg:rounded-2xl lg:shadow-sm lg:sticky lg:top-6 bg-white">
          {/* rental details */}
          <div>
            <h3 className="text-primary-500 text-base font-semibold">
              Rental Details
            </h3>
            <ul className="flex flex-col gap-2 mt-3">
              <li className="flex items-center justify-between">
                <h4 className="text-gray-light font-medium text-sm">
                  Daily Price
                </h4>
                <span className="text-base font-semibold">
                  {tool.dailyPrice} EGP/day
                </span>
              </li>
              <li className="flex items-center justify-between">
                <h4 className="text-gray-light font-medium text-sm">
                  Insurance
                </h4>
                <span className="text-base font-semibold">
                  {tool.insuranceAmount} EGP
                </span>
              </li>
              <li className="flex items-center justify-between">
                <h4 className="text-gray-light font-medium text-sm">
                  Available Date
                </h4>

                <span className="text-base font-semibold">{`${format(new Date(tool.availableFrom), "d MMMM")} - ${format(new Date(tool.availableTo), "d MMMM")} `}</span>
              </li>
            </ul>
          </div>

          {/* Owner Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-primary-500 text-base font-semibold">Owner</h3>
            <div className="flex items-center gap-3 px-4 py-3 border border-[#eeeeee] rounded-2xl">
              <img
                src={tool?.ownerImageUrl || "/Unknown_person.jpg"}
                alt={tool.ownerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1 justify-center">
                <h4 className="text-base underline font-medium">
                  {tool.ownerName}
                </h4>
                <span className="text-xs text-gray-light flex gap-1 items-center">
                  <LuPhone /> +{tool.ownerPhoneNumber}
                </span>
              </div>
            </div>
          </div>

          {/* buttons */}
          {tool?.ownerPhoneNumber !== profileInfo?.phoneNumber ? (
            <div className="flex items-center gap-3 mt-2 lg:mt-0">
              <button
                onClick={() => {
                  router.push(`/tools/${tool.id}/rent`);
                }}
                className="btn-primary mt-0 flex-1 py-3 text-sm md:text-base cursor-pointer"
              >
                Request to Rent
              </button>
              <SavedButton id={tool.id} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="lg:col-span-3 w-full flex flex-col gap-4 mt-4">
        <hr className="hidden lg:block border-gray-100 my-4" />
        <ProdReviews id={id} />
      </div>
    </div>
  );
}

export default ToolDetails;
