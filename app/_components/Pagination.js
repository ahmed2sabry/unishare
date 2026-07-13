"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PAGE_SIZE } from "../_lib/constants";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

function Pagination({ count }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function updatePage(newPage) {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(pageCount, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (pageCount <= 1) return null;

  const btnStyle =
    "flex items-center justify-center sm:px-3 sm:py-3 w-7 h-7 sm:w-12 sm:h-12 text-sm font-medium transition-all duration-200  border border-gray-300 hover:bg-primary-500 rounded-full hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const activeStyle =
    "bg-primary-500 text-white border-primary-500 hover:bg-blue-700";

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => updatePage(1)}
          disabled={currentPage === 1}
          className={btnStyle}
          title="First Page"
        >
          <HiChevronDoubleLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={btnStyle}
        >
          <HiChevronLeft className="w-4 h-4" />
          {/* <span className="ml-1 hidden sm:inline">Prev</span> */}
        </button>

        <div className="flex gap-1">
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => updatePage(page)}
              className={`${btnStyle} ${currentPage === page ? activeStyle : "bg-white text-gray-700"}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === pageCount}
          className={btnStyle}
        >
          {/* <span className="mr-1 hidden sm:inline">Next</span> */}
          <HiChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => updatePage(pageCount)}
          disabled={currentPage === pageCount}
          className={btnStyle}
          title="Last Page"
        >
          <HiChevronDoubleRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{count}</span> results
      </p>
    </div>
  );
}

export default Pagination;
