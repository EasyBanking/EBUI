import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <section className="bg-slate-50 min-h-screen">
      <h1 class=" text-dark text-5xl  text-center pt-8 font-bold">
        Forget Password
      </h1>
      <div className="container mx-auto px-4 my-auto">
        <div className="bg-white rounded-lg shadow-lg my-auto mt-8">
          <div className="grid grid-cols-2">
            <div className="bg-primary px-8   py-16 rounded-l-lg">
              <div>
                <h2 className="text-white text-2xl bold">Easy Banking</h2>
                <p className="text-white">
                  Easy banking is a simple and easy to use banking application
                  that allows you to manage your accounts and transactions.
                </p>
              </div>
              <div className="mt-5">
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
              <form>
                <div className="form-control w-full max-w-xs">
                  <span class="label-text">
                    <span className="text-error">*</span>
                    <span>email</span>
                  </span>
                  <input
                    type="email"
                    placeholder="loreminpsum@gmail.com"
                    class="input input-bordered  w-full max-w-xs"
                  />
                </div>

                <div className="form-control w-full max-w-xs mt-5">
                  <label class="label">
                    <span class="label-text">
                      <span className="text-error">*</span> security question
                    </span>
                  </label>
                  <select class="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      what is your favorite color?
                    </option>
                    <option>what is your child hood name ?</option>
                  </select>
                </div>
                <div className="form-control w-full max-w-xs mt-5">
                  <span class="label-text">
                    <span className="text-error">*</span>
                    <span>security answear</span>
                  </span>
                  <input
                    type="text"
                    placeholder="orange"
                    class="input input-bordered  w-full max-w-xs"
                  />
                </div>

                <div className="flex justify-between items-center mt-5">
                  <button className="btn btn-primary">reset</button>
                  <Link to="/" className="text-primary">
                    login ?
                  </Link>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <Link to="/register" className="text-secondary">
                    Don't have an account?
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
