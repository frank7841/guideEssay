import { useMutation, gql } from "@apollo/client";
import { Button } from "antd";
import { useState } from "react";

interface AccountInterface {
  Store: any;
}
const ReferencingStyle: React.FC<AccountInterface> = (props) => {
  const { Store } = props;

  const [referenceStyle, setReferenceStyle] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeReferenceType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReferenceStyle(event.target.value);
  };
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };
  const ADDREFERENCINGSTYLE = gql`
    mutation CreateReferenceStyle(
      $referencingStyleType: String!
      $amount: String!
    ) {
      createReferenceStyle(
        referencingStyleType: $referencingStyleType
        amount: $amount
      ) {
        _id
      }
    }
  `;

  const [addReferenceStyle] = useMutation(ADDREFERENCINGSTYLE);

  const handleUpdateDetails = () => {
    Store.addNotification({
      title: "Adding",
      message: `Adding Reference Style`,
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
      addReferenceStyle({
        variables: {
          referencingStyleType: referenceStyle,
          amount: amount.toString(),
        },
        onCompleted: (infoData) => {
          setIsLoading(false);

          Store.addNotification({
            title: "Success",
            message: `Refernce Style Added successfully!!`,
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
      <div className="font-bold text-xl ">Referencing Style</div>

      <div className=" font-semibold text-gray-700 mt-2 italic">
        Referencing Style
      </div>
      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="Referencing Style"
          type="text"
          onChange={handleChangeReferenceType}
          value={referenceStyle}
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
          Add Reference Style
        </Button>
      </div>
    </div>
  );
};

export default ReferencingStyle;
