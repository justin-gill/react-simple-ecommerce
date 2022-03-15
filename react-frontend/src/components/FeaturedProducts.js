import React from 'react';
import { useState, useEffect } from "react";
import FeaturedProduct from '../components/FeaturedProduct'

const FeaturedProducts = () => {

  const [featured1, setFeatured1] = useState([]);
  const [featured2, setFeatured2] = useState([]);
  const [featured3, setFeatured3] = useState([]);

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
        const productFromServer = await fetchProductServer('BerryBlast');
        setFeatured1(productFromServer);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProduct();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productFromServer = await fetchProductServer('CoconutCluster');
        setFeatured2(productFromServer);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProduct();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productFromServer = await fetchProductServer('LimeTwist');
        setFeatured3(productFromServer);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProduct();
  }, []);
  

  return (
    <div>
      <h3 className='text-center pt-5'> Featured Products </h3>
      <p style={{'marginBottom' : 50}} className='text-center'> Atomic Energy sells many different flavors of our energy drink, each with it’s unique taste! </p>
      <div className='container text-center'>
        <div className="row" style={{'padding': 0, 'margin': 0}}>
          <FeaturedProduct
            className="col"
            imageURL={featured1['imagePath']}
            name={featured1['name']}
            price={featured1['price']}
            description={featured1['description']}
          />
          <FeaturedProduct
            className="col"
            imageURL={featured2['imagePath']}
            name={featured2['name']}
            price={featured2['price']}
            description={featured2['description']}
          />
          <FeaturedProduct
            className="col"
            imageURL={featured3['imagePath']}
            name={featured3['name']}
            price={featured3['price']}
            description={featured3['description']}
          />
        </div>
      </div>

    </div>
  )
}

export default FeaturedProducts;