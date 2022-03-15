import React from 'react';
import { Image } from 'react-bootstrap';

const Review = () => {
  return (
    <div style={{ 'marginTop': 50 }}>
      <div className='container text-center'>
        <div className="row" style={{ 'padding': 0, 'margin': 0 }}>
          <div className="col">
            <Image src='/assets/images/ReviewPhoto.jpg' className='rounded mw-100 h-75 img-fluid mx-auto' />
          </div>
          <div className="col">
            <h2>
              Customer Review
            </h2>
            <p>
              Atomic Energy is the perfect product for balancing my adventurous, healthy, and productive lifestyle.
            </p>
            <p>
              - Happy Customer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Review;