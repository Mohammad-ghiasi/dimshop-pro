import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("وارد کردن نام محصول الزامی است."),
  slack: yup.string().required("وارد کردن کلمات کلیدی الزامی است."),
  brand: yup.string().required("وارد کردن برند الزامی است."),
  number: yup
    .number()
    .required("وارد کردن تعداد الزامی است.")
    .min(0, "تعداد نمی‌تواند کمتر از صفر باشد.")
    .typeError("لطفاً عدد معتبر برای موجودی وارد کنید."),
  price: yup
    .number()
    .typeError("لطفاً عدد معتبر برای قیمت وارد کنید.")
    .min(0, "قیمت نمی‌تواند منفی باشد.")
    .required("وارد کردن قیمت الزامی است."),
  discount: yup
    .number()
    .typeError("لطفاً عدد معتبر برای تخفیف وارد کنید.")
    .min(0, "تخفیف نمی‌تواند کمتر از صفر باشد.")
    .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد.")
    .required("وارد کردن تخفیف الزامی است."),
  categoryId: yup
    .number()
    .typeError("لطفاً یک دسته‌بندی معتبر انتخاب کنید.")
    .required("انتخاب دسته‌بندی الزامی است."),
  description: yup.string().required("توضیحات محصول الزامی است."),
  specs: yup.string().required("وارد کردن مشخصات محصول الزامی است."),
  tags: yup
    .array()
    .of(
      yup.object({
        tag: yup.string().required("مقدار تگ نمی‌تواند خالی باشد."),
      })
    )
    .min(1, "حداقل یک تگ وارد کنید.")
    .required("وارد کردن تگ‌ها الزامی است."),
  colors: yup
    .array()
    .of(
      yup.object({
        color: yup.string().required("نام رنگ الزامی است."),
        codeColor: yup.string().required("کد رنگ الزامی است."),
        price: yup
          .number()
          .typeError("لطفاً عدد معتبر برای قیمت وارد کنید.")
          .min(0, "قیمت نمی‌تواند کمتر از صفر باشد.")
          .required("وارد کردن قیمت رنگ الزامی است."),
        discount: yup
          .number()
          .typeError("لطفاً عدد معتبر برای تخفیف وارد کنید.")
          .min(0, "تخفیف نمی‌تواند کمتر از صفر باشد.")
          .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد.")
          .required("وارد کردن تخفیف رنگ الزامی است."),
        number: yup
          .number()
          .typeError("لطفاً عدد معتبر برای موجودی وارد کنید.")
          .min(0, "موجودی نمی‌تواند کمتر از صفر باشد.")
          .required("وارد کردن تعداد رنگ الزامی است."),
      })
    )
    .min(1, "حداقل یک رنگ وارد کنید.")
    .required("وارد کردن رنگ‌ها الزامی است."),
  image3DPath: yup.string().default(""),
  imagePath: yup.string().required("آپلود تصویر اصلی الزامی است."),
  imagesPath: yup
    .array()
    .of(
      yup.object({
        image: yup.string().required("مسیر تصویر نمی‌تواند خالی باشد."),
      })
    )
    .required("وارد کردن حداقل یک تصویر الزامی است.")
    .min(1, "حداقل یک تصویر اضافه کنید."),
});
