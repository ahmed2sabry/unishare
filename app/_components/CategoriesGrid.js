"use client";

import Link from "next/link";
import { useGetCategroies } from "../_lib/hooks/useGetCategories";
import Image from "next/image";
import { TbSearchOff } from "react-icons/tb";

function CategoriesGrid() {
  const { isPending, categories } = useGetCategroies();

  if (isPending && !categories) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-3 animate-pulse"
          >
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
      {categories?.map((category) => (
        <Link
          href={`/tools/category/${category.id}`}
          key={category.id}
          className="group flex flex-col items-center cursor-pointer p-4 rounded-xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-zinc-900"
        >
          <div className="relative w-20 h-20 mb-3 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
            <div className="w-12 h-12 relative">
              <Image
                fill
                src={category.iconUrl}
                alt={category.name}
                className=" object-contain transition-transform duration-300 group-hover:rotate-3"
              />
            </div>
            )
          </div>

          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-primary-600 group-hover:translate-y-[-2px]">
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}

export default CategoriesGrid;
