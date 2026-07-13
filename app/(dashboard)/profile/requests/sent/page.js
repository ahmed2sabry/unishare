"use client";
import ReceivedReqItem from "@/app/_components/ReceivedReqItem";
import SentReqItem from "@/app/_components/SentReqItem";
import Spinner from "@/app/_components/Spinner";
import { useGetReceivedReq } from "@/app/_lib/hooks/useGetReceivedReq";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Script from "next/script";

function Page() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetReceivedReq("sent");

  const { ref, inView } = useInView();
  useEffect(() => {
    console.log("InView:", inView, "HasNextPage:", hasNextPage);
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <Spinner />;
  if (status === "error") return <div>{error.message}</div>;

  const allRequests = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="grid grid-cols-1 gap-4 ">
      {/* Paymob Checkout Script */}
      {/* <Script src="https://accept.paymob.com/api/accept/js/blended_checkout.js" /> */}

      {allRequests.map((request) => (
        <SentReqItem key={request.id} request={request} />
      ))}
      <div ref={ref} className="text-center p-4 ">
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

// import SentReqContainer from "@/app/_components/SentReqContainer";

// async function Page({ searchParams }) {
//   const params = await searchParams;
//   return <SentReqContainer params={params} />;
//   // if (status === "pending") return <Spinner />;
//   // if (status === "error") return <div>{error.message}</div>;

//   // const allRequests = data?.pages.flatMap((page) => page.items) || [];
// }

// export default Page;
