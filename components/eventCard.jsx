import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from '../public/logo.jpg'

const EventCard = (props) => {

  const router = useRouter()
  const [dateFinal, setDate] = useState('');



  const formatDate = (date)=>{
    const date1 = new Timestamp(date.seconds, date.nanoseconds).toDate().toString();
    return date1.substring(4, 10);
  }

  return (
    <div className="drop-shadow-xl bg-white rounded-lg w-72 ...">
      <div className="grid justify-items-end pr-7 pt-5">
        <p suppressHydrationWarning className="bg-blue-100/10 text-green-500  outline outline-1 rounded-md p-1">{formatDate(props.date)}</p>
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
            <Link className="font-semibold" href={"/events/" + props.id}>
            Learn more
          </Link>
            </motion.button>
        
        </div>
      </div>
    </div>
  );
};

export default EventCard;
