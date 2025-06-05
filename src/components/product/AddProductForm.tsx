"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { productSchema } from "@/yup/productResolver";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Info, Plus, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useApiQuery } from "@/hooks/useQuery";
import { Category, Categoryes } from "@/types/categoryTypes";
import type { AddProductForm, Image } from "@/types/AddProductType";
import { useRouter } from "next/navigation";
export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AddProductForm>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      colors: [{ color: "", codeColor: "", price: 0, discount: 0, number: 0 }],
      tags: [{ tag: "" }],
      imagesPath: [{ image: "" }],
    },
  });
  const router = useRouter();

  // query to get all categories
  const { data } = useApiQuery<Categoryes>({
    queryKey: ["category"],
    url: "/ManageCategory/GetAllCategories",
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
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray<AddProductForm, "imagesPath", "id">({
    control,
    name: "imagesPath",
  });

  const [imagePathName, setImagePathName] = useState("");
  const [image3DPathName, setImage3DPathName] = useState("");
  const [imagesNames, setImagesNames] = useState<Image[]>([{ image: "" }]);

  const onSubmit = (data: AddProductForm) => {
    console.log("📦 محصول ثبت شد:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 md:px-6 py-6 my-5  md:shadow-md md:rounded-xl max-w-3xl mx-auto"
    >
      <div className="pb-5 flex items-center justify-center gap-2 relative">
        <ArrowRight
          size={17}
          className="absolute right-0 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-md md:text-lg">ایجاد کالای جدید</p>
      </div>

      {/* 🔸 فیلد عمومی (غیر از تصاویر) */}
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          نام کالا
        </label>
        <Input
          {...register("name")}
          placeholder="نام کالا"
          type={"text"}
          error={Boolean(errors?.name)}
          errorMessage={errors.name?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          کلمات کلیدی
        </label>
        <Input
          placeholder="کلمات کلیدی (کلیدواژه‌ها)"
          {...register("slack")}
          type={"text"}
          error={Boolean(errors?.slack)}
          errorMessage={errors.slack?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          برند
        </label>
        <Input
          placeholder="برند کالا"
          {...register("brand")}
          type={"text"}
          error={Boolean(errors?.brand)}
          errorMessage={errors.brand?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          موجودی کالا
        </label>
        <Input
          placeholder="تعداد موجودی کالا"
          {...register("number")}
          type={"text"}
          error={Boolean(errors?.number)}
          errorMessage={errors.number?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          قیمت اصلی
        </label>
        <Input
          placeholder="قیمت اصلی (بدون تخفیف)"
          {...register("price")}
          type={"text"}
          error={Boolean(errors?.price)}
          errorMessage={errors.price?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          درصد تخفیف
        </label>
        <Input
          placeholder="درصد تخفیف (0-100)"
          {...register("discount")}
          type={"text"}
          error={Boolean(errors?.discount)}
          errorMessage={errors.discount?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          دسته‌بندی
        </label>

        <Controller
          name="categoryId"
          control={control}
          rules={{ required: "لطفا یک دسته‌بندی انتخاب کن" }}
          render={({ field, fieldState }) => (
            <Select
              onValueChange={(val) => field.onChange(Number(val))}
              value={field.value?.toString()}
            >
              <SelectTrigger
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              >
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item: Category) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          توضیحات محصول
        </label>
        <Textarea
          placeholder="توضیحات تکمیلی محصول..."
          {...register("description")}
          error={Boolean(errors?.description)}
          errorMessage={errors.description?.message}
        />
      </div>
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          مشخصات
        </label>
        <Textarea
          placeholder="مشخصات محصول..."
          {...register("specs")}
          error={Boolean(errors?.specs)}
          errorMessage={errors.specs?.message}
        />
      </div>
      {/* tags */}
      <div className="py-3">
        <h3 className="text-muted-foreground text-sm md:text-[16px] mb-1">
          تگ‌ها
        </h3>
        {tagFields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 mb-2">
            <div className="flex flex-col w-full">
              <Input
                {...register(`tags.${index}.tag`)}
                type={"text"}
                placeholder={`تگ ${index + 1}`}
                error={Boolean(errors.tags?.[index]?.tag)}
                errorMessage={errors.tags?.[index]?.tag?.message}
              />
            </div>
            <Button
              type="button"
              disabled={tagFields.length <= 1}
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
        <h3 className="text-muted-foreground text-sm md:text-[16px] my-1">
          رنگ‌ها
        </h3>
        {colorFields.map((field, index: number) => (
          <div
            key={field.id}
            className="md:p-4 rounded-md my-3 grid grid-cols-1 md:grid-cols-2 gap-3 md:shadow-md"
          >
            <div className=" flex flex-col">
              <label className="text-sm mb-1 text-muted-foreground">
                نام رنگ
              </label>
              <Input
                {...register(`colors.${index}.color`)}
                type={"text"}
                placeholder="مثلا سفید"
                error={Boolean(errors.colors?.[index]?.color)}
                errorMessage={errors.colors?.[index]?.color?.message}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-sm mb-1 text-muted-foreground">
                کد رنگ
              </label>
              <Input
                {...register(`colors.${index}.codeColor`)}
                type={"text"}
                placeholder=" مثلا FFFFFF#"
                error={Boolean(errors.colors?.[index]?.codeColor)}
                errorMessage={errors.colors?.[index]?.codeColor?.message}
              />
            </div>

            <div className=" flex flex-col">
              <label className="text-sm mb-1 text-muted-foreground">
                قیمت این رنگ
              </label>
              <Input
                {...register(`colors.${index}.price`)}
                type={"text"}
                placeholder="قیمت کالا در این رنگ"
                error={Boolean(errors.colors?.[index]?.price)}
                errorMessage={errors.colors?.[index]?.price?.message}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-sm mb-1 text-muted-foreground">
                تخفیف این رنگ
              </label>
              <Input
                {...register(`colors.${index}.discount`)}
                type={"text"}
                placeholder="تخفیف کالا در این رنگ"
                error={Boolean(errors.colors?.[index]?.discount)}
                errorMessage={errors.colors?.[index]?.discount?.message}
              />
            </div>
            <div className=" flex flex-col">
              <label className="text-sm mb-1 text-muted-foreground">
                موجودی این رنگ
              </label>
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
                disabled={colorFields.length <= 1}
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
      </div>

      {/* 🔸 مسیر عکس ۳بعدی */}
      <div>
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          تصویر ۳بعدی (اختیاری)
        </label>
        <div className="w-full">
          <label
            htmlFor={`image3d`}
            className="flex items-center justify-between w-full cursor-pointer rounded-md shadow-sm px-4 py-2 text-sm "
          >
            <span className="flex gap-x-2 items-center">
              <Plus className="w-3 h-3 md:w-4 md:h-4  text-customgreen" />
              <span className="text-xs md:text-sm mt-1 text-muted-foreground">
                {" "}
                {image3DPathName || " انتخاب فایل سه بعدی"}
              </span>
            </span>
          </label>

          <input
            id={`image3d`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage3DPathName(file.name);
                setValue("image3DPath", file.name);
              }
            }}
          />

          {errors?.image3DPath && (
            <p className="text-destructive text-[11px] mt-1">
              {errors.image3DPath.message}
            </p>
          )}
        </div>
      </div>
      {/* 🔸 مسیر عکس اصلی */}
      <div className="py-6">
        <label className="block text-muted-foreground text-sm md:text-[16px] mb-1">
          تصویر اصلی
        </label>

        <div className="w-full">
          <label
            htmlFor={`mainImage`}
            className={`flex items-center justify-between w-full cursor-pointer rounded-md shadow-sm px-4 py-2 text-sm ${errors.imagePath ? "border border-destructive" : ""}`}
          >
            <span className="flex gap-x-2 items-center">
              <Plus className="w-3 h-3 md:w-4 md:h-4  text-customgreen" />
              <span className="text-xs md:text-sm text-muted-foreground">
                {" "}
                {imagePathName || " انتخاب تصویر اصلی"}
              </span>
            </span>
          </label>

          <input
            id={`mainImage`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImagePathName(file.name);
                setValue("imagePath", file.name);
                setValue("imagePath", file.name, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
          />

          {errors?.imagePath?.message && (
            <p className="text-destructive text-[11px] mt-1 ps-2">
              {errors?.imagePath?.message}
            </p>
          )}
        </div>
      </div>

      {/* 🔸 تصاویر بیشتر */}
      <div>
        <h3 className="text-muted-foreground text-sm md:text-[16px] mb-1">
          تصاویر بیشتر
        </h3>
        {imageFields.map((field, index) => (
          <Controller
            key={field.id}
            name={`imagesPath.${index}.image`}
            control={control}
            render={({ field: controllerField }) => (
              <div className="flex items-star gap-1 my-5">
                <div className="w-full">
                  <label
                    htmlFor={`image-upload-${index}`}
                    className={`flex items-center justify-between w-full cursor-pointer rounded-md shadow-sm px-4 py-2 text-sm ${errors.imagesPath?.[index]?.image ? "border border-destructive" : ""}`}
                  >
                    <span className="flex gap-x-2 items-center">
                      <Plus className="w-3 h-3 md:w-4 md:h-4  text-customgreen" />

                      <span className="text-xs md:text-sm text-muted-foreground">
                        {" "}
                        {imagesNames[index]?.image || " انتخاب تصویر"}
                      </span>
                    </span>
                  </label>

                  <input
                    id={`image-upload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        controllerField.onChange(file.name);

                        const updated = [...imagesNames];
                        updated[index] = { image: file.name };
                        setImagesNames(updated);
                      }
                    }}
                  />

                  <p className="text-destructive text-[11px] mt-1 ps-2">
                    {errors.imagesPath?.[index]?.image?.message}
                  </p>
                </div>

                <div>
                  <Button
                    type="button"
                    disabled={imagesNames.length === 1}
                    onClick={() => {
                      removeImage(index);
                      const updated = [...imagesNames];
                      updated.splice(index, 1);
                      setImagesNames(updated);
                    }}
                    className="text-destructive "
                    variant="ghost"
                  >
                    <span className="flex gap-x-2">
                      <span>
                        <Trash2 className="" />
                      </span>
                    </span>
                  </Button>
                </div>
              </div>
            )}
          />
        ))}

        <Button
          type="button"
          onClick={() => {
            appendImage({ image: "" });
            setImagesNames((prev) => [...prev, { image: "" }]);
          }}
          variant="dimsop"
          className="mt-2"
        >
          <span className="flex gap-x-1">
            <span>
              <Plus className="w-20 h-20" />
            </span>
            <span>افزودن تصویر جدید</span>
          </span>
        </Button>

        <p className="text-destructive text-xs mt-1">
          {errors.imagesPath?.message}
        </p>
      </div>
      {/* info */}
      <div className="py-5 md:py-10">
        <div className="flex flex-col gap-y-1 md:gap-y-2 border-r-[3px] border-r-warning px-2 md:px-3 py-2 bg-softorange shadow-sm">
          <p className="flex gap-x-2 text-[10px] md:text-xs text-subtle-foreground">
            <span>
              <Info className="text-warning w-3 h-3 md:w-4 md:h-4" />
            </span>
            <span>
              توجه: تصاویر بعد از انتخواب شدن, در فضای ابری ذخیره میشوند. پس در
              صورت عدم ایجاد کالا با کلیک روی &quot;x&quot; آن ها را حذف کنید
            </span>
          </p>
          <p className="flex gap-x-2 text-[10px] md:text-xs text-subtle-foreground">
            <span>
              <Info className="text-warning w-3 h-3 md:w-4 md:h-4" />
            </span>
            <span>
              کلمات کلیدی برای جستجو اهمیت زیادی دارند. پس با دقت کلمات را وارد
              کنید و با &quot; , &quot;(کاما) کلمات را جدا کنید
            </span>
          </p>
          <p className="flex gap-x-2 text-[10px] md:text-xs text-subtle-foreground">
            <span>
              <Info className="text-warning w-3 h-3 md:w-4 md:h-4" />
            </span>
            <span>تگ ها برای سئو اهمیت دارند, پس با دقت وارد کنید</span>
          </p>
          <p className="flex gap-x-2 text-[10px] md:text-xs text-subtle-foreground">
            <span>
              <Info className="text-warning w-3 h-3 md:w-4 md:h-4" />
            </span>
            <span>تصاویر سه بعدی را با فرمت .glb وارد کنید</span>
          </p>
          <p className="flex gap-x-2 text-[10px] md:text-xs text-subtle-foreground">
            <span>
              <Info className="text-warning w-3 h-3 md:w-4 md:h-4" />
            </span>
            <span>
              فقط تصاویر با فرمت های JPG, PNG, JPG, jpeg, webp مجاز هستند
            </span>
          </p>
        </div>
      </div>

      {/* 🔸 دکمه نهایی */}
      <Button type="submit" className="w-full" variant="dimsop" size="lg">
        ایجاد کالا
      </Button>
    </form>
  );
}
