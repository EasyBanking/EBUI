import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <>
      <div className="py-20 md:px-40  p-5">
        <p className="font-black  md:text-4xl text-2xl   pl-2 pb-3 text-center mb-10">
          Contact Us
        </p>
        <div className="form-control bg-purple-50 md:p-20 p-5 rounded-xl">
          <label className="input-group lg:flex-row flex-col mb-10 ">
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter you first name"
                className="input input-bordered  md:w-60"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text lg:ml-5">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter you first name"
                className="input input-bordered  md:w-60 lg:ml-5 "
              />
            </div>
          </label>
          <label className="label">
            <span className="label-text ">Your Email</span>
          </label>
          <label className="input-group input-group-vertical mb-10">
            <input
              type="Email"
              placeholder="info@site.com"
              className="input input-bordered outline-none "
            />
          </label>
          <label className="label">
            <span className="label-text">What can we help</span>
          </label>
          <label className="input-group input-group-vertical mb-10">
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
            ></textarea>
          </label>
          <div className="grid justify-center">
            <button className="btn btn-secondary rounded-full md:w-80">
              <Link to="#">Send</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
