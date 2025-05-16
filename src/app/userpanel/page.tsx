"use client";
import { useAuth } from "@/components/AuthProvider";
import ThemeImage from "@/components/Theme-Image";
import ThemeToggleButton from "@/components/Toggle-mode";
import api from "@/lib/api";
import { UserProfile } from "@/types/useProfile";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { danaBold } from "../styles/fonts";
import SheetNav from "@/components/navigation/SheetNav";


export default function Page() {
  const { token } = useAuth();
  const { data } = useQuery<UserProfile, Error>({
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
  return (
    <div className="relative bg-card px-6 py-5 shadow-sm">
      {/* shadow div */}
      <div className="w-[98%] rounded-lg absolute left-2 right-2 mx-auto z-[-10]"></div>
      {/* لوگو */}
      <div className="flex items-center justify-between">
        <div className="block lg:hidden">
         <SheetNav data={data}/>
        </div>
        <div className=" [&_path]:fill-foreground cursor-pointer flex-shrink-0">
          <Link href="/" className=" flex items-center  mt-[-3px]">
            <ThemeImage w={115} h={50} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <p className="text-sm text-muted-foreground flex items-center gap-x-1">
            {/* {data?.user.firstName} عزیز به پنل کاربری خودت در دیمشاپ خوش اومدی */}
            <span>
              {" "}
              {data?.user.firstName} عزیز به پنل کاربری خودت در{" "}
              <span className={`text-customgreen ${danaBold.className}`}>
                دیمشاپ
              </span>{" "}
              خوش اومدی
            </span>
          </p>
        </div>

        {/* منوی ابزار */}
        <div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
            <ShoppingCart size={20} />

            <div className="hidden lg:block">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
