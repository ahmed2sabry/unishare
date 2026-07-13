"use client";

import { LuPhone } from "react-icons/lu";
import FilterIcon from "./FilterIcon";
import { useAuthStore } from "../_lib/store/useAuthStore";
import { useGetProfileInfo } from "../_lib/hooks/useGetProfileInfo";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";

function ProfileInfo() {
  const [isMounted, setIsMounted] = useState(false);
  const { isPending, profileInfo } = useGetProfileInfo();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);
  console.log("saddfaf", profileInfo);
  if (!isMounted || isPending) {
    return (
      <div className="grid grid-cols-[80px_1fr_auto] gap-4 animate-pulse">
        {/* 1. Profile Picture Skeleton */}
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>

        {/* 2. Text Content Skeleton */}
        <div className="flex flex-col gap-2 py-1">
          {/* Full Name */}
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          {/* Engineering Student - MU */}
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>

          {/* Phone Number */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>

        {/* 3. Action Button Skeleton */}
        <div className="w-5 h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[80px_1fr_auto] gap-4">
        {/* FIXME: */}
        <div className=" rounded-full relative w-20 h-20 overflow-hidden">
          <Image
            fill
            src={profileInfo?.profilePictureUrl || "/Unknown_person.jpg"}
            alt={profileInfo?.fullName}
            className="object-cover absolute"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-medium ">{profileInfo?.fullName}</h2>
          <p className="text-gray-light font-normal text-sm">
            {profileInfo?.facultyName}
          </p>
          <p className="flex items-center gap-0.5 text-gray-light font-normal text-sm">
            <LuPhone />
            <span>{profileInfo?.phoneNumber}</span>
          </p>
        </div>
        <Link
          href="/profile/edit"
          className="w-5 h-10 cursor-pointer text-gray-light hover:text-primary-500 transition-all"
        >
          <FilterIcon name="Edit" className="" />
        </Link>
      </div>
      <div className="border border-[#eee] rounded-2xl px-4 py-2.5 flex justify-between ">
        <div className="flex flex-col justify-center items-center gap-1">
          <span className="text-sm font-normal">
            {profileInfo?.numberOfToolsShared}
          </span>
          <span className="text-sm font-normal text-gray-light">
            Tools Listed
          </span>
        </div>
        <span className="bg-[#e7e7e7] w-px "></span>
        <div className="flex flex-col justify-center items-center gap-1">
          <span className="text-sm font-normal">
            {profileInfo?.numberOfCompletedBorrowings}
          </span>
          <span className="text-sm font-normal text-gray-light">
            Completed Rentals
          </span>
        </div>
        <span className="bg-[#e7e7e7] w-px "></span>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="flex items-center gap-1">
            <FaStar className="text-[#f9cc4f]" />
            <span className="text-sm font-normal ">
              {profileInfo?.reputationScore}
            </span>
          </p>
          <span className="text-sm font-normal text-gray-light">
            Reputation
          </span>
        </div>
      </div>
    </>
  );
}

// FIXME: delete it

export default ProfileInfo;
