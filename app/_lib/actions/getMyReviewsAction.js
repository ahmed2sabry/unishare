"use server";

import { PAGE_SIZE_REQ } from "../constants";
import { fetchWithAuth } from "./actions";

export async function getMyReviewsAction({ pageParam = 1 }) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/reviews?PageNumber=${pageParam}&PageSize=${PAGE_SIZE_REQ}`;

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
    console.log("my reviews action", data);
    return data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    throw new Error(err.message);
  }
}
