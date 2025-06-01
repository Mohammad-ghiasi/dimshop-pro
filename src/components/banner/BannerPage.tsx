"use client";

import { useToast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useMutation";
import { useApiQuery } from "@/hooks/useQuery";
import { deleteImge } from "@/supabase/deleteFile";
import { uploadImageFile } from "@/supabase/uploadfile";
import { Banner, Banners } from "@/types/bannerType";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function BannerPage() {
  const baseImageUrl =
    "https://aiobrhqkxhmnpzhljono.supabase.co/storage/v1/object/public/";
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { toast } = useToast();
  const { data } = useApiQuery<Banners>({
    queryKey: ["banners"],
    url: "/ManagePages/GetBanners",
  });

  const addMutationBanner = useApiMutation({
    method: "post",
    url: "/ManagePages/AddBanner",
    invalidateQueryKey: "banners",
    onSuccessMessage: "بنر آپلود شد",
    onErrorMessage: "خطا در آپلود بنر",
  });
  const DeleteMutation = useApiMutation({
    method: "delete",
    url: "/ManagePages/DeleteBanner",
    invalidateQueryKey: "banners",
    onSuccessMessage: "بنر حذف شد",
    onErrorMessage: "خطا در حذف بنر",
  });

  const handleFileSave = async (file: File) => {
    // const file = event.target.files?.[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      toast({
        description: "لطفا از فرمت های مجاز برای عکس استفاده کنید",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast({
        description: "حجم فایل بیشتر از حد مجاز است",
        variant: "destructive",
      });
      return;
    }
    setUploading(true)

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      // uplad image
      const { data, error } = await uploadImageFile(file);

      if (error) throw error;

      const formatted = data?.fullPath.replace(/ /g, "_");

      const publicUrl = `${baseImageUrl}${formatted}`;

      toast({
        description: "عکس با موفقیت آپلود شد",
        variant: "success",
      });
      setUploading(false)
      return publicUrl;
    } catch (error) {
      console.error("خطا در آپلود:", error);
      toast({
        description: "مشکلی در آپلود پیش اومده",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const bannerHanlder = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast({
        description: "لطفا از فرمت های مجاز برای عکس استفاده کنید",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast({
        description: "حجم فایل بیشتر از حد مجاز است",
        variant: "destructive",
      });
      return;
    }
    const finalUrl = await handleFileSave(file);
    setPreviewUrl(file.name);
    addMutationBanner.mutate({ bannerPath: finalUrl });
    console.log(finalUrl);
  };
  const bannerDeleter = async (item: Banner) => {
    await deleteImge(item.bannerImage);
    DeleteMutation.mutate({ id: item.id });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-sm md:text-lg">مدیریت بنر ها</p>
        </div>
      </div>
      <div className="mt-10">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          تصویر بنر
        </label>
        <div className="flex items-center gap-2">
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => bannerHanlder(e)}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="bg-customgreen p-1 rounded-full cursor-pointer"
          >
            <Plus size={20} className="text-white" />
          </label>
          <span className="text-sm text-gray-500">
            {previewUrl ? `انتخاب‌شده: ${previewUrl}` : "آپلود تصویر"}
          </span>
          {uploading && (<span className="text-sm text-foreground ms-16">درحال آپلود...</span>)}
        </div>
      </div>

      <div className="mt-10">
        {data?.length === 0 && <p>موردی یافت نشد</p>}
        <div className="flex flex-col gap-y-5">
          {data?.map((item: Banner) => (
            <>
              <div className="relative w-[100%] h-[300px]" key={item.id}>
                <Image
                  alt="banners"
                  src={item.bannerImage}
                  fill
                  loading="lazy"
                />
              </div>
              <div className="flex justify-center">
                <Trash2
                  className="text-destructive cursor-pointer"
                  onClick={() => bannerDeleter(item)}
                />
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
