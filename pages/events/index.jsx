import Navi from "../../components/Navi";
import styles from '../../styles/Events.module.scss';
import { collection, doc, setDoc, getDocs, getDoc, DocumentReference} from "firebase/firestore";
import { database } from "../../firebase/config";
import { Firestore } from "firebase/firestore";

const events = () => {


    return(<div className={styles.container}>
        <Navi/>
        <h1>Events</h1>
        <ul>
            <li></li>
        </ul>
    </div>);
}

export default events;

// export async function getStaticPaths() {

//     const querySnapshot = await getDocs(collection(database, "events"))
    

//     return {
//       fallback: false,
//       paths: [
//         {params:{
//             meetupI: "ev"
//         }}
//       ],
//     }
//   }