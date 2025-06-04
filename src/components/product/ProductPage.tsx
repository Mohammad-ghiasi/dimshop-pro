"use client";

import { useApiQuery } from "@/hooks/useQuery";
import Link from "next/link";

export default function ProductPage() {
  const { data } = useApiQuery<any>({
    queryKey: ["products"],
    url: "/ManageProduct/GetAllProducts",
  });
  console.log(data);
  

  return (
    <div>
      <div className="">مدیریت محصولات</div>
      <Link href="/adminpanel/manageproduct/addproduct">اضافه کردن کالا</Link>
      <div className="">
        {data?.length === 0 && <p>موردی یافت نشد</p>}
        {data?.map((item: any) => (
          <div className="" key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
