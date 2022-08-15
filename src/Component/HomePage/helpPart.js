export default function Help() {
  return (
    <div id="Help" className="grid grid-cols-1 p-20 ">
      <div className="text-center mb-10">
        <p className="font-extrabold   lg:text-4xl text-2xl text-purple-900  pl-2 pb-3">
          How Can We Help Your
        </p>
        <p className="font-extrabold   lg:text-4xl text-2xl text-purple-900  pl-2 pb-3">
          With Easy Bank !
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {/*             Card 1                      */}

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://img.icons8.com/nolan/64/certificate.png"
              alt="Manage Icon"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-5">Easily Manage</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              voluptas reprehenderit atque possimus sint excepturi praesentium
            </p>
          </div>
        </div>

        {/*             Card 2                      */}

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://img.icons8.com/nolan/64/pay.png"
              alt="Payment Icon"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-5">Get Payment Easily</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              voluptas reprehenderit atque possimus sint excepturi praesentium
            </p>
          </div>
        </div>

        {/*             Card 3                      */}

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://img.icons8.com/nolan/64/sent.png"
              alt="Message Icon"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-5">Quick Message</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              voluptas reprehenderit atque possimus sint excepturi praesentium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
