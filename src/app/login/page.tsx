"use client";

import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import ThemeImage from "@/components/Theme-Image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { danaExtraBold, danaLight } from "../styles/fonts";
import {
  eraseCookie,
  getCookie,
  getSimpleCookie,
  setCookie,
  setSimpleCookie,
} from "@/lib/cookies";
import { persianNumbers } from "@/lib/parsianNumber";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "@/yup/loginSigupReolver";
import { otpNumberType } from "@/types/loginSignup";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<otpNumberType>({
    defaultValues: { code: "" },
    mode: "onChange", // به محض تغییر هر ورودی، اعتبارسنجی انجام بشه
    resolver: yupResolver(otpSchema),
  });

  const code = watch("code");

  useEffect(() => {
    const cookie = getCookie("phoneNumber");
    if (cookie) {
      setPhoneNumber(cookie.slice(1, -1)); // حذف "" از ابتدا و انتها
    }
    toast({
      description: "کد تایید ارسال شد",
      variant: "info",
    });
  }, [toast]);



  const onSubmit = useCallback(async ({ code }: { code: string }) => {
    try {
      const phoneNumber = getCookie("phoneNumber");
      const confirmCode = getSimpleCookie("hashCode");
  
      const res = await api.post("/Account/VerifiCode", {
        phoneNumber,
        code,
        confirmCode,
      });
  
      if (res.data !== false) {
        setSimpleCookie("authToken", res.data.token, 7);
        setCookie("userPhone", res.data.phoneNumber, 7);
        setCookie("userRole", res.data.role, 7);
        eraseCookie("phoneNumber");
        eraseCookie("hashCode");
        eraseCookie("code");
  
        // router.push("/");
          window.location.href = "/";
      } else {
        toast({
          description: "کد وارد شده اشتباه است",
          variant: "destructive",
        });
      }
    } catch (error) {
      // هندل خطا می‌تونه اینجا بهتر باشه (مثل نمایش toast خطا)
      console.error(error);
    }
  }, [router, toast]);

  useEffect(() => {
    if (/^\d{4}$/.test(code)) {
      onSubmit({ code });
    }
  }, [code, onSubmit]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background rounded-2xl md:shadow-xl dark:md:shadow-gray-900 w-full max-w-lg space-y-4 py-4 px-5 md:px-4"
      >
        <div className="flex justify-center mb-10">
          <ThemeImage w={200} h={20} />
        </div>
        <div className="space-y-2 ">
          <p className={`${danaExtraBold.className} text-sm md:text-xl mb-5`}>
            تایید کد پیامکی
          </p>
          <p className="text-muted-foreground text-[12px] md:text-sm pb-3">
            کد تایید برای شماره {persianNumbers(phoneNumber)} ارسال شد
          </p>

          <div className="w-full flex justify-center">
            <InputOTP
              maxLength={4}
              {...register("code", {
                required: "کد تایید ضروری است",
                minLength: {
                  value: 4,
                  message: "کد باید ۴ رقمی باشد",
                },
                maxLength: {
                  value: 4,
                  message: "کد تایید نباید بیشتر از ۴ رقمی باشد",
                },
                pattern: {
                  value: /^[0-9]{4}$/, // فقط اعداد ۴ رقمی
                  message: "کد باید فقط عدد باشد",
                },
              })}
              value={code}
              onChange={(val) => setValue("code", val)}
              className="mx-auto"
              autoFocus
            >
              <InputOTPGroup className="flex gap-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="ring-customgreen rounded-md"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {errors.code && (
            <p
              className={`${danaLight.className} text-destructive text-[10px] md:text-[12px]`}
            >
              {errors.code.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant={"dimsop"}
          loading={isSubmitting}
          className="w-full py-5"
        >
          تایید
        </Button>
      </form>
    </div>
  );
}
