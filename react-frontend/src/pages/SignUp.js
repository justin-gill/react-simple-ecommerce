import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Error from "../components/Error";
import useAuth from "../hook/useAuth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUp = (props) => {
  const { user } = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState(null);

  //this is our config for FirebaseAuth
  const signup = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(
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
    <div className="container">
      <div className='page'>
        <h3>Account</h3>
      </div>
      <h1>Signup</h1>
      <Form onSubmit={signup}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            ref={emailRef}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
      <p className="reminder">
        Already have an account? <a href="/signin">Sign in here</a>
      </p>
      {error && <Error error={error} />}
    </div>
  );
};

export default SignUp;
