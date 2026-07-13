"use server";

import { fetchWithAuth } from "./actions";

export async function checkoutAction(requestId) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Payments/create-payment/${requestId}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) throw new Error("Failed to create payment intent");

    const data = await response.json();
    return { clientSecret: data.clientSecret };
  } catch (err) {
    console.error("Action Error:", err);
    throw new Error(err.message);
  }
}
