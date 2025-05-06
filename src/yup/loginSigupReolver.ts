import * as yup from "yup";


export const loginSchema = yup
  .object({
    phonenumber: yup
      .string()
      .trim() // Remove leading and trailing spaces
      .required("شماره تماس الزامی است") // Required field
      .matches(/^(\+98|0)?9\d{9}$/, "شماره تماس وارد شده معتبر نیست"), // Validates Iranian phone numbers
  })
  .required();




export const otpSchema = yup
  .object({
    code: yup
      .string()
      .min(4, "کد باید ۴ رقمی باشد")
      .max(4, "کد تایید نباید بیشتر از ۴ رقمی باشد")
      .matches(/^[0-9]{4}$/, "کد باید فقط عدد باشد")
      .required("کد تایید ضروری است"),
  })
  .required();
