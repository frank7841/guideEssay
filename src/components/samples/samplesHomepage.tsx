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

export default function SamplesHomepage(props: PROPS) {
  const { items } = props;
  return (
    <div className=" mb-4  text-start ml-2">
      <div className="border rounded px-8 py-4 ">
        <Rating
          name="text-feedback"
          value={items.ratings}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {/* <div className="flex justify-between py-4"> */}
        <h5 className="font-bold  hover:text-blue-500">
          <span>{items.title}</span>{" "}
        </h5>
        {/* </div> */}
        {/* <hr /> */}

        <div className="flex space-x-2 flex-row text-gray-500">
          <div className="">Discipline:</div>
          <div className=" ">{items.Discipline}</div>
        </div>

        <div className="py-4 ">
          {/* <button className="   border border-blue-400 text-blue-400 px-4 py-4 rounded-lg font-bold">
            Download
          </button> */}
        </div>
      </div>
    </div>
  );
}
