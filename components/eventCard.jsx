import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteDoc, collection, doc } from "firebase/firestore";
import { database } from "../firebase/config";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import logo from '../public/logo.jpg'


const EventCard = (props) => {

  const router = useRouter()
  const [dateFinal, setDate] = useState('');

  async function deleteHandler(){
    console.log('initialising delete');
    await deleteDoc(doc(database, "events", props.id));
    router.push('/events')
    console.log('deleted document: ' + props.id)
  }

  const formatDate = (date)=>{
    const date1 = new Timestamp(date.seconds, date.nanoseconds).toDate().toString();
    return date1.substring(4, 10);
  }


  return (
    <div className="outline outline-1 rounded-lg w-72 ...">
      <div className="grid justify-items-end pr-7 pt-5">
        <p suppressHydrationWarning className="text-green-500 outline outline-1 rounded-md p-1">{formatDate(props.date)}</p>
      </div>

      <div className="mt-4 grid justify-items-center">
        <Image className='rounded-lg' src={logo} alt='' width='200' height='200'/>
        <h1 className="font-bold px-5 pt-5 text-center text-2xl pl-5">{props.name}</h1>
      </div>
      <div className="grid justify-items-center">
        <div className="flex">
          <motion.button
            className="outline outline-offset-2 outline-1 m-5 rounded-full hover:bg-blue-500 outline-white-500 px-10 py-3 ..."
            whileHover={{ translateY: -10 }}
          >
          <Link className="font-semibold" href={"/events/" + props.id}>Learn more</Link>
          </motion.button>
          
          <button onClick={deleteHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
