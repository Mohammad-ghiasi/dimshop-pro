import * as yup from "yup";

export const createCategory = yup.object({
  name: yup.string().required("نام دسته‌بندی الزامی است"),
  imagePath: yup
    .string()
    .required("انتخاب تصویر الزامی است")
    .min(8, "حداقل 8 کارکتر")
    .max(300, "حداکثر 300 کارکتر"),
});
