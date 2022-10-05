import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteDoc, collection, doc } from "firebase/firestore";
import { database } from "../firebase/config";
import Router, { useRouter } from "next/router";


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
    <div className="place-items-center outline outline-1 rounded-lg">
      <div className="grid justify-items-end pr-7 pt-5">
        <p suppressHydrationWarning className="outline outline-1 rounded-md p-1">{formatDate(props.date)}</p>
      </div>

      <h1 className="p-5 text-center text-2xl pl-5">{props.name}</h1>
      <motion.button
        className="outline outline-offset-2 outline-1 m-5 rounded-full hover:bg-blue-500 outline-white-500 px-10 py-3 ..."
        whileHover={{ translateY: -10 }}
      >
        <Link href={"/events/" + props.id}>Learn more</Link>
      </motion.button>
      {/* <FontAwesomeIcon className="text-white bg-white" icon="fa-solid fa-trash" /> */}
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default EventCard;
