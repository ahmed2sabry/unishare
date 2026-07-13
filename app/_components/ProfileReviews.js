"use client";
import ReceivedReqItem from "@/app/_components/ReceivedReqItem";
import Spinner from "@/app/_components/Spinner";
import { useGetReceivedReq } from "@/app/_lib/hooks/useGetReceivedReq";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Comment from "./Comment";
import RatingBars from "./RatingBars";
import { useGetMyReviews } from "../_lib/hooks/useGetMyReviews";

function ProfileReviews() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetMyReviews();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <Spinner />;
  if (status === "error") return <div>{error.message}</div>;
  const allReviews = data?.pages.flatMap((page) => page.items) || [];

  function getAverageRating(reviews) {
    if (!reviews.length) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }

  function getRatingDistribution(reviews) {
    const initialDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    return reviews.reduce((acc, review) => {
      const rating = review.rating;
      if (acc[rating] !== undefined) acc[rating] += 1;
      return acc;
    }, initialDistribution);
  }

  return (
    <div className="flex flex-col gap-6">
      <RatingBars
        data={getRatingDistribution(allReviews)}
        average={getAverageRating(allReviews)}
      />
      <div className="flex flex-col gap-4 divide-y divide-[#E1E1E1]">
        {allReviews?.map((review) => (
          <Comment key={review.id} review={review} />
        ))}
        <div ref={ref} className="text-center p-4">
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
              ? "Scroll down to load more"
              : "No more Reviews left"}
        </div>
      </div>
    </div>
  );
}

export default ProfileReviews;
