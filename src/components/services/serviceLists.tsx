import React from "react";
import { Link } from "react-router-dom";

const serviceLists = [
  {
    id: 1,
    name: "Essay",
  },
  {
    id: 2,
    name: "Coursework",
  },
  {
    id: 3,
    name: "Homework",
  },
  {
    id: 4,
    name: "Speech",
  },
  {
    id: 5,
    name: "Term paper",
  },
  {
    id: 6,
    name: "Presentation",
  },
  {
    id: 7,
    name: "Dissertation",
  },
  {
    id: 8,
    name: "Case Study",
  },
  {
    id: 9,
    name: "Research paper",
  },
  {
    id: 10,
    name: "Report",
  },
  {
    id: 11,
    name: "Book/Movie Review",
  },
  {
    id: 12,
    name: "Resume/Cover letter",
  },
];

const ServiceLists = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl mb-4">Our services</h1>
      <div className="flex flex-wrap w-4/4 sm:w-4/4  2xl:w-3/4   justify-center">
        {serviceLists.map((item) => {
          const slugUrl = item.name.replace(/[^A-Z0-9.]+/gi, "-").toLowerCase();

          return (
            <Link
              to={slugUrl}
              key={item.id}
              className="flex flex-row space-x-2 w-44 mb-4 ml-4 hover:text-[#0693e3]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#0693e3"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h2>{item.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceLists;
