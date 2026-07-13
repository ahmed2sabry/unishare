"use client";

import Link from "next/link";
import FilterIcon from "./FilterIcon";
import { useGetCategroies } from "../_lib/hooks/useGetCategories";

export default function Filter() {
  const { isPending, categories } = useGetCategroies();

  if (isPending) {
    return (
      <div className="flex items-center justify-between gap-4 p-2 overflow-x-auto no-scrollbar">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 animate-pulse min-w-[70px]"
          >
            <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-700 rounded-full" />

            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-12" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-between lg:gap-13 lg:self-start">
      <Button img="SquareFour">All</Button>
      {categories.map((category) => (
        <Button
          id={category.id}
          img={
            category.name === "engineering"
              ? "Frame"
              : category.name === "medical"
                ? "Stethoscope"
                : category.name === "books"
                  ? "BookOpenText"
                  : category.name === "arts"
                    ? "Palette"
                    : "SquareFour"
          }
          key={category.id}
        >
          {category.name}
        </Button>
      ))}

      {/* <Button id={1} img="Frame">
        Engineering
      </Button>
      <Button id={2} img="Stethoscope">
        Medical
      </Button>
      <Button id={3} img="BookOpenText">
        Books
      </Button>
      <Button id={4} img="Palette">
        Arts
      </Button> */}
    </div>
  );
}

function Button({ id = 0, children, img }) {
  if (id === 0)
    return (
      <>
        <Link
          href={`/tools/category`}
          className={` hidden lg:flex hover:bg-primary-500 text-xl rounded-3xl border-2 border-[#e5e9f4] px-6 py-4 transition-all duration-300 font-medium cursor-pointer text-[#374151] hover:text-white  items-center gap-1 shadow-[0_1.54px_6.15px_0_rgba(0,0,0,0.04)]`}
        >
          <FilterIcon name={img} className="w-6 h-6" />
          <span>{children}</span>
        </Link>
        <Link
          href={`/tools/category`}
          className={` lg:hidden hover:text-primary-500 text-sm font-normal cursor-pointer text-gray-light flex flex-col items-center gap-1}`}
        >
          <FilterIcon name={img} className="w-6 h-6" />
          <span>{children}</span>
        </Link>
      </>
    );

  return (
    <>
      <Link
        href={`/tools/category/${id}`}
        className={` hidden lg:flex hover:bg-primary-500 text-xl rounded-3xl border-2 border-[#e5e9f4] px-6 py-4 transition-all duration-300 font-medium cursor-pointer text-[#374151] hover:text-white  items-center gap-1 shadow-[0_1.54px_6.15px_0_rgba(0,0,0,0.04)]`}
      >
        <FilterIcon name={img} className="w-6 h-6" />
        <span>{children}</span>
      </Link>
      <Link
        href={`/tools/category/${id}`}
        className={`lg:hidden hover:text-primary-500 text-sm font-normal cursor-pointer text-gray-light flex flex-col items-center gap-1}`}
      >
        <FilterIcon name={img} className="w-6 h-6" />
        <span>{children}</span>
      </Link>
    </>
  );
}

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import FilterIcon from "./FilterIcon";
// import { useAuthStore } from "../_lib/store/useAuthStore";

// function Filter() {
//   const { user, accessToken } = useAuthStore(); // to trigger re-render on auth changes
//   console.log("userrr", user);
//   console.log("accessToken", accessToken);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const activeFilter = searchParams.get("category") || "all";
//   function handleFilter(filter) {
//     const params = new URLSearchParams(searchParams);
//     params.set("category", filter);
//     router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//   }
//   return (
//     <div className="flex justify-between">
//       <Button
//         activeFilter={activeFilter}
//         handleFilter={handleFilter}
//         filter="all"
//         img="SquareFour"
//       >
//         All
//       </Button>
//       <Button
//         activeFilter={activeFilter}
//         handleFilter={handleFilter}
//         filter="engineering"
//         img="Frame"
//       >
//         Engineering
//       </Button>
//       <Button
//         activeFilter={activeFilter}
//         handleFilter={handleFilter}
//         filter="medical"
//         img="Stethoscope"
//       >
//         Medical
//       </Button>
//       <Button
//         activeFilter={activeFilter}
//         handleFilter={handleFilter}
//         filter="books"
//         img="BookOpenText"
//       >
//         Books
//       </Button>
//       <Button
//         activeFilter={activeFilter}
//         handleFilter={handleFilter}
//         filter="arts"
//         img="Palette"
//       >
//         Arts
//       </Button>
//     </div>
//   );
// }

// function Button({ children, filter, handleFilter, activeFilter, img }) {
//   return (
//     <button
//       onClick={() => handleFilter(filter)}
//       className={` hover:text-primary-500 text-sm font-normal cursor-pointer text-gray-light flex flex-col items-center gap-1 ${
//         activeFilter === filter ? "text-primary-500" : ""
//       }`}
//     >
//       {/* <img src={`/${img}.svg`} alt={filter} className="" /> */}
//       <FilterIcon name={img} className="w-6 h-6" />
//       <span>{children}</span>
//     </button>
//   );
// }

// export default Filter;
