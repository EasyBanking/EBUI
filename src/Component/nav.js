import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState({
    name: "",
  });
  return (
    <div className="navbar  bg-secondary text-xs shadow-lg ">
      <div className="md:flex-1 ">
        <Link to="home" className=" normal-case text-xl">
          <img
            className="md:w-20 w-10"
            src="/pic/LogoSecodary.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              className="text-white font-bold md:text-base text-sm"
              to="home"
            >
              Home
            </Link>
          </li>
          <li className={`${user.name ? "block" : "hidden"}`}>
            <Link
              className="text-white font-bold md:text-base text-sm"
              to="app"
            >
              App
            </Link>
          </li>
          <li>
            <Link
              className="text-white font-bold md:text-base text-sm"
              to="about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="text-white font-bold md:text-base text-sm"
              to="faq"
            >
              FAQ
            </Link>
          </li>
          {user.name ? (
            <li className=" dropdown dropdown-end  font-bold md:text-base text-sm ">
              <label className="text-white" tabIndex="0">
                Hello, {user.name}
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 "
              >
                <li>
                  <Link to="#">Profile</Link>
                </li>
                <li>
                  <Link to="#">Setting</Link>
                </li>
                <li>
                  <Link to="contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="#">Logout</Link>
                </li>
              </ul>
            </li>
          ) : (
            <>
            <li>
              <Link
                className="text-white font-bold md:text-base text-sm"
                to="#"
              >
                Sign in
              </Link>
              </li>
              <span className="text-white font-bold md:text-base text-sm mt-3">/</span>
              <li>
              <Link
                className="text-white font-bold md:text-base text-sm"
                to="#"
              >
                Sign up
              </Link>
            </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
