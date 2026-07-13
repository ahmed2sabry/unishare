import SavedButton from "./SavedButton";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";

function GridItem({ item, isRecommended }) {
  const actualToolId = item.toolId || item.id;

  return (
    <Link
      href={`/tools/${actualToolId}`}
      className="bg-white rounded-[20px] p-4 flex flex-col gap-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] relative overflow-hidden "
    >
      <div className="relative h-[90px] md:h-[220px] ">
        <Image
          fill
          src={item.imageUrl}
          alt={item.title}
          className="rounded-xl object-fit"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm md:text-base font-normal">{item.title}</h3>
        <span className="text-base md:text-xl font-semibold ">
          {item.dailyPrice}{" "}
          <span className="text-base font-medium">EGP/day</span>
        </span>
        <span className="text-xs md:text-sm font-medium text-gray-light flex gap-1">
          <FaStar className="text-[#f9cc4f] text-sm " />
          {item.averageRating}
        </span>
      </div>

      <SavedButton id={actualToolId} variant="save" />
    </Link>
  );
}

export default GridItem;
