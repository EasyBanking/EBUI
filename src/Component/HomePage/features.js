import { useState } from "react";
import FeaturesCards from "./featuresCards";

export default function Features() {
  const [user, setUser] = useState({
    name: "Radwa",
    balance: "10,500",
  });
  return (
    <div id="Features" className="grid grid-cols-1  md:p-20 p-10 gap-10">
      <div>
        <p className="mb-5">hello {user.name}</p>
        <p className="font-extrabold  text-3xl lg:text-4xl md:text-2xl mb-5  ">
          Welcome Back.
        </p>
        <div className="bg-purple-700 p-5 rounded-lg">
          <p className="text-white mb-5">Balance</p>
          <p className="font-extrabold  text-3xl lg:text-4xl md:text-2xl  text-white ">
            {user.balance} El
          </p>
        </div>
      </div>
      <div className="col-span-2 ">
        <FeaturesCards />
      </div>
    </div>
  );
}
