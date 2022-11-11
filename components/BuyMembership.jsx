import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo-white.jpg'
import { useRouter } from 'next/router';
import { getDoc, updateDoc, doc, arrayUnion} from "firebase/firestore"
import { database, app} from "../firebase/config"
import { getAuth } from "@firebase/auth";
import CryptoJS from "crypto-js";
const crypto = require('crypto')
import CryptoENC from 'crypto-js/enc-utf8';

export default function BuyMembership(props) {

  const key = process.env.DECRYPT_KEY
  // const buf = crypto.randomBytes(256).toString('hex');
  var hash = CryptoJS.SHA256(props.id).toString();

    
  const [view, setView] = useState(<div className='grid justify-items-center'>
    <h1 className='text-sm text-gray-500'>Purchase General Membership</h1>
    <h1 className='text-sm text-gray-500'>Price: $16</h1>
  </div>)




  const router = useRouter();
  const auth = getAuth(app);

  async function setMember(){
    const docRef = doc(database, 'usersCollection', props.id);
    const update = await updateDoc(docRef, {
      memberType: "general"
    })
    console.log("Member updated", update)
    router.reload();
  }


  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('tok')==hash) {
      setMember();
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    // console.log(query.get('tok'))
  }, []);

  async function clickHandler(){
    
    fetch("/api/checkout_membership", 
      {
        method: "POST",
        redirect: 'follow',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({hash: hash})
      }).then(res => res.json())
      .then(data => {
          window.location.href = data.session.url;
          // console.log(data)
      })
      .catch(function(err) {
        console.info("error: ", err);
    });
  }



  return (
    <form className='grid justify-items-center'>
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
          <button onClick={(e)=>{
            e.preventDefault()
            clickHandler();
          }} className='m-4 px-20 py-2 bg-indigo-700 text-white rounded-md'>
            Checkout
          </button>
        </div>
      </section>
    </form>
  );
}
