import React from "react";
import OrderCard from "../components/order/addOrder";
import FaqsCard from "../components/faqsCard";
import { gql, useQuery } from "@apollo/client";
import SpinnerLayout from "../components/spinner";
interface FAQLAYOUT {
  _id: string;
  answer: string;
  question: string;
}

export default function FAQS() {
  const GET_FAQS = gql`
    query Query {
      faqs {
        _id
        answer
        question
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_FAQS);

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="px-4 md:px-8 mt-4 mb-4 flex-col ">
      <h1 className="font-bold text-4xl text-center sm:text-start mb-4 sm:ml-8 ">
        FAQ
      </h1>
      <div className="flex flex-row  justify-between mt-4   ">
        <div className="w-5/5 md:w-4/5 ">
          {data.faqs.map((item: FAQLAYOUT) => {
            return <FaqsCard items={item} key={item._id} />;
          })}
        </div>
        <div className="hidden lg:block mt-4 px-8 text-center font-bold">
          <OrderCard />
        </div>
      </div>
    </div>
  );
}
