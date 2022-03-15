import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({user, clientSecret}) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [error, setError] = useState(null);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const removeItemsCart = async () => {
    const token = await user.getIdToken();
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({  
          email: user.email})
      }
    );

    if(res.status >= 200 && res.status <= 299){
      const data = await res.json();
      console.log(data)
      return data.result;
    }
    else{
      console.log("Error?");
      throw Error(res.statusText);
    }


  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          // TODO not sure where, but remove the items from the cart once payment is succeeded.
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Please fill in payment information");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {

      // reset get subscription
      const { err } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: process.env.REACT_APP_URL,
        },
      }).then(await removeItemsCart());

      if (err) {
        throw err;
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button variant="outline-dark" type="submit">Check Out</Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}