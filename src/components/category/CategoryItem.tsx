import React from "react";
import { EditCategoryDialog } from "./EditeDialog";
import Image from "next/image";
import { useApiMutation } from "@/hooks/useMutation";
import { Trash2 } from "lucide-react";
import { Category } from "@/types/categoryTypes";
import { deleteImage } from "@/supabase/deleteFile";

export default function CategoryItem({
  categoryItem,
}: {
  categoryItem: Category;
}) {
  const mutation = useApiMutation({
    method: "delete",
    url: "/ManageCategory/DeleteCategory",
    invalidateQueryKey: "category",
    onSuccessMessage: "دسته بندی حذف شد",
    onErrorMessage: "خطا در حذف دسته بندی",
  });
  const handleDelleteCategory = async () => {
    console.log(categoryItem.imagePath);

    await deleteImage("category", categoryItem.imagePath);
    mutation.mutate({ id: categoryItem.id });
  };
  return (
    <div className="flex flex-col gap-y-2 my-5 relative cursor-pointer group">
      <div className="inset-0 transition duration-300 group-hover:blur-sm">
        <div className="relative bg-slate-500 w-[80%] lg:w-[59%] h-[237px] mx-auto">
          <Image
            alt="c-image"
            src={categoryItem.imagePath}
            fill
            loading="lazy"
            objectFit="cover"
          />{" "}
        </div>
        <p className=" text-center">{categoryItem.name}</p>{" "}
      </div>
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 flex gap-x-4 bg-background  px-4 py-2 rounded-xl shadow">
        <Trash2
          className="text-destructive cursor-pointer hover:scale-[104%]"
          onClick={() => handleDelleteCategory()}
        />

        <EditCategoryDialog item={categoryItem} key={categoryItem.id} />
      </div>
    </div>
  );
}
