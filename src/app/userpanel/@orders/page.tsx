import HeaderTile from "@/components/headerTitle/HeaderTitle";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mt-4 py-6 flex flex-col gap-y-6 px-10 shadow-md">
      <div className="">
        <HeaderTile className="after:h-[2px]">سفارش های من</HeaderTile>
      </div>
      <div className="">
        <Link
          className="p-2 bg-gray-300 rounded-md underline cursor-pointer transition-all hover:bg-customgreen"
          href="/userpanel"
        >
          to userpanel
        </Link>
      </div>
    </div>
  );
}
