"use server";

import { fetchWithAuth } from "./actions";

export async function cancelByOwnerAction(id) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/cancel-by-owner/${id}`,
      {
        method: "POST",
      },
    );
    console.log("ahmed lookkkkk", res);

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const resData = await res.json();

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
}
