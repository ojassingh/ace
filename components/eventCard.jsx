import { motion } from 'framer-motion'; 
import { useEffect, useState } from "react";
import Link from "next/link";



const EventCard = (props) => {

      const [date, setDate] = useState('');

      const formatDate = () => {
        const date1 = new Date(props.date.seconds * 1000).toLocaleString('default', { month: 'short' }).toString();
        const date2 = new Date(props.date.seconds * 1000).toLocaleString('default').toString();
        const dateFinal = date1 + ' ' + date2.substring(0,2);
        setDate(dateFinal)
      }

      useEffect(()=>{
        formatDate();
      })

      return (<div className="place-items-center outline outline-1 rounded-lg">

      <div id="image-section"></div>
      <div className="grid justify-items-end pr-7 pt-5">
        <p className="outline outline-1 rounded-md p-1">{date}</p>
      </div>
        
        <h1 className="p-5 text-center text-2xl pl-5">{props.name}</h1>
        <motion.button className="outline outline-offset-2 outline-1 m-5 rounded-full hover:bg-blue-500 outline-white-500 px-10 py-3 ..."
              whileHover={{ translateY: -10}}> 
                <Link href={'/events/'+props.id}>Learn more</Link>
        </motion.button>
      </div>);
}


export default EventCard;