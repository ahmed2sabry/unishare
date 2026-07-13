"use client";
import Pagination from "../_components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getTools } from "../_lib/actions/actions";
import { useAuthStore } from "../_lib/store/useAuthStore";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import SavedButton from "./SavedButton";
import Spinner from "./Spinner";
import Image from "next/image";
import { TbSearchOff } from "react-icons/tb";

function ToolsGrid({ params }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tools", params],
    queryFn: () => getTools(params),
    placeholderData: (previousData) => previousData,
  });
  if (isLoading && !data) return <Spinner />;
  if (data?.items.length === 0)
    return (
      <div className="h-[50vh] flex flex-col justify-center items-center text-center px-4 gap-4">
        <div className="text-gray-300 text-6xl mb-2">
          <TbSearchOff />
        </div>

        <h3 className="text-primary-500 text-2xl md:text-3xl font-semibold">
          Sorry, we couldn&apos;t find this tool
        </h3>

        <p className="text-gray-light text-sm md:text-base max-w-sm">
          Try checking the spelling or exploring other available categories.
        </p>

        <Link
          href="/tools"
          className="mt-2 bg-primary-500 text-white px-5 py-4 rounded-full hover:bg-primary-600 transition-all text-sm font-medium inline-block"
        >
          Browse All Tools
        </Link>
      </div>
    );
  return (
    <>
      <div className="text-xl">all tools exist {data.totalCount}</div>

      <div className="min-h-12 grid gap-3 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {data.items.map((item) => (
          <Link
            href={`/tools/${item.id}`}
            key={item.id}
            className="bg-white rounded-[20px] p-4  flex flex-col gap-4 shadow-item relative  overflow-hidden "
          >
            <div className=" relative h-40">
              <Image
                fill
                src={item.imageUrl}
                alt={item.title}
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-normal">{item.title}</h3>
              <span className="text-base font-semibold ">
                {item.dailyPrice} EGP/day
              </span>
              <span className="text-xs font-medium flex  gap-1 text-gray-light">
                <FaStar className="text-[#f9cc4f] text-sm " />
                {item.averageRating}
              </span>
            </div>
            <SavedButton id={item.id} variant="save" />
          </Link>
        ))}
      </div>
      <Pagination count={data.totalCount} />
    </>
  );
}

export default ToolsGrid;
