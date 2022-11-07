import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo-white.jpg'
import { useRouter } from 'next/router';
import { onAuthStateChanged, getAuth} from "@firebase/auth";
import { database, app} from "../firebase/config"

export default function PreviewPage(props) {

  const [loggedIn, setLog] = useState(false);
  const eventID = props.eventID;

  const auth = getAuth(app);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setLog(true);
            const uid = user.uid;
        }
    });
  }, [])

  const [view, setView] = useState(<div className='grid justify-items-center'>
    {!props.gmOnly && <h1 className='text-sm text-gray-500'>Regular price: ${props.price.toString()}</h1>}
    <h1 className='text-sm text-gray-500'>General Member price: ${props.gMPrice.toString()}</h1>
  </div>)


  const router = useRouter();

  async function submitHandler(){

    // const price = await stripe.prices.list({
    //   product: eventID
    // });


    if(loggedIn){
      fetch("http://localhost:3000/api/checkout_session", 
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        // body: JSON.stringify(eventID)
      }).then(res => {
        console.log("Request complete! response:", res);
      }).then(data => {
        console.log("URL Data: ", data);
        // window.location.href = data.session.url;
      })
    }else{
      router.push('/login');
      alert("You must be logged in before registering for an event.");
    }
  }

  return (
    <div className='grid justify-items-center'>
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
          <button className='m-4 px-20 py-2 bg-indigo-700 text-white rounded-md'  onClick={(e)=>{
            e.preventDefault()
            submitHandler();
          }}>
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
