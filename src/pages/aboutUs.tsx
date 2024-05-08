import React from "react";
import ProcessCard from "../components/process/processCard";
const processDescription = [
  {
    id: 1,
    icon: "../images/icon-done.svg",
    title: "Attention",
    body: "Every client is given unique attention. We consider your needs and directions, then go above and beyond. We urge our clients to submit as much information as they can, and our staff of knowledgeable analysts and writers will produce a paper that meets your requirements exactly.",
  },
  {
    id: 2,
    icon: "../images/icon-done.svg",
    title: "Reliability",
    body: "We promise dependable, knowledgeable services that go above and above for our clients. Should you be unsatisfied for any reason, we will provide a complete refund. That is the extent to which we regard honesty. Your loyalty is more value than all things in the world.",
  },
  {
    id: 3,
    icon: "../images/icon-done.svg",
    title: "Professionalism",
    body: "Having been in this service area for more than 10 years, our materials follow rigorous academic guidelines and are professionally done. Our customer support agents only act in a way that is intended to benefit you. Because we firmly believe in academic integrity, GuideMyClass is a reputable writing firm that adheres to the greatest standards.",
  },
];
export default function AboutUs() {
  return (
    <div className="mt-10 mb-8 font-sans">
      <div className="text-center px-4 text-gray-600">
        <div className="font-bold text-xl">About us</div>
        <h1 className="font-bold text-6xl mt-4 ">
          We provide academic
          <br />
          writing services
        </h1>
        <div className="flex justify-center mt-10">
          <p className="px-2 text-center max-w-4xl justify-center">
          a company that offers custom academic writing services and has over 7 years of
          experience in both the academic and business writing service sectors. We
          regularly give students advice on effective strategies for handling essays, term
          papers, theses, dissertations, and other kinds of writing. With over ten thousand
          customers a year and an 87% client retention rate, our service guarantees
          extremely high-quality papers.
          </p>
        </div>
        <div className="flex flex-row space-x-2 justify-center mt-4">
          <div className="border px-4 py-4 rounded">
            <div className="font-bold text-lg">10 000+</div>
            <div>customers per year</div>
          </div>
          <div className="border px-4 py-4 rounded">
            <div className="font-bold text-lg">85%</div>
            <div>customer payback</div>
          </div>
        </div>
      </div>
      <div className="justify-center px-2  mb-10 text-center ">
        <div className="mt-4 text-4xl font-bold">How it works</div>

        <div className="flex flex-wrap space-x-2 justify-center mt-4">
          {processDescription.map((item) => {
            return (
              <div key={item.id}>
                <ProcessCard
                  id={item.id}
                  title={item.title}
                  body={item.body}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center text-gray-600 text-lg">
        <p className="text-xl font-bold  ">
          GuideMyClass is a legitimate writing service and our strong <br />
          belief in academic integrity is held to the highest of <br />
          standards
        </p>
        <p className="mt-4">
        Our primary objective is to assist in providing a conceptual model for any papers you
        may be experiencing difficulty composing. We give you a great example of what an
        outstanding submission for your needed paper should look like by submitting a paper
        that is worthy of being turned in. The greatest authors in the writing services sector
        are ours. We are able to make this claim with pride since working as a writer for our 
        company requires a great deal of rigorous and intense employment procedures.
        </p>
        <p className="mt-4">
          Our writers are the very best in the writing service industry. We can
          proudly say this
          <br /> because of the significantly rigid and fierce employment
          protocols one has to go through
          <br /> before being employed as a writer with our firm.
        </p>
      </div>
      <div className="text-center text-gray-600 text-lg mt-12">
        <h1 className="font-bold text-2xl">Contact Us</h1>

        <p className=" mt-4 ">
        You can reach us using the information below if you have any queries <br/>
        about our business, our services, or employment-related matters.
        </p>
        <div className="mt-10 font-bold">
          <a
            className="flex justify-center items-center space-x-2"
            href="tel:19292010120"
          >
            <img
              src={require("../components/images/icon-flag-usa.svg").default}
              alt="EssayIn svg"
            />{" "}
            <span>+254727563625</span>
          </a>
          <br />
          <a
            href="mailto:support@GuideMyClass.com"
            className="flex justify-center items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
              />
            </svg>
            <span>support@GuideMyClass.com </span>
          </a>
          <br />
          <div className="flex space-x-2 justify-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span>5-9 Main Street, Gibraltar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
