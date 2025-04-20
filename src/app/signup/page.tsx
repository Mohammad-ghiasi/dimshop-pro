"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import ThemeImage from "@/components/Theme-Image";
import { danaExtraBold, danaLight } from "../styles/fonts";
import { useRouter } from "next/navigation";
import { setCookie, setSimpleCookie } from "@/lib/cookies";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";



export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ phone: string }>();
  const router = useRouter();

  const onSubmit = async (data: { phone: string }) => {
    try {
      const res = await api.post("/Account/PhoneNumber", {
        phoneNumber: data.phone,
      });
      console.log(res);

      setCookie("phoneNumber", data.phone, 1);
      setSimpleCookie("hashCode", res.data.hashCode, 1);
      //********
      setSimpleCookie("code", res.data.code, 1);
      // ********
      router.push("/login");
    } catch (error) {
      toast({
        description: "خطایی پیش آمده, لطفا دوباره امتحان کنید",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background rounded-2xl md:shadow-xl dark:md:shadow-gray-900 w-full max-w-lg space-y-4 py-4 px-3 md:px-4"
      >
        <div className="flex justify-center mb-10">
          <ThemeImage w={200} h={20} />
        </div>
        <div className="space-y-2">
          <p className={`${danaExtraBold.className} text-sm md:text-xl mb-5`}>
            ورود | ثبت نام
          </p>
          <p className="text-muted-foreground text-[12px] md:text-sm">سلام!</p>
          <p className="text-muted-foreground text-[12px] md:text-sm pb-5">
            لطفا شماره موبایل خود را وارد کنید
          </p>
          <div className="relative">
            <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              id="phone"
              className={`pr-10 py-5 ring-1 text-muted-foreground ${
                errors.phone ? "ring-destructive" : ""
              }`}
              {...register("phone", {
                required: "شماره تلفن الزامی است",
                pattern: {
                  value: /^(\+98|0)?9\d{9}$/,
                  message: "شماره تلفن معتبر نیست",
                },
              })}
            />
          </div>
          {errors.phone && (
            <p
              className={`${danaLight.className} text-destructive text-[10px] md:text-[12px]`}
            >
              {errors.phone.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant={"dimsop"}
          loading={isSubmitting}
          className="w-full py-5 "
        >
          ورود
        </Button>
        <p className=" text-muted-foreground text-[9px] md:text-[11px]">
          <span className="flex">
            ورود شما به معنای پذیرش و قوانین و حریم خصوصی{" "}
            <span className="mx-1 md:mt-[1px]">
              {<ThemeImage w={42} h={10} />}
            </span>{" "}
            است
          </span>
        </p>
      </form>
    </div>
  );
}
