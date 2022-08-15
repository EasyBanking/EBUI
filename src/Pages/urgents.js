export default function Urgents() {
  const data = [
    {
      type: "National id Document",
      txt: "National id is Not Valid Please Reupload it in Your Settings",
    },
    {
      type: "Info",
      txt: "We Are Apologize To Inform You That Your Schedule Day 21/7/2022 Is Postponed To 22/7/2022",
    },
    {
      type: "Info",
      txt: "We Are Apologize To Inform You That Your Schedule Day 21/7/2022 Is Postponed To 22/7/2022",
    },
    {
      type: "Info",
      txt: "We Are Apologize To Inform You That Your Schedule Day 21/7/2022 Is Postponed To 22/7/2022",
    },
    {
      type: "Info",
      txt: "We Are Apologize To Inform You That Your Schedule Day 21/7/2022 Is Postponed To 22/7/2022",
    },
  ];
  return (
    <div className="py-20   px-5 justify-evenly flex flex-col">
      <div>
        <p className="font-black  md:text-4xl text-2xl   pl-2 pb-3 text-center mb-10">
          Transfer Money
        </p>
      </div>
      <div className="md:px-20">
        {data
          ? data.map((item, i) => {
              return (
                <ul className=" p-5 m-5 rounded-lg  bg-slate-50" key={i}>
                  <li
                    className={` mb-5 text-2xl font-extrabold  ${
                      item.type === "National id Document"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {item.type}
                  </li>
                  <p className="  ml-5 font-semibold">{item.txt}</p>
                </ul>
              );
            })
          : null}
      </div>
    </div>
  );
}
