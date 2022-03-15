import React from 'react';
import { Image } from 'react-bootstrap';

const Mission = () => {
  return (
    <div style={{ 'marginTop': 50 }}>
      <div className='container text-center'>
        <div className="row" style={{ 'padding': 0, 'margin': 0 }}>
          <div className="col">
            <h2>
              Our Mission
            </h2>
            <p>
            Atomic Energy is committed to delivering great beverages that are guaranteed to help you power your day with a smile. Our patented recipe uses exclusively organic, natural ingredients. Our beverages were developed to satisfy those customers who desire or partake in an adventurous, healthy lifestyle.
            </p>
          </div>
          <div className="col">
            <Image src='/assets/images/MissionPhoto.jpg' className='rounded mw-100 h-75 img-fluid mx-auto' />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mission;