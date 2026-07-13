"use server";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { PAGE_SIZE } from "../constants";

// get Tools

// FIXME:

export async function getTools(params) {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;
    // console.log(" accessToken in getTools action", accessToken);

    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("PageNumber", params?.page || 1);
    if (params?.pageSize) searchParams.append("PageSize", params.pageSize);
    else searchParams.append("PageSize", PAGE_SIZE);
    if (params?.search) searchParams.append("SearchTerm", params.search);
    if (params?.sortBy) {
      const [sortField, sortDirection] = params.sortBy.split("-");
      searchParams.append("SortBy", sortField);
      searchParams.append("SortDirection", sortDirection);
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Tools?${searchParams.toString()}`;
    console.log("url", url);
    // const res = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   credentials: "include",
    // });
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

export async function resetPassword(data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    console.log("resetPasswordaction", res);

    if (!res.ok) {
      let errorMessage = "Registration failed";
      const errorText = await res.text();
      console.log(errorText);
      return { error: errorText || errorMessage };
    }

    return { success: "Your password has been successfully reset" };
  } catch (err) {
    console.error("Error during registration:", err);
    return { error: err.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("refreshToken");
  cookieStore.delete("accessToken");

  // redirect("/"); //FIXME:
}

export async function setAuthCookiesAction(accessToken, refreshToken) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 1,
  });

  return { success: true };
}

export async function loginUserAction(data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const user = await res.json();
    console.log("user in loginUserAction", user);
    // maxAge
    const refreshTokenExpiry = new Date(user.refreshTokenExpiresAt).getTime();
    const now = new Date().getTime();
    const cookieMaxAge = refreshTokenExpiry - now;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", user.accessToken, {
      // path:'/'
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: cookieMaxAge / 1000,
    });
    cookieStore.set("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: cookieMaxAge / 1000,
    });

    return { success: true, user };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUserAction(data) {
  try {
    const formData = new FormData();

    formData.append("UserName", data.UserName);
    formData.append("FullName", data.FullName);
    formData.append("Email", data.Email);
    formData.append("PhoneNumber", data.PhoneNumber);
    formData.append("UniversityId", data.UniversityId);
    formData.append("CollegeId", data.CollegeId);
    formData.append("Password", data.Password);

    // مهم: الملف
    if (data.ProfilePictureUrl) {
      formData.append("ProfilePictureUrl", data.ProfilePictureUrl);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/register`,
      {
        method: "POST",

        body: formData,
      },
    );

    console.log("res", res);

    if (!res.ok) {
      let errorMessage = "Registration failed";
      const errorText = await res.text();

      return { error: errorText || errorMessage };
    }

    return { success: "check you email for confirmation" };
  } catch (err) {
    console.error("Error during registration:", err);
    return { error: err.message };
  }
}

export async function fetchWithAuth(url, options = {}) {
  const cookieStore = await cookies();
  //FIXME: maybe you need to encode here
  const accessToken = cookieStore.get("accessToken")?.value;

  // (1. first try with the current access token)
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  // 2. if we get 401, try to refresh the token
  if (res.status === 401) {
    const result = await refreshAccessTokenAction(accessToken);
    const newAccessToken = result?.newAccessToken;

    if (newAccessToken) {
      // FIXME:

      // 3. retry the original request with the new token
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,

          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });
    } else {
      throw new Error("Session Expired");
    }
  }

  return res;
}

export async function refreshAccessTokenAction(expiredToken) {
  const cookieStore = await cookies();
  // const oldRefreshToken = cookieStore.get("refreshToken")?.value;
  // decoded the refresh token
  const rawRefreshToken = cookieStore.get("refreshToken")?.value;
  const oldRefreshToken = rawRefreshToken
    ? decodeURIComponent(rawRefreshToken)
    : null;

  if (!oldRefreshToken) {
    throw new Error("No refresh token found in cookies");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/refresh-token`,
      {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: oldRefreshToken,
          token: expiredToken,
        }),
      },
    );

    if (!response?.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to refresh token");
    }

    const data = await response.json();
    console.log("Token refreshed successfully:", data);
    // max age
    const refreshTokenExpiry = new Date(data.refreshTokenExpiresAt).getTime();
    const now = new Date().getTime();
    const cookieMaxAge = refreshTokenExpiry - now;

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: cookieMaxAge / 1000,
    });

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: cookieMaxAge / 1000,
    });

    return { newAccessToken: data.accessToken };
  } catch (err) {
    console.error("Error refreshing token:", err);
    throw new Error(err.message || "An error occurred during token refresh");
  }
}

export async function forgotPasswordAction(data) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const text = await res.text();
    console.log("text", text);
    if (!res.ok) {
      return { error: text };
    }
    return { success: "Password reset link sent to your email" };
  } catch (err) {
    return { error: "An error occurred while sending the reset link" };
  }
}

// publish actions

export async function publishProductAction(publishData) {
  try {
    const formData = new FormData();
    formData.append("Title", publishData.title);
    formData.append("Description", publishData.description);
    formData.append("CollegeId", parseInt(publishData.collegeId));
    formData.append("CategoryId", parseInt(publishData.categoryId));
    formData.append("DailyPrice", parseFloat(publishData.dailyPrice));
    formData.append(
      "MinReputationScore",
      parseInt(publishData.minReputationScore),
    );
    formData.append("InsuranceAmount", parseFloat(publishData.insuranceAmount));
    formData.append(
      "AvailableFrom",
      new Date(publishData.availableFrom).toISOString(),
    );
    formData.append(
      "AvailableTo",
      new Date(publishData.availableTo).toISOString(),
    );
    formData.append("IsAvailable", publishData.isAvailable ? "true" : "false");
    formData.append("Image", publishData.image);

    // fetch to api

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tools`,
      {
        method: "POST",
        body: formData,
      },
    );

    console.log("Status Code:", response.status);
    console.log("Redirected:", response.redirected);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to publish product:", errorText);
      throw new Error(errorText || "Failed to publish product");
    }

    const resData = await response.text();

    console.log("resData", resData);

    return { success: "Product published successfully" };
  } catch (err) {
    console.error("Error during publish:", err);
    throw new Error(err.message); //rethrow to get catch by useMutation
  }
}
