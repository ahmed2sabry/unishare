"use server";
import { fetchWithAuth } from "./actions";

export async function editProfileAction(data) {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Profile/update-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(data),
      },
    );
    console.log("edit profile action response:", res);

    const resData = await res.text();
    if (!res.ok) {
      throw new Error(resData);
    }

    return resData;
  } catch (err) {
    throw new Error(err.message);
  }
}
