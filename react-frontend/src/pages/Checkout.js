import React, { useState, useEffect } from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const Checkout = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const location = useLocation()
  const [price, setPrice] = useState(0.0);

  const trueRound = (value, digits) => {
    return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
}

  const fetchCartTotalServer = async () => {
    const token = await user.getIdToken();
    
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart/total",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data.result;
  };

  const createPurchaseServer = async () => {
    const token = await user.getIdToken();
    console.log(price);
    const intentPrice = price;
  
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + `/stripe/paymentIntent`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price: intentPrice})
      }
    );

    const data = await res.json();
    return data.result;
  };

  

  // create subscription front
  const createPurchaseFront = async () => {
    let response = await createPurchaseServer();
    setClientSecret(response.clientSecret);
  };

  useEffect(async () => {
    let res = await fetchCartTotalServer();
    res = trueRound(res, 2);
    setPrice(res);
    console.log("USE EFFECT", price);
    await createPurchaseFront();
    
  }, [price])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  //if (location.state === null) return <Navigate to="/" />;

  // const stripe = useStripe();

  return (
    <div className="container">
      <h2>Checkout</h2>
      {(clientSecret && <Elements options={options} stripe={stripePromise}>
        <CheckoutForm
          user={user}
          clientSecret={clientSecret}
        />
      </Elements>
      )}
      <h3>Total: {price}</h3>
    </div>
  );
};

export default Checkout;