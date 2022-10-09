import styles from "../styles/Navi.module.scss"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "../firebase/config";
import { database } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { MyModal } from "./AdminControls";
const Navi = () => {

    const [session, setSession] = useState(false);

    const auth = getAuth(app);

    const [button, setButton] = useState(<Link href='/login' className="nav-link">[Login]</Link>);

    const [admin, setAdmin] = useState(null);


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                
                setButton(<Link href='/account' className="nav-link">[Account]</Link>)
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      if(docSnap.data().memberType=='admin'){
                        setSession(true);
                        setAdmin(
                      <MyModal/>
                      )
                      }
                    }
            })
                   
            } else {
                console.log('no on is logged in')
            }
        });
    }, [])


    const navibar = ['Home', 'About', 'Events', 'Delegate', 'Contact', 'Account'];
     
    return(
        <div className={styles.container}>
        <div className="nav-bar flex pl-4">
            <div  className="nav-brand w-1/2 py-5 pl-10"><Link href='/'>[ACE UTSC LOGO]</Link></div> 
            <div className="py-50 w-1/2">
                <ul className="nav-nav flex">
                    <li className="nav-list py-5 pl-12"><Link className="nav-link" href="/">[Home]</Link></li>
                    <li className="nav-list py-5 pl-12"><Link className="nav-link" href="/about">[About]</Link></li>
                    <li className="nav-list py-5 pl-12"><Link className="nav-link" href="/events">[Events]</Link></li>
                    <li className="nav-list py-5 pl-12"><Link className="nav-link" href="/delegate">[Delegate]</Link></li>
                    <li className="nav-list py-5 pl-12"><Link className="nav-link" href="/contact">[Contact]</Link></li>
                    <li className="nav-list py-5 pl-12">{button}</li>
                </ul>
            </div>
        </div>
        {session && <div className="grid justify-items-end">
            {admin}
        </div>}
</div>);
}


export default Navi;