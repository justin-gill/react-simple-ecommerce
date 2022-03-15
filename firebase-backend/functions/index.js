const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const { errorHandle, authenticate } = require("./utils/middleware");

const {
  getProduct,
  getProducts,
  addProductToCart,
  getCart,
  removeItemCart,
  subtractItemQuantityCart,
  addItemQuantityCart,
  removeAllItemsCart,
  getCartTotal
} = require("./handlers/products");

const {
  createPaymentIntent,
  stripeWebhook,
} = require("./handlers/payment");

app.post("/stripe/webhook", stripeWebhook);

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);

app.use(errorHandle);


// products
app.get("/products/:name", getProduct);
app.get("/products", getProducts);

app.use(authenticate)

// cart
app.post("/cart", addProductToCart);
app.get("/cart", getCart);
app.put("/cart/add/:name", addItemQuantityCart);
app.put("/cart/subtract/:name", subtractItemQuantityCart);
app.delete("/cart/remove/:name", removeItemCart);
app.delete("/cart", removeAllItemsCart); // delete whole cart
app.get("/cart/total", getCartTotal);

// stripe
app.post("/stripe/paymentIntent", createPaymentIntent);


exports.api = functions.https.onRequest(app);
