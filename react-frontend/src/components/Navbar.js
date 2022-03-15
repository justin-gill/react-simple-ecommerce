import { Button } from 'bootstrap';
import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import AccountStatus from "../components/AccountStatus"
import useAuth from "../hook/useAuth";

const Navigation = () => {
  const {user, logout} = useAuth();
  // tried to add a navbar with a logout button when a user is logged in... But I cannot figure out the CSS
  // all the ways I try it either breaks the code, or instantly logs the user out
  // so currently the logout is implemented in the "AccountStatus" component, but its CSS is horrible as well
  if(user){
      return (
        <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
          <Container>
            <Navbar.Brand href="/">
              <Image src='/assets/images/Logo.png' className='img-fluid' width={60} height={60}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className='navLink' href="/">Home</Nav.Link>
                <Nav.Link className='navLink' href="/products">Products</Nav.Link>
                {/* <Nav.Link href="/contact">Contact Us</Nav.Link> */}
                <Nav.Link className='navLink' href="/account">My Account</Nav.Link>
                <Nav.Link className='navLink' href="/cart">Cart</Nav.Link>
                {/* This is where the signin component should go */}
                <AccountStatus/>
                {/* <Button variant="danger" onClick={logout()}> Logout </Button>  */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
  return (
    <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
      <Container>
        <Navbar.Brand href="/">
          <Image src='/assets/images/Logo.png' className='img-fluid' width={60} height={60}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='navLink' href="/">Home</Nav.Link>
            <Nav.Link className='navLink' href="/products">Products</Nav.Link>
            {/* <Nav.Link href="/contact">Contact Us</Nav.Link> */}
            <Nav.Link className='navLink' href="/account">My Account</Nav.Link>
            <Nav.Link className='navLink' href="/cart">Cart</Nav.Link>
            {/* This is where the signin component should go */}
            <AccountStatus/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;