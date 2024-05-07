import { gql, useMutation } from "@apollo/client";
import { Button } from "antd";
import { useState } from "react";

interface AccountInterface {
  Store: any;
}
const AcadmicLevelLayout: React.FC<AccountInterface> = (props) => {
  const { Store } = props;

  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ADDACADEMICLEVEL = gql`
    mutation CreateAcademicLevel($academicLevel: String!, $amount: String!) {
      createAcademicLevel(academicLevel: $academicLevel, amount: $amount) {
        _id
      }
    }
  `;
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };

  const [addAcademicLevel] = useMutation(ADDACADEMICLEVEL);

  const handleChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };

  const handleUpdateDetails = () => {
    setIsLoading(true);

    Store.addNotification({
      title: "Adding",
      message: `Adding Academic Level`,
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
      addAcademicLevel({
        variables: {
          academicLevel: level,
          amount: amount.toString(),
        },
        onCompleted: (infoData) => {
          Store.addNotification({
            title: "Success",
            message: `Academic Level Added successfully!!`,
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
      <div className="font-bold text-xl ">Academic Level</div>

      <div className=" font-semibold text-gray-700 mt-2 italic">
        Academic Level
      </div>
      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="Academic Level"
          type="text"
          onChange={handleChangeLevel}
          value={level}
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
          Add Academic Level
        </Button>
      </div>
    </div>
  );
};

export default AcadmicLevelLayout;
