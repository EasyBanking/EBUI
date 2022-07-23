import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      id="App"
      className="bg-slate-50 grid sm:grid-cols-1 gap-10 md:grid-cols-2  md:p-20  px-0"
    >
      <div className="grid content-center col-span-1 p-10">
        <div className="pl-6">
          <p className="text-xs text-fuchsia-900 font-bold pb-3 ">
            APP LANDING PAGE
          </p>
          <p className="font-extrabold  md:text-4xl text-2xl text-purple-900  pl-2 pb-3">
            Get Things Done
          </p>
          <p className="font-extrabold  md:text-4xl text-2xl text-purple-900  pl-2 pb-3">
            With Easy Bank
          </p>
          <p className="pl-3 pb-10 text-xs text-fuchsia-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
            cumque veritatis odio consequuntur veniam aspernatur distinctio,
            exercitationem fugit nihil vero repellendus magni saepe?
          </p>

          <button className="btn btn-secondary rounded-full">
            <Link to="#">Dowenload</Link>
          </button>
        </div>
      </div>
      <div className="relative m-auto hidden md:block md:col-span-1 lg:before:bg-red-300 lg:before:top-13 lg:before:left-50    lg:before:h-32 before:w-32 lg: before:rounded-full lg:before:absolute lg:after:bg-purple-300 lg:after:bottom-10 lg:after:right-14    lg:after:h-20 after:w-20  lg:after:rounded-full lg:after:absolute ">
        <img
          className="w-2/5  overflow-hidden m-auto   "
          src="./pic/Mobile5.png"
          alt="Mobile"
        />
      </div>
    </div>
  );
}
