import { AuthGuard } from "../../wrappers/Auth";
import { Layout } from "../../components/base";
import { Button, Container, Input, Text, Modal } from "@nextui-org/react";
import { useFormik } from "formik";
import * as yup from "yup";
import HttpClient from "../../Http-Client";
import { useState } from "react";
import { FallBack } from "../../components/Loader/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TransferMoney(props) {
  const [pin, setPin] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [accountErr, setAccountErr] = useState(null);
  const router = useNavigate();
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });
  const user = useSelector((s) => s?.auth?.user);
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: {
      account_id: "",
      amount: "",
    },
    validationSchema: transferMoneySchema,
    onSubmit: async (values) => {
      setShowModal(true);
    },
  });

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    HandleTrasnferMoney(
      { ...values, atmPin: pin },
      (data) => {
        setToaster({
          message: "money transfered successfully",
          type: "alert-success",
          show: true,
        });

        setShowModal(false);
        setPin("");
        router("/transfer", { replace: true });
      },
      (err) => {
        setToaster({
          message: err?.response?.data?.message || "error happend in account !",
          type: "alert-error",
          show: true,
        });

        setPin("");
        setShowModal(false);
      },
      setLoading
    );
  };

  return (
    <AuthGuard>
      {toaster.show ? (
        <div className="toast toast-end z-50">
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
      <Layout>
        <section className="min-h-screen">
          <Modal open={showModal} closeButton={true}>
            <Modal.Header>
              <Text>validate pin number</Text>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-row justify-center">
                <form onSubmit={handleTransferSubmit}>
                  <Input.Password
                    label="pin number"
                    required
                    fullWidth
                    bordered
                    placeholder="****"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <div className="flex flex-row justify-center mt-4">
                    <Button type="submit" auto>
                      transfer
                    </Button>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
          <Text h3>Transfer Money</Text>
          <Text small>in just few minutes</Text>
          <div className="mt-10">
            <div className="shadow-lg bg-primary w-1/4 text-white p-4 rounded-lg mb-6">
              <div className="flex flex-row justify-between items-center">
                <span>balance</span>
                <span>{user?.account?.balance}EGP</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <div className="mb-6">
                <Input
                  bordered
                  type="number"
                  placeholder="5$"
                  className="bg-white text-white"
                  color="default"
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  helperText={errors.amount}
                  helperColor="error"
                />
              </div>
              <div className="">
                <Input
                  bordered
                  type="text"
                  placeholder="11256487878842"
                  className="bg-white text-white"
                  color="default"
                  label="Account"
                  name="account_id"
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value.length === 24) {
                      //const ac = findUserById();
                      //console.log(ac);
                      findUserById(e?.target?.value)
                        .then(({ data }) => {
                          console.log(data.user.account);
                          setAccount(
                            `${data?.user?.account?.firstName}  ${data?.user?.account?.lastName}`
                          );
                        })
                        .catch((err) => {
                          setAccountErr("account not found !");
                          setAccount("");
                        });
                    }
                  }}
                  onBlur={handleBlur}
                  value={values.account_id}
                  helperText={errors.account_id}
                  helperColor={"error"}
                />
              </div>
              <div className="">
                <div>
                  <Input
                    type="text"
                    hidden={!(account || accountErr)}
                    status={account ? "success" : "error"}
                    value={account ? account : accountErr}
                  />
                </div>
              </div>
              <Button className="mt-2" auto type="submit">
                transfer
              </Button>
            </form>
          </div>
        </section>
        {loading ? <FallBack /> : null}
      </Layout>
    </AuthGuard>
  );
}

const transferMoneySchema = yup.object({
  account_id: yup.string().length(24).required(),
  amount: yup.number().required().positive(),
});

const HandleTrasnferMoney = async (values, onSuccess, onError, setLoader) => {
  try {
    setLoader(true);
    let tmp = values["account_id"];
    delete values["account_id"];
    values["receiverId"] = tmp;
    const { data } = await HttpClient.post("/account/transfer?limit=5", values);
    onSuccess(data);
    setLoader(false);
  } catch (err) {
    onError(err);
    setLoader(false);
  }
};

const findUserById = (id) =>
  HttpClient.get("/account/find", {
    params: {
      id,
    },
  });
