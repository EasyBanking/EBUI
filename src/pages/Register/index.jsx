import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Login() {
  const [steps, setSteps] = useState([
    {
      title: "basic",
      isValid: false,
    },
    {
      title: "Security",
      isValid: false,
    },
  ]);

  const [step, setStep] = useState(1);

  return (
    <section className="bg-slate-50 min-h-screen py-8">
      <h1 class=" text-dark text-5xl  text-center  font-bold">Register</h1>
      <div className="container mx-auto px-4 my-auto">
        <div className="bg-white rounded-lg shadow-lg my-auto mt-8">
          <div className="grid grid-cols-2">
            <div className="bg-primary px-8  py-16 rounded-l-lg">
              <div>
                <h2 className="text-white text-2xl bold">Easy Banking</h2>
                <p className="text-white">
                  Easy banking is a simple and easy to use banking application
                  that allows you to manage your accounts and transactions.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-white">
                  Download the app and start managing your accounts and
                  transactions.
                </p>
                <button className="btn btn-success text-gray-50 rounded-lg mt-5">
                  <FontAwesomeIcon icon={["fab", "android"]} size="2x" />
                </button>
                <button className="btn btn-dark  ml-5 text-gray-50 rounded-lg mt-5">
                  <FontAwesomeIcon icon={["fab", "apple"]} size="2x" />
                </button>
              </div>
            </div>

            <div className="px-8  py-16 rounded-r-lg">
              <ul class="steps steps-vertical lg:steps-horizontal">
                {steps.map((s, index) => {
                  if (index === 0) {
                    return (
                      <li className={`step step-primary`} key={`s-${index}`}>
                        {s.title}
                      </li>
                    );
                  }
                  return (
                    <li
                      className={`step ${
                        step >= index + 1 ? "step-primary" : ""
                      }`}
                      key={`s-${index}`}
                    >
                      {s.title}
                    </li>
                  );
                })}
              </ul>

              <form className="mt-5">
                <div
                  className={`form-control w-full max-w-xs mb-5 ${
                    step === 1 ? "" : "hidden"
                  } `}
                >
                  <span className="label-text">
                    <span className="text-error">*</span>
                    <span>username</span>
                  </span>
                  <input
                    type="text"
                    placeholder="lorem inpsum"
                    class="input input-bordered  w-full max-w-xs"
                  />
                </div>

                <div
                  className={`form-control w-full max-w-xs mb-5 ${
                    step === 1 ? "" : "hidden"
                  } `}
                >
                  <span className="label-text">
                    <span className="text-error">*</span>
                    <span>email</span>
                  </span>
                  <input
                    type="email"
                    placeholder="loreminpsum@gmail.com"
                    class="input input-bordered  w-full max-w-xs"
                  />
                </div>

                <div
                  className={`form-control w-full max-w-xs mb-5 ${
                    step === 1 ? "" : "hidden"
                  } `}
                >
                  <span className="label-text">
                    <span className="text-error">*</span>
                    <span>password</span>
                  </span>
                  <input
                    type="password"
                    placeholder="********"
                    class="input input-bordered  w-full max-w-xs"
                  />
                </div>

                <div
                  className={`form-control w-full max-w-xs mb-5 ${
                    step === 2 ? "" : "hidden"
                  } `}
                >
                  <span className="label-text">
                    <span className="text-error">*</span>
                    <span>security question</span>
                  </span>

                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </div>

                <div
                  className={`form-control w-full max-w-xs mb-5 ${
                    step === 2 ? "" : "hidden"
                  } `}
                >
                  <span className="label-text">
                    <span className="text-error">*</span>
                    <span>security answear</span>
                  </span>

                  <input
                    type="text"
                    placeholder="lorem inpsum"
                    class="input input-bordered  w-full max-w-xs"
                  />
                </div>

                <div className="flex justify-between items-center mt-5">
                  <button
                    className={`btn btn-success  ${
                      step === 2 ? "" : "hidden"
                    }  mr-4 ${
                      steps.every((i) => i.isValid) ? "" : "btn-disabled"
                    }`}
                  >
                    register
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className={`btn btn-primary  ${step === 1 ? "" : "hidden"}`}
                  >
                    next
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className={`btn btn-primary mr-auto ${
                      step === 2 ? "" : "hidden"
                    }`}
                  >
                    prev
                  </button>

                  <Link to="/forget-password" className="text-primary">
                    Forgot password?
                  </Link>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <Link to="/login" className="text-secondary">
                    already have an account?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
