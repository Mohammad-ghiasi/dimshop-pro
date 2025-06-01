import CryptoJS from "crypto-js";

// کلید رمزنگاری (باید یک کلید امن باشد، و در برنامه شما ثابت بماند)
const secretKey = "mySecretKey123"; // توصیه می‌شود که کلید را از یک محیط امن مثل متغیرهای محیطی بگیرید

// رمزنگاری داده‌ها
export function encryptData(value: string): string {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
}

// رمزگشایی داده‌ها
export function decryptData(value?: string): string {
  if (!value) {
    return "";
  }
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}