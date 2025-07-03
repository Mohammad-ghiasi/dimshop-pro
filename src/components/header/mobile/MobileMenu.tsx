"use client";
import { Headphones, House, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // اگر از clsx یا class-variance-authority استفاده می‌کنید
import MainChart from "@/components/chart/MainChart";
import { getSimpleCookie } from "@/lib/cookies";
import { persianNumbers } from "@/lib/parsianNumber";
import { useEffect, useState } from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const [chartItemsCount, setChartItemsCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const chartCookie = getSimpleCookie("chart");
      const chartItems = chartCookie ? JSON.parse(chartCookie) : [];
      setChartItemsCount(chartItems.length);
    } catch (err) {
      console.error("❌ خطا در پارس کردن کوکی سبد خرید:", err);
      setChartItemsCount(0);
    }
  }, []);

  return (
    <div className="w-full bg-background flex items-center justify-center border-t md:hidden ">
      <div className="flex flex-row justify-between items-center w-full px-3">
        <Link
          href="/"
          className={cn(
            "p-2 transition-all",
            pathname === "/"
              ? "text-customgreen scale-110 font-bold" // استایل فعال
              : "text-muted-foreground" // استایل معمولی
          )}
        >
          <House />
          <span className="sr-only">home</span>
        </Link>
        <Link
          href="/userpanel"
          className={cn(
            "p-2 transition-all",
            pathname === "/userpanel"
              ? "text-customgreen scale-110 font-bold" // استایل فعال
              : "text-muted-foreground" // استایل معمولی
          )}
        >
          <UserRound />
          <span className="sr-only">userpanel</span>
        </Link>
        <div className="relative">
          <Link
            href="/chart"
            className={cn(
              " transition-all ",
              pathname === "/chart"
                ? "text-customgreen scale-110 font-bold" // استایل فعال
                : "text-muted-foreground" // استایل معمولی
            )}
          >
            <ShoppingCart />
          </Link>
          {chartItemsCount && (
            <span className="absolute -top-1 -right-1 bg-red-500 w-[15px] h-[15px] md:w-[17px] md:h-[17px] text-white text-[10px] md:text-xs rounded-sm md:rounded-md flex items-center justify-center pt-[1px] md:pt-1">
              {persianNumbers(String(chartItemsCount))}
            </span>
          )}
        </div>
        <Link
          href="/ticket"
          className={cn(
            "p-2 transition-all",
            pathname === "/ticket"
              ? "text-customgreen scale-110 font-bold" // استایل فعال
              : "text-muted-foreground" // استایل معمولی
          )}
        >
          <Headphones />
          <span className="sr-only">ticket</span>
        </Link>
      </div>
    </div>
  );
}
