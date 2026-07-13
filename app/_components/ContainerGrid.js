"use client";

import { FaHeartBroken } from "react-icons/fa";
import GridItem from "./GridItem";

function ContainerGrid({ itemList }) {
  return (
    <div className="p-4 flex flex-col gap-4">
      {itemList?.items?.length === 0 ? null : (
        <p className="text-base font-normal">{itemList?.items?.length} items</p>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] lg:grid-cols-4">
        {itemList?.items?.length > 0 ? (
          itemList.items.map((item) => (
            <GridItem key={item.toolId || item.id} item={item} />
          ))
        ) : (
          <div className="h-[50vh] col-span-full   flex flex-col justify-center items-center text-center px-4 gap-4">
            <div className="text-gray-300 text-6xl mb-2">
              <FaHeartBroken />
            </div>

            <h3 className="text-primary-500 text-2xl md:text-3xl font-semibold">
              No items in wishlist yet
            </h3>

            <p className="text-gray-light text-sm md:text-base max-w-sm">
              start add some tools to your wishlist
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContainerGrid;
