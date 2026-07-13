"use server";
import { fetchWithAuth } from "./actions";

export async function verifyPickupAction(formData) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/LendingRequest/verify-pickup`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to verify pickup from backend");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(" verifyPickupAction Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
}
