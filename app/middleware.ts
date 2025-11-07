import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_Token")?.value;

  const protectedRoutes = ["/e-portal", "/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  match: ["/e-portal/:path*", "/dashboard/:path*"],
};
