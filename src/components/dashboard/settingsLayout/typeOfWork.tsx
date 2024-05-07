import { useMutation, gql } from "@apollo/client";
import { Button } from "antd";
import { useState } from "react";

interface AccountInterface {
  Store: any;
}
const TypeOfWork: React.FC<AccountInterface> = (props) => {
  const { Store } = props;

  const [workType, setWorkType] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeWorkType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkType(event.target.value);
  };
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };
  const ADDWORK = gql`
    mutation Mutation($workType: String!, $amount: String!) {
      createWork(workType: $workType, amount: $amount) {
        _id
      }
    }
  `;

  const [addSubject] = useMutation(ADDWORK);

  const handleUpdateDetails = () => {
    Store.addNotification({
      title: "Adding...",
      message: `Adding Type of Work`,
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
    setIsLoading(true);
    try {
      addSubject({
        variables: {
          workType: workType,
          amount: amount.toString(),
        },
        onCompleted: (infoData) => {
          Store.addNotification({
            title: "Success",
            message: `Type of Work Added successfully!!`,
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

  return (
    <div className="mt-2 ml-2">
      <div className="font-bold text-xl ">Type Of Work</div>

      <div className=" font-semibold text-gray-700 mt-2 italic">Work Type</div>
      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="Work type"
          type="text"
          onChange={handleChangeWorkType}
          value={workType}
        />
      </div>
      <div className=" font-semibold text-gray-700 mt-2 italic">Amount</div>
      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="amount"
          type="number"
          step={0.01}
          onChange={handleChangeAmount}
          value={amount}
        />
      </div>

      <div className=" mt-4 w-full flex">
        <Button
          loading={isLoading}
          // disabled={isLoading}
          className="bg-blue-400 font-bold text-white space-x-2  rounded-lg  "
          onClick={handleUpdateDetails}
        >
          Add Work
        </Button>
      </div>
    </div>
  );
};

export default TypeOfWork;
