import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptData } from "./lib/crypto";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");
  const phoneNumber = request.cookies.get("phoneNumber");
  const role = request.cookies.get("userRole")?.value;

  const loginUrl = new URL("/login", request.nextUrl.origin); // use nextUrl.origin
  const signupUrl = new URL("/signup", request.nextUrl.origin); // use nextUrl.origin

  const path = request.nextUrl.pathname;

  // admin protection
  if (role && path === "/adminpanel") {
    console.log("Request to /adminpanel");

    try {
      const decodeRole = decryptData(role);
      console.log("rol", decodeRole);
      
      const fixDecodeRole = decodeRole.replace(/^"|"$/g, "");
      console.log("fix", fixDecodeRole);
      console.log("fixType", typeof(fixDecodeRole));
      

      console.log("Decrypted role:", decodeRole);

      if (fixDecodeRole === "1" || fixDecodeRole === "2") {
        console.log("Admin access granted");
        return NextResponse.next();
      } else {
        console.log("Access denied. Role:", fixDecodeRole);
        return NextResponse.redirect(signupUrl);
      }
    } catch (error) {
      console.error("Decryption failed:", error);
      return NextResponse.redirect(signupUrl);
    }
  }

  if (role && path === "/adminpanel/manageuser") {
    console.log("__________________________");
    
      console.log("Request to /adminpanel/mamgeUsers");
      try {
      const decodeRole = decryptData(role);
      const fixDecodeRole = decodeRole.replace(/^"|"$/g, "");

      if (fixDecodeRole === "1") {
        console.log("Admin access granted");
        return NextResponse.next();
      } else {
        console.log("Access denied. Role:", fixDecodeRole);
        return NextResponse.redirect(signupUrl);
      }
    } catch (error) {
      console.error("Decryption failed:", error);
      return NextResponse.redirect(signupUrl);
    }
  }

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
  matcher: ["/userpanel", "/ticket", "/chart", "/adminpanel", "/login", "/adminpanel/manageuser"],
};
