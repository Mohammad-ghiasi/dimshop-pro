"use client";
import HeaderTile from "@/components/headerTitle/HeaderTitle";
import { useApiQuery } from "@/hooks/useQuery";
import { PackageOpen } from "lucide-react";
import React from "react";

export default function Page() {

  const { data, isLoading } = useApiQuery<any>({
    queryKey: ["userOrder"],
    url: "/Order/GetOrders",
  });
  return (
    <div className="mt-4 py-6 md:bg-card flex flex-col gap-y-6  md:px-4 shadow-sm ">
      <div className="">
        <HeaderTile className="after:h-[2px]">سفارش های من</HeaderTile>
      </div>
      {data?.length === 0 && (
        <div className="w-full">
          <p className="flex justify-center items-center gap-x-2 py-8">
            <span>
              <PackageOpen className="w-5 h-5 md:w-6 md:h-6" />
            </span>{" "}
            <span className="text-sm md:text-base">سفارشی دریافت نشد!</span>
          </p>
        </div>
      )}
    </div>
  );
}
