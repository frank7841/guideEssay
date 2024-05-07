import React from "react";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
interface PROPS {
  items: {
    ratings: number;
    title: string;
    Academic: string;
    Discipline: string;
    url: string;
    pages: string;
  };
}

export default function SamplesCard(props: PROPS) {
  const { items } = props;
  return (
    <div className="card mb-4">
      <div className="border rounded px-4">
        <div className="flex justify-between py-4">
          <h5 className="font-bold flex space-x-2 hover:text-blue-500">
            <span>{items.title}</span>{" "}
            {/* <svg
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg> */}
          </h5>

          <Rating
            name="text-feedback"
            value={items.ratings}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </div>
        <hr />
        <div className="flex justify-between py-4">
          <div>
            <div className="text-gray-500">Academic Level:</div>
            <div className="font-semibold mt-2">{items.Academic}</div>
          </div>
          <div>
            <div className="text-gray-500">Discipline:</div>
            <div className="font-semibold mt-2">{items.Discipline}</div>
          </div>
          <div>
            <div className="text-gray-500">Pages:</div>
            <div className="font-semibold mt-2">{items.pages}</div>
          </div>
        </div>
        <hr />

        <div className="py-4 flex justify-center">
          <button className="   border border-blue-400 text-blue-400 px-4 py-4 rounded-lg font-bold">
            Order a similar custom paper
          </button>
        </div>
      </div>
    </div>
  );
}
