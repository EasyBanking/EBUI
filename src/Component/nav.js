import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-daisyui";
export default function Navbar() {
  const [user, setUser] = useState({
    name: "Radwa",
  });
  return (
    <div className="navbar  bg-slate-50 text-xs">
      <div className="md:flex-1 ">
        <Link to="home" className=" normal-case text-xl">
          <img className="md:w-20 w-10" src="/pic/LogoSlate.png" alt="Logo" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              className="text-primary-focus font-bold md:text-base text-sm"
              to="home"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className="text-primary-focus font-bold md:text-base text-sm"
              to="about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="text-primary-focus font-bold md:text-base text-sm"
              to="faq"
            >
              FAQ
            </Link>
          </li>

          <li className="dropdown dropdown-end text-primary-focus font-bold md:text-base text-sm ">
            <label tabIndex="0">Hello, {user.name}</label>
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
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
        </ul>
      </div>
    </div>
  );
}
