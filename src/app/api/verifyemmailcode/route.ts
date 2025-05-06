import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // دریافت کد تأیید از درخواست
    const { code } = await req.json();

    // دریافت کوکی verification_code (هش شده)
    const verificationCodeCookie = req.cookies.get("verification_code");

    // بررسی اینکه کوکی موجود است یا نه
    if (!verificationCodeCookie) {
      return NextResponse.json(
        { error: "No verification code found in cookies" },
        { status: 400 }
      );
    }

    const verificationCodeHash = verificationCodeCookie.value; // Extract value from RequestCookie

    // مقایسه کد وارد شده با کد ذخیره شده در کوکی
    const isValid = await bcrypt.compare(code, verificationCodeHash);

    if (isValid) {
        const response = NextResponse.json({ message: "Verification successful" });

        response.cookies.set("verification_code", "", {
          expires: new Date(0),
          httpOnly: true,
          path: "/",
        });
  
        return response; // ✅ اینو برمی‌گردونیم نه یه ریسپانس جدید
    } else {
      // اگر کد نادرست باشد
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying email code:", error);
    return NextResponse.json(
      { error: "Failed to verify email code" },
      { status: 500 }
    );
  }
}
