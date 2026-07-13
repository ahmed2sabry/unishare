// "use server";

// import { connection } from "next/server";
// import { PAGE_SIZE } from "../constants";
// import { fetchWithAuth } from "./actions";
// import { revalidatePath } from "next/cache";

// export async function getSentReqAction(params) {
//   try {
//     await connection();

//     const searchParams = new URLSearchParams();

//     if (params?.page) searchParams.append("PageNumber", params?.page || 1);
//     searchParams.append("PageSize", PAGE_SIZE);

//     const url = `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/sent?${searchParams.toString()}`;

//     const res = await fetchWithAuth(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//       next: {
//         revalidate: 0,
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch sent Requests");
//     }
//     const data = await res.json();
//     console.log("received requests data:", data);
//     return data;
//   } catch (err) {
//     console.error("Error fetching tools:", err);
//     throw new Error(err.message);
//   }
// }
