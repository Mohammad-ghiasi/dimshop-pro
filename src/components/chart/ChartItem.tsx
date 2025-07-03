"use client";

import { getSimpleCookie, setSimpleCookie } from "@/lib/cookies";
import { persianNumbers } from "@/lib/parsianNumber";
import Toman from "@/svg/Toman";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function updateChartCookie(updatedItem: {
  pId: number;
  count: number;
  price: number;
}) {
  const chartCookie = getSimpleCookie("chart");
  let chart = chartCookie ? JSON.parse(chartCookie) : [];

  const existing = chart.find((item: any) => item.pId === updatedItem.pId);

  if (existing) {
    existing.count = updatedItem.count;
    if (existing.count <= 0) {
      chart = chart.filter((item: any) => item.pId !== updatedItem.pId);
    }
  }

  setSimpleCookie("chart", JSON.stringify(chart), 5); // 5 روز اعتبار
}
function deleteFromChart(pId: number) {
  const chartCookie = getSimpleCookie("chart");
  let chart = chartCookie ? JSON.parse(chartCookie) : [];

  chart = chart.filter((item: any) => item.pId !== pId);

  setSimpleCookie("chart", JSON.stringify(chart), 5);
}

export default function ChartItem({ data }: { data: any }) {
  const [count, setCount] = useState<number>(data.count);
  const router = useRouter();

  const handleUpdate = (newCount: number) => {
    const chartCookie = getSimpleCookie("chart");
    let chart = chartCookie ? JSON.parse(chartCookie) : [];

    const updated = chart.map((item: any) =>
      item.pId === data.product.id ? { ...item, count: newCount } : item
    );

    setSimpleCookie("chart", JSON.stringify(updated), 5);
    setCount(newCount);
    router.refresh();
  };

  const deleteItem = () => {
    const chartCookie = getSimpleCookie("chart");
    let chart = chartCookie ? JSON.parse(chartCookie) : [];

    const updated = chart.filter((item: any) => item.pId !== data.product.id);

    setSimpleCookie("chart", JSON.stringify(updated), 5);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
      {/* تصویر محصول */}
      <div className="w-[85px] h-16 relative rounded-md overflow-hidden shadow">
        <Image
          src={data.product.imagePath}
          alt={data.product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* اطلاعات محصول */}
      <div className="flex justify-between w-full text-sm space-y-1">
        <div className="">
          <p className="text-[14px] text-muted-foreground">
            {data.product.name}
          </p>

          <p className="flex gap-x-1 text-xs text-muted-foreground">
            {persianNumbers(
              Math.round(
                data.product.price * (1 - data.product.discount / 100)
              ).toLocaleString()
            )}
            <Toman className="text-customgreen ml-1" width={14} height={14} />
          </p>
        </div>

        {/* کنترل تعداد */}
        <div className="flex items-center gap-2 mt-1">
          {count > 1 ? (
            <button
              onClick={() => handleUpdate(count - 1)}
              className="w-6 h-6 flex items-center justify-center bg-input rounded-md  transition"
            >
              <Minus className="text-muted-foreground" size={14} />
            </button>
          ) : (
            <button
              onClick={deleteItem}
              className="w-6 h-6 flex items-center justify-center bg-input text-destructive rounded-md transition"
            >
              <Trash2 size={14} />
            </button>
          )}

          <span className="min-w-[24px] text-center text-sm font-semibold text-muted-foreground">
            {persianNumbers(count)}
          </span>

          <button
            onClick={() => handleUpdate(count + 1)}
            className="w-6 h-6 flex items-center justify-center bg-input rounded-md  transition"
          >
            <Plus className="text-muted-foreground" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
