import React from 'react';
import { useState, useEffect } from "react";
import { Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import useAuth from "../hook/useAuth";
import CartItem from "../components/CartItem"
import { Navigate } from "react-router-dom";

const Cart = () => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartServer = async () => {
    const token = await user.getIdToken();
    // console.log(token)
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart",
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

  useEffect(() => {
    const getCart = async () => {
      try {
        const cartFromServer = await fetchCartServer();
        setCart(cartFromServer);

        const cartTotal = await fetchCartTotalServer();
        setTotal(cartTotal);
        console.log(total);
      } catch (err) {
        console.log(err.message);
      }
    };

    getCart();
  }, []);


  // navigate to sign in if not a user
  if(!user){
    console.log("Here?");
    return <Navigate to={{ pathname: "/signin" }} />;
  }

  return (
    <Container>
      <div className='page'>
        <h3>My Cart</h3>
        {cart.map((product) => (
          <CartItem
            key={product['productName']}
            name={product['productName']}
            quantity={product['quantity']}
            cart={{myCart : cart, cartMethod: setCart}}
            total={{total: total, totalMethod: setTotal}}
             />
        ))}
      </div>

        <Link to="/products">
          <Button style={{"marginBottom" : "5px"}} variant="outline-dark">Lets Shop?!</Button>
        </Link>
        {(cart.length !== 0 && 
          <div>
            <Link to="/checkout">
              <Button style={{"marginBottom" : "5px"}} variant="outline-dark">Checkout</Button>
            </Link>
            <h2 style={{"className":"text-justify"}}>Total: {trueRound(total, 2)}</h2>
          </div>)}
        
    </Container>
  );
}
export default Cart;
