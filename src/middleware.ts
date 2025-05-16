import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");
  const phoneNumber = request.cookies.get("phoneNumber");

  const loginUrl = new URL("/login", request.nextUrl.origin); // use nextUrl.origin
  const signupUrl = new URL("/signup", request.nextUrl.origin); // use nextUrl.origin

  const path = request.nextUrl.pathname;

  // شرط مخصوص صفحه لاگین
  if (path === "/login") {
    if (!phoneNumber) {
      return NextResponse.redirect(signupUrl);
    }
    return NextResponse.next(); // اجازه ورود به لاگین اگه phoneNumber هست
  }

  // محافظت از مسیرها برای زمانی که token نیست و مسیر signup نیست
  if (!token && path !== "/signup") {

    // اگه phoneNumber هم نیست، مستقیم بفرست به signup
    return NextResponse.redirect(signupUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/userpanel", "/ticket", "/chart", "/adminpanel", "/login"],
};
