import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo-white.jpg'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage(props) {

  const [view, setView] = useState(<div className='grid justify-items-center'>
    {!props.gmOnly && <h1 className='text-sm text-gray-500'>Regular price: ${props.price.toString()}</h1>}
    <h1 className='text-sm text-gray-500'>General Member price: ${props.gMPrice.toString()}</h1>
  </div>)

  if(props.gmOnly){

  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" className='grid justify-items-center' method="POST">
      <section className='px-10 rounded-lg bg-white'>
        <div className='px-5 py-3 grid justify-items-center text-black'>
            <Image 
              className='ml-4' src={logo} alt="aceutsc-logo" width="64" height="64"
            />
            <div className='grid justify-items-center'>
              <h1 className='flex'>{props.name}</h1>
              {view}
            </div>
        </div>
        <div className='grid justify-items-center'>
          <button className='m-4 px-20 py-2 bg-indigo-700 rounded-md' type="submit" role="link">
            Checkout
          </button>
        </div>
      </section>
    </form>
  );
}
