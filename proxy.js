import { NextResponse } from "next/server";

export function proxy(req) {
  console.log("matcher is working");
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("cookies", req.cookies.getAll());
  console.log("matcher refreshToken:", refreshToken);

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/publish") ||
    req.nextUrl.pathname.startsWith("/tools") ||
    req.nextUrl.pathname.startsWith("/VerifyPickup");

  // if you are not logged in and trying to access a protected route, redirect to login
  if (!refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // if you are logged in and trying to access the login or signup page, redirect to home
  if (refreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/auth/:path*",
    "/tools/:path*",
    "/publish/:path*",
    "/VerifyPickup",
  ],
};
