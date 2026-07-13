"use server";

import { fetchWithAuth } from "./actions";

export async function returnToolAction(qrCodeToken) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/return-tool`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ QrCode: qrCodeToken }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to confirm tool return");
    }

    const data = await res.json();
    console.log("Return Action Data:", data);
    return data;
  } catch (error) {
    console.error("Return Action Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
}
