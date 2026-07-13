"use server";

import { fetchWithAuth } from "./actions";

export async function getCategoriesAction() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    throw new Error(err.message);
  }
}
