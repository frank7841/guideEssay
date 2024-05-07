import React from "react";
import { Link } from "react-router-dom";

const SupportCard = () => {
 
  return (
    <div className="border rounded-lg py-4 px-4  ">
      <h1 className="text-xl font-bold">Have a question?</h1>
      <div className="mt-10  text-gray-600">
        <div className="flex space-x-0 space-y-4 md:space-y-0 sm:space-x-4 flex-wrap flex-row ">
          <a
            className="flex justify-center items-center space-x-2"
            href="tel:254717500384"
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
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>

            <span>0717500384</span>
          </a>

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
            <span>support@essayinn.com </span>
          </a>
        </div>
        <br />
        <div className="flex flex-wrap flex-col sm:flex-row space-x-0 space-y-4 md:space-y-0 sm:space-x-20  ">
          <Link to={"/faq"} className="flex space-x-2 ">
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
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>

            <span>FAQ</span>
          </Link>
          <Link to={"/guarantees"} className="flex space-x-2 ">
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
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>

            <span>Guarantees</span>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <Link
          to={"/order"}
          className="bg-blue-400 px-2 py-2 text-white  rounded-md"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default SupportCard;
