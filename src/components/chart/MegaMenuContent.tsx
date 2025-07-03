import api from "@/lib/api";
import { cookies } from "next/headers";
import ChartItem from "./ChartItem";
import { Button } from "../ui/button";
import { persianNumbers } from "@/lib/parsianNumber";
import Toman from "@/svg/Toman";
import Link from "next/link";

async function getProductById(pId: number) {
  const res = await api.get(`/Product/GetProduct?id=${pId}`);
  return res.data;
}

export default async function MegaMenuContent() {
  
  const chartCookie = cookies().get("chart")?.value;
  let parsed: { pId: number; count: number }[] = [];

  try {
    parsed = chartCookie ? JSON.parse(chartCookie) : [];
  } catch (err) {
    console.error("خطا در پارس کردن سبد خرید:", err);
  }

  const productRequests = parsed.map((item) => getProductById(item.pId));
  const products = await Promise.all(productRequests);

  // حالا محصولات رو با تعداد merge می‌کنیم
  const merged = products.map((product, i) => ({
    ...product,
    count: parsed[i]?.count ?? 1,
    pid: parsed[i]?.pId ?? product.id,
  }));
  // total price
  const totalPrice = merged.reduce((acc, item) => {
    const discountedPrice =
      item.product.price * (1 - item.product.discount / 100);
    return acc + discountedPrice * item.count;
  }, 0);

  return (
    <div className="hidden transition-duration-300 group-hover:block absolute top-6 right-[-310px] bg-background w-[360px] p-2 shadow-md rounded-lg">
      {merged.length > 0 && (
        <ul className="mt-2 space-y-2">
          {merged.map((item) => (
            <ChartItem data={item} key={item.id} />
          ))}
        </ul>
      )}
      <div className="flex justify-between items-center mt-5 px-2 text-sm font-medium text-muted-foreground">
        <span>مجموع:</span>
        <span className="text-muted-foreground flex items- gap-1">
          {persianNumbers(totalPrice.toLocaleString())}
          <Toman className="text-customgreen" width={14} height={14} />
        </span>
      </div>
      <Link href="/chart">
        <Button variant="dimsop" className="mt-4 w-full">
          مشاهده سبد خرید
        </Button>
      </Link>
    </div>
  );
}
