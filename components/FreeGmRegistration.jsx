import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo-white.jpg'
import { useRouter } from 'next/router';
import { onAuthStateChanged, getAuth} from "@firebase/auth";
import { database, app} from "../firebase/config"
import { getDoc, doc, updateDoc, arrayUnion} from 'firebase/firestore';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import CryptoJS from "crypto-js";

export default function FreeGmRegistration(props) {


  const [loggedIn, setLog] = useState(false);
  const [memberType, setMember] = useState('');
  const [message, setMessage] = useState("Checkout")
  const eventID = props.eventID;

  const auth = getAuth(app);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setLog(true);
          const uid = user.uid;
          getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
            if (docSnap.exists()) {
              setMember(docSnap.data().memberType)
            }
        })
        }
    });
  }, [])

  const [view, setView] = useState(<div className='grid justify-items-center'>
    {!props.gmOnly && <h1 className='text-sm text-gray-500'>Regular price: ${props.price.toString()}</h1>}
    <h1 className='text-sm text-gray-500'>General Member price: ${props.gMPrice.toString()}</h1>
  </div>)

var hash = CryptoJS.SHA256(props.uid).toString();

  async function updateInfo(){
    const docRef = doc(database, 'usersCollection', props.uid);
      console.log(docRef)
    // const update = await updateDoc(docRef, {
    //   registeredEvents: arrayUnion(eventID)
    // })

    const docRef2 = doc(database, 'events', eventID);
    console.log(docRef2)
    // const update2 = await updateDoc(docRef2, {
    //   registered: arrayUnion(props.uid)
    // })

    
    // console.log("Info updated", update)
    // router.reload();
  }


  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('tok')==hash) {
      updateInfo()
      alert('You are now registered for the event.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    // console.log(query.get('tok'))
  }, []);


  const router = useRouter();

  useEffect(()=>{
    if(memberType=="general"){
      setMessage("Register")
    }
  }), []
  

  async function submitHandler(){
    if(loggedIn){
        if(memberType=="general"){
            updateInfo();
        }else{
            fetch("/api/freegmcheckout", 
            {
                method: "POST",
                redirect: 'follow',
                headers: {'Content-Type': 'application/json'}, 
                // headers: {"Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
                body: JSON.stringify({hash: hash, id: eventID, memberType: "regular"})
            }).then(res => res.json())
            .then(data => {
                window.location.href = data.session.url;
            })
            .catch(function(err) {
                console.info("error: ", err);
            });
        }

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
            {message}
          </button>
        </div>
      </section>
    </div>
  );
}
