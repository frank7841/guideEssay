import React from "react";
// import ProcessCard from "../components/process/processCard";
const processDescription = [
  {
    id: 1,
    icon: "../images/icon-done.svg",
    title: "Attention",
    body: "Every customer is treated as special. Your requirements and instructions are taken into account and then surpassed. We encourage our customers to provide as much detail as possible and our team of expert analyst and writers will provide a paper modeled to your satisfaction.",
  },
  {
    id: 2,
    icon: "../images/icon-done.svg",
    title: "Reliability",
    body: "We guaranty reliable and expert services that surpass client’s expectations, and if by any chance you are not satisfied, then we will offer a full refund. That’s the degree to which we value integrity. Your loyalty is more value than all the money in the world.",
  },
  {
    id: 3,
    icon: "../images/icon-done.svg",
    title: "Professionalism",
    body: "With over a decade in this service domain, our contents adhere to strict academic standards and professionalism. Our customer service representatives conduct themselves in only manners that aim to serve you.",
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
            A custom academic writing service provider with over a 7 years of
            extensive experience in the academic and business writing service
            domain. We are consistently engaged in advising students on the
            methodologies of how to cope with essay writing, term papers,
            thesis, dissertation and any other types of writings. With over 10
            hundred clients annually, and a client return rate of a 85 %, our
            service aims to ensure top notch quality papers.
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

   
      </div>
      <div className="text-center text-gray-600 text-lg">
        <p className="text-xl font-bold  ">
          GuideMyClass is a legitimate writing service and our strong <br />
          belief in academic integrity is held to the highest of <br />
          standards
        </p>
        <p className="mt-4">
          Our main goal is to help present a conceptual model of papers you
          might be having
          <br /> challenges writing. By presenting a paper worthy of turning in,
          we provide you with what <br /> an excellent model of your required
          paper should look like.
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
          Here you will find contact details for which you can contact us with
          any questions
          <br /> about our company, our services or employment issues.
        </p>
        <div className="mt-10 font-bold">
          <a
            className="flex justify-center items-center space-x-2"
            href="tel:19292010120"
          >
       
            <span>+447365270700</span>
          </a>
          <br />
          <a
            href="mailto:support@extraessay.com"
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
