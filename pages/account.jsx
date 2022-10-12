import Navi from "../components/Navi";
import   {useRouter} from 'next/router';
import { useEffect, useState } from "react";
import { app, database } from "../firebase/config";
import { getAuth } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { signOut } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { collection, getDocs} from "firebase/firestore";
import _ from 'lodash'
import Link from "next/link";

const account = ({events}) => {

    const eventList = JSON.parse(events);

    // const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [studentNumber, setNumber] = useState('');
    const [memberType, setMember] = useState('');
    const [userType, setUser] = useState('');
    const auth = getAuth(app);
    const router = useRouter();
    const [data, setData] = useState([]);


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user account information loading..')
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                    //   console.log("Document data:", docSnap.data());
                      setEmail(user.email);
                      setName(docSnap.data().displayName)
                      setNumber(docSnap.data().studentNumber)
                      setMember(docSnap.data().memberType)
                      setUser(docSnap.data().userType)

                      const registerdEvents = docSnap.data().registeredEvents;
                      
                      registerdEvents.map((registeredEventId)=>{
                        eventList.map((event)=>{
                            // console.log(typeof(event.id), typeof(registeredEventId))
                            if(event.id === registeredEventId){
                                // data.push('hi')
                                setData(data => [...data, event])
                            }
                        })

                        // console.log(data)
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




   const signOutHandler = () => {
        signOut(auth).then(() => {
            router.push('/')
            console.log('Signed out successfully!')
        }).catch((error) => {
            alert(error);
        });
   }

    return(<div className="bg-beige">
            <Navi/>
            <div className="h-96 px-20 ">
            <h1 className='grid grid-rows-2 text-5xl text-blue-500 font-bold'>{_.startCase(name)}'s Account</h1>
                <div className="grid justify-items-center">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="content-center">
                            <div className=" p-10 bg-white rounded-lg drop-shadow-xl  ">
                            {(userType==='admin') && <h1 className='font-medium text-green-400'>You are one of the admins of this website!</h1>}
                                
                            <h1 className='font-medium text-blue-500'>Student Number: <span className='text-black'>{studentNumber}</span></h1>
                            <h1 className='font-medium text-blue-500'>Email: <span className='text-black'>{email}</span></h1>
                            <h1 className='font-medium text-blue-500'>Member type: <span className='text-black'>{_.capitalize(memberType)}</span></h1>
          
                                
                            </div>
                        </div>
                        <div className="">
                            <div className="p-10 bg-white rounded-lg drop-shadow-xl">
                            <h1 className='font-medium text-blue-500'>Here are all the events you've signed up for:</h1>
                                <ol >
                                    {(data.length > 0) && data.map((event)=>{
                                        return(<li className="text-blue-500 underline" key={event.id}><Link href={"/events/" + event.id}>{event.name}</Link></li>)
                                    })}
                                    {(data.length == 0) && <li>No events to display</li>}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div className="grid justify-items-center">
                <motion.button 
                whileHover={{scale: 1.5}}
                className='text-white bg-blue-500 px-10 py-3 rounded-full font-bold' onClick={signOutHandler}>
                        Sign out
                </motion.button>
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

    
    return {
      props: {
        events,
      },
      revalidate: 10
    }
  }