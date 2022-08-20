import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LoaderWrapper } from "../../components/Loader";
import Nav from "../../components/nav";
import HttpClient from "../../Http-Client";
export default function Questions() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    HttpClient.get("/faqs")
      .then(({ data }) => {
        setFaqs(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!faqs.length) {
    return <LoaderWrapper />;
  }

  return (
    <section>
      <Nav />

      <div className="md:p-20 p-10">
        <p className="font-black  md:text-4xl text-2xl   pl-2 pb-3 text-center mb-10">
          Frequently asked questions
        </p>
        {faqs.map((f, i) => {
          return (
            <div
              tabIndex={i}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-10"
            >
              <div className="collapse-title text-xl font-medium after:text-primary">
                {f.title}
              </div>
              <div className="collapse-content">
                <p>{f.description}</p>
                <div className="flex flex-row mt-4">
                  {f.tags.map((t) => {
                    return (
                      <span className="bg-primary text-white mr-4 rounded-md py-1 px-2">
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <p className="font-2xl   text-2xl   pl-2 pb-3 text-center">
          Still have a questions?
        </p>
        <p className="text-center flex flex-col">
          <span>you're welcome to contact with us !</span>
          <Link to="/contact" className="text-primary mx-auto">
            <Button className="mt-3">Contact Us</Button>
          </Link>
        </p>
      </div>
    </section>
  );
}
