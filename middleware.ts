import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(
request: NextRequest
) {

const pathname =
request.nextUrl.pathname;

// ==========================
// ADMIN PROTECTION
// ==========================

if (pathname.startsWith("/admin")) {


const token =
  await getToken({
    req: request,
    secret:
      process.env.NEXTAUTH_SECRET,
  });

// Not logged in
if (!token) {

  return NextResponse.redirect(
    new URL(
      "/login",
      request.url
    )
  );

}

// Not super admin
if (
  token.role !==
  "SUPER_ADMIN"
) {

  return NextResponse.redirect(
    new URL(
      "/dashboard",
      request.url
    )
  );

}


}

// ==========================
// NFC REDIRECTS
// ==========================

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
      {
        status: 404,
      }
    );

  }

  const data =
    await response.json();

  if (!data?.username) {

    return new NextResponse(
      "Profile not found",
      {
        status: 404,
      }
    );

  }

  return NextResponse.redirect(
  new URL(
    `/p/${data.username}`,
    request.url
  )
);

} catch (error) {

  console.log(error);

  return new NextResponse(
    "Server error",
    {
      status: 500,
    }
  );

}


}

return NextResponse.next();

}

export const config = {

matcher: [
"/card/:path*",
"/admin/:path*",
],

};
