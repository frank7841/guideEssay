import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { SINGLEORDER } from "../../types/singleOrder";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";
import { Button } from "antd";
interface PROPS {
  open: boolean;
  setOpen: (value: boolean) => void;
  currentRowDetails: SINGLEORDER;
  Store: any
  refetch:()=>void;
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

export default function OrderDetailsModal(props: PROPS) {
  const { open, setOpen, currentRowDetails, Store, refetch } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClose = () => setOpen(false);

  const DELETEORDER = gql`
  mutation DeleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId) {
      _id
    }
  }
`;
const [deleteOrder] = useMutation(DELETEORDER);
const handleDeleteDetails = () => {
  setIsLoading(true);

  Store.addNotification({
    title: "Deleting",
    message: `deleting Order`,
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
    deleteOrder({
      variables: {
        orderId: currentRowDetails._id,
      },
      onCompleted: (infoData) => {
        setOpen(false);
        Store.addNotification({
          title: "Success",
          message: `Order Deleted successfully!!`,
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
            <div className="align-center">
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> Topic </div>
                  <div>{currentRowDetails.topic}</div>
                </div>
                <div className="">
                  <div className="font-bold"> Instructions </div>
                  <div> {currentRowDetails.instructions}</div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> pages </div>
                  <div>{currentRowDetails.noOfPages}</div>
                </div>
                <div className="">
                  <div className="font-bold"> Academic Level </div>
                  <div>{currentRowDetails.academicLevel?.academicLevel}</div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> File Url </div>

                  <button
                    onClick={() => {
                      // params.value.forEach((value: string) => window.open(value));
                      for (
                        var i = 0;
                        i < currentRowDetails.attachmentUrl.length;
                        i++
                      ) {
                        // link.setAttribute("href", urls[i]);
                        // link.click();
                        window.open(
                          currentRowDetails.attachmentUrl[i],
                          "_blank"
                        );
                      }
                    }}
                    className="underline text-blue-500"
                  >
                    Download
                  </button>
                </div>
                <div className="">
                  <div className="font-bold"> Deadline</div>
                  <div>
                    {moment
                      .utc(currentRowDetails.deadline)
                      .local()
                      .format("MM-DD-YYYY HH:mm")}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> email</div>
                  <div>{currentRowDetails.email}</div>
                </div>
                <div className="">
                  <div className="font-bold"> phonenumber</div>
                  <div>{currentRowDetails.phonenumber}</div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> Sources</div>
                  <div>{currentRowDetails.noOfSources}</div>
                </div>
                <div className="">
                  <div className="font-bold"> referencing style</div>
                  <div></div>
                  {currentRowDetails.referencingStyle?.referencingStyleType}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> subject</div>
                  <div>{currentRowDetails.subject?.subjectName}</div>
                </div>
                <div className="">
                  <div className="font-bold"> work</div>
                  <div>{currentRowDetails.work?.workType}</div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="font-bold"> Creator</div>
                  <div>{currentRowDetails.user?.username}</div>
                </div>
                <div className="">
                  <div className="font-bold"> Date Added</div>
                  <div>
                    {moment
                      .utc(currentRowDetails.createdAt)
                      .local()
                      .format("MM-DD-YYYY HH:mm")}
                  </div>
                </div>
              </div>
            </div>
                <Button
                  loading={isLoading}
                  // disabled={isLoading}
                  className="bg-red-400 font-bold h-10 text-white space-x-2  rounded-lg  "
                  onClick={handleDeleteDetails}
                >
                  Delete
                </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
