"use client";

import { useApiMutation } from "@/hooks/useMutation";
import { useApiQuery } from "@/hooks/useQuery";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  const { data } = useApiQuery<any>({
    queryKey: ["products"],
    url: "/ManageProduct/GetAllProducts",
  });
  console.log(data);
  const mutation = useApiMutation({
    method: "delete",
    url: "/ManageProduct/DeleteProduct",
    invalidateQueryKey: "products",
  });

  return (
    <div>
      <div className="">مدیریت محصولات</div>
      <Link href="/adminpanel/manageproduct/addproduct">اضافه کردن کالا</Link>
      <div className="">
        {data?.length === 0 && <p>موردی یافت نشد</p>}
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تصویر
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                نام کالا
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                قیمت
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                تخفیف
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                ویرایش
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                حذف
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((item: any, index: number) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-3 text-sm text-gray-700 font-bold">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    className="w-16 h-1w-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {item.price.toLocaleString()} <span>تومان</span>
                </td>
                <td className="px-4 py-3 text-sm text-destructive">
                  {item.discount}%
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/adminpanel/manageproduct/editproduct/${item.id}`}
                    className="text-customgreen text-sm"
                  >
                    ویرایش کالا
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Trash2
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => mutation.mutate({ id: item.id })}
                    size={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
