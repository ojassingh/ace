import Image from "next/image";
import logo from '../public/logo-white.jpg'
import { useState, useEffect} from "react";
import { Spinner } from "flowbite-react";
import { getDoc, updateDoc, doc} from "firebase/firestore"
import { database, app} from "../firebase/config"
import { useRouter } from "next/router";
import { onAuthStateChanged } from "@firebase/auth";
import { getAuth } from "@firebase/auth";

const EventRegistration = (props) => {

    const auth = getAuth(app);
    const event = props.event;
    const router = useRouter();

    const [loggedIn, setLog] = useState(false);

    const [view, setView] = useState(<div className='grid justify-items-center'>
    <h1 className='text-sm text-gray-500'>Registration for this event is free!</h1>
    </div>)

    const [loading, setLoading] = useState(false);
    // const [registered, setRegistered] = useState(event.registered);
    const registered = event.registered;

    const [userID, setUser] = useState('');
    // const [userList, setList]= useState([]);
    const userList = [];
    const [el, setEl] = useState([]);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(uid);
                setLog(true);
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                        userList = docSnap.data().registeredEvents;
                    }
            })  
            }
        });
    }, [])

  

  async function eventHandler(){

    if(!loggedIn){
      router.push('/login');
      alert("You must log in to register for any events")
    }
    
    else{
      setLoading(true);

    // setRegistered(registered => [...registered, userID]);
    registered.push(userID)
    const docRef =  doc(database, "events", props.eventID);
    await updateDoc(docRef, {
        registered: registered
    })

    // setList(userList => [...userList, props.eventID])
    userList.push(props.eventID);
    const userRef =  doc(database, "usersCollection", userID);
    console.log(userID)
    await updateDoc(userRef, {
        registeredEvents: userList
    })

    // console.log("User ID and registered event List: " , userID , userList)
    // console.log("Registered users in event list: ", props.eventID, registered)
    // console.log("Users registered events list: ", userList, "Registered users in this event: ", registered);

    // setEl(el => [...el, 'hi']);

    // console.log("El: ", el)
    router.reload()
    console.log('Done');
    setLoading(false);
    }

  }

    // console.log(props.event)
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