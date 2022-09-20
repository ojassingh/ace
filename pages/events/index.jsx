import Navi from "../../components/Navi";
import styles from '../../styles/Events.module.scss';
import { collection, doc, setDoc, getDocs, getDoc, DocumentReference, query, QuerySnapshot} from "firebase/firestore";
import { database } from "../../firebase/config";
import { useEffect, useState } from "react";

const events = ({events}) => {

    const eventList = JSON.parse(events);

    useEffect(()=>{
       eventList.map((event)=>{
            console.log(event);
       })
    }, [])

    // useEffect(()=>{
    //     setData(eventList);
    //     console.log(data);
    // }, [])


    return(<div className={styles.container}>
        <Navi/>
        <h1>Events</h1>
        <ul>

            {
                eventList.map((event)=>{
                    return(<li key={event.id}>
                        {event.name}
                    </li>)
                })
            }

            
        </ul>
    </div>);
}


export const getStaticProps = async () => {
    const entries = await getDocs((collection(database, "events")));
    const data = entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));

    const events = JSON.stringify(data);

    return {
      props: { events },
      revalidate: 10
    }
  }
  

export default events;
