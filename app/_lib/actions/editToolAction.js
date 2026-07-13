"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "./actions";

export async function editToolAction({ id, editData }) {
  const formData = new FormData();
  formData.append("Title", editData.title);
  formData.append("DailyPrice", editData.dailyPrice);
  formData.append("MinReputationScore", editData.minReputationScore);
  formData.append("CollegeId", editData.collegeId);
  formData.append("CategoryId", editData.categoryId);
  if (editData.description)
    formData.append("Description", editData.description);
  if (editData.insuranceAmount)
    formData.append("InsuranceAmount", editData.insuranceAmount);
  if (editData.image) formData.append("Image", editData.image);
  console.log("formData herrrre", formData, id);
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tools/${id}`,
      {
        method: "PUT",

        body: formData,
      },
    );
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to update tool");
    }
    // revalidatePath('/profile/tools')
    const data = await res.json();

    return { success: true, data };
  } catch (err) {
    throw new Error(err.message);
  }
}
