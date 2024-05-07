import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Divider } from "antd";
import InterWeaveDetails from "../../components/interweave/interweave";
import SpinnerLayout from "../../components/spinner";
import { useAppSelector } from "../../redux/hooks";
import { Store, ReactNotifications } from "react-notifications-component";

const GuaranteesSlug = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const state = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = useAppSelector((state) => state.userInfo.value);
  const GETOPENEDGUARANTEE = gql`
    query OneGuarantees($guaranteeId: ID!) {
      oneGuarantees(guaranteeId: $guaranteeId) {
        _id
        content
        title
      }
    }
  `;
  const DELETEGUARANTEE = gql`
    mutation DeleteGuarantee($guaranteeId: ID!) {
      deleteGuarantee(guaranteeId: $guaranteeId) {
        _id
      }
    }
  `;
  const [deleteService] = useMutation(DELETEGUARANTEE);
  const { loading, error, data } = useQuery(GETOPENEDGUARANTEE, {
    variables: {
      guaranteeId: state,
    },
  });

  const handleDeleteDetails = () => {
    setIsLoading(true);

    Store.addNotification({
      title: "Deleting",
      message: `Deleting Guarantee `,
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
          guaranteeId: state,
        },
        onCompleted: (infoData) => {
          Store.addNotification({
            title: "Success",
            message: `Guarantee  Deleted successfully!!`,
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
          navigation("/guarantees")
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
    <div>
      <ReactNotifications />
      <article className="px-4 mt-4 ">
        <div className="flex justify-center items-center my-4">
          <div className="w-3/5">
            <header className="flex justify-center mb-2">
              <h1 className="text-black font-bold text-3xl">
                {data.oneGuarantees.title}
              </h1>
            </header>
            <Divider className="w-full px-8" />

            <div className="mt-4 px-2 leading-relaxed tracking-normal">
              <InterWeaveDetails content={data.oneGuarantees.content} />
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
          </div>
        </div>
      </article>
    </div>
  );
};

export default GuaranteesSlug;
