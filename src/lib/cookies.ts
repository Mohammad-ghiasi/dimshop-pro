// "use client"

import { decryptData, encryptData } from "./crypto";

export function setCookie(name: string, value: string, days: number): void {
  const d = new Date();
  const encryptedValue = encryptData(JSON.stringify(value)); // رمزنگاری داده‌ها
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); // مدت زمان اعتبار کوکی
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encryptedValue};${expires};path=/`; // ذخیره داده رمزنگاری‌شده در کوکی
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1); // حذف فاصله‌های اضافی
    if (c.indexOf(nameEQ) === 0) {
      const encryptedValue = c.substring(nameEQ.length);
      const decrypted = decryptData(encryptedValue);
      return decrypted.replace(/^"|"$/g, ""); // حذف " از ابتدا و انتها
    }
  }
  return null;
}

export function setSimpleCookie(name: string, value: any, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = 24*60*60*1000
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}
export function getSimpleCookie(name: string): string | null {
   if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function eraseCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`; // حذف کوکی
}
