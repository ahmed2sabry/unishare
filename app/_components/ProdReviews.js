"use client";
import ReceivedReqItem from "@/app/_components/ReceivedReqItem";
import Spinner from "@/app/_components/Spinner";
import { useGetReceivedReq } from "@/app/_lib/hooks/useGetReceivedReq";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetProdReviews } from "../_lib/hooks/useGetProdReviews";
import Comment from "./Comment";

function ProdReviews({ id }) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetProdReviews(id);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <Spinner />;
  if (status === "error") return <div>{error.message}</div>;
  const allReviews = data?.pages.flatMap((page) => page.items) || [];

  return (
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
  );
}

export default ProdReviews;
