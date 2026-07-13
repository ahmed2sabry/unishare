"use server";

import { fetchWithAuth } from "./actions";

export async function getProfileInfoAction() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("prodddd", res);
    if (!res.ok) {
      throw new Error("Failed to fetch tools");
    }
    const data = await res.json();
    console.log("datacasd", data);
    return data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    throw new Error(err.message);
  }
}
