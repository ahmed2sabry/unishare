"use server";

import { PAGE_SIZE_REQ } from "../constants";
import { fetchWithAuth } from "./actions";

export async function getProdReviewsAction({ pageParam = 1, queryKey }) {
  try {
    // const searchParams = new URLSearchParams();

    // searchParams.append("PageNumber", pageParam || 1);
    // searchParams.append("PageSize", PAGE_SIZE_REQ);

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/apiLendingRequest/received?${searchParams.toString()}`;
    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/${type}?PageNumber=${pageParam}&PageSize=${PAGE_SIZE_REQ}`;
    const [_key, id] = queryKey;
    if (!id) {
      throw new Error("Product ID is missing in queryKey");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Tools/${id}/reviews?PageNumber=${pageParam}&PageSize=${PAGE_SIZE_REQ}`;

    const res = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tools");
    }
    const data = await res.json();
    console.log("reviews action", data);
    return data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    throw new Error(err.message);
  }
}
