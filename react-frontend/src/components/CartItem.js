import React from 'react';
import { useState, useEffect } from "react";
import { Image, Button } from 'react-bootstrap';
import FeaturedProduct from '../components/FeaturedProduct';
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import {toast} from "react-toastify";
import useAuth from "../hook/useAuth";

toast.configure();

const CartItem = ({ name, quantity, cart, total }) => {

  const { user, logout } = useAuth();
  const [product, setProduct] = useState([]);
  const [quant, setQuant] = useState(0);

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

  const subtractQuantityServer = async () => {
    let token = await user.getIdToken();
    let email = await user.email;
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart/subtract/" + name,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
           item: name, 
           quantity: quant-1, 
           email: email})
      }
    );

    if(res.status >= 200 && res.status <= 299){
      const data = await res.json();
      console.log(data)
      let newTotal = await fetchCartTotalServer();
      total.totalMethod(newTotal);
      return data.result;
    }
    else{
      throw Error(res.statusText);
    }
  }

  const addQuantityServer = async () => {
    let token = await user.getIdToken();
    let email = await user.email;
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart/add/" + name,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          item: name,
          quantity: quant+1, 
          email: email})
      }
    );

    if(res.status >= 200 && res.status <= 299){
      const data = await res.json();
      console.log(data)
      let newTotal = await fetchCartTotalServer();
      total.totalMethod(newTotal);
      return data.result;
    }
    else{
      throw Error(res.statusText);
    }
  }

  const removeItemServer = async () => {

    
    let token = await user.getIdToken();
    let email = await user.email;
    console.log(email);
    console.log(token);
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/cart/remove/" + name,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          item: name, 
          email: email})
      }
    );
    
    if(res.status >= 200 && res.status <= 299){
      const data = await res.json();
      console.log(data)
      let newTotal = await fetchCartTotalServer();
      total.totalMethod(newTotal);
      return data.result;
    }
    else{
      throw Error(res.statusText);
    }
  }

  const removeItemFront = async () => {
    try{
      let res = await removeItemServer(name);
      if(res === undefined){
        throw Error("Bad Request");
      }
      let temp = cart.myCart.filter((item) => {
        return item['productName'] !== name;
      });

      // update my cart
      cart.cartMethod(temp);
    }
    catch(error){
      console.log(error.message);
      toast.error("Server Error Removing Item..", {position: toast.POSITION.BOTTOM_CENTER, autoClose:3000});
    }
  }


  const subtractQuantity = async () => {
    // remove the item if they subtract to 0 quantity. 
    if(quant === 1 ){
      console.log("Delete item");
      removeItemFront(name);
    }
    else{
      try{
        let res = await subtractQuantityServer();
        if(res === undefined){
          throw Error("Bad Request");
        }
        console.log(res);
        setQuant(quant - 1);
      }
      catch(error){
        console.log(error.message);
        toast.error("Server Error Decreasing Quantity", {position: toast.POSITION.BOTTOM_CENTER, autoClose:3000});
      }
      

    }
    
  }

  const addQuantity = async () => {
    try{
      let res = await addQuantityServer();
      if(res === undefined){
        throw Error("Bad Request");
      }
      console.log(res);
      setQuant(quant + 1);
    }

  catch(error){
    console.log(error.message);
    toast.error("Server Error Increasing Quantity", {position: toast.POSITION.BOTTOM_CENTER, autoClose:3000});
  }
    
  }
  

  const fetchProductServer = async (name) => {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/products/" + name,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    const data = await res.json();
    return data.result;
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productFromServer = await fetchProductServer(name);
        setProduct(productFromServer);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProduct();
    setQuant(quantity);
  }, []);


  return (
    <div>
      <div className='container' style={{ 'marginTop': '5em' }}>
        <div className="row">
          <div className="col-sm">
            <Image src={product['imagePath']} className='rounded mw-75 h-75 img-fluid' />
          </div>
          <div className='col'>
            <h3>
              {name}
            </h3>
          </div>
          <div className='col'>
            <h5>
              <button className='cartBtn' style={{'backgroundColor' : '#FFFFFF', 'border' : 'none', 'color': 'red'}} onClick={subtractQuantity}><FaMinusCircle/></button>
              Quantity : {quant}
              <button className='cartBtn' style={{'backgroundColor' : '#FFFFFF', 'border' : 'none', 'color': 'green'}} onClick={addQuantity}><FaPlusCircle/></button>
            </h5>
          </div>
          <div className='col'>
            <Button onClick={removeItemFront} variant="outline-dark">Remove Item</Button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default CartItem;