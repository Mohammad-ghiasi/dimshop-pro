"use client";
import ThemeImage from "@/components/Theme-Image";
import ThemeToggleButton from "@/components/Toggle-mode";
import { UserProfile } from "@/types/useProfile";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { danaBold } from "../styles/fonts";
import SheetNav from "@/components/navigation/SheetNav";
import { useApiQuery } from "@/hooks/useQuery";
import { getSimpleCookie } from "@/lib/cookies";
import { persianNumbers } from "@/lib/parsianNumber";

export default function Page() {
  const { data } = useApiQuery<UserProfile>({
    queryKey: ["userProfile"],
    url: "/Account/GetProfile",
  });
  const [chartCount, setChartCount] = useState<number>(0);

  useEffect(() => {
    try {
      const chartCookie = getSimpleCookie("chart");
      const parsedItems = chartCookie ? JSON.parse(chartCookie) : [];
      setChartCount(parsedItems.length);
    } catch (err) {
      console.error("❌ خطا در پارس کردن کوکی سبد خرید:", err);
    }
  }, []);

  const hasItems = chartCount > 0;

  return (
    <div className="relative bg-card px-6 py-5 shadow-sm">
      {/* shadow div */}
      <div className="w-[98%] rounded-lg absolute left-2 right-2 mx-auto z-[-10]"></div>
      {/* لوگو */}
      <div className="flex items-center justify-between">
        <div className="block lg:hidden">
          <SheetNav data={data} />
        </div>
        <div className=" [&_path]:fill-foreground cursor-pointer flex-shrink-0">
          <Link href="/" className=" flex items-center  mt-[-3px]">
            <ThemeImage w={115} h={50} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <p className="text-sm text-muted-foreground flex items-center gap-x-1">
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
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0 relative">
         
               <ShoppingCart />
        {hasItems && (
          <span className="absolute -top-1 -right-1 bg-red-500 w-[15px] h-[15px] md:w-[17px] md:h-[17px] text-white text-[10px] md:text-xs rounded-sm md:rounded-md flex items-center justify-center pt-[1px] md:pt-1">
            {persianNumbers(String(chartCount))}
          </span>
        )}
      

            <div className="hidden lg:block">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
