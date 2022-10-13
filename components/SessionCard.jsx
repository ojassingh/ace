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
import { Popover } from '@headlessui/react'

const SessionCard = (props) => {

  const auth = getAuth(app);
    const [removeButton, setDelete] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                
                
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
        <div className="flex">
          {removeButton}
          <p className="ml-4 bg-blue-100/10 text-green-500  outline outline-1 rounded-md p-1">{formatDate(props.date)}</p>
        </div>
      </div>
      <a href={props.link} target="_blank">
      <div className="mt-4 pb-4 grid justify-items-center">
        <motion.div whileHover={{scale: 1.05}}><Image className='rounded-lg' src={logo} alt='' width='200' height='200'/></motion.div>
        <h1 className="font-medium px-5 pt-5 text-center text-2xl pl-5">{props.name}</h1>
        <p className="px-8 text-xs mb-3 text-red-500">General Members only!</p>
        {/* <MyPopover/> */}
      </div>
      </a>
    </div>
    )
}

export default SessionCard;