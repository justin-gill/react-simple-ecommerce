import { Container, Form, Button } from 'react-bootstrap';
import useAuth from "../hook/useAuth";
import { Navigate } from "react-router-dom";

const AccountStatus = () => {
  const { user, logout } = useAuth();

  if (user === null || user === undefined) {
    return (
      <Container className='accountStatus'>
        <div>
          <a href='/signin'>
            Sign in
          </a>
          <>
          </>
          <small>
            &nbsp; or &nbsp;
          </small>
          <a href='/signup'>
            Sign up
          </a>
        </div>

      </Container>
    )
  }
  else {
    return (
      <Container className='accountStatus'>
        <div>
          Signed in as:
          <a href='/account' style={{ 'textDecoration': 'None', 'color': 'black' }}>
            {user.email}
          </a>
          <Button variant="outline-dark" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </Container>
    )
  }
}
export default AccountStatus;