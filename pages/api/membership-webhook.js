// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51Lq3oGCmpyijWwNYqPQsaAfOgAImazQfQVQo4Slm6X7hq3vnHQFV3cq3gzkWDvQhjdbYM5eQoliOeifsS13pxGCX00qekWf9Xo');

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Using Express
const app = require('express')();

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
}

const createOrder = (session) => {
  // TODO: fill me in
  console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
}

app.post('/api/membership-webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    fulfillOrder(session);
  }
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Save an order in your database, marked as 'awaiting payment'
      createOrder(session);

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === 'paid') {
        fulfillOrder(session);
      }

      break;
    }

    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session);

      break;
    }

    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      emailCustomerAboutFailedPayment(session);

      break;
    }
  }

  response.status(200);
});

app.listen(3000, () => console.log('Running on port 3000'));