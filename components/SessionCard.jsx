import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { deleteDoc} from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { getAuth } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { app, database } from "../firebase/config";
import DeleteTraining from './DeleteTraining'
import logo from '../public/logo.jpg'
import Image from "next/image";
// import Example from "./Popover";
import dynamic from 'next/dynamic'
const Example = dynamic(() => import("./Popover"), {
ssr: false,
});

import RegisterSession from "./RegisterSession";

const SessionCard = (props) => {

  const auth = getAuth(app);
    const [removeButton, setDelete] = useState(null);
    const [userID, setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(uid)
                
                
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      if(docSnap.data().userType=='admin'){

                        setDelete(
                          <DeleteTraining id={props.id}/>
                        )
                      }
                    }
            })
                   
            } else {
                console.log('No one is logged in')
            }
        });
    }, [])

  const router = useRouter();

    const formatDate = (date)=>{
        const date1 = new Timestamp(date.seconds, date.nanoseconds).toDate().toString();
        return date1.substring(4, 10);
      }

    return(
    <div className="drop-shadow-xl bg-white rounded-lg w-72 ...">
      
      <div className="grid justify-items-end pr-7 pt-5">
        <div className="flex z-30">
          {removeButton}
          <p className="ml-4 bg-blue-100/10 text-green-500  outline outline-1 rounded-md p-1">{formatDate(props.date)}</p>
        </div>
        {props.gmOnly && <p className="px-8 text-xs mt-2 text-red-500">General Members only!</p>}
      </div>

      <div className="mt-4 pb-4 grid justify-items-center">
        <motion.div><Image className='rounded-lg' src={logo} alt='' width='200' height='200'/></motion.div>
        <div className="flex gap-4 px-5">
          <h1 className="font-medium pt-5 text-center text-2xl pl-5">{props.name}</h1>
          <h1 className="font-medium pt-5 text-center text-2xl pl-5"><Example description={props.description} link={props.link}/></h1>
        </div>

        <a href={props.link} className='mt-2 px-24 py-1 bg-blue-500 text-white rounded-md'>
          Link
        </a>
        <div className="px-5">
          <RegisterSession user={userID} sessionID={props.id} />
        </div>
        
        {/* <MyPopover/> */}
      </div>
    </div>
    )
}

export default SessionCard;