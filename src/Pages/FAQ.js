import { Link } from "react-router-dom";

export default function Questions() {
  return (
    <div className="md:p-20 p-10">
      <p className="font-black  md:text-4xl text-2xl   pl-2 pb-3 text-center mb-10">
        Frequently asked questions
      </p>
      <div
        tabIndex="0"
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-10"
      >
        <div className="collapse-title text-xl font-medium after:text-secondary">
          Focus me to see content
        </div>
        <div className="collapse-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
            cumque veritatis odio consequuntur veniam aspernatur distinctio,
            exercitationem fugit nihil vero repellendus magni saepe?
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-10"
      >
        <div className="collapse-title text-xl font-medium after:text-secondary">
          Focus me to see content
        </div>
        <div className="collapse-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
            cumque veritatis odio consequuntur veniam aspernatur distinctio,
            exercitationem fugit nihil vero repellendus magni saepe?
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-10"
      >
        <div className="collapse-title text-xl font-medium after:text-secondary">
          Focus me to see content
        </div>
        <div className="collapse-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
            cumque veritatis odio consequuntur veniam aspernatur distinctio,
            exercitationem fugit nihil vero repellendus magni saepe?
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-10"
      >
        <div className="collapse-title text-xl font-medium after:text-secondary">
          Focus me to see content
        </div>
        <div className="collapse-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
            cumque veritatis odio consequuntur veniam aspernatur distinctio,
            exercitationem fugit nihil vero repellendus magni saepe?
          </p>
        </div>
      </div>
      <p className="font-2xl   text-2xl   pl-2 pb-3 text-center mb-10">
        Still have a questions?
      </p>
      <p className="text-center">
        Can't find answer you're looking for?Please contact with our friendly
        team{" "}
        <Link to="/contact-us" className="text-secondary">
          {" "}
          Contact Us{" "}
        </Link>{" "}
      </p>
    </div>
  );
}
