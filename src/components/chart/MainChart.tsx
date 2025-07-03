import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import MegaMenuContent from "./MegaMenuContent";
import { cookies } from "next/headers";
import { persianNumbers } from "@/lib/parsianNumber";

export default function MainChart() {
  const chartCookie = cookies().get("chart")?.value;

  let chartItems: any[] = [];

  try {
    chartItems = chartCookie ? JSON.parse(chartCookie) : [];
  } catch (err) {
    console.error("❌ خطا در پارس کردن کوکی سبد خرید:", err);
  }

  const hasItems = chartItems.length > 0;

  return (
    <div className="relative group cursor-pointer ">
      <span className="relative">
        <Link href="/chart">
          <ShoppingCart />
          {hasItems && (
            <span className="absolute -top-1 -right-1 bg-red-500 w-[15px] h-[15px] md:w-[17px] md:h-[17px] text-white text-[10px] md:text-xs rounded-sm md:rounded-md flex items-center justify-center pt-[1px] md:pt-1">
              {persianNumbers(String(chartItems.length))}
            </span>
          )}
          {/* <ClientCartBadge /> */}
        </Link>
      </span>
      {hasItems && (
        <div className="hidden lg:block">
          <MegaMenuContent />
        </div>
       )}
    </div>
  );
}
