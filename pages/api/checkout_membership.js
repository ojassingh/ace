const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method === 'POST') {

      const hash = req.body.hash;
      

      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.referer}/?tok=`+hash,
        cancel_url: `${req.headers.referer}/?canceled=true`,
        line_items: [
          {price: "price_1M2HMWCmpyijWwNYPDCxrPW4", quantity: 1},
        ],
        mode: 'payment',
      })

      // console.log(req.headers.referer);
      res.status(200).json({session});
      
    } 
}

