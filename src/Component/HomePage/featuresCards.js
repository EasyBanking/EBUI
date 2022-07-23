export default function FeaturesCards() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-10">
      {/*             Card 1                      */}

      <div className="card  bg-base-100 shadow-xl flex flex-row pl-0 p-4 md:p-8 ">
        <div className="mr-5">
          <img
            src="https://img.icons8.com/nolan/64/timeline.png"
            className="w-10 m-2 inline"
            alt="Icon"
          />
        </div>
        <div className="card-body p-0  ">
          <h2 className="card-title">Easy to Customiz</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>

      {/*             Card 2                      */}

      <div className="card  bg-base-100 shadow-xl flex flex-row pl-0 p-4 md:p-8 justify-between">
        <div className="mr-5">
          <img
            src="https://img.icons8.com/nolan/64/timeline.png"
            className="w-10 m-2 inline"
            alt="Icon"
          />
        </div>
        <div className="card-body p-0  ">
          <h2 className="card-title">Extreme Security</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      {/*             Card 3                      */}

      <div className="card  bg-base-100 shadow-xl flex flex-row pl-0 p-4 md:p-8 justify-between">
        <div className="mr-5">
          <img
            src="https://img.icons8.com/nolan/64/timeline.png"
            className="w-10 m-2 inline"
            alt="Icon"
          />
        </div>
        <div className="card-body p-0  ">
          <h2 className="card-title">Customer Support</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      {/*             Card 4                      */}

      <div className="card  bg-base-100 shadow-xl flex flex-row pl-0 p-4  md:p-8 justify-between">
        <div className="mr-5">
          <img
            src="https://img.icons8.com/nolan/64/timeline.png"
            className="w-10 m-2 inline"
            alt="Icon"
          />
        </div>
        <div className="card-body p-0  ">
          <h2 className="card-title">Creative Design</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}
