import Navi from "../components/Navi";
import   {useRouter} from 'next/router';
import { useEffect, useState } from "react";
import { app, database } from "../firebase/config";
import { getAuth } from "@firebase/auth";
import { onAuthStateChanged, sendPasswordResetEmail} from "@firebase/auth";
import { signOut } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { collection, getDocs} from "firebase/firestore";
import _ from 'lodash'
import Link from "next/link";
import BuyMembership from "../components/BuyMembership";

const account = ({events, sessions}) => {

    const eventList = JSON.parse(events);
    const sessionList = JSON.parse(sessions);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [studentNumber, setNumber] = useState('');
    const [memberType, setMember] = useState('');
    const [userType, setUser] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const [data, setData] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const [uid, setID] = useState('');



    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user account information loading..')
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      setID(user.uid)  
                      setEmail(user.email);
                      setName(docSnap.data().displayName)
                      setNumber(docSnap.data().studentNumber)
                      setMember(docSnap.data().memberType)
                      setUser(docSnap.data().userType)

                      const registered = docSnap.data().registeredEvents;
                      registered.map((registeredEventId)=>{
                        eventList.map((event)=>{
                            if(event.id === registeredEventId){
                                setData(data => [...data, event])
                            }
                        })
                    })

                    const registeredSessions = docSnap.data().registeredSessions;
                    registeredSessions.map((sessionID)=>{
                        sessionList.map((session)=>{
                            if(session.id == sessionID){
                                setSessionData(sessionData => [...sessionData, session])
                            }
                        })
                    })

                    } else {
                      console.log("No such document!");
                    }
            })
            } else {
                router.push('/login')
            }
        });
    }, [])

    // console.log(data)




   const signOutHandler = () => {
        signOut(auth).then(() => {
            router.push('/')
            console.log('Signed out successfully!')
        }).catch((error) => {
            alert(error);
        });
   }

   async function passwordChangeHandler(){
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email has been sent. Check your spam too!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });  
   }

    return(<div className="bg-beige h-screen">
            <Navi/>
            <div className="px-20 ">
            <h1 className='grid grid-rows-2 text-5xl text-blue-500 font-bold'>{_.startCase(name)}'s Account</h1>
                <div className="grid justify-items-center">
                    <div className="flex flex-wrap gap-3">
                        <div className="content-center flex-1">
                            <motion.div whileHover={{scale: 1.05}}
                             className=" p-10 bg-white rounded-lg drop-shadow-xl  ">
                            {(userType==='admin') && <h1 className='font-medium text-green-400'>You are one of the admins of this website!</h1>}
                                
                            <h1 className='font-medium text-blue-500'>Student Number: <span className='text-black'>{studentNumber}</span></h1>
                            <h1 className='font-medium text-blue-500'>Email: <span className='text-black'>{email}</span></h1>
                            <h1 className='font-medium text-blue-500'>Member type: <span className='text-black'>{_.capitalize(memberType)}</span></h1>
          
                                
                            </motion.div>
                        </div>
                        <div className="flex-1">
                            <motion.div whileHover={{scale: 1.05}} className="p-10 bg-white rounded-lg drop-shadow-xl">
                            <h1 className='font-medium text-blue-500'>Here are all the events you've signed up for:</h1>
                                <ol >
                                    {(data.length > 0) && data.map((event)=>{
                                        return(<li className="text-blue-500 underline" key={event.id}><Link href={"/events/" + event.id}>{event.name}</Link></li>)
                                    })}
                                    {(data.length == 0) && <li>No events to display</li>}
                                </ol>
                            </motion.div>
                        </div>
                        <div className="flex-1">
                            <motion.div whileHover={{scale: 1.05}} className="p-10 bg-white rounded-lg drop-shadow-xl">
                            <h1 className='font-medium text-blue-500'>Here are all the training sessions you've signed up for:</h1>
                                <ol >
                                    {(sessionData.length > 0) && sessionData.map((event)=>{
                                        return(<li className="text-blue-500 underline" key={event.id}><Link href={"/delegate"}>{event.name}</Link></li>)
                                    })}
                                    {(sessionData.length == 0) && <li>No events to display</li>}
                                </ol>
                            </motion.div>
                        </div>
{/* 
                        {(_.lowerCase(memberType) == "regular") && <div className="">
                            <BuyMembership id={uid}/>
                        </div>} */}

                    </div>
                </div>
                <div className="grid justify-items-center">
                <motion.button 
                
                className='text-black mt-32 underline px-10 py-3 font-bold' onClick={passwordChangeHandler}>
                        Want to reset your password?
                </motion.button>
                <motion.button 
                whileHover={{scale: 1.5}}
                className='text-white bg-blue-500 px-10 py-3 rounded-full font-bold' onClick={signOutHandler}>
                        Sign out
                </motion.button>
            </div>
            </div>
            <Footer/>
        </div>)

}

export default account;


export const getStaticProps = async () => {
  
    const entries = await getDocs((collection(database, "events")));
    const data = entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));

    const events = JSON.stringify(data);

    const session_entries = await getDocs((collection(database, "training")));
    const session_data = session_entries.docs.map(session_entry => ({
      id: session_entry.id,
      ...session_entry.data()
    }));

    const sessions = JSON.stringify(session_data);

    
    return {
      props: {
        events,
        sessions
      },
      revalidate: 10
    }
  }