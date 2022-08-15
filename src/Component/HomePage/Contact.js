import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div
      id="Contact"
      className=" bg-slate-100 grid grid-cols-1 gap-10  px-20 py-10 border"
    >
      <div className="grid content-center col-span-1 ">
        <div className=" text-center">
          <p className="font-black text-3xl lg:text-4xl md:text-2xl text-purple-900  pb-3">
            Say Hello To The
          </p>
          <p className="font-black text-3xl lg:text-4xl md:text-2xl text-purple-900   pb-3">
            Collaboration Hub
          </p>
        </div>
      </div>
      <div className="col-span-1 grid content-center justify-center">
        <button className="btn btn-primary rounded-full w-32">
          <Link to="/contact-us">Contact Us</Link>
        </button>
      </div>
    </div>
  );
}
