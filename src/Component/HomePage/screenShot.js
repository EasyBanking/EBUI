export default function ScreenShot() {
  return (
    <div className=" grid grid-cols-1 gap-10 lg:grid-cols-2 p-20 ">
      <div className="grid content-center col-span-1 md:p-10">
        <div className="md:pl-6 lg:text-left text-center">
          <p className="font-extrabold  lg:text-4xl text-2xl text-purple-700   pb-3">
            Easy Bank APP
          </p>
          <p className="font-extrabold  lg:text-4xl text-2xl text-purple-700   pb-7">
            Screenshot
          </p>
          <p className=" pb-10 text-sm text-fuchsia-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas reprehenderit atque possimus sint excepturi praesentium
            cumque veritatis odio consequuntur veniam aspernatur distinctio,
            exercitationem fugit nihil vero repellendus magni saepe?
          </p>
        </div>
      </div>
      <div className="relative m-auto block md:col-span-1   ">
        <img
          className="  overflow-hidden m-auto rounded-xl  "
          src="./pic/Screenshot.png"
          alt="Mobile"
        />
      </div>
    </div>
  );
}
