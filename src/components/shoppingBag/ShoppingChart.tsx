"use client";
import { getSimpleCookie, setSimpleCookie } from "@/lib/cookies";
import { cashDeleter } from "@/utils/serverActions/cashDeleter";
import { ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { DrawerDialogRef, ReesponsiveDrawerChart } from "../reesponsiveDrawer/ReesponsiveDrawerChart";


export default function ShoppingChart({
  productId,
  price,
}: {
  productId: number;
  price: number;
}) {
  const drawerRef = useRef<DrawerDialogRef>(null);
  const addProductToChart = async (productId: number) => {
    const chartCookie = getSimpleCookie("chart");
    let currentChart: { pId: number; count: number; price: number }[] = [];
    let rowCookieData: { pId: number; count: number; price: number } | string =
      "";
    if (chartCookie) {
      rowCookieData = JSON.parse(chartCookie);
      try {
        currentChart = JSON.parse(chartCookie);
      } catch (err) {
        console.error("Invalid chart cookie:", err);
      }
    } else {
      rowCookieData = "";
    }

    const existingProduct = currentChart.find((item) => item.pId === productId);

    if (existingProduct) {
      console.log("product exist");
    } else {
      currentChart.push({ pId: productId, count: 1, price });
      drawerRef.current?.addChart();
    }

    setSimpleCookie("chart", JSON.stringify(currentChart), 5);
    await cashDeleter("/");
  };
  return (
    <div className="z-[10]">
      <ShoppingBag
        className="text-destructive cursor-pointer"
        onClick={() => addProductToChart(productId)}
      />
      <ReesponsiveDrawerChart ref={drawerRef} productId={productId}/>
    </div>
  );
}
