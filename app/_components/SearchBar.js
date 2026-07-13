"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search")?.toString().trim();
    const params = new URLSearchParams(searchParams);
    if (params.has("page")) params.set("page", "1");
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `/tools?${queryString}` : `/tools`;

    router.push(targetUrl);

    // if (query) {

    //   router.push(`/tools?search=${encodeURIComponent(query)}`);
    // } else {
    //   router.push(`/tools`);
    // }
  };

  return (
    <form className="flex-1 hidden md:block" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        defaultValue={searchParams.get("search")?.toString() || ""}
        placeholder="Search..."
        className=" transition-all w-full px-6 h-17  rounded-3xl bg-[#f8faff]  focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-[#99a1af] text-primary-600 font-normal placeholder:text-base border-2 border-[#e5e9f4]"
      />
    </form>

    // <form
    //   className="flex-[0_1_500px] focus-within:flex-[0_1_600px] transition-all"
    //   onSubmit={handleSearch}
    // >
    //   <input
    //     type="text"
    //     name="search"
    //     defaultValue={searchParams.get("search")?.toString() || ""}
    //     placeholder="Search..."
    //     className=" transition-all w-full px-4 py-3 rounded-3xl bg-[#efefef]  focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-gray-light text-primary-600 font-normal placeholder:text-sm"
    //   />
    // </form>
  );
}

export default SearchBar;
{
  /* <form className="flex-[0_1_500px] focus-within:flex-[0_1_600px] transition-all">
          <input
            type="text"
            placeholder="Search products, brands and more"
            className="px-4 py-2  placeholder:text-base placeholder:font-normal bg-background rounded-xl focus:outline-none focus:ring-1 w-full  focus:ring-primary-500"
          />
        </form> */
}
