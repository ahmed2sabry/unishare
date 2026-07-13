import RatingBars from "@/app/_components/RatingBars";
import Comment from "@/app/_components/Comment";
import { BiLike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import ProfileReviews from "@/app/_components/ProfileReviews";
export const metadata = {
  title: "Reviews",
};
function page() {
  return (
    <ProfileReviews />
    // <div className="flex flex-col gap-6">
    //   <RatingBars data={{ 5: 120, 4: 80, 3: 30, 2: 10, 1: 5 }} />
    //   <div className="flex flex-col gap-4 divide-y divide-[#E1E1E1]"></div>
    // </div>
  );
}

export default page;
