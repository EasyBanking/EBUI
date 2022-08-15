import * as Yup from "yup";
export const transferSchema = Yup.object().shape({
  
  amount: Yup.number().min(10,"Minmum amount is 10").required("Amount is required"),
  cardNum: Yup.string().min(16,"Minmum number is 16").max(16,"Maximum number is 16").required("This field is required"),
});
