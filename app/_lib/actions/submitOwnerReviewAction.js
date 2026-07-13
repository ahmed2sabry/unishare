"use server";

import { fetchWithAuth } from "./actions";

export async function submitOwnerReviewAction(data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/submit-owner-feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(data),
      },
    );
    console.log("ahmed lookkkkk review", res);

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
