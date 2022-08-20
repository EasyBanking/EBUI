import { useFormik } from "formik";
import { formSchema } from "./formSchema";
import Nav from "../../components/nav";
import { Button, Container, Input } from "@nextui-org/react";
import { useState } from "react";
import HttpClient from "../../Http-Client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FallBack } from "../../components/Loader";


export default function ContactUs() {
  const [loader, setLoader] = useState(false);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const { values, handleChange, handleBlur, errors, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        fullname: "",
        email: "",
        message: "",
      },
      validationSchema: formSchema,
      onSubmit: (values) =>
        HandleSendMessage(
          values,
          (data) => {
            setToaster({
              message: data?.message,
              type: "alert-success",
              show: true,
            });
          },
          (err) => {
            setToaster({
              message: err?.response?.data?.message || err?.message,
              type: "alert-error",
              show: true,
            });
          },
          setLoader
        ),
    });

  return (
    <section className="bg-light">
      <Nav />

      {loader ? <FallBack /> : null}
      {toaster.show ? (
        <div className="toast toast-end">
          <div className={`alert ${toaster.type ?? "alert-error"}`}>
            <div>
              <span>{toaster.message}</span>
              <button
                className="btn btn-xs btn-ghost"
                onClick={() => {
                  setToaster({
                    message: "",
                    type: "",
                    show: false,
                  });
                }}
              >
                <FontAwesomeIcon icon="times-circle" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Container>
        <div className="pt-10 min-h-screen">
          <p className="font-black  md:text-4xl text-2xl   pl-2 text-center ">
            Contact Us
          </p>
          <div className="md:w-2/5 mx-auto">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <Input
                    type={"text"}
                    label="fullname"
                    fullWidth
                    name="fullname"
                    bordered
                    placeholder="fullname"
                    className="bg-white"
                    size="lg"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.fullname}
                    value={values.fullname}
                    color="primary"
                    helperColor={"error"}
                  />
                </div>
                <div className="mt-10">
                  <Input
                    type={"email"}
                    label="email"
                    name="email"
                    bordered
                    fullWidth
                    placeholder="email"
                    className="bg-white"
                    size="lg"
                    color="primary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email}
                    helperColor={"error"}
                    value={values.email}
                  />
                </div>
                <div className="mt-10">
                  <Input.Textarea
                    type={"text"}
                    color="primary"
                    size="lg"
                    label="message"
                    name="message"
                    bordered
                    fullWidth
                    className="bg-white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.message}
                    helperColor={"error"}
                    value={values.text}
                  />
                </div>
              </div>
              <Button className="mt-10" disabled={!isValid} type="submit">
                send
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

const HandleSendMessage = async (values, onSuccess, onError, setLoading) => {
  try {
    setLoading(true);
    const { data } = await HttpClient.post("/user/message", values);
    onSuccess(data);
    setLoading(false);
  } catch (err) {
    console.log(err);
    onError(err);
    setLoading(false);
  }
};
