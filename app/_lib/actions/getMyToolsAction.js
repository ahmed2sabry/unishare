"use server";

import { PAGE_SIZE } from "../constants";
import { fetchWithAuth } from "./actions";

export async function getMyToolsAction(params) {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;
    // console.log(" accessToken in getTools action", accessToken);

    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("PageNumber", params?.page || 1);
    searchParams.append("PageSize", PAGE_SIZE);
    if (params?.search) searchParams.append("SearchTerm", params.search);
    if (params?.sortBy) {
      const [sortField, sortDirection] = params.sortBy.split("-");
      searchParams.append("SortBy", sortField);
      searchParams.append("SortDirection", sortDirection);
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Tools/my?${searchParams.toString()}`;
    console.log("url", url);

    const res = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tools");
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching tools:", err);
    throw new Error(err.message);
  }
}
