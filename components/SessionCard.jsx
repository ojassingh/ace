import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../firebase/config";


const SessionCard = (props) => {
  const router = useRouter();

    const formatDate = (date)=>{
        const date1 = new Timestamp(date.seconds, date.nanoseconds).toDate().toString();
        return date1.substring(4, 10);
      }

      async function deleteHandler(){
        console.log('initialising delete');
        await deleteDoc(doc(database, "training", props.id));
        router.push('/delegate')
        console.log('deleted document: ' + props.id)
      }

    return(<div className="place-items-center outline outline-1 rounded-lg">
      <div className="grid justify-items-end pr-7 pt-5">
        <p suppressHydrationWarning className="outline outline-1 rounded-md p-1">{formatDate(props.date)}</p>
      </div>

      <h1 className="p-5 text-center text-2xl pl-5">{props.name}</h1>
      {/* <p>{props.link}</p> */}
      <motion.button
        className="outline outline-offset-2 outline-1 m-5 rounded-full hover:bg-blue-500 outline-white-500 px-10 py-3 ..."
        whileHover={{ translateY: -10 }}
      >
        <a target='_blank' href={props.link}>Learn more</a>
      </motion.button>
      <button onClick={deleteHandler}>Delete</button>
    </div>)
}

export default SessionCard;