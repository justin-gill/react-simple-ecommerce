import React from 'react';
import useAuth from "../hook/useAuth";
import { Container, Form, Button } from 'react-bootstrap';
import { useState, useRef } from "react";
import Error from "../components/Error";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
const SignIn = () => {
  const { user } = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState(null);

  //this is our config for FirebaseAuth
  const signin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        console.log("success");
        console.log(userCredential.user);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  if (user) return <Navigate to={"/account"} />;

  return (
    <Container>
      <div className='page'>
        <h3>Account</h3>
      </div>
      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={signin} style={{'paddingBottom' : '2em'}}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              ref={emailRef}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p className="reminder">Don't have an account? <a href="/signup">Sign Up Here</a></p>
        {error && <Error error={error} />}
      </div>
    </Container>
  );
}
export default SignIn;
