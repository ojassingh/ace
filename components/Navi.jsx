import styles from "../styles/Navi.module.scss"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "../firebase/config";
import { database } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { MyModal } from "./AdminControls";
import { Avatar } from "flowbite-react";
import logo from '../public/logo-white.jpg'
import Image from 'next/image'
const Navi = () => {

    const [session, setSession] = useState(false);

    const auth = getAuth(app);

    const [button, setButton] = useState(<Link href='/signup'><p className="font-medium text-lg cursor-pointer nav-link mt-3">Sign up</p></Link>);

    const [admin, setAdmin] = useState(null);


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                
                setButton(<a href='/account' className="nav-link">
                    <Avatar
                        img=""
                        rounded={true}
                    />
                </a>)
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      if(docSnap.data().userType=='admin'){
                        setSession(true);
                        setAdmin(
                      <MyModal/>
                      )
                      }
                    }
            })
                   
            } else {
                console.log('No one is logged in')
            }
        });
    }, [])

     
    return(
        <div className='w-full bg-beige'>
        <div className="nav-bar flex pl-4">
            <div  className="nav-brand w-1/2 py-5 pl-10">
                <div className="flex">
                <a href='/'>
                    <Image className="rounded-full" src={logo} width='70px' height='70px'/></a>
                    {session && admin}
                </div>
            </div> 
            <div className="py-50 w-1/2">
                <ul className="nav-nav flex flex-wrap mt-4">
                    
                    <li className="font-medium text-lg nav-list py-5 pl-12"><Link className=" nav-link" href="/">Home</Link></li>
                    <li className="font-medium text-lg nav-list py-5 pl-12"><Link className=" nav-link" href="/about">About</Link></li>
                    <li className="font-medium text-lg nav-list py-5 pl-12"><Link className=" nav-link" href="/events">Events</Link></li>
                    <li className="font-medium text-lg nav-list py-5 pl-12"><Link className=" nav-link" href="/delegate">Delegate</Link></li>
                    <li className="font-medium text-lg nav-list py-5 pl-12"><Link className=" nav-link" href="/contact">Contact</Link></li>
                    <li className="nav-list py-2 pl-12">{button}</li>
                </ul>
            </div>
        </div>
</div>);
}


export default Navi;