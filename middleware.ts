import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(
  request: NextRequest
) {

  const pathname =
    request.nextUrl.pathname;

  // Handle NFC token URLs
  if (pathname.startsWith("/card/")) {

    const token =
      pathname.split("/card/")[1];

    if (!token) {
      return NextResponse.next();
    }

    try {

      const response =
        await fetch(
          `${request.nextUrl.origin}/api/card/${token}`
        );

      if (!response.ok) {

        return new NextResponse(
          "Invalid NFC card",
          { status: 404 }
        );

      }

      const data =
        await response.json();

      if (!data?.username) {

        return new NextResponse(
          "Profile not found",
          { status: 404 }
        );

      }

      // SAFE REDIRECT
      return NextResponse.redirect(
        `${request.nextUrl.origin}/${data.username}`
      );

    } catch (error) {

      console.log(error);

      return new NextResponse(
        "Server error",
        { status: 500 }
      );

    }

  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/card/:path*"],
};