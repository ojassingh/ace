import { forEach } from 'lodash';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method === 'POST') {

      const eventID = req.body.id;
      const memberType = req.body.memberType;
      const hash = req.body.hash;

      let priceID = 0;

      const prices = await stripe.prices.list({
        product: eventID
      });

      if(memberType == "general"){
        (prices.data).forEach((price)=>{
          if(price.nickname == "general-member-price"){
            priceID = price.id
          }
        })
      }else{
        (prices.data).forEach((price)=>{
          if(price.nickname != "general-member-price"){
            priceID = price.id
          }
        })
      }

      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.referer}/?tok=`+hash,
        cancel_url: `${req.headers.referer}/?canceled=true`,
        line_items: [
          {price: priceID, quantity: 1},
        ],
        mode: 'payment',
      })

  

      res.status(200).json({session});
      
    } 
}

