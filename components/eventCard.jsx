import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";


const EventCard = (props) => {

  const [dateFinal, setDate] = useState('');

  const formatDate = (date)=>{
    // const timstamp = (date.seconds*10000).toLocaleDateString();
    // return timstamp;
    // const date1 = new Date(date.seconds * 10000).toLocaleString('default', { month: 'short' }).toString();
    // const date2 = new Date(date.seconds * 10000).toLocaleString('default').toString();
    // const dateFinal = date1 + ' ' + date2.substring(0,1);

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
    </div>
  );
};

export default EventCard;
