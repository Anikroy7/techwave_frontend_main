import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { getCurrentUser } from "./services/authService";

const AuthRoutes = ["/login", "/signup"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login/?redirect_url=${pathname}`, request.url),
      );
    }
  }

  if (user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (user?.role !== "admin") {
      if (pathname.includes("admin")) {
        return NextResponse.redirect(new URL("/login", request.url));
      } else {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/pricing",
    "/admin/:page*",
    "/payment/successfull",
  ],
};
