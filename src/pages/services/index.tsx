import React from "react";
import OrderCard from "../../components/order/addOrder";
import ServiceCard from "../../components/services/serviceCard";
import { gql, useQuery } from "@apollo/client";
import SpinnerLayout from "../../components/spinner";

interface SERVICES {
  _id: string;
  service: string;
}

const Services = () => {
  const ALLSERVICES = gql`
    query Query {
      allServices {
        _id
        service
      }
    }
  `;

  const { loading, error, data } = useQuery(ALLSERVICES);

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="mt-10 mb-8 font-sans">
      <div className="flex justify-between">
        <div className=" px-4 text-gray-600">
          <div className="font-bold text-xl">Services</div>
          <div className="flex flex-wrap w-3/4 2xl:w-2/5 ">
            {data.allServices.map((item: SERVICES) => {
              return (
                <div className="ml-4 mr-2 mt-4" key={item._id}>
                  {" "}
                  <ServiceCard name={item.service} id={item._id} />{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div className=" hidden lg:block mt-4 px-8 text-center font-bold">
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default Services;
