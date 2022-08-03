import { Link } from "react-router-dom";

export default function FeaturesCards() {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-5 md:gap-10">
      {/*             Card 1                      */}
      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img
              src="./pic/Transfer.gif"
              className="w-20 m-2 inline "
              alt="Icon"
            />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Transfer</h2>
          </div>
        </div>
      </Link>

      {/*             Card 2                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img src="./pic/card.gif" className="w-20 m-2 inline " alt="Icon" />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">pay</h2>
          </div>
        </div>
      </Link>
      {/*             Card 3                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img
              src="./pic/Caution.gif"
              className="w-20 m-2 inline "
              alt="Icon"
            />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Urgents</h2>
          </div>
        </div>
      </Link>

      {/*             Card 4                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img
              src="./pic/Calendar.gif"
              className="w-20 m-2 inline "
              alt="Icon"
            />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Schedule</h2>
          </div>
        </div>
      </Link>

      {/*             Card 5                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img
              src="./pic/texting.gif"
              className="w-20 m-2 inline "
              alt="Icon"
            />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Custmer service</h2>
          </div>
        </div>
      </Link>

      {/*             Card 6                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img
              src="./pic/Compass.gif"
              className="w-20 m-2 inline "
              alt="Icon"
            />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Stats</h2>
          </div>
        </div>
      </Link>

      {/*             Card 7                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img
              src="./pic/Location.gif"
              className="w-20 m-2 inline "
              alt="Icon"
            />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Location</h2>
          </div>
        </div>
      </Link>

      {/*             Card 8                      */}

      <Link to="#">
        <div className="card  bg-base-100 shadow-xl flex  pl-0 p-4 md:p-8 ">
          <div className=" text-center">
            <img src="./pic/Back.gif" className="w-20 m-2 inline " alt="Icon" />
          </div>
          <div className="card-body p-0 items-center ">
            <h2 className="card-title ">Logout</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
