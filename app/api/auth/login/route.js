import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auths/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { message: errorText || "credintails are wrong" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      ...userMetadata
    } = data;

    const response = NextResponse.json({
      success: true,
      user: userMetadata,
    });

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    };

    if (accessToken) {
      let maxAge = 60 * 60 * 24 * 7;
      if (accessTokenExpiresAt) {
        const expiresAt = new Date(accessTokenExpiresAt).getTime();
        const now = Date.now();
        const diff = Math.floor((expiresAt - now) / 1000);
        if (diff > 0) maxAge = diff;
      }

      response.cookies.set("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: maxAge,
      });
    }

    if (refreshToken) {
      let maxAgeRF = 604801;
      if (refreshTokenExpiresAt) {
        const expiresAtRF = new Date(refreshTokenExpiresAt).getTime();
        const now = Date.now();
        const diffRF = Math.floor((expiresAtRF - now) / 1000);
        if (diffRF > 0) maxAgeRF = diffRF;
      }

      response.cookies.set("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: maxAgeRF,
      });
    }

    return response;
  } catch (error) {
    console.error("Login Route Error:", error);
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
