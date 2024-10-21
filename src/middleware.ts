import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log(request.url);
  // console.log("cuki");
  const isLogin = true;

  // if (request.nextUrl.pathname.startsWith("/about")) {
  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/about/:path*"]
};
