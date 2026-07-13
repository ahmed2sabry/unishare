import Link from "next/link";
import Slider from "./Slider";

function RecentlyViewed() {
  return (
    <div className=" py-4 px-2">
      <div className="flex items-center justify-between ">
        <h2 className="text-base md:text-3xl font-semibold">
          Recommended for You
        </h2>
        <Link
          className="text-primary-500 text-xs md:text-base font-normal"
          href="/tools"
        >
          See All
        </Link>
      </div>
      <Slider />
    </div>
  );
}

export default RecentlyViewed;
