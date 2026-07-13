"use server";

import { fetchWithAuth } from "./actions";

export async function toggleWishlistAction(id) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Wishlists/toggle/${id}`,
      {
        method: "PUT",
      },
    );
    // console.log(res);
    if (!res.ok) {
      throw new Error("Failed to update wishlist");
    }
    const data = await res.json();
    console.log("safdsafa", data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
