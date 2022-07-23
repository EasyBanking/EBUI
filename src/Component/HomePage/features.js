import FeaturesCards from "./featuresCards";

export default function Features() {
  return (
    <div
      id="Features"
      className="grid grid-cols-1 lg:grid-cols-3 md:p-20 p-10 gap-10"
    >
      <div className="col-span-1 grid justify-around content-evenly">
        <img src=".\pic\Features.png" className="" alt="Features" />
      </div>
      <div className="col-span-2 ">
        <p className="font-extrabold  text-3xl lg:text-4xl md:text-2xl text-purple-900  pl-2 pb-3">
          Some of the beast features
        </p>
        <p className="font-extrabold text-3xl  lg:text-4xl md:text-2xl text-purple-900  pl-2 pb-3">
          Of Our APP!
        </p>
        <FeaturesCards />
      </div>
    </div>
  );
}
