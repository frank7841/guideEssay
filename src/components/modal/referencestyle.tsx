import * as React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "antd";
import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { REFERENCESTYLE } from "../../types/referenceStyle";
interface PROPS {
  open: boolean;
  setOpen: (value: boolean) => void;
  currentRowDetails: REFERENCESTYLE;
  Store: any;
  refetch: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 6,
  overflow: "auto",
};

export default function ReferenceStyleModal(props: PROPS) {
  const { open, setOpen, Store, currentRowDetails, refetch } = props;
  const handleClose = () => setOpen(false);
  const [referenceStyle, setReferenceStyle] = useState(
    currentRowDetails.referencingStyleType
  );
  const [amount, setAmount] = useState(+currentRowDetails.amount);
  const [isLoading, setIsLoading] = useState(false);
  const UPDATEREFERENCESTYLE = gql`
    mutation UpdateReferenceStyle($input: updatereferencestyle) {
      updateReferenceStyle(input: $input) {
        _id
      }
    }
  `;
  const DELETEREFERENCESTYLE = gql`
    mutation DeleteReferenceStyle($referenceId: ID!) {
      deleteReferenceStyle(referenceId: $referenceId) {
        _id
      }
    }
  `;
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };

  const [updateReferenceStyle] = useMutation(UPDATEREFERENCESTYLE);
  const [deleteReferenceStyle] = useMutation(DELETEREFERENCESTYLE);

  const handleChangeReferenceStyle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReferenceStyle(event.target.value);
  };

  const handleUpdateDetails = () => {
    setIsLoading(true);

    Store.addNotification({
      title: "Updating",
      message: `updating Reference Style`,
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
      updateReferenceStyle({
        variables: {
          input: {
            _id: currentRowDetails._id,
            referencingStyleType: referenceStyle,
            amount: amount.toString(),
          },
        },
        onCompleted: (infoData) => {
          setOpen(false);
          Store.addNotification({
            title: "Success",
            message: `Reference Style updated successfully!!`,
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
          refetch();
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
      deleteReferenceStyle({
        variables: {
          referenceId: currentRowDetails._id,
        },
        onCompleted: (infoData) => {
          setOpen(false);
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
          refetch();
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

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="mt-2 ml-2">
              <div className="absolute top-2 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-6 h-6"
                  onClick={() => setOpen(false)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="font-bold text-xl ">Referencing Style</div>

              <div className=" font-semibold text-gray-700 mt-2 italic">
                Referencing Style
              </div>
              <div>
                <input
                  className="border-2 w-4/5  rounded-md mt-1 mb-3 px-2 bg-warmgray h-14 border-gray-500"
                  placeholder="Academic Level"
                  type="text"
                  onChange={handleChangeReferenceStyle}
                  value={referenceStyle}
                />
              </div>
              <div className=" font-semibold text-gray-700 mt-2 italic">
                Amount
              </div>
              <div>
                <input
                  className="border-2 w-4/5   rounded-md mt-1 mb-3 px-2 bg-warmgray h-14 border-gray-500"
                  placeholder="amount"
                  type="number"
                  step={0.01}
                  onChange={handleChangeAmount}
                  value={amount}
                />
              </div>

              <div className=" mt-4 w-full flex space-x-4 flex-row">
                <Button
                  loading={isLoading}
                  // disabled={isLoading}
                  className="bg-red-400 font-bold h-10 text-white space-x-2  rounded-lg  "
                  onClick={handleDeleteDetails}
                >
                  Delete
                </Button>
                <Button
                  loading={isLoading}
                  // disabled={isLoading}
                  className="bg-blue-400 font-bold h-10 text-white space-x-2  rounded-lg  "
                  onClick={handleUpdateDetails}
                >
                  Update
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
