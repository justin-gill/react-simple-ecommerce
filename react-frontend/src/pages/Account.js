import React from 'react';
import useAuth from "../hook/useAuth";
import { Container, Form, Button } from 'react-bootstrap';
import { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
const Account = () => {
  const { user, logout } = useAuth();

  if (user === null || user === undefined)
  return <Navigate to={{ pathname: "/signin" }} />;
  return (
    <Container>
      <div className='page'>
        <h3>Account</h3>
      </div>
      <div className="container">
        <h2>
          Account Info 
        </h2>
        <p>
          Email: {user['email']}
        </p>
        <p>
          Last Sign In: {user.metadata.lastSignInTime}
        </p>
        <p>
          Created Account: {user.metadata.creationTime}
        </p>
        <Button variant="outline-dark" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </Container>
  );
}
export default Account;
