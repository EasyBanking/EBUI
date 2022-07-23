export default function Price() {
  return (
    <div
      id="Pricing"
      className="grid grid-cols-1 bg-gradient-to-r from-pink-500 to-purple-500 p-20 pt-20 lg:relative lg:h-96 "
    >
      <div className="text-center mb-10">
        <p className="font-extrabold   lg:text-4xl text-2xl text-white  pl-2 pb-3">
          Choose Your Very Best
        </p>
        <p className="font-extrabold   lg:text-4xl text-2xl text-white  pl-2 pb-3">
          Pricing Plan
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-5 justify-items-center md:px-20 md:py-10 lg:absolute lg:top-2/4 w-full ">
        {/*             Card 1                      */}

        <div className="card  bg-base-100 shadow-xl lg:w-auto w-56 px-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-5">2 Years</h2>
            <p className="font-extrabold   lg:text-4xl text-2xl text-purple-900  pl-2 pb-3">
              $05 <span className="text-xs">/month</span>
            </p>
            <p className="mb-5">
              increase traffic 50%
              <br />
              E-mail support
              <br />
              10 Free Optimization
              <br />
              24/7 support
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        {/*             Card 2                      */}

        <div className="card  bg-base-100 shadow-xl lg:w-auto w-56 px-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-5">2 Years</h2>
            <p className="font-extrabold   lg:text-4xl text-2xl text-purple-900  pl-2 pb-3">
              $05 <span className="text-xs">/month</span>
            </p>
            <p className="mb-5">
              increase traffic 50%
              <br />
              E-mail support
              <br />
              10 Free Optimization
              <br />
              24/7 support
            </p>
            <div className="card-actions">
              <button className="btn btn-secondary">Get Started</button>
            </div>
          </div>
        </div>

        {/*             Card 3                      */}

        <div className="card  bg-base-100 shadow-xl lg:w-auto w-56 px-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-5">2 Years</h2>
            <p className="font-extrabold   lg:text-4xl text-2xl text-purple-900  pl-2 pb-3">
              $05 <span className="text-xs">/month</span>
            </p>
            <p className="mb-5">
              increase traffic 50%
              <br />
              E-mail support
              <br />
              10 Free Optimization
              <br />
              24/7 support
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
