"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadImageFile } from "@/supabase/uploadfile";
import { supabaseClient } from "@/supabase/supabaseClient";
import { useApiMutation } from "@/hooks/useMutation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { danaLight } from "@/app/styles/fonts";

const schema = yup.object().shape({
  name: yup.string().required("نام دسته‌بندی الزامی است"),
  imagePath: yup
    .string()
    .required("انتخاب تصویر الزامی است")
    .min(2, "حداقل 8 کارکتر")
    .max(300, "حداکثر 300 کارکتر"),
});

type FormValues = {
  name: string;
  imagePath: string; // رشته
};

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const supabase = supabaseClient;
  const baseImageUrl =
    "https://aiobrhqkxhmnpzhljono.supabase.co/storage/v1/object/public/";
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { toast } = useToast();

  const mutation = useApiMutation({
    method: "post",
    url: "/ManageCategory/AddCategory",
    invalidateQueryKey: "category",
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

  const imagePath = watch("imagePath");

  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      toast({
        description: "لطفاً یک تصویر انتخاب کنید",
        variant: "destructive",
      });
      return;
    }
    setUploading(true)
    // uploadImageFile(selectedFile)
    const finalUrl = await handleFileSave(selectedFile);
    console.log("finaly", finalUrl);
    const payload = {
      name: data.name,
      imagePath: finalUrl,
    };
    // connect to api
    mutation.mutate(payload);
    console.log("ارسال به API", payload);
    reset();
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    console.log(file);

    setSelectedFile(file); // ذخیره فایل
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setValue("imagePath", file.name);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full mx-auto p-6 rounded-2xl shadow-md space-y-6 border border-border"
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          افزودن دسته‌بندی جدید
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          لطفاً اطلاعات زیر را وارد کنید
        </p>
      </div>

      {/* name input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          نام دسته‌بندی
        </label>
        <Input placeholder="مثلاً: لپ‌تاپ، پوشاک، موبایل" {...register("name")} error={Boolean(errors?.name)} errorMessage={String(errors.name?.message)}/>
      </div>

      {/* file input + icon */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          تصویر دسته‌بندی
        </label>
        <div className="flex items-center gap-2">
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="bg-customgreen p-1 rounded-full cursor-pointer"
          >
            <Plus size={20} className="text-white" />
          </label>
          <span className="text-sm text-gray-500">
            {imagePath ? `انتخاب‌شده: ${imagePath}` : "آپلود تصویر"}
          </span>
        </div>
        {errors.imagePath && (
          <p className={`${danaLight.className} text-destructive text-[11px] mt-1`}>
            {errors.imagePath.message}
          </p>
        )}
      </div>

      {/* preview */}
      {previewUrl && (
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">پیش‌نمایش تصویر:</p>
          <img
            src={previewUrl}
            alt="پیش‌نمایش"
            className="w-32 h-32 object-cover"
          />
        </div>
      )}

      <Button type="submit" className="w-full" variant="dimsop" loading={uploading}> ذخیره دسته‌بندی</Button>
    </form>
  );
}
