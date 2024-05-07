import React from "react";
interface PROPS {
  version: boolean;
  setVersion: (value: boolean) => void;
  plagiarism: boolean;
  setPlagiarism: (value: boolean) => void;
  priority: boolean;
  setPriority: (value: boolean) => void;
  summary: boolean;
  setSummary: (value: boolean) => void;
  draft: boolean;
  setDraft: (value: boolean) => void;
  qualityCheck: boolean;
  setQualityCheck: (value: boolean) => void;
  setPageNumber: (value: string) => void;
  setBoostIDs: any;
  boostPrice: number;
  setBoostPrice: (value: number) => void;
  setBoostDetails: any;
  boostDetails: [
    {
      _id: string;
      title: string;
      price: string;
    }
  ];
  allBoostRates: [
    {
      _id: string;
      price: string;
      description: string;
      title: string;
    }
  ];
}
const BoostYourWork = (props: PROPS) => {
  const {
    setPageNumber,

    allBoostRates,
    setBoostPrice,
    boostPrice,
    setBoostDetails,
    boostDetails,
    setBoostIDs,
  } = props;

  return (
    <div>
      <h1 className="font-bold text-2xl">
        Boost your work with extra services
      </h1>
      <div className="mt-4">
        {allBoostRates.map((boost) => {
          return (
            <div
              className="bg-gray-100 rounded-lg px-4 py-4 mb-4"
              key={boost._id}
            >
              <h2 className="font-bold ">{boost.title}</h2>
              <div className="flex justify-between mt-4 ">
                <p className="w-3/5">{boost.description}</p>

                {boostDetails.filter((e) => e._id === boost._id).length ===
                0 ? (
                  <button
                    className="px-2 h-16 py-2 bg-white rounded-lg flex flex-wrap justify-center space-x-2"
                    onClick={() => {
                      if (
                        boostDetails.filter((e) => e._id === boost._id)
                          .length === 0
                      ) {
                        /* vendors contains the element we're looking for */
                        setBoostDetails((prev: any) => [
                          ...prev,
                          {
                            _id: boost._id,
                            title: boost.title,
                            price: boost.price,
                          },
                        ]);
                        setBoostPrice(boostPrice + parseInt(boost.price));
                        setBoostIDs((prev: any) => [...prev, boost._id]);
                      }
                    }}
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span>Add for ${boost.price}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setBoostDetails((prev: any) => {
                        return prev.filter(
                          (item: any) => item._id !== boost._id
                        );
                      });
                      setBoostIDs((prev: any) => {
                        return prev.filter((item: any) => item !== boost._id);
                      });
                      setBoostPrice(boostPrice - parseInt(boost.price));
                    }}
                    // onClick={() => setPlagiarism(!plagiarism)}
                    className="px-2 h-16 bg-blue-400 text-white  rounded-lg flex flex-wrap justify-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mt-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-sm">Added for ${boost.price}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {/* <div className="bg-gray-100 rounded-lg px-4 py-4 mb-4">
          <h2 className="font-bold ">Plagiarism report</h2>
          <div className="flex justify-between mt-4 ">
            <p className="w-3/5">Certified proof of your work's uniqueness</p>
            {plagiarism ? (
              <button
                onClick={() => setPlagiarism(!plagiarism)}
                className="px-4 h-12 text-white py-2 bg-blue-400 rounded-lg flex space-x-2"
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span>Added for $14.99</span>
              </button>
            ) : (
              <button
                onClick={() => setPlagiarism(!plagiarism)}
                className="px-2 py-2 bg-white rounded-lg flex space-x-2"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add for $14.99</span>
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-4 mb-4">
          <h2 className="font-bold ">High priority status</h2>
          <div className="flex justify-between mt-4 ">
            <p className="w-3/5">
              Your order will be the first in line to get an expert
            </p>
            {priority ? (
              <button
                onClick={() => setPriority(!priority)}
                className="px-4 h-12 text-white py-2 bg-blue-400 rounded-lg flex space-x-2"
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span>Added for $9.99</span>
              </button>
            ) : (
              <button
                onClick={() => setPriority(!priority)}
                className="px-2 py-2 bg-white rounded-lg flex space-x-2"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add for $9.99</span>
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-4 mb-4">
          <h2 className="font-bold ">1-page summary</h2>
          <div className="flex justify-between mt-4 ">
            <p className="w-3/5">A brief outline of your work’s key point</p>
            {summary ? (
              <button
                onClick={() => setSummary(!summary)}
                className="px-4 h-12 text-white py-2 bg-blue-400 rounded-lg flex space-x-2"
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span>Added for $24.99</span>
              </button>
            ) : (
              <button
                onClick={() => setSummary(!summary)}
                className="px-2 py-2 bg-white rounded-lg flex space-x-2"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add for $24.99</span>
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-4 mb-4">
          <h2 className="font-bold ">Initial draft</h2>
          <div className="flex justify-between mt-4 ">
            <p className="w-3/5">
              A pro editor will double-check your paper for mistakes
            </p>
            {draft ? (
              <button
                onClick={() => setDraft(!draft)}
                className="px-4 h-12 text-white py-2 bg-blue-400 rounded-lg flex space-x-2"
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span>Added for $134.00</span>
              </button>
            ) : (
              <button
                onClick={() => setDraft(!draft)}
                className="px-2 py-2 bg-white rounded-lg flex space-x-2"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add for $134.00</span>
              </button>
            )}
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-4 mb-4">
          <h2 className="font-bold ">Quality check</h2>
          <div className="flex justify-between mt-4 ">
            <p className="w-3/5">
              You'll get 30% of the work halfway to your deadline
            </p>
            {qualityCheck ? (
              <button
                onClick={() => setQualityCheck(!qualityCheck)}
                className="px-4 h-12 text-white py-2 bg-blue-400 rounded-lg flex space-x-2"
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span>Added for $469.00</span>
              </button>
            ) : (
              <button
                onClick={() => setQualityCheck(!qualityCheck)}
                className="px-2 py-2 bg-white rounded-lg flex space-x-2"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add for $469.00</span>
              </button>
            )}
          </div>
        </div> */}
      </div>
      <div className="justify-start flex mb-8 px-4">
        <button
          onClick={() => {
            setPageNumber("two");
            window.scrollTo(0, 0);
          }}
          className="text-gray-600 px-4 py-2 font-sans  rounded-md flex space-x-2"
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
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          <span>Previous Step</span>
        </button>
      </div>
    </div>
  );
};

export default BoostYourWork;
