import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("اسم محصول الزامی‌ه"),
  slack: yup.string().required("کلمات کلیدی الزامین"),
  brand: yup.string().required("برند الزامی‌ه"),
  number: yup
    .number()
    .required("تعداد الزامی‌ه")
    .min(0, "تعداد نمی‌تونه منفی باشه")
    .typeError("موجودی باید عدد باشد"),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .min(0, "قیمت نمی‌تونه منفی باشه")
    .required("قیمت الزامی‌ه"),
  discount: yup
    .number()
    .typeError("تخفیف باید عدد باشد")
    .min(0, "تخفیف نمی‌تونه منفی باشه")
    .max(100, "تخفیف نمیتونه از صد بیشتر باشه")
    .required("تخفیف الزامی‌ه"),
  categoryId: yup
    .number()
    .typeError("دسته بندی باید عدد باشد")
    .required("دسته‌بندی الزامی‌ه"),
  description: yup.string().required("توضیحات الزامیه"),
  specs: yup.string().required("مشخصات الزامیه"),
  tags: yup
    .array()
    .of(yup.object({ tag: yup.string().required("مقدار تگ الزامیه") }))
    .min(1, "حداقل یک تگ وارد کن")
    .required("تگ الزامیه"),

  colors: yup
    .array()
    .of(
      yup.object({
        color: yup.string().required("نام رنگ الزامی‌ه"),
        codeColor: yup.string().required("کد رنگ الزامی‌ه"),
        price: yup
          .number()
          .typeError("قیمت باید عدد باشد")
          .min(0, "قیمت نمی‌تونه منفی باشه")
          .required("قیمت رنگ الزامی‌ه"),
        discount: yup
          .number()
          .typeError("تخیف باید عدد باشد")
          .min(0, "تخفیف نمی‌تونه منفی باشه")
          .max(100, "تخفیف نمیتونه از صد بیشتر باشه")
          .required("تخفیف رنگ الزامی‌ه"),
        number: yup
          .number()
          .typeError("موجودی باید عدد باشد")
          .min(0, "موجودی نمی‌تونه منفی باشه")
          .required("تعداد رنگ الزامی‌ه"),
      })
    )
    .min(1, "حداقل یک رنگ وارد کن")
    .required("رنگ الزامیه"),
  image3DPath: yup.string().default(""),

  // imagePath: yup.string().required("مسیر عکس اصلی الزامی‌ه"),

  // imagesPath: yup
  //   .array()
  //   .of(yup.string().required("مسیر عکس نباید خالی باشه"))
  //   .min(1, "حداقل یک عکس اضافه کن"),
});
