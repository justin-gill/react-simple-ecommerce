import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from "../hook/useAuth";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // toast css 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// configure the toast
toast.configure();


const AddToCartButton = (productName) => {
  const { user, logout } = useAuth();

  // Add to Cart server
  const addToCartServer = async (name) => {
    const token = await user.getIdToken();
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product: name, email: user }),
      }
    );

    const data = await res.json();
    return data.result;
  };

  // Add to cart
  const addToCart = async (event) => {
    event.preventDefault()
    // console.log(productName.name)
    try {
      const data = await addToCartServer(productName.name);
      console.log(data);
      toast.success("Item Added to Cart!", {autoClose:2000, position: toast.POSITION.RIGHT_CENTER});
      // setTasks([...tasks, data]);
    } catch (err) {
      console.log(err.message);
      toast.error("Error Adding Item..", {
        position: toast.POSITION.BOTTOM_CENTER, autoClose:3000
      });
    }
  };


  if (user === null || user === undefined) {
    return (
      <div>
        <Button disabled variant="outline-dark">Add to Cart</Button>
        <p style={{ 'marginTop': '1em' }}>
          You must be logged in to add to your cart
        </p>
      </div >
    )
  }
  if (user) {
    return (
      <div>
        <Link to={`/cart`}>
          <Button onClick={addToCart} variant="outline-dark">Add to Cart</Button>
        </Link>
      </div >
    )
  }


}

export default AddToCartButton;