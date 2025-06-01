"use client";
import BodyPrvider from "@/components/ui-providers/BodyProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddCategoryForm from "../../../../components/category/AddCategoryForm";

export default function AddCategoryPage() {

  return (
    <BodyPrvider>
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-sm md:text-lg">اضافه کردن دسته بندی</p>
        </div>
        <Link href="/adminpanel/managecategory">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
      </div>
      <div className="mt-10"><AddCategoryForm /></div>
    </BodyPrvider>
  );
}
