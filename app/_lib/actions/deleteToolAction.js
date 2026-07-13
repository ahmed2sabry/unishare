"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "./actions";

export async function deleteToolAction(id) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tools/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to delete tool");
    }
    // revalidatePath('/profile/tools')

    return { success: true };
  } catch (err) {
    throw new Error(err.message);
  }
}
