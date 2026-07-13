import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import SavedButton from "./SavedButton";
import Image from "next/image";
function SliderItem({ tool }) {
  return (
    <Link
      href={`tools/${tool.id}`}
      className="bg-white rounded-[20px] p-4 md:p-6 lg:p-10 w-[292px] md:w-[400px] lg:w-[534px] flex flex-col gap-4 md:gap-6 lg:gap-10 shadow-item relative overflow-hidden lg:rounded-[50px] md:rounded-[38px] lg:shadow-[0_10.02px_50.11px_0_rgba(0,0,0,0.12)] my-7 mx-1 md:my-12 md:mx-2"
    >
      <div className=" relative h-32.5 md:h-45 lg:h-60 ">
        <Image
          fill
          src={tool.imageUrl}
          alt={tool.title}
          className="rounded-xl object-fill "
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-normal md:text-xl lg:text-3xl">
          {tool.title}
        </h3>
        <span className="text-base font-semibold md:text-2xl lg:text-4xl">
          {tool.dailyPrice}
          <span className="text-xs md:text-xl lg:text-3xl"> EGP/day</span>
        </span>
        <span className="text-xs font-medium text-gray-light md:text-lg lg:text-2xl">
          ⭐ {tool.averageRating}
        </span>
      </div>
      {/* <button className="absolute bottom-0 right-0 bg-primary-500 hover:bg-primary-600 transition-all cursor-pointer group px-2 py-1.5 rounded-tl-xl rounded-br-[20px] text-white">
        <CiBookmark className=" group-hover:animate-pulse" size={24} />
      </button> */}
      <SavedButton id={tool.id} variant="outline" />
    </Link>
  );
}

export default SliderItem;
