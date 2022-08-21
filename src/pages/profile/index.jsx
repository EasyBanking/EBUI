import { AuthGuard } from "../../wrappers/Auth";
import { Layout } from "../../components/base";
import { Button, Container, Grid, Input, Modal, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { memo, useState } from "react";
import clsx from "clsx";
import { FallBack, LoaderWrapper } from "../../components/Loader";
import { useEffect } from "react";
import HttpClient from "../../Http-Client";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";

const PagesHoc = (active) => {
  switch (active) {
    case "general":
      return UpdateUserComponent;
    case "account":
      return UpdateAccountComponent;
    case "settings":
      return Settings;
  }
};

const Settings = (props) => {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [request, setRequest] = useState("");
  const [load, setLoader] = useState(false);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const handleRequest = useCallback(() => {
    setLoader(true);
    HttpClient.post(request, { password })
      .then((res) => {
        setToaster({
          message: "successfully registered",
          type: "alert-success",
          show: true,
        });
      })
      .catch((err) => {
        setToaster({
          message: err?.response?.data?.message || err.message,
          type: "alert-error",
          show: true,
        });
        setLoader(false);
        setRequest("");
        setPassword("");
      })
      .finally(() => {
        setLoader(false);
      });
  }, [request, password]);

  return (
    <div className="">
      {load ? <FallBack /> : null}

      {toaster.show ? (
        <div className="toast toast-end z-10">
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

      <Modal open={modal} onClose={() => setModal(false)}>
        <Modal.Header>
          <Text h5>confirm your password</Text>
        </Modal.Header>
        <Modal.Body>
          <Input.Password
            bordered
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleRequest()}
            color="error"
            disabled={password.length === 0}
          >
            disable
          </Button>
          <Button
            ghost
            onClick={() => {
              setRequest("");
              setModal(false);
            }}
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="my-5">
        <Text css={{ textTransform: "capitalize" }} h6>
          <span className="text-error mr-2">*</span>please be carefull with this
          settings
        </Text>
      </div>
      <div className="">
        <Button
          color="warning"
          css={{ color: "#000" }}
          onClick={() => {
            if (window.confirm("are you sure ?")) {
              setRequest("/auth/disable");
              setModal(true);
            }
          }}
        >
          disable account
        </Button>
        <Button
          color="error"
          className="mt-6"
          onClick={() => {
            if (window.confirm("are you sure ?")) {
              setRequest("/auth/delete");
              setModal(true);
            }
          }}
        >
          delete account
        </Button>
      </div>
    </div>
  );
};

const UpdateAccountComponent = (props) => {
  const [load, setLoader] = useState(false);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const {
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    values,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      atmPin: "",
      firstName: props.account.firstName,
      lastName: props.account.lastName,
      nationalId: props.account.nationalId,
      dateOfBirth: moment(props.account.dateOfBirth).format("YYYY-MM-DD"),
      addresse: props.account.addresse,
    },
    validationSchema: updateAccountSchema,
    onSubmit: async (values) =>
      await handleUpdateAccount(
        values,
        (data) => {
          setToaster({
            message: "successfully updated",
            type: "alert-success",
            show: true,
          });
        },
        (err) => {
          setToaster({
            message: err?.response?.data?.message || err.message,
            type: "alert-error",
            show: true,
          });
        },
        setLoader
      ),
  });
  const router = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="">
      {load ? <FallBack /> : null}

      {toaster.show ? (
        <div className="toast toast-end z-10">
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

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Grid.Container gap={2}>
            <Grid sm={6}>
              <div className="w-full">
                <div className="mb-5 w-full">
                  <Input
                    fullWidth
                    type="text"
                    className="bg-white"
                    name="firstName"
                    initialValue={values.firstName}
                    helperText={errors.firstName}
                    helperColor="error"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="firstName"
                  />
                </div>
                <div className="mb-5">
                  <Input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    helperText={errors.lastName}
                    helperColor="error"
                    onChange={handleChange}
                    className="bg-white"
                    fullWidth
                    onBlur={handleBlur}
                    label="lastName"
                  />
                </div>
                <div className="mb-4">
                  <Input.Password
                    type="password"
                    name="atmPin"
                    value={values.atmPin}
                    helperText={errors.atmPin}
                    helperColor="error"
                    className="bg-white"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="pin number"
                  />
                </div>
              </div>
            </Grid>
            <Grid sm={6}>
              <div className="w-full">
                <div className="mb-4">
                  <Input
                    type="text"
                    name="addresse"
                    value={values.addresse}
                    helperText={errors.addresse}
                    helperColor="error"
                    className="bg-white"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="addresse"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="nationalId"
                    value={values.nationalId}
                    helperText={errors.nationalId}
                    helperColor="error"
                    className="bg-white"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="national id"
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    helperText={errors.dateOfBirth}
                    helperColor="error"
                    className="bg-white"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="birth date"
                  />
                </div>
              </div>
            </Grid>
          </Grid.Container>

          <Button type="submit">update</Button>
        </div>
      </form>
    </div>
  );
};

const UpdateUserComponent = (props) => {
  const [questions, setQuestions] = useState([]);
  const [load, setLoader] = useState(false);
  const [pimg, setPimg] = useState("");

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const {
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    values,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      username: props.username,
      email: props.email,
      password: "",
      question: props?.security?.question,
      answear: props?.security?.answer,
    },
    validationSchema: updateUserSchema,
    onSubmit: async (values) =>
      await handleUpdateUser(
        { ...values, pimg },
        (data) => {
          setToaster({
            message: "successfully registered",
            type: "alert-success",
            show: true,
          });
        },
        (err) => {
          setToaster({
            message: err?.response?.data?.message || err.message,
            type: "alert-error",
            show: true,
          });
        },
        setLoader
      ),
  });

  const router = useNavigate();

  useEffect(() => {
    HttpClient.get("/questions")
      .then(({ data }) => {
        setQuestions(data?.data);
      })
      .catch((err) => {
        console.log(err);
        router("/error", { replace: true });
      });
  }, []);

  console.log(errors);

  return (
    <div className="">
      {load ? <FallBack /> : null}

      {toaster.show ? (
        <div className="toast toast-end z-10">
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

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Grid.Container gap={2}>
            <Grid sm={6}>
              <div className="w-full">
                <div className="mb-5 w-full">
                  <Input
                    fullWidth
                    type="text"
                    className="bg-white"
                    name="username"
                    initialValue={values.username}
                    helperText={errors.username}
                    helperColor="error"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="username"
                  />
                </div>
                <div className="mb-5">
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    helperText={errors.email}
                    helperColor="error"
                    onChange={handleChange}
                    className="bg-white"
                    fullWidth
                    onBlur={handleBlur}
                    label="email"
                  />
                </div>
                <div className="mb-4">
                  <Input.Password
                    type="password"
                    name="password"
                    value={values.password}
                    helperText={errors.password}
                    helperColor="error"
                    className="bg-white"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="password"
                  />
                </div>
              </div>
            </Grid>
            <Grid sm={6}>
              <div className="w-full">
                <div className="mb-5 w-full">
                  <Input
                    label="profile img"
                    onChange={(e) => setPimg(e.target.files[0])}
                    fullWidth
                    type="file"
                    className="bg-white"
                  />
                </div>
                <div className="mb-4">
                  <label>secret question</label>
                  <select
                    name="question"
                    value={values.question}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="select select-bordered "
                  >
                    {questions?.map((q) => {
                      return <option value={q.content}>{q.content}</option>;
                    })}
                  </select>
                  <label className="text-error">{errors.quesion}</label>
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="answear"
                    value={values.answear}
                    helperText={errors.answear}
                    helperColor="error"
                    className="bg-white"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="answear"
                  />
                </div>
              </div>
            </Grid>
          </Grid.Container>

          <Button type="submit">update</Button>
        </div>
      </form>
    </div>
  );
};

export default function UpdateCeredentials(props) {
  const user = useSelector((st) => st?.auth?.user);
  const [activeTab, setActiveTab] = useState("general");

  const Active = memo(PagesHoc(activeTab), [activeTab]);

  return (
    <AuthGuard>
      {user ? (
        <Layout>
          <section className="min-h-screen">
            <Text h4>update your account</Text>
            <div className="inline-block mt-5">
              <div className="tabs tabs-boxed">
                <a
                  className={clsx({
                    tab: true,
                    "tab-active": activeTab === "general",
                  })}
                  onClick={() => setActiveTab("general")}
                >
                  general
                </a>
                <a
                  className={clsx({
                    tab: true,
                    "tab-active": activeTab === "account",
                  })}
                  onClick={() => setActiveTab("account")}
                >
                  account
                </a>
                <a
                  className={clsx({
                    tab: true,
                    "tab-active": activeTab === "settings",
                  })}
                  onClick={() => setActiveTab("settings")}
                >
                  settings
                </a>
              </div>
            </div>
            <Active {...user} />
          </section>
        </Layout>
      ) : (
        <LoaderWrapper />
      )}
    </AuthGuard>
  );
}

const handleUpdateUser = async (values, onSuccess, onErorr, setLoader) => {
  try {
    setLoader(true);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("answear", values.answear);
    formData.append("question", values.question);

    if (values.password) {
      formData.append("password", values.password);
    }

    if (values.pimg) {
      formData.append("pimg", values?.pimg, values?.pimg.name);
    }

    const { data } = await HttpClient.post("/auth/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    onSuccess(data);
    setLoader(false);
  } catch (err) {
    onErorr(err);
    setLoader(false);
  }
};

const handleUpdateAccount = async (values, onSuccess, onErorr, setLoader) => {
  try {
    setLoader(true);
    const { data } = await HttpClient.post("/account/update", values);
    onSuccess(data);
    setLoader(false);
  } catch (err) {
    onErorr(err);
    setLoader(false);
  }
};

const updateUserSchema = yup.object({
  username: yup.string().min(5).max(55).required(),
  email: yup.string().min(5).max(55).required(),
  password: yup.string().min(5).max(55),
  question: yup.string().min(5).max(255).required(),
  answear: yup.string().min(2).max(255).required(),
});

const updateAccountSchema = yup.object({
  atmPin: yup.string().length(4).required(),
  firstName: yup.string().min(2).max(55).required(),
  lastName: yup.string().min(2).max(55).required(),
  nationalId: yup.string().min(2).max(55).required(),
  dateOfBirth: yup.string().min(2).max(55).required(),
  addresse: yup.string().min(2).max(55).required(),
});
