import { AuthGuard } from "../../wrappers/Auth";
import { Layout } from "../../components/base";
import {
  Button,
  Container,
  Input,
  Text,
  Modal,
  Table,
  Grid,
} from "@nextui-org/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import HttpClient from "../../Http-Client";
import * as yup from "yup";
import { useEffect } from "react";
import { useState } from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FallBack, LoaderWrapper } from "../../components/Loader";
import { useCallback } from "react";
import { useFormik } from "formik";

export default function Schedules() {
  const [dataLoad, setDataLoad] = useState(false);
  const [data_, setData_] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [locations_, setLocations_] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    submitForm,
    errors,
    values,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: {
      location_id: "",
      type: "",
      date: "",
    },
    validationSchema: createScheduleSchema,
    onSubmit: (values) =>
      handleCreateScheduleRequest(
        values,
        (data) => {
          console.log(data);
          setToaster({
            type: "alert-success",
            message: "schedule is beeing created .",
            show: true,
          });
          resetForm({
            values: {
              location_id: "",
              type: "",
              date: "",
            },
          });
          setIsOpen(false);
          window.location.replace("/schedules");
        },
        (err) => {
          setToaster({
            type: "alert-error",
            message:
              err?.response?.data?.message || "failed to create schedule .",
            show: true,
          });
          resetForm({
            values: {
              location_id: "",
              type: "",
              date: "",
            },
          });
        },
        setLoader
      ),
  });

  const reasons = useMemo(() => ["teller", "serivce", "other"], []);

  const locations = useMemo(() => locations_, [locations_]);

  const openModal = useCallback((evt) => setIsOpen(true), []);

  const handleSubmitSchedule = useCallback(async (e) => {
    await submitForm();
  }, []);

  const user = useSelector((st) => st?.auth?.user);

  const handleDeleteItem = useCallback(
    (s, x) => {
      if (window.confirm("are you sure ?")) {
        HandleDeleteScheduleRequest(
          {
            location_id: s?.location_id?._id,
            schedule_id: s?._id,
            timestamp: s?.date,
          },
          (data) => {
            const tmp = data_.filter((i, x_) => x !== x_);

            setData_([...tmp]);

            setToaster({
              message: "schedule has removed successfully",
              type: "alert-success",
              show: true,
            });
          },
          (err) => {
            console.log(err);
            setToaster({
              message: "failed to delete schedule.",
              type: "alert-error",
              show: true,
            });
          },
          setLoader
        );
      }
    },
    [data_]
  );

  useEffect(() => {
    if (user?.account?.schedules) {
      setData_(user.account.schedules);
      setDataLoad(true);
    }
  }, [user]);

  useEffect(() => {
    HttpClient.get("/locations")
      .then(({ data }) => {
        console.log(data);
        setLocations_(data.data);
      })
      .catch((err) => {
        console.log(err);
        setToaster({
          title: "failed to get locations.",
          type: "alert-error",
          show: true,
        });
      });
  }, []);

  return (
    <AuthGuard>
      {!dataLoad ? (
        <LoaderWrapper />
      ) : (
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
          {loader ? <FallBack /> : null}
          <section className="min-h-screen">
            <Text h3>Schedules</Text>
            <Text small>take A Schedule in just minutes</Text>
            <div className=" mt-4">
              <div className="mb-6">
                <Button auto onClick={openModal}>
                  take a Schedule
                </Button>
              </div>

              <Modal
                open={isOpen}
                visible={isOpen}
                onClose={() => setIsOpen(false)}
              >
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    <Text b size={18}>
                      lets create a Schedule
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                      <div className="flex flex-col mb-4">
                        <label>date</label>
                        <input
                          value={values.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="date"
                          className="input input-bordered"
                          type="date"
                        />
                        <label className="label">
                          <span class="label-text-alt text-error">
                            {errors.date}
                          </span>
                        </label>
                      </div>
                      <div className="flex flex-col mb-4">
                        <label>reason</label>
                        <select
                      
                          name="type"
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="select select-bordered w-full"
                          defaultValue={reasons[0]}
                        >
                          {reasons.map((r) => {
                            return <option value={r}>{r}</option>;
                          })}
                        </select>
                        <span class="label-text-alt text-error">
                          {errors.type}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <label>location</label>
                        <select
                          name="location_id"
                          value={values.location_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="select select-bordered w-full"
                          defaultValue={locations[0]?._id}
                        >
                          {locations.map((l) => {
                            return <option value={l?._id}>{l?.address}</option>;
                          })}
                        </select>
                        <span class="label-text-alt text-error">
                          {errors.location_id}
                        </span>{" "}
                      </div>
                    </form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button disabled={!isValid} onClick={handleSubmitSchedule}>
                    schedule
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    bordered
                  >
                    close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Grid.Container gap={2}>
                {data_.map((s, x) => {
                  return (
                    <Grid sm={6}>
                      <div className="bg-white mr-4 w-full p-4 rounded shadow-xl">
                        <div className="text-left flex flex-row items-end justify-between">
                          <div>
                            <Text h4 weight={"normal"}>
                              {s?.type}
                            </Text>
                            <Text className="text-xs opacity-70">
                              <Moment from={s?.date} />
                            </Text>
                          </div>
                          <span className="text-xs">
                            <Text className="text-xs">
                              <FontAwesomeIcon
                                size="sm"
                                icon="map-marked"
                                className="mr-2"
                              />
                              {s?.location_id?.address}
                            </Text>
                          </span>
                        </div>
                        <hr className="mt-2 border-2" />

                        <div className="mt-4 flex flex-row justify-center">
                          <span className="bg-primary p-2 rounded-md  text-center text-white text-xl">
                            {s?.priority}
                          </span>
                        </div>
                        <div className="mt-4 ">
                          <Button
                            className="mx-auto"
                            onClick={() => handleDeleteItem(s, x)}
                          >
                            cancel
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid.Container>
            </div>
          </section>
        </Layout>
      )}
    </AuthGuard>
  );
}

const createScheduleSchema = yup.object({
  location_id: yup.string().length(24).required(),
  type: yup.string().required(),
  date: yup.date().required(),
});

const handleCreateScheduleRequest = async (
  values,
  onSuccess,
  onError,
  setLoader
) => {
  try {
    setLoader(true);
    const { data } = await HttpClient.post("/account/schedule", values);
    onSuccess(data);
    setLoader(false);
  } catch (err) {
    console.log(err);
    onError(err);
    setLoader(false);
  }
};

const HandleDeleteScheduleRequest = async (
  values,
  onSuccess,
  onError,
  setLoader
) => {
  try {
    setLoader(true);
    const { data } = await HttpClient.delete("/account/schedule", {
      data: values,
    });
    onSuccess(data);
    setLoader(false);
  } catch (err) {
    onError(err);
    setLoader(false);
  }
};
