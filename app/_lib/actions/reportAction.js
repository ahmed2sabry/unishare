"use server";

import { fetchWithAuth } from "./actions";

export async function reportAction(data) {
  try {
    const formData = new FormData();

    formData.append("LendingRequestId", data.id);
    formData.append("Reason", data.reason);
    formData.append("ClaimedAmount", data.amount);

    data?.images.forEach((file) => {
      formData.append("Images", file);
    });

    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/open-dispute`,
      {
        method: "POST",

        body: formData,
      },
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "failed submitting the report");
    }
    const message = res.json();
    return message;
  } catch (err) {
    throw new Error(err.message);
  }
}
