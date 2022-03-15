require("dotenv").config();
const dayjs = require("dayjs");
const stripe = require("stripe")("sk_test_51KV1vHKMzxDrnfRlzch1D4QSoMwAfh9rIorJCssZP8wAIyRKiBLUYn8ac0VOyFTqn35CYJE17GFlxcQdC6iFPvuC00rMDAG81A");
const { db } = require("../../utils/admin");

// create client secret
exports.createPaymentIntent = async (req, res) => {
  const data = {
    email: req.user.email,
  };

  const price = parseInt(req.body.price * 100, 10);
  
    console.log("DATA", price);
    // console.log("DATA", parseInt(price * 100, 10));


  const paymentIntents = await stripe.paymentIntents.create({
    currency: 'USD',
    amount: price,
    payment_method_types: ["card"],
  });

  let result = {
    clientSecret: paymentIntents.client_secret,
  };

  res.status(200).json({ result: result });
};

// webhook
exports.stripeWebhook = async (req, res) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody.toString(),
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    console.log(`Webhook signature verification failed.`);
    console.log(`Check the env file and enter the correct webhook secret.`);
    return res.sendStatus(400);
  }

  // Extract the object from the event.
  let dataObject = event.data.object;

  // get all information from stripe
  const email = dataObject.customer_email;
  const payment_intent_id = dataObject.payment_intent;

  // Handle the event
  switch (event.type) {
    case "invoice.payment_succeeded":
      /* PAYMENT */
      // for payment that is paid immediately (payment_intent_id)
      if (
        dataObject["billing_reason"] === "manual" &&
        payment_intent_id
      ) {
        //get paymentIntent
        paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

        // get payment method
        payment = await stripe.paymentMethods.retrieve(
          paymentIntent.payment_method
        );

        // record the first payment data
        await recordStripePaymentCore(email, event.data.object);
      }

      break;
    case "invoice.payment_failed":
        console.log("error with payment")
      break;
    default:
      // Unexpected event type
      break;
  }
  res.sendStatus(200);
};

/* Helper methods */
// store data for payment
const recordStripePaymentCore = async (email, payment) => {
  // prepare all variables
  let currentTime = new Date(
    subscription.current_period_start * 1000
  ).toISOString();

  // prepare batch
  let batch = db.batch();


  // third invoice doc
  const newInvoice = db.collection(`/users/${email}/invoices`).doc();
  batch.set(newInvoice, {
    time: currentTime,
    timestamp: new Date(currentTime),
    status: "paid",
    amount: payment.amount,
  });

  // Commit the batch
  await batch.commit();

  return true;
};
