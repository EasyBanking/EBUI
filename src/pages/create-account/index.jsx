import { PassWithCondition } from "../../wrappers/Auth";
import { Text, Container, Input, Grid, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FallBack } from "../../components/Loader/index";
import HttpClient from "../../Http-Client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateYourAccount() {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authLoad, setAuthLoad] = useState(false);
  const [pass, setPass] = useState(false);
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const { handleBlur, handleChange, values, errors, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        atmPin: "",
        nationalId: "",
        dateOfBirth: "",
        addresse: "",
      },
      validationSchema: createAccountSchema,
      onSubmit: async (values) =>
        await HandleCreateAccount(
          values,
          setLoading,
          (err) => {
            setToaster({
              message: err?.response?.data?.message || err?.message,
              type: "alert-error",
              show: true,
            });
          },
          (data) => {
            setToaster({
              message: "account has created successfully.",
              type: "alert-success",
              show: true,
            });

            router("/app", { replace: true });
          }
        ),
    });

  useLayoutEffect(() => {
    HttpClient.get("/auth/checkme", { withCredentials: true })
      .then((data) => {
        setPass(true);
        setAuthLoad(true);
      })
      .catch((err) => {
        setAuthLoad(true);
      });
  }, []);

  return (
    <PassWithCondition
      condition={pass}
      isLoad={authLoad}
      fallback={() => {
        router("/login", { replace: true });
      }}
    >
      <section className=" bg-light min-h-screen py-8">
        {toaster.show ? (
          <div className="toast toast-end">
            <div className={`alert ${toaster?.type}`}>
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

        <div className="text-center">
          <Text h2>Lets Create Account</Text>
          <Text>to start using easy banking</Text>
          <div className="">
            <Button
              onClick={() => router("/")}
              auto
              color="success"
              className="mx-auto"
            >
              home
            </Button>
          </div>
        </div>
        <div className="bg-white sm:w-2/4 w-4/5 mx-auto rounded-md py-8 px-4 mt-5 shadow-lg">
          <Container>
            <div className="">
              <form onSubmit={handleSubmit}>
                <Grid.Container gap={2}>
                  <Grid sm={6} xs={12}>
                    <div className="w-full">
                      <div className="mb-6">
                        <Input
                          name="firstName"
                          bordered
                          placeholder="ahmed"
                          shadow
                          label="first name"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          helperText={errors.firstName}
                          helperColor="error"
                        />
                      </div>
                      <div className="mb-6">
                        <Input
                          name="lastName"
                          bordered
                          placeholder="ramadan"
                          shadow
                          label="last name"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          helperText={errors.lastName}
                          helperColor="error"
                        />
                      </div>
                      <div className="mb-6">
                        <Input
                          name="dateOfBirth"
                          bordered
                          shadow
                          label="date of birth"
                          type="date"
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          helperText={errors.dateOfBirth}
                          helperColor="error"
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid sm={6} xs={12}>
                    <div className="w-full">
                      <div className="mb-6">
                        <Input
                          name="addresse"
                          bordered
                          placeholder="10th of ramadan - cairo"
                          shadow
                          label="addresse"
                          type="text"
                          value={values.addresse}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          helperText={errors.addresse}
                          helperColor="error"
                        />
                      </div>
                      <div className="mb-6">
                        <Input.Password
                          name="atmPin"
                          bordered
                          type
                          placeholder="****"
                          shadow
                          label="pin number"
                          value={values.atmPin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          helperText={errors.atmPin}
                          helperColor="error"
                        />
                      </div>
                      <div className="mb-6">
                        <Input
                          name="nationalId"
                          bordered
                          placeholder="29702041300045"
                          shadow
                          label="national id"
                          type="text"
                          value={values.nationalId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          helperText={errors.nationalId}
                          helperColor="error"
                        />
                      </div>
                    </div>
                  </Grid>
                  <Button className="mt-4" color="primary" type="submit">
                    create
                  </Button>
                </Grid.Container>
              </form>
            </div>
          </Container>
        </div>
        {loading ? <FallBack /> : null}
      </section>
    </PassWithCondition>
  );
}

const createAccountSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  atmPin: yup.string().length(4).required(),
  dateOfBirth: yup.date().required(),
  addresse: yup.string().required(),
});

const HandleCreateAccount = async (values, setLoading, onError, onSuccess) => {
  try {
    setLoading(true);
    console.log(values);
    const { data } = await HttpClient.post("/account/create", values);
    onSuccess(data);
    setLoading(false);
  } catch (err) {
    onError(err);
    setLoading(false);
  }
};
