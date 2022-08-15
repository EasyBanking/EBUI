import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { formSchema } from "./formSchema";

export default function ContactUs() {
  const onSubmit = () => {
    console.log("format data", values);
    // axios
    //   .post("", values)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };
  const { values, handleChange, handleBlur, errors, touched, isValid ,handleSubmit} =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        text: "",
      },
      validationSchema: formSchema,
      onSubmit,
    });
  
  return (
    <>
      <div className="py-20 md:px-40  p-5">
        <p className="font-black  md:text-4xl text-2xl   pl-2 pb-3 text-center mb-10">
          Contact Us
        </p>
        <div className="form-control bg-slate-50 md:p-20 p-5 rounded-xl">
          <form onSubmit={handleSubmit}>
          <label className="input-group lg:flex-row flex-col mb-10 ">
            <div>
              <label className="label">
                <span className="label-text bg-transparent">First Name</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter you first name"
                className={`input input-bordered  md:w-60 ${
                  errors.firstName && touched.firstName ? "input-secondary" : ""
                }`}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-sm text-red-400 mt-5">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text lg:ml-5 bg-transparent">Last Name</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter you first name"
                className={`input input-bordered  md:w-60 lg:ml-5 ${
                  errors.lastName && touched.lastName ? "input-secondary" : ""
                }`}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName && (
                <p className="text-sm text-red-400 mt-5 lg:ml-5">
                  {errors.lastName}
                </p>
              )}
            </div>
          </label>
          <label className="label">
            <span className="label-text ">Your Email</span>
          </label>
          <label className="input-group input-group-vertical mb-10">
            <input
              type="Email"
              id="email"
              placeholder="info@site.com"
              className={`input input-bordered outline-none ${
                errors.email ? "input-secondary" : ""
              }`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-5 lg:ml-5">
                {errors.email}
              </p>
            )}
          </label>
          <label className="label">
            <span className="label-text">What can we help</span>
          </label>
          <label className="input-group input-group-vertical mb-10">
            <textarea
              id="text"
              className={`textarea textarea-bordered ${
                errors.text ? "textarea-error" : ""
              }`}
              placeholder="Bio"
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.email && (
              <p className="text-sm text-red-400 mt-5 lg:ml-5">{errors.text}</p>
            )}
          </label>
          <div className="grid justify-center">
            <button
              type="submit"
              className="btn btn-primary rounded-full md:w-80 "
              disabled={!isValid}
            >
              <Link to="#">Send</Link>
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
