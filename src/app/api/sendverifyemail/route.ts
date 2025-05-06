import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { to } = await req.json();

    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const hashedCode = await bcrypt.hash(verificationCode.toString(), 10);

    const html = `
    <div style="direction: rtl; font-family: sans-serif; background: #f9f9f9; padding: 24px; border-radius: 12px; max-width: 400px; margin: auto; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      <h2 style="color: hsl(179, 72%, 25%); margin-bottom: 20px; text-align: center;">کد تأیید ایمیل کاربر</h2>
      <p style="margin: 0 0 12px;">سلام 👋</p>
      <p style="margin: 0 0 12px;">برای تأیید ایمیل‌ات لطفاً از کد زیر استفاده کن:</p>
      <div style="font-size: 36px; font-weight: bold; margin: 40px 0; color: hsl(179, 72%, 25%); text-align: center; letter-spacing: 4px;">
        ${verificationCode}
      </div>
      <p style="margin-bottom: 8px;">این کد فقط چند دقیقه معتبره، عجله کن 😅</p>
      <p style="font-size: 12px; color: #777; margin: 0;">اگه این درخواست از طرف تو نبوده، این پیام رو نادیده بگیر.</p>
    </div>
  `;

    // تنظیمات nodemailer برای ارسال ایمیل
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mohammadghiasi005@gmail.com",
        pass: "zisl odlg ytxi apbr", // پسورد یا app password
      },
    });

    const mailOptions = {
      from: "mohammadghiasi005@gmail.com",
      to,
      subject: "کد تأیید ایمیل کاربر",
      html,
    };

    // ارسال ایمیل
    await transporter.sendMail(mailOptions);

    // ساخت پاسخ با استفاده از NextResponse
    const response = NextResponse.json({
      message: "Email sent successfully",
    });

    // تنظیم کوکی با مدت زمان ۳ دقیقه
    response.cookies.set("verification_code", hashedCode, {
      httpOnly: true, // امنیت بیشتر
      maxAge: 180, // ۳ دقیقه بر حسب ثانیه
      path: "/",
      secure: process.env.NODE_ENV === "production", // در پروڈاکشن فقط با HTTPS
      sameSite: "lax", // جلوگیری از حملات CSRF
    });

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
