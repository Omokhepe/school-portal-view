import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("auth_Token")?.value;
//
//   const protectedRoutes = ["/e-portal", "/dashboard"];
//
//   const isProtected = protectedRoutes.some((route) =>
//     req.nextUrl.pathname.startsWith(route),
//   );
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

export const config = {
  match: ["/e-portal/:path*", "/admin-dashboard/:path*"],
};

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_Token")?.value;

  const isAuth = Boolean(token);
  const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");

  // console.log(isAuth, "check here");

  // If not logged in → redirect to login
  if (!isAuth && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and tries to access login → redirect to dashboard
  if (isAuth && isOnLoginPage) {
    return NextResponse.redirect(
      new URL("/admin-dashboard/overview", request.url),
    );
  }

  return NextResponse.next();
}
