"use server";

import { fetchWithAuth } from "./actions";

export async function getWishlistAction() {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Wishlists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch wishlist details");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    throw new Error(err.message);
  }
}
