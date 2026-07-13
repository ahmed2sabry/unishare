"use client";

import Link from "next/link";

import ContainerGrid from "./ContainerGrid";
import GridItem from "./GridItem";
import { getTools } from "../_lib/actions/actions";
import { useQuery } from "@tanstack/react-query";

function RecommendedSection() {
  const { data: itemList, isLoading } = useQuery({
    queryKey: ["maylike"],
    queryFn: () => getTools({ pageSize: 6 }),
  });
  // FIXME: add loading state
  if (isLoading && !itemList)
    return (
      <div className="bg-white rounded-[20px] p-4 flex flex-col gap-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] relative overflow-hidden animate-pulse">
        {/* Image Skeleton */}
        <div className="rounded-xl h-[90px] md:h-[220px] bg-gray-200 w-full" />

        {/* Info Skeleton */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />

          {/* Price */}
          <div className="h-5 bg-gray-300 rounded w-1/2 mt-1" />

          {/* Rating */}
          <div className="h-3 bg-gray-100 rounded w-12 mt-1" />
        </div>

        {/* Save Button Skeleton */}
        <div className="absolute top-6 right-6 w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    );
  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h2 className="text-base font-semibold md:text-3xl">you may like</h2>
        <Link
          className="text-primary-500 text-xs md:text-base font-normal"
          href="/tools"
        >
          See All
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] lg:grid-cols-4  ">
        {itemList?.items.map((item) => (
          <GridItem key={item.id} item={item} isRecommended={true} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedSection;
