import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-4 p-10 gap-20 ">
      <div>
        <img src="./Pic/LogoWhite.png" className="w-32 pb-10" alt="Logo" />
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptas
          reprehenderit atque possimus sint excepturi praesentium
        </p>
      </div>

      <div className="grid item-end py-10">
        
        <a href="#App" className="mb-4">
          App
        </a>
        <a href="#Features" className="mb-4">
          Features
        </a>
        <a href="#Help" className="mb-4">
          Help
        </a>

        <a href="#Review" className="mb-4">
          Reviews
        </a>
        <a href="#Contact" className="mb-4">
          Contact Us
        </a>
      </div>

      <div>
        <h1 className="font-bold mb-5">Support</h1>
        <Link to="#" className="block mb-4">
          Report a bug
        </Link>
        <Link to="#" className="block mb-4">
          Privancy Policy
        </Link>
        <Link to="#" className="block mb-4">
          Rerm &amp; Conditions
        </Link>
        <Link to="/faq" className="block mb-4 text-secondary">
          FAQ
        </Link>
      </div>

      <div>
        <h1 className="font-bold mb-5">Newsletter</h1>
        <p>Heaven fruitful doesn't over lesser in days Appear </p>
        <div className="mt-5 ml-5 grid grid-cols-2 text-sm ">
          <p className="mr-5 pt-2"> Email Address </p>
          <Link to="#" className="inline-block w-10">
            <img
              src="https://img.icons8.com/nolan/64/send-mass-email.png"
              alt="Email"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
