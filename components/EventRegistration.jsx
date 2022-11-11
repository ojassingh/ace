import { getAuth } from "@firebase/auth";
import Image from "next/image";
import logo from '../public/logo-white.jpg'
import { useState, useEffect} from "react";
import { Spinner } from "flowbite-react";
import { getDoc, updateDoc, doc, arrayUnion} from "firebase/firestore"
import { database, app} from "../firebase/config"
import { useRouter } from "next/router";
import { onAuthStateChanged } from "@firebase/auth";


const EventRegistration = (props) => {

  const auth = getAuth(app);
    const [view, setView] = useState(<div className='grid justify-items-center'>
    <h1 className='text-sm text-gray-500'>Registration for this event is free!</h1>
    </div>)
    
    const router = useRouter();
    const [loggedIn, setLog] = useState(false);
    const [loading, setLoading] = useState(false);
    var [userID, setUser] = useState('');

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setLog(true);
                const uid = user.uid;
                setUser(uid);
            }
        });
    }, [])

  

  async function eventHandler(){

      setLoading(true);
    
      const docRef =  doc(database, "events", props.eventID);
      await updateDoc(docRef, {
          registered: arrayUnion(userID)
      })

      const userRef =  doc(database, "usersCollection", userID);
      await updateDoc(userRef, {
          registeredEvents: arrayUnion(props.eventID)
      })

      setLoading(false);
      router.reload();

  }

    return(
        <div className='bg-white rounded-lg w-64 grid justify-items-center'>
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
          <button className='m-4 px-20 py-2 bg-indigo-700 text-white rounded-md' onClick={eventHandler}>
            Register
          </button>
        </div>
      </section>
    </div>)
}

export default EventRegistration;