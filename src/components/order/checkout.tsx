import React from "react";
import StripeChekout from "./stripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
   "pk_test_51Mje7DBa0RowYgckB5En15vGeQyGMMr7fVDTwbA7yp6kPgfJK2odwkZMayNOIImCV1t3vL79R9nWKWtOLLikYcVO00gNX80tJb"
  
);
interface PROPS {
  secretKey: string;
  finalPrice: number;
  setInitiatePayment: (value: boolean) => void;
  addOrderHandler: () => void;
}

export default function Checkout(props: PROPS) {
  const { secretKey, finalPrice, setInitiatePayment, addOrderHandler } = props;
  const options = {
    // passing the client secret obtained from the server
    clientSecret: secretKey,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeChekout
        price={finalPrice}
        setInitiatePayment={setInitiatePayment}
        addOrderHandler={addOrderHandler}
      />
    </Elements>
  );
}
