import { useMutation, gql } from "@apollo/client";
import { Button } from "antd";
import { useState } from "react";

interface AccountInterface {
  Store: any;
  allPricesRates: {
    _id: string;
    hourlyRate: string;
    pricePerDoublePage: string;
    pricePerSinglePage: string;
  };
}
const HourlyRate: React.FC<AccountInterface> = (props) => {
  const { Store, allPricesRates } = props;

  const [hourlyRate, setHourlyRate] = useState(+allPricesRates.hourlyRate);
  const [priceDoublePage, setPriceDoublePage] = useState(
    +allPricesRates.pricePerDoublePage
  );
  const [priceSinglePage, setPriceSinglePage] = useState(
    +allPricesRates.pricePerSinglePage
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeHourlyRate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHourlyRate(+event.target.value);
  };
  const handleChangeDoubleSpace = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceDoublePage(+event.target.value);
  };
  const handleChangeSingleSpace = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceSinglePage(+event.target.value);
  };
  const UPDATEHOURLYRATE = gql`
    mutation UpdatePriceRates($input: updatepricerates) {
      updatePriceRates(input: $input) {
        _id
      }
    }
  `;

  const [updateHourlyRate] = useMutation(UPDATEHOURLYRATE);

  const handleUpdateDetails = () => {
    setIsLoading(true);

    Store.addNotification({
      title: "Updating",
      message: `Updating Prices...`,
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
      updateHourlyRate({
        variables: {
          input: {
            _id: allPricesRates._id,
            hourlyRate: hourlyRate.toString(),
            pricePerDoublePage: priceDoublePage.toString(),
            pricePerSinglePage: priceSinglePage.toString(),
          },
        },
        onCompleted: (infoData) => {
          Store.addNotification({
            title: "Success",
            message: `Prices Updated successfully!!`,
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
      <div className="font-bold text-xl ">Prices</div>

      <div className=" font-semibold text-gray-700 mt-2 italic">
        Hourly Rate
      </div>
      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="amount"
          type="number"
          step={0.01}
          onChange={handleChangeHourlyRate}
          value={hourlyRate}
        />
      </div>
      <div className=" font-semibold text-gray-700 mt-2 italic">
        Double Space Amount
      </div>
      <div>
        <input
          className="border-2 w-56  rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="amount"
          type="number"
          step={0.01}
          onChange={handleChangeDoubleSpace}
          value={priceDoublePage}
        />
      </div>
      <div className=" font-semibold text-gray-700 mt-2 italic">
        Single Space Amount
      </div>

      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="amount"
          type="number"
          step={0.01}
          onChange={handleChangeSingleSpace}
          value={priceSinglePage}
        />
      </div>

      <div className=" mt-4 w-full flex">
        <Button
          loading={isLoading}
          // disabled={isLoading}
          className="bg-blue-400 font-bold text-white space-x-2  rounded-lg  "
          onClick={handleUpdateDetails}
        >
          Update Prices
        </Button>
      </div>
    </div>
  );
};

export default HourlyRate;
