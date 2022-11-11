const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {



    const id = req.body;
    // const deleted = await stripe.products.del(id);
    const product = await stripe.products.update(
      id,
      {active: false}
    );
    
    // console.log("Archived stripe product: ", id)
    res.status(200).json(product.id)
    } 
}