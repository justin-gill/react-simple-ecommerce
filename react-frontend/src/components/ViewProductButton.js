import React from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class ViewProductButton extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/product/${this.props.name}`}>
          <Button variant="outline-dark">View Product</Button>
        </Link>
      </div >
    )
  }
}

export default ViewProductButton;