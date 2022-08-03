import * as Yup from "yup";
export const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Name is Too Short")
    .max(10, "Name is Too Long")
    .required("Name is require"),
  lastName: Yup.string()
    .min(3, "Name is Too Short")
    .max(10, "Name is Too Long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  text: Yup.string().required("This field is required"),
});
