"use client";

import { getSimpleCookie } from "@/lib/cookies";
import { useEffect, useState } from "react";
import ChartItem from "../chart/ChartItem";

export default function CheckoutChart() {
  const [chartCount, setChartCount] = useState();

  useEffect(() => {
    try {
      const chartCookie = getSimpleCookie("chart");
      const parsedItems = chartCookie ? JSON.parse(chartCookie) : [];
      setChartCount(parsedItems);
    } catch (err) {
      console.error("❌ خطا در پارس کردن کوکی سبد خرید:", err);
    }
  }, []);
  console.log(chartCount);
  
  return (
    <>
      <div className="flex w-full bg-red-500 h-[150]">
        <div className="bg-orange-500 md:flex-[8] h-full">
          <p>سبد خرید</p>
          {/* {chartCount && chartCount?.map((item) => (
            
          ))} */}
        </div>
        <div className="bg-yellow-500 flex-[4] relative hidden md:block">
          <div className="sticky top-20">مجموع قیمت: 100,000 تومان</div>
        </div>
      </div>
    </>
  );
}
