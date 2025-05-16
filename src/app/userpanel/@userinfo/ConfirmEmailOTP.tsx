"use client";

import { danaLight } from "@/app/styles/fonts";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useMutation";
import api from "@/lib/api";
import { verifyEmai } from "@/lib/emailSender";
import { otpNumberType } from "@/types/loginSignup";
import { otpSchema } from "@/yup/loginSigupReolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ConfirmEmailOTP({ email }: { email: string }) {
  const { toast } = useToast();
  const { token } = useAuth();
  const queryClient: QueryClient = useQueryClient();
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

    const mutation = useApiMutation({
      method: "put",
      url: "/Account/VerifyEmail",
      invalidateQueryKey: "userProfile",
    });

  const onSubmit = useCallback(
    async ({ code }: { code: string }) => {
      const res = await verifyEmai(code);

      if (res) {
        mutation.mutate({email});
        toast({
          description: "ایمیل شما با موفقیت تایید شد",
          variant: "success",
        });
      } else {
        toast({
          description: "کد تایید وارد شده اشتاه است",
          variant: "destructive",
        });
      }
      // console.log(res);
    },
    [ email, mutation, toast]
  );

  useEffect(() => {
    toast({
      description: "کد تایید به ایمیل شما ارسال شد",
      variant: "info",
    });
  }, [toast]);
  useEffect(() => {
    if (/^\d{4}$/.test(code)) {
      onSubmit({ code });
    }
  }, [code, onSubmit, toast]);
  return (
    <div className="flex flex-col mt-6 w-full text-end p-0">
      <div className="">
        <p className="text-base">کد تایید را وارد کنید</p>
        <p className="text-xs md:text-sm text-muted-foreground">
          {" "}
          برای تایید ایمیل, کد ارسال شده به ایمل خود را در کادر زیر وارد کنید
        </p>
      </div>
      {/* عنوان و توضیح */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 my-8">
          {/* <p className={`${danaExtraBold.className} text-sm md:text-xl mb-5`}>
            تایید کد پیامکی
          </p> */}

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
                    className="ring-customgreen rounded-md bg-input"
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

        <DialogFooter className="flex flex-col-reverse md:flex-row gap-3 md:justify-end">
          {/* دکمه بستن */}
          <DialogClose asChild>
            <Button variant="destructive" className="w-full md:w-auto">
              بستن
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"dimsop"}
            className={`${danaLight.className} w-full md:w-auto`}
            loading={isSubmitting}
          >
            تایید کد
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}
