import React, { useState } from "react";
import SupportCard from "../../components/services/supportCard";
import ServiceLists from "../../components/services/serviceLists";
import { useLocation } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Divider } from "antd";
import InterWeaveDetails from "../../components/interweave/interweave";
import SpinnerLayout from "../../components/spinner";
import { Store, ReactNotifications } from "react-notifications-component";
import { Button } from "antd";
import { useAppSelector } from "../../redux/hooks";

const Essay = () => {
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useAppSelector((state) => state.userInfo.value);

  const GETOPENEDSERVICE = gql`
    query OneServices($serviceId: ID!) {
      oneServices(serviceId: $serviceId) {
        _id
        content
        title
      }
    }
  `;
  const DELETESERVICE = gql`
    mutation Mutation($serviceId: ID!) {
      deleteService(serviceId: $serviceId) {
        _id
      }
    }
  `;
  const [deleteService] = useMutation(DELETESERVICE);

  const { loading, error, data } = useQuery(GETOPENEDSERVICE, {
    variables: {
      serviceId: state,
    },
  });
  const handleDeleteDetails = () => {
    setIsLoading(true);

    Store.addNotification({
      title: "Deleting",
      message: `deleteing Reference Style`,
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
    try {
      deleteService({
        variables: {
          serviceId: state,
        },
        onCompleted: (infoData) => {
          Store.addNotification({
            title: "Success",
            message: `Reference Style Deleted successfully!!`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          setIsLoading(false);
        },
        onError: ({ graphQLErrors, networkError }) => {
          setIsLoading(false);

          if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
              Store.addNotification({
                title: "Error!!",
                message: `${message}`,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
              });
            });
          }
          if (networkError) console.log(`[Network error]: ${networkError}`);
        },
      });
    } catch (err: any) {
      Store.addNotification({
        title: "Error!!",
        message: `${err.message}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      setIsLoading(false);
    }
  };

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <article className="px-4 mt-4 ">
      <ReactNotifications />
      <div className="flex justify-center items-center my-4">
        <div className="w-3/5">
          <header className="flex justify-center mb-2">
            <h1 className="text-black font-bold text-3xl">
              {data.oneServices.title}
            </h1>
          </header>
          <Divider className="w-full px-8" />

          <div className="mt-4 px-2 leading-relaxed tracking-normal">
            <InterWeaveDetails content={data.oneServices.content} />
          </div>
          {userDetails.role === "Admin" && (
            <div className=" mt-4 w-full flex space-x-4 flex-row my-4 justify-end">
              <Button
                loading={isLoading}
                // disabled={isLoading}
                className="bg-red-400 font-bold h-10 text-white space-x-2  rounded-lg  "
                onClick={handleDeleteDetails}
              >
                Delete
              </Button>
            </div>
          )}
          <SupportCard />
          <div className=" mt-4">
            <ServiceLists />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Essay;
