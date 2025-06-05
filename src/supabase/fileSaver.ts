"use client";
import { supabaseClient } from "./supabaseClient";

export const saveFiler = async (
  file: File,
  subPath: string,
  is3d?: boolean
) => {
  //   base image url
  const baseImageUrl =
    "https://aiobrhqkxhmnpzhljono.supabase.co/storage/v1/object/public/";
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB;
  let errorMessage: string | undefined = undefined;
  let successMessage: string | undefined = undefined;

  // validating file
  if (!file) {
    console.log("هیچ فایلی انتخاب نشده!");
    errorMessage = "هیچ فایلی انتخاب نشده!";
    return { errorMessage };
  }

  if (!allowedTypes.includes(file.type)) {
    console.log("لطفا از فرمت های مجاز برای عکس استفاده کنید");
    errorMessage = "لطفا از فرمت های مجاز برای عکس استفاده کنید";
    return { errorMessage };
  }

  if (file.size > maxSizeInBytes) {
    console.log("حجم فایل بیشتر از حد مجاز است");
    errorMessage = "حجم فایل بیشتر از حد مجاز است";
    return { errorMessage };
  }

  // uploading file
  const { data, error } = await supabaseClient.storage
    .from("filesavebuket")
    .upload(`${subPath}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  // error handling
  if (error) {
    console.log("خطا در آپلود:", error.message);
    errorMessage = `خطا در آپلود فایل: ${error.message}`;
    return { errorMessage };
    // throw new Error(`خطا در آپلود فایل: ${error.message}`);
  }
  const formatted = data?.fullPath.replace(/ /g, "_");

  const publicUrl = `${baseImageUrl}${formatted}`;

  console.log("فایل با موفقیت آپلود شد");
  successMessage = "فایل با موفقیت آپلود شد";

  return { data, error, publicUrl, errorMessage, successMessage };
};
