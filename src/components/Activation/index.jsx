import img from "../../undraw_check_boxes_re_v40f.svg";
import { Link } from "react-router-dom";

export default function Activation(props) {
  const { text, title } = props;
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center h-full">
              <img src={img} alt="" />
              <h1
                className={`text-center text-4xl font-bold mt-5 ${props.variant}`}
              >
                {title ?? "Activation"}
              </h1>
              <p className="text-center text-lg">
                {text ?? "Please check your email to activate your account."}
              </p>
              <Link to="/">
                <button className="btn btn-primary">home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
