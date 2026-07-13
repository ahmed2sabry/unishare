"use server";

import { connection } from "next/server";
import { PAGE_SIZE_REQ } from "../constants";
import { fetchWithAuth } from "./actions";

export async function getReceivedReqAction({ pageParam = 1, queryKey }) {
  try {
    // await connection();
    // const searchParams = new URLSearchParams();

    // searchParams.append("PageNumber", pageParam || 1);
    // searchParams.append("PageSize", PAGE_SIZE_REQ);

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/apiLendingRequest/received?${searchParams.toString()}`;
    const [_key, type] = queryKey;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/${type}?PageNumber=${pageParam}&PageSize=${PAGE_SIZE_REQ}`;

    const res = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tools");
    }
    const data = await res.json();
    console.log("received requests data:", data);
    return data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    throw new Error(err.message);
  }
}
