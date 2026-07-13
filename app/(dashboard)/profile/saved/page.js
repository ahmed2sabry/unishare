"use client";

import ContainerGrid from "@/app/_components/ContainerGrid";
import { useGetWishlist } from "@/app/_lib/hooks/useGetWishlist";

function Page() {
  const { wishlist } = useGetWishlist();
  return (
    // <div className="p-4 flex flex-col gap-4">
    <div>
      {/* <SearchBar /> */}
      {/* <p className="text-base font-normal">6 items</p> */}
      <ContainerGrid itemList={wishlist} />
    </div>
  );
}

export default Page;
