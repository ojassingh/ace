const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const gmAmount = req.body.gmPrice

    // console.log(id, name, price);

    const product = await stripe.products.create({
        id: id,
        name: name,
        default_price_data: {
            unit_amount_decimal: price*100,
            currency: 'cad',
        }
      });

      const gmPrice = await stripe.prices.create({
        nickname: "general-member-price",
        unit_amount_decimal: gmAmount*100,
        currency: 'cad',
        product: id,
      });


      res.json({product});
      
    } 
}