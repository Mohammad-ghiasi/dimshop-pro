import { supabaseClient } from "./supabaseClient";

export const deleteImge = async (imagePath?: string) => {
  if (imagePath) {
    const imagePart = imagePath.split("/images/")[1];
    if (!imagePart) {
      throw new Error("مسیر تصویر قبلی معتبر نیست.");
    }
    const { error } = await supabaseClient.storage
      .from("filesavebuket")
      .remove([`images/${imagePart}`]);

    if (error) {
      console.error("خطا در حذف فایل قبلی:", error);
      throw new Error("مشکلی در حذف عکس قبلی پیش اومد");
    }
  }
};
