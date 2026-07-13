"use server";

import { fetchWithAuth } from "./actions";

export async function getToolAction(id) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tools/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch tool details");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching tool:", err);
    throw new Error(err.message);
  }
}
