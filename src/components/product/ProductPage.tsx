"use client";

import { useApiMutation } from "@/hooks/useMutation";
import { useApiQuery } from "@/hooks/useQuery";
import Toman from "@/svg/Toman";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ProductPage() {
  const { data } = useApiQuery<any>({
    queryKey: ["products"],
    url: "/ManageProduct/GetAllProducts",
  });
  const mutation = useApiMutation({
    method: "delete",
    url: "/ManageProduct/DeleteProduct",
    invalidateQueryKey: "products",
  });

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-sm md:text-lg">مدیریت کالا ها</p>
        </div>
        <Link href="/adminpanel/manageproduct/addproduct">
          <Button variant="dimsop" size="sm">
            <span className="flex gap-x-1 ">
              <span>
                <Plus />
              </span>
              <span className="hidden lg:block text-xs md:text-sm">ایجاد کالا</span>
            </span>
          </Button>
        </Link>
      </div>

      <div className=" mt-20">
        {data?.length === 0 && <p>موردی یافت نشد</p>}
        <div className="w-full overflow-x-auto mt-4">
          <table className="min-w-[650px] md:w-full shadow-md o  ">
            <thead className="bg-muted border-b">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  تصویر
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  نام کالا
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  قیمت
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  تخفیف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  موجودی
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  ویرایش
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  حذف
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {data?.map((item: any, index: number) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3 text-sm text-gray-700 text-muted-foreground">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={item.imagePath}
                      alt={item.name}
                      className="w-16 h-1w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-muted-foreground">
                    {item.name}
                  </td>
                  <td className=" px-4 py-3">
                    <div className="flex gap-x-1 text-muted-foreground">
                      <span> {item.price.toLocaleString()}</span>{" "}
                      <span>
                        {" "}
                        <Toman width={16} height={16} />
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-destructive">
                    {item.discount === 0 ? (
                      <span className="text-subtle-foreground">ندارد</span>
                    ) : (
                      <span className="bg-red-50 text-red-600 px-2 pt-[3px] pb-[1px] rounded-full inline-block">
                        {item.discount}٪
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {item.number === 0 ? (
                      <p className="text-destructive">ناموجود</p>
                    ) : (
                      <p>
                        {item.number}{" "}
                        <span className="text-subtle-foreground text-xs">
                          عدد
                        </span>
                      </p>
                    )}
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
    </div>
  );
}
