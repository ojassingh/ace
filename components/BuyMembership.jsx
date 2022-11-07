import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo-white.jpg'
import { useRouter } from 'next/router';
import { getDoc, updateDoc, doc, arrayUnion} from "firebase/firestore"
import { database, app} from "../firebase/config"
import { getAuth } from "@firebase/auth";


export default function BuyMembership(props) {

    
  const [view, setView] = useState(<div className='grid justify-items-center'>
    <h1 className='text-sm text-gray-500'>Purchase General Membership</h1>
    <h1 className='text-sm text-gray-500'>Price: $16</h1>
  </div>)

  const router = useRouter();
  const auth = getAuth(app);


  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
        
        router.reload();
        alert('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <form action="/api/checkout_membership" className='grid justify-items-center' method="POST">
      <section className='px-10 rounded-lg bg-chalk shadow-xl'>
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
          <button className='m-4 px-20 py-2 bg-indigo-700 text-white rounded-md' type="submit" role="link">
            Checkout
          </button>
        </div>
      </section>
    </form>
  );
}