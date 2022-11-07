const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    // const priceID = JSON.parse(req.body);

      const session = await stripe.checkout.sessions.create({
        success_url: 'https://youtube.com',
        cancel_url: 'https://egghead.io',
        line_items: [
          {price: 'price_1M1MdSCmpyijWwNYrpl2Q0kM', quantity: 1},
        ],
        mode: 'payment',
      }).then(res.status(200).json({session}));
    } 
}