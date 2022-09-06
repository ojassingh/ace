import Navi from "../../components/Navi";
import styles from '../../styles/Events.module.scss';
import { getDocs, collection} from "firebase/firestore";
import EventCard from "../../components/events/EventCard";
import { useEffect } from "react";

const events = () => {
    // const dbInstance = '';
    // const getEvents = () => {
    //     getDocs(dbInstance)
    //         .then((data) => {
    //         console.log(data);
    //         })
    // }


    useEffect(()=>{
        getEvents();
    }, [])

    
    return(<div className={styles.container}>
        <Navi/>
        <h1>Events</h1>
    </div>);
}

export default events;