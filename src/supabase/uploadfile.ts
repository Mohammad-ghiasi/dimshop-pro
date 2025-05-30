import { supabaseClient } from "./supabaseClient";

export async function uploadImageFile(
  file: File
): Promise<{ data?: any; error?: any; publicUrl?: string }> {
  const baseImageUrl =
    "https://aiobrhqkxhmnpzhljono.supabase.co/storage/v1/object/public/";
    
  const { data, error } = await supabaseClient.storage
    .from("filesavebuket")
    .upload(`images/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("خطا در آپلود فایل:", error);
    return { data: null, error };
  }

  const formatted = data?.fullPath.replace(/ /g, "_");
  if (!formatted) {
    const err = new Error("مسیر فایل آپلود شده نامعتبر است.");
    console.error(err);
    return { data: null, error: err };
  }

  return { data, error: null, publicUrl: `${baseImageUrl}${formatted}` };
}
