//middleware file is used to define protected Routes

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/profile", "/post/create", "/post/edit"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const session = getSessionCookie(request);

  const isProtectedRoutes = protectedRoutes.some((route) =>
    pathName.startsWith(route)
  );

  if (isProtectedRoutes && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathName === "/auth" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
