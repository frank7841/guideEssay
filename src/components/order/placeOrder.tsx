import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
interface PROPS {
  pageNumber: string;
  work: string;
  alignment: string;
  deadline: string;
  pagesCount: number;
  level: string;
  price: number;
  workAmount: number;
  levelAmount: number;
  deadlinePrice: number;
  alignmentAmount: number;
  expertPrice: number;
  boostPrice: number;
  finalPrice: number;
  setBoostPrice: (value: number) => void;
  setInitiatePayment: (value: boolean) => void;
  initiatePaymentHandler: () => void;
  setBoostIDs: any;

  setFinalPrice: (value: number) => void;
  setBoostDetails: any;
  boostDetails: [
    {
      _id: string;
      title: string;
      price: string;
    }
  ];
}

export default function PlaceOrderCard(props: PROPS) {
  const {
    pageNumber,
    work,
    pagesCount,
    alignment,
    deadline,
    level,
    workAmount,
    levelAmount,
    deadlinePrice,
    alignmentAmount,
    expertPrice,
    boostPrice,
    setBoostPrice,
    setBoostDetails,
    boostDetails,
    setFinalPrice,
    finalPrice,
    initiatePaymentHandler,
    setBoostIDs,
  } = props;

  // console.log(alignmentAmount);
  React.useEffect(() => {
    setFinalPrice(
      workAmount +
       
        // deadlinePrice +
        alignmentAmount +
        expertPrice +
        boostPrice
    );
  }, [
    workAmount,
    levelAmount,
    deadlinePrice,
    alignmentAmount,
    expertPrice,
    boostPrice,
    setFinalPrice,
  ]);

  return (
    <Card sx={{ minWidth: 350, borderRadius: 4 }}>
      <CardContent>
        <div className="mb-4">
          <h2>{work}</h2>
          <div className="flex flex-row justify-between">
            <span>Academic Level:</span>
            <span>{level}</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Page count:</span>
            <span>
              {pagesCount} page/{alignment === "0" ? "double" : "single"}-spaced
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span>Deadline:</span>
            <span>
              {" "}
              {/* {moment.fromNow(deadline).local().format("HH:mm:ss YYYY-MM-DD ")} */}
              {moment(deadline).fromNow()}
            </span>
          </div>
        </div>
        <hr />
        <div>
          {boostDetails?.map((boost) => {
            return (
              <div key={boost._id} className="flex justify-between">
                <div> {boost.title.substring(0, 26) + "..."}</div>
                <div className="flex space-x-2">
                  <div> ${boost.price}</div>
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
                  >
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
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <div>Promo code </div>
          <input
            className="px-2 rounded-md  py-2 border w-full mt-2"
            placeholder="Enter your promo code"
          />
        </div>
        <div className="my-2 mt-4 flex justify-between bg-gray-100 px-4 py-2 -mx-6">
          <span> TOTAL COST </span>
          <span className="text-green-600 text-bold">
            ${finalPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>
      {pageNumber === "three" && (
        <div className="justify-center mb-8 px-4">
          <div className="flex space-x-4">
            <div>Credit/debit card</div>
            {/* <div>Alternative Checkout</div> */}
          </div>
          <button
            className="bg-[#ffa608] px-4 py-2 font-sans w-full rounded-md text-white"
            onClick={initiatePaymentHandler}
          >
            Checkout
          </button>
          <div className="flex  space-x-2 text-xs ml-4 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span>Your card details will not be saved.</span>
          </div>
        </div>
      )}
    </Card>
  );
}
