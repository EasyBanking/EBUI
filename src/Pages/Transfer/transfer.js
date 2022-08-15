import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { transferSchema } from "./transferSchema";
import { useState } from "react";
import axios from "axios";

export default function Transfer() {
  const [user, setUser] = useState({
    cardNum: "1234758965742863",
    balance: "10,500",
  });
  const num = "*" + user.cardNum.replace(/[0-9](?=([0-9]{4}))/g, "*");
  const onSubmit = () => {
    console.log("format data", values);
    // axios
    //   .post("", values)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };
  const { values, handleChange, handleBlur, errors, isValid, handleSubmit } =
    useFormik({
      initialValues: {
        amount: "",
        cardNum: "",
      },
      validationSchema: transferSchema,
      onSubmit,
    });

  return (
    <>
      <div className="py-20 md:px-40  p-5">
        <p className="font-black  md:text-4xl text-2xl   pl-2 pb-3 text-center mb-10">
          Transfer Money
        </p>
        <div className="form-control  md:p-20 p-5 rounded-xl">
          <div className="bg-purple-700 p-5 rounded-lg sm:flex justify-between text-center mb-10">
            <p className="text-white  font-extrabold ">{num}</p>
            <p className="font-extrabold   text-white ">{user.balance} LE</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="label">
              <span className="label-text ">Amount</span>
            </label>
            <label className="input-group input-group-vertical mb-10">
              <input
                type="number"
                id="amount"
                placeholder="5000"
                className={`input input-bordered outline-none ${
                  errors.amount ? "input-secondary" : ""
                }`}
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.amount && (
                <p className="text-sm text-red-400 mt-5 lg:ml-5">
                  {errors.amount}
                </p>
              )}
            </label>
            <label className="label">
              <span className="label-text ">Card Number</span>
            </label>
            <label className="input-group input-group-vertical mb-10">
              <input
                type="text"
                id="cardNum"
                placeholder=""
                className={`input input-bordered outline-none ${
                  errors.cardNum ? "input-secondary" : ""
                }`}
                value={values.cardNum}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cardNum && (
                <p className="text-sm text-red-400 mt-5 lg:ml-5">
                  {errors.cardNum}
                </p>
              )}
            </label>
            <div className="grid justify-center">
              <button
                type="submit"
                className="btn btn-secondary rounded-full md:w-80 "
                disabled={!isValid}
              >
                <Link to="#">Transfer</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
