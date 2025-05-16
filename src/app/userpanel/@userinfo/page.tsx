"use client";

import { useForm } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeaderTitle from "@/components/headerTitle/HeaderTitle";
import { Badge } from "@/components/ui/badge";
import UserInfoSkeleton from "@/components/skeleton/UserInfoSkeleton";
import { Label } from "@/components/ui/label";
import { CircleAlert, Plus } from "lucide-react";
import {
  UserProfile,
  UserProfileUpdata,
  ValidatedFields,
} from "@/types/useProfile";
import { useToast } from "@/hooks/use-toast";
import { supabaseClient } from "@/supabase/supabaseClient";
import { useAuth } from "@/components/AuthProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { userInfoSchema } from "@/yup/userInfoResolver";
import ConfirmEmail from "./ConfirmEmail";
import { useApiMutation } from "@/hooks/useMutation";

export default function UserProfilePage() {
  // get token
  const { token } = useAuth();
  // stats
  const [uploading, setUploading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  // image input
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //query client
  const queryClient: QueryClient = useQueryClient();
  // toast
  const { toast } = useToast();
  // supabase
  const supabase = supabaseClient;
  const baseImageUrl =
    "https://aiobrhqkxhmnpzhljono.supabase.co/storage/v1/object/public/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ValidatedFields>({
    resolver: yupResolver(userInfoSchema),
  });

  // select file
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // prfile changer
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imagePath?: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

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

    try {
      setUploading(true);

      if (imagePath) {
        const imagePart = imagePath.split("/images/")[1];
        if (!imagePart) {
          throw new Error("مسیر تصویر قبلی معتبر نیست.");
        }
        const { error } = await supabase.storage
          .from("filesavebuket")
          .remove([`images/${imagePart}`]);

        if (error) {
          console.error("خطا در حذف فایل قبلی:", error);
          toast({
            description: "مشکلی در حذف عکس قبلی پیش اومد",
            variant: "destructive",
          });
        }
      }

      const { data, error } = await supabase.storage
        .from("filesavebuket") // اسم باکت خودت
        .upload(`images/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true, // اگر فایل وجود داشت جایگزین کن
        });

      if (error) throw error;

      const formatted = data?.fullPath.replace(/ /g, "_");

      const publicUrl = `${baseImageUrl}${formatted}`; // یا از supabase.storage.from().getPublicUrl() هم می‌تونی استفاده کنی

      mutation.mutate({ imagePath: publicUrl });

      setImgUrl(publicUrl);

      toast({
        description: "عکس با موفقیت آپلود شد",
        variant: "success",
      });
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

  // get user query
  const { data, isLoading } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await api.get("/Account/GetProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    enabled: !!token,
  });

  // input defaulr vaule
  useEffect(() => {
    if (data) {
      reset({
        firstName: data?.user.firstName || "",
        id: data?.user.id || "",
        email: data?.user.email || "",
        phoneNumber: data?.user.phoneNumber || "",
      });
      setImgUrl(data?.user.imagePath || "");
    }
  }, [data, reset]);

  // update user muatation
  const mutation = useApiMutation({
    method: "post",
    url: "/Account/EditProfile",
    invalidateQueryKey: "userProfile",
  });

  // for, submition
  const onSubmit = async (formData: UserProfileUpdata) => {
    if (!isDirty) return; // هیچ toastی نمایش نده
    mutation.mutate(formData);
    // muatate.mutate(formData)
  };

  if (!token) {
    return null;
  }

  return (
    <div className="md:bg-card md:shadow-sm rounded-md pb-6 md:py-6 md:px-4">
      <HeaderTitle className="mb-10 after:h-[2px]">
        جزئیات حساب کاربری
      </HeaderTitle>
      {isLoading ? (
        <UserInfoSkeleton />
      ) : (
        <>
          {/* profile image */}
          <div className="relative mb-8">
            {uploading && (
              <div className="absolute inset-0 z-20 flex  items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-muted border-t-primary" />
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
             
              <div className="relative w-44 h-44">
                <div
                  className="w-full h-full rounded-full bg-accent bg-center bg-cover border"
                  style={{
                    backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
                  }}
                />
                <Button
                  type="button"
                  variant="dimsop"
                  size="icon"
                  onClick={handleButtonClick}
                  className="absolute bottom-2 left-3 rounded-full shadow"
                  disabled={uploading}
                >
                  <Plus className="w-3 h-3 text-background" />
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, data?.user.imagePath)}
                className="hidden"
              />
            </div>
          </div>

          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 md:gap-y-5">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  نام و نام خانوادگی
                </Label>
                <Input
                  id="firstName"
                  className="text-muted-foreground bg-input"
                  {...register("firstName")}
                  placeholder="مثلا محمد قیاسی"
                  error={Boolean(errors.firstName)}
                  errorMessage={errors.firstName?.message}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="id" className="text-sm font-medium">
                  نام کابری
                </Label>
                <Input
                  id="id"
                  className="text-muted-foreground bg-input"
                  {...register("id")}
                  disabled
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">
                  ایمیل
                </Label>

                <div className="relative">
                  {data?.user.emailConfirmed ? (
                    <Badge className="absolute left-2 top-[18px]  -translate-y-1/2 z-10 text-xs px-2 py-0.5 pt-[4px] text-warning-foreground text-[10px] bg-success">
                      تأیید شده
                    </Badge>
                  ) : (
                    <ConfirmEmail email={data?.user.email} />
                  )}

                  <Input
                    id="email"
                    className="pl-24 text-muted-foreground bg-input"
                    {...register("email")}
                    error={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                    placeholder="مثلا mohammad@gmail.com"
                  />

                  {data?.user.email && !data?.user.emailConfirmed && (
                    <p className="text-[8px] md:text-[10px] mt-[-10px] text-warning flex items-center gap-x-1">
                      {" "}
                      <span>
                        <CircleAlert size={14} />
                      </span>
                      <span>
                        برای تایید ایمیل روی دکمه{" "}
                        <span className="underline">تایید نشده</span> کلیک کنید
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  شماره تماس
                </Label>

                <div className="relative">
                  <div className="relative">
                    {data?.user.phoneNumberConfirmed !== undefined && (
                      <Badge
                        className={`absolute left-2 top-[18px] -translate-y-1/2 z-10 px-2 py-0.5 pt-[4px] text-warning-foreground text-[10px]  ${
                          data?.user.phoneNumberConfirmed
                            ? "bg-success"
                            : "bg-warning cursor-pointer"
                        }`}
                        // variant="outline"
                      >
                        {data?.user.phoneNumberConfirmed
                          ? "تأیید شده"
                          : "تأیید نشده"}
                      </Badge>
                    )}

                    <Input
                      id="phoneNumber"
                      className="text-muted-foreground bg-input"
                      {...register("phoneNumber")}
                      error={Boolean(errors.phoneNumber)}
                      errorMessage={errors.phoneNumber?.message}
                      placeholder="شماره تماس"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-5">
              <Button
                variant={"dimsop"}
                type="submit"
                className="w-[100%] md:w-[50%]"
                loading={mutation.isPending}
                disabled={mutation.isPending}
              >
                ذخیره تغییرات
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
