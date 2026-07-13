import { format, parseISO } from "date-fns";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

function Comment({ review }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-3 items-center pb-4">
      <div className="relative w-9 h-9 md:h-14 md:w-14">
        <Image
          fill
          src={review.reviewerImage || "Unknown_person.jpg"}
          alt={review.reviewerName}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-sm md:text-base">
          {review.reviewerName}
        </h3>
        <p className="text-xs font-normal text-gray-light md:text-sm">
          {format(parseISO(review.createdAt), "MMMM dd, yyyy")}
        </p>
      </div>

      <StarRating rating={review.rating} />
      <p className="text-xs md:text-base font-normal col-span-full">
        {review.comment}
      </p>
    </div>
  );
}

export default Comment;

function StarRating({ rating }) {
  const totalStars = 5;

  return (
    <div className="flex items-center md:text-lg gap-[3px] col-span-full">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <FaStar
            key={index}
            className={
              starValue <= rating ? "text-[#f9cc4f]" : "text-gray-lighter"
            }
          />
        );
      })}
    </div>
  );
}
