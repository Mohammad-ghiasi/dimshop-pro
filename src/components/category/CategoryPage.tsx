"use client";

import { useApiQuery } from "@/hooks/useQuery";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Category, Categoryes } from "@/types/categoryTypes";
import CategoryItem from "./CategoryItem";

export default function CategoryPageComponnet() {
  const { data } = useApiQuery<Categoryes>({
    queryKey: ["category"],
    url: "/ManageCategory/GetAllCategories",
  });
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-sm md:text-lg">مدیریت دسته بندی ها</p>
        </div>
        <Link href="/adminpanel/managecategory/add-category">
          <Button variant="dimsop">
            <span className="flex gap-x-1 ">
              <span>
                <Plus />
              </span>
              <span className="hidden lg:block text-xs">
                اضافه کردن دسته بندی
              </span>
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-10">
        {data?.length === 0 && <p>موردی یافت نشد</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.map((item: Category) => (
           <CategoryItem key={item.id} categoryItem={item} />
          ))}
        </div>
      </div>
    </>
  );
}
