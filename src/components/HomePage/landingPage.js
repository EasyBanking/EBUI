import { Container, Grid } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import baseImg from "./undraw_online_payments_re_y8f2.svg";
export default function Landing() {
  const [user, setUser] = useState({
    name: "",
  });
  return (
    <div id="App" className="bg-light mt-20">
      <Container>
        <Grid.Container>
          <Grid sm={6} xs={12}>
            <div className="h-full  flex  items-center justify-center sm:text-left text-center">
              <div>
                <p className="font-extrabold  md:text-4xl text-2xl text-purple-900  pl-2 pb-3">
                  Get Things Done
                </p>
                <p className="font-extrabold  md:text-4xl text-2xl text-purple-900  pl-2 pb-3">
                  With Easy Banking
                </p>
                <p className="pl-3 pb-10 text-xs text-fuchsia-900">
                  Easy banking is a banking bucket web application that help you
                  to do banking operations easly with a lowest effort ever.
                </p>

                <Link to={"/login"}>
                  <button className="btn btn-primary rounded-full">
                    login
                  </button>
                </Link>
                <Link to={"/register"} className="ml-4">
                  <button className="btn btn-outline btn-primary rounded-full">
                    rgister
                  </button>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid sm={6} className="sm:block hidden">
            <img src={baseImg} />
          </Grid>
        </Grid.Container>
      </Container>

      <div className="relative m-auto hidden md:block md:col-span-1 lg:before:bg-red-300 lg:before:top-13 lg:before:left-50    lg:before:h-32 before:w-32 lg: before:rounded-full lg:before:absolute lg:after:bg-purple-300 lg:after:bottom-10 lg:after:right-14    lg:after:h-20 after:w-20  lg:after:rounded-full lg:after:absolute "></div>
    </div>
  );
}
