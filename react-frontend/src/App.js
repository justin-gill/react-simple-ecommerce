import './App.css';
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Account from "./pages/Account"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Home from "./pages/Home"
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Checkout from './pages/Checkout'
import { AuthProvider } from "./context/FirebaseAuthContext";
import Spinner from "react-bootstrap/Spinner";
import { checkActionCode } from 'firebase/auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />
          <Route path="/account" element={
            <Suspense fallback={<Loading />}>
              <Account />
            </Suspense>
          } />
          <Route path="/cart" element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/products" element={
            <Suspense fallback={<Loading />}>
              <Products />
            </Suspense>
          } />
          <Route path="/product/:name" element={
            <Suspense fallback={<Loading />}>
              <Product />
            </Suspense>
          } />
          <Route path="/signin" element={
            <Suspense fallback={<Loading />}>
              <SignIn />
            </Suspense>
          } />
          <Route path="/signup" element={
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          } />
          <Route path="/checkout" element={
            <Suspense fallback={<Loading />}>
              <Checkout />
            </Suspense>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const Loading = () => {
  return (
    <div className="App">
      <Spinner animation="border" />
    </div>
  );
};

export default App;
