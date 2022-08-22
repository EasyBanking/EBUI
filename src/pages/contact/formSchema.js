import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  subject: Yup.string().min(3).max(50).required(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required(),
});
