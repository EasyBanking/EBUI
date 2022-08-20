import { AuthGuard } from "../../../wrappers/Auth";
import { useParams } from "react-router-dom";
import { LoaderWrapper } from "../../../components/Loader";
import { useState } from "react";
import Activation from "../../../components/Activation";
import { useEffect } from "react";
import HttpClient from "../../../Http-Client";

export default function ReadPayment(props) {
  const { token } = useParams();

  const [state, setState] = useState({
    variant: "",
    title: "",
    text: "",
  });

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      HttpClient.post(`/account/read-pay/${token}`)
        .then((res) => {
          console.log(res);
          setState({
            variant: "text-success",
            title: "payment success",
            text: "payment has recevied successfully",
          });
          console.log("here");
        })
        .catch((err) => {
          console.log(err);
          console.log("here -- ");
          setState({
            variant: "text-error",
            title: "payment error",
            text: "payment has fail",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <LoaderWrapper />;
  }

  return (
    <AuthGuard>
      <Activation
        variant={state.variant}
        title={state.title}
        text={state.text}
      />
    </AuthGuard>
  );
}
