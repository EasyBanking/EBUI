import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar  bg-slate-50 ">
      <div className="md:flex-1">
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
          <li>
            <Link
              className="text-primary-focus font-bold md:text-base text-sm"
              to="contact-us"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
