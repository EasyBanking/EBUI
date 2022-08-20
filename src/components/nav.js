import { Container } from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar  bg-primary text-xs shadow-lg ">
      <Container>
        <div className="text-white flex flex-row items-center">
          <div>
            <button className="btn btn-ghost  btn-sm text-white">
              <Link className="text-white" to="/">
                easy banking
              </Link>
            </button>
          </div>
          <ul className="flex flex-row items-center m-0 p-0 ml-auto">
            <li className="p-0 m-0">
              <button className="btn btn-ghost  btn-sm text-white">
                <Link className="text-white" to="/locations">
                  locations
                </Link>
              </button>
            </li>

            <li className="m-0 p-0">
              <button className="btn btn-ghost  btn-sm text-white">
                <Link className="text-white" to="/faqs">
                  faqs
                </Link>
              </button>
            </li>

            <li className="m-0 p-0">
              <button className="btn btn-ghost  btn-sm text-white">
                <Link className="text-white" to="/contact">
                  contact
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
