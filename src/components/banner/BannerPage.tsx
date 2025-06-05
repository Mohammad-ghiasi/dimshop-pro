"use client";

import { useToast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useMutation";
import { useApiQuery } from "@/hooks/useQuery";
import { deleteImage } from "@/supabase/deleteFile";
import { saveFiler } from "@/supabase/fileSaver";
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

  console.log(data);

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

  const bannerHanlder = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
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
    setPreviewUrl(file.name);
    const { publicUrl, errorMessage, successMessage } = await saveFiler(
      file,
      "banners"
    );
    if (errorMessage) {
      toast({
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    if (successMessage) {
      toast({
        description: successMessage,
        variant: "success",
      });
    }
    addMutationBanner.mutate({ bannerPath: publicUrl });
    setUploading(false);
    setPreviewUrl("");
  };
  const bannerDeleter = async (item: Banner) => {
    await deleteImage("banners", item.bannerImage);
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
          {uploading && (
            <span className="text-sm text-foreground ms-16">
              درحال آپلود...
            </span>
          )}
        </div>
      </div>

      <div className="mt-10">
        {data?.length === 0 && <p>موردی یافت نشد</p>}
        <div className="flex flex-col gap-y-5">
          {data?.map((item: Banner) => (
            <div key={item.id}>
              <div className="relative w-[100%] h-[300px]">
                <Image
                  alt="banners"
                  src={item.bannerImage}
                  fill
                  loading="lazy"
                />
              </div>
              <div className="flex justify-center my-4">
                <Trash2
                  className="text-destructive cursor-pointer"
                  onClick={() => bannerDeleter(item)}
                />
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
