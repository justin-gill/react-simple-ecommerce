import React from 'react';
import { Image } from 'react-bootstrap';
import ViewProductButton from '../components/ViewProductButton'


class FeaturedProduct extends React.Component {
  render() {
    return (
      <div style={{'maxWidth':'33%'}}>
        <Image src={this.props.imageURL} className='rounded mw-100 h-75 img-fluid mx-auto'/>
        <p style={{'paddingTop' : 15}}>
          {this.props.name}
        </p>
        <p>
          ${this.props.price}
        </p>
        <ViewProductButton name={this.props.name}/>
      </div>
    )
  }
}

export default FeaturedProduct;