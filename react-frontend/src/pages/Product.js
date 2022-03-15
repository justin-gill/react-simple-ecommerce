import React from 'react';
import { useParams } from 'react-router-dom';
import { Image, Row, Container, Col } from 'react-bootstrap';
import { useState, useEffect } from "react";
import AddToCartButton from '../components/AddToCartButton'

const Product = () => {
  const productParams = useParams()
  let productName = productParams['name'].replace(/ /g, '')
  const [product, setProduct] = useState([]);

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
        const productFromServer = await fetchProductServer(productName);
        setProduct(productFromServer);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProduct();
  }, []);

  return (
    <Container>
      <h3 style={{ 'padding': '30px 30px ', 'fontSize': '50px' }}>
        Products
      </h3>
      <Row>
        <Col>
          <Image src={product['imagePath']} className='rounded mw-100 h-100 img-fluid mx-auto' />
        </Col>
        <Col>
          <p style={{ 'paddingTop': 15, 'fontSize': '6em' }}>
            {product['name']}
          </p>
          <p style={{ 'fontSize': '2em' }}>
            ${product['price']}
          </p>
          <p>
            {product['description']}
          </p>
          <AddToCartButton name={productName}/>
        </Col>
      </Row>
    </Container>

  );
}
export default Product;
