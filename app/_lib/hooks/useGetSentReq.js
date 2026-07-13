// "use client";

// import { useQuery } from "@tanstack/react-query";

// import { getToolAction } from "../actions/getToolAction";
// import { getCollegeToolsAction } from "../actions/getCollegeToolsAction";
// import { getSentReqAction } from "../actions/getSentReqAction";

// export function useGetSentReq(params) {
//   const { isPending, data } = useQuery({
//     queryKey: ["lending-sent", params],
//     queryFn: () => getSentReqAction(params),
//     staleTime: 0,
//   });

//   return { isPending, data };
// }
