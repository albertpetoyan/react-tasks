import * as Yup from "yup";

export const validationSchema: any = Yup.object({
  query: Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .matches(/[a-zA-Z0-9\._-]+@[a-zA-Z0-9.-_]+\.[a-z]{2,6}$/, {
        message: "Invalid Email Address",
        excludeEmptyString: true,
      })
      .email("Invalid Email Address"),
    number: Yup.string(),
  }),
});
