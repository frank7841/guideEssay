import React, { useState } from "react";
import InterWeaveDetails from "./interweave/interweave";

interface PROPS {
  items: {
    // ratings: number;
    _id: string;
    question: string;
    answer: string;
    // Academic: string;
    // Discipline: string;
    // url: string;
    // pages: string;
  };
}

export default function FaqsCard(props: PROPS) {
  const { items } = props;
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="card mb-4">
      <div className="border-y rounded px-4">
        <button
          className="flex justify-between py-4"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <h5 className="font-bold flex space-x-2 hover:text-blue-500">
            {showAnswer ? (
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
                  d="M19.5 12h-15"
                />
              </svg>
            ) : (
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            )}
            <span>{items.question}</span>
          </h5>
        </button>
        {showAnswer && (
          <div className="ml-8">
            <div className="mt-4 px-2 leading-relaxed tracking-normal">
              <InterWeaveDetails content={items.answer} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
