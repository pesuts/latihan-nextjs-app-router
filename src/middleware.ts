import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

// export function middleware(request: NextRequest) {
//   // console.log(request.url);
//   // console.log("cuki");
//   const isLogin = true;

//   // if (request.nextUrl.pathname.startsWith("/about")) {
//   if (!isLogin) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   // }
//   // return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/about/:path*"]
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, ["/dashboard", "/profile", "/login", "/register"]);