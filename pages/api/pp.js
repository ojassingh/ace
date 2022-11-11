// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51Lq3oGCmpyijWwNYqPQsaAfOgAImazQfQVQo4Slm6X7hq3vnHQFV3cq3gzkWDvQhjdbYM5eQoliOeifsS13pxGCX00qekWf9Xo');

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = 'whsec_...';

// Using Express
const app = require('express')();

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');


app.get('/pp', (request, response) => {
  console.log('listening')
});


app.listen(3000, () => console.log('Running on port 3000'));