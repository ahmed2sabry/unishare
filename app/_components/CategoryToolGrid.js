"use client";
import Pagination from "../_components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getTools } from "../_lib/actions/actions";
import { useAuthStore } from "../_lib/store/useAuthStore";
import { CiBookmark } from "react-icons/ci";
import { getCategoryAction } from "../_lib/actions/getCategoryAction";
import { FaStar } from "react-icons/fa6";
import Spinner from "./Spinner";
import Link from "next/link";
import SavedButton from "./SavedButton";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TbSearchOff } from "react-icons/tb";

function CategoryToolGrid({ params, id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["category", { categoryId: id, ...params }],
    queryFn: () => getCategoryAction(params, id),
    placeholderData: (previousData) => previousData,
  });
  if (isLoading && !data) return <Spinner />;
  if (!data) {
    notFound();
  }
  if (data?.length === 0)
    return (
      <div className="h-[50vh] flex flex-col justify-center items-center text-center px-4 gap-4">
        <div className="text-gray-300 text-6xl mb-2">
          <TbSearchOff />
        </div>

        <h3 className="text-primary-500 text-2xl md:text-3xl font-semibold">
          Sorry, we couldn&apos;t find this category
        </h3>

        <p className="text-gray-light text-sm md:text-base max-w-sm">
          Try checking the spelling or exploring other available categories.
        </p>

        <Link
          href="/tools/category"
          className="mt-2 bg-primary-500 text-white px-5 py-4 rounded-full hover:bg-primary-600 transition-all text-sm font-medium inline-block"
        >
          Browse Categories
        </Link>
      </div>
    );
  return (
    <>
      <div className="text-xl">all tools exist {data.totalCount}</div>

      <div className="min-h-12  grid gap-3 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {data.items.map((item) => (
          <Link
            href={`/tools/${item.id}`}
            key={item.id}
            className="bg-white rounded-[20px] p-4  flex flex-col gap-4 shadow-item relative overflow-hidden "
          >
            <div className="relative h-40">
              <Image
                fill
                src={item.imageUrl}
                alt={item.title}
                className="rounded-xl object-fit"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-normal">{item.title}</h3>
              <span className="text-base font-semibold ">
                {item.dailyPrice} EGP/day
              </span>
              <span className="text-xs font-medium text-gray-light flex  gap-1">
                <FaStar className="text-[#f9cc4f] text-sm  " />
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

export default CategoryToolGrid;
