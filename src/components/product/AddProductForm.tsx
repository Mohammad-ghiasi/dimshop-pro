"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { productSchema } from "@/yup/productResolver";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
type Tag = {
  tag: string;
};
type Color = {
  color: string;
  codeColor: string;
  price: number;
  discount: number;
  number: number;
};

export type AddProductForm = {
  name: string;
  slack: string;
  brand: string;
  number: number;
  price: number;
  discount: number;
  categoryId: number;
  description: string;
  specs: string;
  tags: Tag[];
  colors: Color[];
  image3DPath: string;
};

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<AddProductForm>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      colors: [{ color: "", codeColor: "", price: 0, discount: 0, number: 0 }],
      tags: [{ tag: "" }],
      // imagesPath: [],
      // imagePath: "",
      // specs و image3DPath اختیاریه پس اجباری نیست مقدار بدی
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray<AddProductForm, "colors", "id">({
    control,
    name: "colors",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray<AddProductForm, "tags", "id">({
    control,
    name: "tags",
  });
  // const {
  //   fields: imageFields,
  //   append: appendImage,
  //   remove: removeImage,
  // } = useFieldArray<ProductFormValues, "imagesPath", "id">({
  //   control,
  //   name: "imagesPath",
  // });

  const [imagePathName, setImagePathName] = useState("");
  const [image3DPathName, setImage3DPathName] = useState("");
  const [imagesNames, setImagesNames] = useState<string[]>([]);

  const onSubmit = (data: AddProductForm) => {
    console.log("📦 محصول ثبت شد:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 p-6 bg-white shadow-xl rounded-xl max-w-3xl mx-auto"
    >
      {/* 🔸 فیلد عمومی (غیر از تصاویر) */}
      <div>
        <label className="block font-medium mb-1">نام کالا</label>
        <Input
          {...register("name")}
          type={"text"}
          error={Boolean(errors?.name)}
          errorMessage={errors.name?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">کلمات کلیدی</label>
        <Input
          {...register("slack")}
          type={"text"}
          error={Boolean(errors?.slack)}
          errorMessage={errors.slack?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">برند</label>
        <Input
          {...register("brand")}
          type={"text"}
          error={Boolean(errors?.brand)}
          errorMessage={errors.brand?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">موجودی کالا</label>
        <Input
          {...register("number")}
          type={"text"}
          error={Boolean(errors?.number)}
          errorMessage={errors.number?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">قیمت اصلی</label>
        <Input
          {...register("price")}
          type={"text"}
          error={Boolean(errors?.price)}
          errorMessage={errors.price?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">درصد تخفیف</label>
        <Input
          {...register("discount")}
          type={"text"}
          error={Boolean(errors?.discount)}
          errorMessage={errors.discount?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">دسته‌بندی</label>
        <Input
          {...register("categoryId")}
          type={"text"}
          error={Boolean(errors?.categoryId)}
          errorMessage={errors.categoryId?.message}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">توضیحات محصول</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-red-500 text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>
      <div>
        <label className="block font-medium mb-1">مشخصات</label>
        <textarea
          {...register("specs")}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-red-500 text-sm mt-1">{errors.specs?.message}</p>
      </div>
      {/* tags */}
      <div className="py-3">
        <h3 className="t mb-1">تگ‌ها</h3>
        {tagFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input
              {...register(`tags.${index}.tag`)}
              type={"text"}
              placeholder={`تگ ${index + 1}`}
              error={Boolean(errors?.tags)}
              errorMessage={errors.tags?.message}
            />
            <Button
              type="button"
              onClick={() => removeTag(index)}
              className="text-destructive"
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendTag({ tag: "" })}
          variant="dimsop"
          className="mt-2"
        >
          <span className="flex gap-x-1">
            <span>
              <Plus className="w-20 h-20" />
            </span>
            <span>افزودن تگ جدید</span>
          </span>
        </Button>
      </div>

      {/* colors */}

      <div className="py-3">
        <h3 className="my-1">رنگ‌ها</h3>
        {colorFields.map((field, index: number) => (
          <div
            key={field.id}
            className="p-4 rounded-md my-3 grid grid-cols-1 md:grid-cols-2 gap-3 shadow-md"
          >
            <div className=" flex flex-col">
              <label className="text-sm mb-1">نام رنگ</label>
              <Input
                {...register(`colors.${index}.color`)}
                type={"text"}
                placeholder="مثلا سفید"
                error={Boolean(errors.colors?.[index]?.color)}
                errorMessage={errors.colors?.[index]?.color?.message}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-sm mb-1">کد رنگ</label>
              <Input
                {...register(`colors.${index}.codeColor`)}
                type={"text"}
                placeholder=" مثلا FFFFFF#"
                error={Boolean(errors.colors?.[index]?.codeColor)}
                errorMessage={errors.colors?.[index]?.codeColor?.message}
              />
            </div>

            <div className=" flex flex-col">
              <label className="text-sm mb-1">قیمت این رنگ</label>
              <Input
                {...register(`colors.${index}.price`)}
                type={"text"}
                placeholder="قیمت کالا در این رنگ"
                error={Boolean(errors.colors?.[index]?.price)}
                errorMessage={errors.colors?.[index]?.price?.message}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-sm mb-1">تخفیف این رنگ</label>
              <Input
                {...register(`colors.${index}.discount`)}
                type={"text"}
                placeholder="تخفیف کالا در این رنگ"
                error={Boolean(errors.colors?.[index]?.discount)}
                errorMessage={errors.colors?.[index]?.discount?.message}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-sm mb-1">موجودی این رنگ</label>
              <Input
                {...register(`colors.${index}.number`)}
                type={"text"}
                placeholder="موجودی این از کالا"
                error={Boolean(errors.colors?.[index]?.number)}
                errorMessage={errors.colors?.[index]?.number?.message}
              />
            </div>

            <div className="flex justify-center items-center">
              <Button
                type="button"
                onClick={() => removeColor(index)}
                className="text-destructive mt-2"
                variant="ghost"
              >
                <span className="flex gap-x-2">
                  <span>
                    <Trash2 className="" />
                  </span>
                  <span>حذف رنگ</span>
                </span>
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => {
            appendColor({
              color: "",
              codeColor: "",
              price: 0,
              discount: 0,
              number: 0,
            });
          }}
          variant="dimsop"
          className="mt-2"
        >
          <span className="flex gap-x-1">
            <span>
              <Plus className="w-20 h-20" />
            </span>
            <span>افزودن رنگ جدید</span>
          </span>
        </Button>
        <p className="text-red-500 text-sm mt-1">{errors.colors?.message}</p>
      </div>

      {/* 🔸 مسیر عکس ۳بعدی */}
      <div>
        <label className="block font-medium mb-1">عکس ۳بعدی (اختیاری)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage3DPathName(file.name);
              setValue("image3DPath", file.name);
            }
          }}
          className="w-full p-2 border rounded-md"
        />
        {image3DPathName && (
          <p className="text-sm text-gray-600 mt-1">{image3DPathName}</p>
        )}
        <p className="text-red-500 text-sm mt-1">
          {errors.image3DPath?.message}
        </p>
      </div>

      {/* 🔸 دکمه نهایی */}
      <Button type="submit" className="w-full" variant="dimsop">
        ایجاد کالا
      </Button>
    </form>
  );
}

// عمومی ها

//       {/* 🔸 مسیر عکس اصلی */}
//       <div>
//         <label className="block font-medium mb-1">عکس اصلی</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) {
//               setImagePathName(file.name);
//               setValue("imagePath", file.name);
//             }
//           }}
//           className="w-full p-2 border rounded-md"
//         />
//         {imagePathName && (
//           <p className="text-sm text-gray-600 mt-1">{imagePathName}</p>
//         )}
//         <p className="text-red-500 text-sm mt-1">{errors.imagePath?.message}</p>
//       </div>

//       {/* 🔸 مسیر عکس ۳بعدی */}
//       <div>
//         <label className="block font-medium mb-1">عکس ۳بعدی (اختیاری)</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) {
//               setImage3DPathName(file.name);
//               setValue("image3DPath", file.name);
//             }
//           }}
//           className="w-full p-2 border rounded-md"
//         />
//         {image3DPathName && (
//           <p className="text-sm text-gray-600 mt-1">{image3DPathName}</p>
//         )}
//         <p className="text-red-500 text-sm mt-1">
//           {errors.image3DPath?.message}
//         </p>
//       </div>

//       {/* 🔸 توضیحات و مشخصات فنی */}
//       <div>
//         <label className="block font-medium mb-1">توضیحات محصول</label>
//         <textarea
//           {...register("description")}
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <p className="text-red-500 text-sm mt-1">
//           {errors.description?.message}
//         </p>
//       </div>
//       <div>
//         <label className="block font-medium mb-1">مشخصات فنی</label>
//         <textarea
//           {...register("specs")}
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <p className="text-red-500 text-sm mt-1">{errors.specs?.message}</p>
//       </div>

//  <div>
//       <h3 className="text-lg font-bold mb-2">رنگ‌ها</h3>
//       {colorFields.map((field, index) => (
//         <div
//           key={field.id}
//           className="border p-4 rounded-md mb-3 grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50"
//         >
//           <input
//             {...register(`colors.${index}.color`)}
//             placeholder="نام رنگ"
//             className="p-2 border rounded"
//           />
//           <input
//             {...register(`colors.${index}.codeColor`)}
//             placeholder="کد رنگ"
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             {...register(`colors.${index}.price`)}
//             placeholder="قیمت رنگ"
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             {...register(`colors.${index}.discount`)}
//             placeholder="تخفیف رنگ"
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             {...register(`colors.${index}.number`)}
//             placeholder="موجودی رنگ"
//             className="p-2 border rounded"
//           />
//           <button
//             type="button"
//             onClick={() => removeColor(index)}
//             className="text-red-500 hover:underline mt-2"
//           >
//             ❌ حذف رنگ
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() =>
//           // appendColor()
//           appendColor({
//             color: "",
//             codeColor: "",
//             price: 0,
//             discount: 0,
//             number: 0,
//           })
//         }
//         className="text-blue-500 hover:underline"
//       >
//         ➕ افزودن رنگ جدید
//       </button>
//       <p className="text-red-500 text-sm mt-1">{errors.colors?.message}</p>
//     </div>

//     {/* 🔸 تصاویر بیشتر */}
//     <div>
//       <h3 className="text-lg font-bold mb-2">تصاویر بیشتر</h3>
//       {imageFields.map((field, index) => (
//         <div key={field.id} className="flex flex-col gap-1 mb-2">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) {
//                 const updated = [...imagesNames];
//                 updated[index] = file.name;
//                 setImagesNames(updated);
//                 setValue(`imagesPath.${index}`, file.name);
//               }
//             }}
//             className="p-2 border rounded"
//           />
//           {imagesNames[index] && (
//             <p className="text-sm text-gray-600">{imagesNames[index]}</p>
//           )}
//           <button
//             type="button"
//             onClick={() => {
//               removeImage(index);
//               const updated = [...imagesNames];
//               updated.splice(index, 1);
//               setImagesNames(updated);
//             }}
//             className="text-red-500 self-start"
//           >
//             ❌ حذف
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => {
//           appendImage("");
//           setImagesNames((prev) => [...prev, ""]);
//         }}
//         className="text-blue-500 hover:underline"
//       >
//         ➕ افزودن تصویر جدید
//       </button>
//       <p className="text-red-500 text-sm mt-1">
//         {errors.imagesPath?.message}
//       </p>
//     </div>
