import React from "react";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface PROPS {
  price: number;
  setInitiatePayment: (value: boolean) => void;
  addOrderHandler: () => void;
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function StripeChekout(props: PROPS) {
  const { price, setInitiatePayment, addOrderHandler } = props;
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://guidemyclass.com/",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      console.log(result);
      addOrderHandler();
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div className="h-screen justify-center flex items-center px-4 lg:px-2">
      <div>
        <div className="font-bold">
          Enter your payment information in order to finalize your Order for $
          {+price.toFixed(2)}.
        </div>

        <PaymentElement className="mt-8" />
        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              setInitiatePayment(false);
            }}
            className=" border bg-gray-400 px-2 py-2  rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!stripe}
            className=" border bg-blue-400 px-2 py-2  rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
