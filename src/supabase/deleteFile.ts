import { supabaseClient } from "./supabaseClient";

export const deleteImage = async (subpath: string, imagePath?: string) => {
  if (imagePath && subpath) {
    // const imagePart = imagePath.split(`/images/`)[1];
    const imagePart = imagePath.split(`/${subpath}/`)[1];
    if (!imagePart) {
      throw new Error("مسیر تصویر قبلی معتبر نیست.");
    }
    const { error } = await supabaseClient.storage
      .from("filesavebuket")
      .remove([`${subpath}/${imagePart}`]);

    if (error) {
      console.error("خطا در حذف فایل قبلی:", error);
      throw new Error("مشکلی در حذف عکس قبلی پیش اومد");
    }
  }
};
