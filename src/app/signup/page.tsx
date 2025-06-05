"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import ThemeImage from "@/components/Theme-Image";
import { danaExtraBold } from "../styles/fonts";
import { useRouter } from "next/navigation";
import { setCookie, setSimpleCookie } from "@/lib/cookies";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { phoneNumberType } from "@/types/loginSignup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/yup/loginSigupReolver";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<phoneNumberType>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: phoneNumberType) => {
    try {
      const res = await api.post("/Account/PhoneNumber", {
        phoneNumber: data.phonenumber,
      });
      console.log(res);
      

      setCookie("phoneNumber", data.phonenumber, 1);
      // //********
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
        className="bg-background rounded-2xl md:shadow-xl dark:md:shadow-gray-900 w-full max-w-lg space-y-4 py-4 px-5 md:px-4"
      >
        <div className="flex justify-center mb-10">
          <ThemeImage w={200} h={20} />
        </div>
        <div>
         <div className="">
           <p className={`${danaExtraBold.className} text-sm md:text-xl mb-5`}>
            ورود | ثبت نام
          </p>
          <p className="text-muted-foreground text-[12px] md:text-sm">سلام!</p>
          <p className="text-muted-foreground text-[12px] md:text-sm pb-5">
            لطفا شماره موبایل خود را وارد کنید
          </p>
         </div>
          <div className="relative">
            <Smartphone className="absolute right-3 top-[7px] text-subtle-foreground w-5 h-5" />
            <Input
              id="phone"
              className="pr-10 ring-1 text-muted-foreground py-3 pt-3 md:pt-4 lg:pt-4"
              {...register("phonenumber")}
              error={Boolean(errors.phonenumber)}
              errorMessage={errors.phonenumber?.message}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant={"dimsop"}
          loading={isSubmitting}
          className="w-full py-5 "
          aria-label="signup-button"
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
