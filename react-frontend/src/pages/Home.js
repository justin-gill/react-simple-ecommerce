import React from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../components/Banner'
import FeaturedProducts from '../components/FeaturedProducts'
import Mission from '../components/Mission'
import Review from '../components/Review'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Container>
        <div className='page'>
        </div>
        <Banner />
        <FeaturedProducts />
        <Mission />
        <Review />
      </Container>
    <Footer />
    </div>
  );
}
export default Home;
