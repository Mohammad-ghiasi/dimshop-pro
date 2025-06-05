"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { uploadImageFile } from "@/supabase/uploadfile";
import Image from "next/image";
import { useApiMutation } from "@/hooks/useMutation";
import { Category } from "@/types/categoryTypes";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { deleteImage } from "@/supabase/deleteFile";
import { saveFiler } from "@/supabase/fileSaver";

const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("نام الزامی است"),
  imagePath: yup.string().optional(),
});
type FormData = {
  name: string;
  imagePath?: string;
};
// const dialogClose = DialogPrimitive

export function EditCategoryDialog({ item }: { item: Category }) {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(item.imagePath);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const DialogCloseRef = useRef<HTMLButtonElement>(null);
  const baseImageUrl =
    "https://aiobrhqkxhmnpzhljono.supabase.co/storage/v1/object/public/";
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: item.name,
      imagePath: item.imagePath,
    },
  });

  const mutation = useApiMutation({
    method: "put",
    url: "/ManageCategory/EditCategory",
    invalidateQueryKey: "category",
    onSuccessMessage: "ویرایش با موفقیت انجام شد",
    onErrorMessage: "ویرایش با خطا مواجه شد",
  });

  const handleFileSave = async (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast({ description: "فرمت عکس نامعتبره", variant: "destructive" });
      return;
    }

    if (file.size > maxSize) {
      toast({ description: "عکس خیلی حجیمه", variant: "destructive" });
      return;
    }

    const {  publicUrl, errorMessage, successMessage } = await saveFiler(file, "category");
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

    toast({ description: "آپلود موفق", variant: "success" });
    return publicUrl;
  };

  const onSubmit = async (formData: FormData) => {
    let finalUrl = formData.imagePath;

    if (selectedFile) {
      await deleteImage("category", item.imagePath);
      const newUrl = await handleFileSave(selectedFile);
      if (newUrl) {
        finalUrl = newUrl;
        setValue("imagePath", newUrl);
      }
    }

    const payload: Category = {
      id: item.id,
      name: formData.name,
      imagePath: finalUrl || item.imagePath,
    };

    mutation.mutate(payload);
    DialogCloseRef.current?.click();
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
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="text-customgreen cursor-pointer hover:scale-[104%]" />
      </DialogTrigger>
      <DialogContent className="max-w-md px-3 lg:px-6">
        <DialogHeader>
          <DialogTitle className="text-center">ویرایش دسته‌بندی</DialogTitle>
          <DialogDescription className="text-center">
            اطلاعات جدید را وارد کن
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* نام دسته‌بندی */}
          <div>
            <label className="block text-sm mb-1">نام دسته‌بندی</label>
            <Input
              type="text"
              {...register("name")}
              error={Boolean(errors?.name)}
              errorMessage={String(errors.name?.message)}
            />
          </div>

          {/* انتخاب عکس */}
          <div>
            <label className="block text-sm mb-1">تصویر جدید دسته‌بندی</label>
            <div className="">
              <input
                type="file"
                accept="image/*"
                id="editInput"
                onChange={(e) => handleFileChange(e)}
                className="hidden w-full text-sm"
              />
              <label
                className="flex items-center gap-x-3 overflow-hidden"
                htmlFor="editInput"
              >
                <div className="bg-customgreen p-1 rounded-full">
                  <span>
                    <Plus size={20} className="text-white" />
                  </span>
                </div>{" "}
                <div className="w-full overflow-hidden">
                  <p className="">{selectedFile?.name}</p>
                </div>
              </label>
            </div>
            <div className="flex justify-center flex-col items-center mt-5">
              <p className="text-sm mb-4">تصویر فعلی</p>
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="preview"
                  width={150}
                  height={150}
                  className="mt-2 rounded-md object-cover"
                />
              )}
            </div>
          </div>

          {/* دکمه ثبت */}
          <Button className="w-full" variant="dimsop" type="submit">
            ذخیره تغییرات
          </Button>
          <DialogClose asChild>
            <button ref={DialogCloseRef} className="hidden" />
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
