// "use client";

// import { useGetSentReq } from "../_lib/hooks/useGetSentReq";
// import Pagination from "./Pagination";
// import SentReqItem from "./SentReqItem";
// import Spinner from "./Spinner";

// function SentReqContainer({ params }) {
//   const { isPending, data } = useGetSentReq(params);
//   if (isPending) return <Spinner />;
//   const allRequests = data?.items;
//   return (
//     <div className="grid grid-cols-1 gap-4 ">
//       {allRequests.map((request) => (
//         <SentReqItem key={request.id} request={request} />
//       ))}
//       <Pagination count={data?.totalCount} />
//     </div>
//   );
// }

// export default SentReqContainer;
