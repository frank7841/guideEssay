import React, { useEffect } from "react";
// import StripeChekout from "./stripeCheckout";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe(
//   // "pk_test_51Mje7DBa0RowYgckB5En15vGeQyGMMr7fVDTwbA7yp6kPgfJK2odwkZMayNOIImCV1t3vL79R9nWKWtOLLikYcVO00gNX80tJb"
//   "pk_live_51Mje7DBa0RowYgckBfYxNn02TP0erJo4zGi81iee6PuZGO01GTRFDDMZfOjO10FPocPgI5fBNdweS0qovAo4Iuqm00Wzhhq56J"
// );
// interface PROPS {
//   secretKey: string;
//   finalPrice: number;
//   setInitiatePayment: (value: boolean) => void;
//   addOrderHandler: () => void;
// }

// export default function Checkout(props: PROPS) {
//   const { secretKey, finalPrice, setInitiatePayment, addOrderHandler } = props;
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: secretKey,
//   };
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <StripeChekout
//         price={finalPrice}
//         setInitiatePayment={setInitiatePayment}
//         addOrderHandler={addOrderHandler}
//       />
//     </Elements>
//   );
// }


interface PROPS {
  finalPrice: number;
  addOrderHandler: () => void;
}

export default function Checkout(props: PROPS) {
  const { finalPrice, addOrderHandler } = props;

  // Call addOrderHandler when the component mounts
  useEffect(() => {
    addOrderHandler();
  }, [addOrderHandler]);

  // You can render any UI you want here, maybe a loading spinner or a message indicating the checkout process is being completed
  return (
    <div>
      <p>Processing your order...</p>
    </div>
  );
}
