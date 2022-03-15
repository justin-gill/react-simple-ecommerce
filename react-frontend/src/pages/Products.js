import React from 'react';
import { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import ProductPageItem from '../components/ProductPageItem';
const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProductsServer = async () => {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/products",
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
        const productFromServer = await fetchProductsServer();
        setProducts(productFromServer);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProduct();
  }, []);

  return (
    <Container>
      <div className="row">
        <h3 style={{'padding' : '30px 30px ', 'fontSize' : '50px' }}>
          Products
        </h3>
        {products.map((product) => (
          <ProductPageItem
            key={product['name']}
            className='col-xs-2'
            imageURL={product['imagePath']}
            name={product['name']}
            price={product['price']}
            description={product['description']} />
        ))}
      </div>
    </Container>

  );
}
export default Products;
