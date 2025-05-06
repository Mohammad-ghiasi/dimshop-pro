import * as yup from "yup";

export const userInfoSchema = yup
  .object({
    id: yup.string().required("حق دستکاری این فیلد را ندارید"),
    firstName: yup.string().required("نام و نام خانوادگی الزامی است"),
    email: yup
      .string()
      .email("ایمیل وارد شده معتبر نیست")
      .required("ایمیل الزامی است"),
    phoneNumber: yup
      .string()
      .matches(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده معتبر نیست")
      .required("شماره تماس الزامی است"),
  })
  .required();

export const addressInfoSchema = yup
  .object({
    address: yup
      .string()
      .required("آدرس الزامی است")
      .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد")
      .max(300, "آدرس نباید بیشتر از ۳۰۰ کاراکتر باشد"),

      postCode: yup
      .string()
      .required("کد پستی الزامی است")
      .matches(/^\d{10}$/, "کد پستی باید دقیقا ۱۰ رقم عددی باشد"),
  })
  .required();
