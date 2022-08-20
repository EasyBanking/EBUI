import { AuthGuard } from "../../wrappers/Auth";
import { Layout } from "../../components/base";
import {
  Button,
  Container,
  Input,
  Text,
  Modal,
  Table,
} from "@nextui-org/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import HttpClient from "../../Http-Client";
import { useEffect } from "react";
import { useState } from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoaderWrapper } from "../../components/Loader";

export default function Transactions() {
  const [dataLoad, setDataLoad] = useState(false);
  const [dataError, setDataError] = useState("");
  const [data_, setData_] = useState([]);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const columns = useMemo(
    () => [
      {
        title: "#",
      },
      {
        title: "from/to",
      },
      {
        title: "type",
      },
      {
        title: "status",
      },
      {
        title: "amount",
      },
      {
        title: "datetime",
      },
    ],
    []
  );

  const user = useSelector((st) => st?.auth?.user);
  const isSender = (sender) => sender?._id === user?.account?._id;

  const data = useMemo(() => {
    if (data_.length && user) {
      return data_;
    }

    return [];
  }, [data_, user]);

  useEffect(() => {
    HttpClient.get("/account/transactions")
      .then(({ data }) => {
        setData_(data.data);
        setDataLoad(true);
      })
      .catch((err) => {
        setToaster({
          message: "an error. failed to get transactions !",
          type: "alert-error",
          show: true,
        });
        setDataLoad(true);
      });
  }, []);

  if (!dataLoad) {
    return <LoaderWrapper />;
  }

  return (
    <AuthGuard>
      <Layout>
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

        <section className="min-h-screen">
          <Text h3>Track Your Transactions</Text>
          <Text small>in just few minutes</Text>

          <div className="bg-white rounded-md shadow-md mt-4">
            <Table
              aria-label="Example table with dynamic content"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              bordered={false}
              borderWeight={0}
            >
              <Table.Header>
                {columns.map((c) => {
                  return <Table.Column>{c.title}</Table.Column>;
                })}
              </Table.Header>
              <Table.Body loadingState={dataLoad}>
                {data.map((dt, i) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell>
                        {isSender(dt.sender)
                          ? dt.receiver.firstName || "payment"
                          : dt.sender.firstName}
                      </Table.Cell>
                      <Table.Cell>
                        <span className="bg-info rounded-lg p-2">
                          {dt.type}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="bg-success rounded-lg p-2">
                          {dt.status}
                        </span>
                      </Table.Cell>

                      <Table.Cell>{dt.amount} EGP</Table.Cell>
                      <Table.Cell>
                        <Moment from={dt.datetime} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </section>
      </Layout>
    </AuthGuard>
  );
}
