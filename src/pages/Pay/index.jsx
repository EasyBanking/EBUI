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
import Qr from "react-qr-code";
import { useCallback } from "react";

export default function InstantPayment(props) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("");
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
      amount: "",
    },
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      setShowModal(true);
    },
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    HandlePayment(
      { ...values, atmPin: pin },
      (data) => {
        setToaster({
          message: "payment generated successfully",
          type: "alert-success",
          show: true,
        });
        const paidLink = `${process.env.REACT_APP_READ_QR_LINK}/${data?.token}`;
        setToken(paidLink);
        setShowModal(false);
        setPin("");
        /*router("/transfer", { replace: true });*/
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

  const handleDownloadQr = useCallback([]);

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
        <Modal open={showModal} closeButton={true}>
          <Modal.Header>
            <Text>validate pin number</Text>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-row justify-center">
              <form onSubmit={handlePaymentSubmit}>
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
                    generate
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        <section className="min-h-screen">
          <div>
            <Text h3>instant payment</Text>
            <Text small>Lets generate instance payments</Text>

            <div className="shadow-lg bg-primary w-1/2 text-white p-4 mt-2 rounded-lg mb-6">
              <div className="flex flex-row justify-between items-center">
                <span>balance</span>
                <span>{user?.account?.balance}EGP</span>
              </div>
            </div>
            <div>
              <Qr
                value={token}
                size="165"
                download={true}
                id="qr_t"
              />
            </div>
            <div className="mt-6">
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="mb-4">
                  <p className="bold  text-white p-2 rounded-md inline-block shadow-lg  bg-primary">
                    <span className="flex flex-row items-center">
                      <FontAwesomeIcon
                        icon="info-circle"
                        style={{ width: 25 }}
                      />
                      <span>
                        please notice that the qr code is valid for 1 day
                      </span>
                    </span>
                  </p>
                </div>
                <div>
                  <Input
                    label="amount"
                    name="amount"
                    placeholder="5EGP"
                    type={"number"}
                    bordered
                    className="bg-white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    helperText={errors.amount}
                    helperColor="error"
                  />
                </div>
                <Button type="submit" auto className="mt-4">
                  generate
                </Button>
              </form>
            </div>
          </div>
        </section>
        {loading ? <FallBack /> : null}
      </Layout>
    </AuthGuard>
  );
}

const paymentSchema = yup.object({
  amount: yup.number().required().positive(),
});

const HandlePayment = async (values, onSuccess, onError, setLoader) => {
  try {
    setLoader(true);
    const { data } = await HttpClient.post("/account/pay", values);
    onSuccess(data);
    setLoader(false);
  } catch (err) {
    setLoader(false);
    onError(err);
  }
};
