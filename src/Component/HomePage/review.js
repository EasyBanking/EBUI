export default function Review() {
  return (
    <div id="Review" className="grid grid-cols-1  bg-slate-50 p-20  ">
      <div className="text-center mb-10">
        <p className="font-3xl   lg:text-4xl text-2xl text-black  pl-2 pb-3">
          What Our Customers
        </p>
        <p className="font-3xl  lg:text-4xl text-2xl text-black  pl-2 pb-3">
          Have to Say
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-20  md:px-20 md:py-10  ">
        {/*             Card 1                      */}

        <div className="text-center lg:w-auto w-48">
          <div className="avatar mb-5">
            <div className="w-24 rounded-full ">
              <img
                src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                alt="Avater"
              />
            </div>
          </div>
          <p className="text-purple-700 mb-5">
            Welcome To The Best Model Winner Contest
          </p>
          <p className="lg:text-left lg:pl-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
          </p>
        </div>

        {/*             Card 2                      */}

        <div className="text-center lg:w-auto w-48">
          <div className="avatar mb-5">
            <div className="w-24 rounded-full ">
              <img
                src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="Avater"
              />
            </div>
          </div>
          <p className="text-purple-700 mb-5">
            Welcome To The Best Model Winner Contest
          </p>
          <p className="lg:text-left lg:pl-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
          </p>
        </div>

        {/*             Card 3                      */}

        <div className="text-center lg:w-auto w-48">
          <div className="avatar mb-5">
            <div className="w-24 rounded-full  ">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Avater"
              />
            </div>
          </div>
          <p className="text-purple-700 mb-5">
            Welcome To The Best Model Winner Contest
          </p>
          <p className="lg:text-left lg:pl-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
          </p>
        </div>
      </div>
    </div>
  );
}
