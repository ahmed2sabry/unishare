"use client";

import { LuPhone } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useGetProfileInfo } from "../_lib/hooks/useGetProfileInfo";
import Image from "next/image";

export default function ProfileAcc() {
  const { isPending, profileInfo } = useGetProfileInfo();
  if (isPending) return <ProfileAccSkeletonPlaceholder />;

  return (
    <div className="pt-12 pb-6 flex flex-col items-center text-xs xl:text-sm  border-b border-[#F3F4F6] ">
      <div className="relative w-20 h-20">
        <Image
          src={profileInfo?.profilePictureUrl || "/Unknown_person.jpg"}
          alt={profileInfo?.fullName}
          fill
          className=" rounded-full border-2 border-[#e9edf6] shadow-[0_4px_12px_0_rgba(38,79,168,0.15)] object-cover "
        />
      </div>
      <h2 className="font-bold text-xl mb-2">{profileInfo?.fullName}</h2>
      <span className="font-normal text-base text-[#6b7280] mb-2 ">
        {profileInfo?.facultyName}
      </span>
      <div className="flex items-center gap-1 text-[#9ca3af] text-sm font-normal">
        <LuPhone />
        <span>{profileInfo?.phoneNumber}</span>
      </div>
      {/* list about tools */}
      <div className="self-stretch mx-1 xl:mx-5 mt-7 border border-[#f0f0f0] rounded-2xl xl:px-4 py-3 flex justify-between ">
        <div className="flex flex-col justify-center items-center gap-1 ">
          <span className=" font-bold text-primary-500">
            {profileInfo?.numberOfToolsShared}
          </span>
          <span className=" font-normal text-[#9CA3AF]">Tools Listed</span>
        </div>
        <span className="bg-[#f0f0f0] w-px "></span>
        <div className="flex flex-col justify-center items-center gap-1">
          <span className=" font-bold text-primary-500">
            {profileInfo?.numberOfCompletedBorrowings}
          </span>
          <span className=" font-normal text-[#9CA3AF]">Completed Rentals</span>
        </div>
        <span className="bg-[#f0f0f0] w-px "></span>
        <div className="flex flex-col justify-center items-center gap-1">
          <span className=" flex items-center font-bold text-primary-500 ">
            {profileInfo?.reputationScore}
            <MdOutlineStarPurple500 />
          </span>

          <span className=" font-normal text-[#9CA3AF]">Rep.</span>
        </div>
      </div>
    </div>
  );
}

export function ProfileAccSkeletonPlaceholder() {
  return (
    <div className="pt-9.5 pb-6 flex flex-col items-center border-b border-[#F3F4F6] text-xs xl:text-sm animate-pulse w-full">
      {/* Profile Image Skeleton */}
      <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-[#e9edf6]" />

      {/* Name Skeleton */}
      <div className="h-6 bg-gray-300 rounded w-40 mt-4 mb-2" />

      {/* Faculty Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-48 mb-3" />

      {/* Phone Skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded-full" />
        <div className="h-3 bg-gray-200 rounded w-28" />
      </div>

      {/* Tools & Stats Block Skeleton */}
      <div className="self-stretch mx-1 xl:mx-5 mt-7 border border-[#f0f0f0] rounded-2xl xl:px-4 py-4 flex justify-between items-center">
        {/* Tools Listed */}
        <div className="flex flex-col justify-center items-center gap-2 flex-1">
          <div className="h-5 bg-gray-300 rounded w-6" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>

        {/* Divider */}
        <span className="bg-[#f0f0f0] w-px h-8"></span>

        {/* Completed Rentals */}
        <div className="flex flex-col justify-center items-center gap-2 flex-1">
          <div className="h-5 bg-gray-300 rounded w-6" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>

        {/* Divider */}
        <span className="bg-[#f0f0f0] w-px h-8"></span>

        {/* Rating */}
        <div className="flex flex-col justify-center items-center gap-2 flex-1">
          <div className="h-5 bg-gray-300 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
