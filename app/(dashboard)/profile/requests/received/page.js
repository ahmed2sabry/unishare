"use client";
import ReceivedReqItem from "@/app/_components/ReceivedReqItem";
import Spinner from "@/app/_components/Spinner";
import { useGetReceivedReq } from "@/app/_lib/hooks/useGetReceivedReq";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Page() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetReceivedReq("received");

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <Spinner />;
  if (status === "error") return <div>{error.message}</div>;

  const allRequests = data?.pages.flatMap((page) => page.items) || [];
  console.log(allRequests);

  return (
    <div className="grid grid-cols-1 gap-4 ">
      {allRequests.map((request) => (
        <ReceivedReqItem key={request.id} request={request} />
      ))}
      <div ref={ref} className="text-center p-4">
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
            ? "Scroll down to load more"
            : "No more requests left"}
      </div>
    </div>
  );
}

export default Page;
