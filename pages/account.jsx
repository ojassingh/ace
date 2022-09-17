import Navi from "../components/Navi";
import   {useRouter} from 'next/router';
import { useEffect, useState } from "react";
import { app, database } from "../firebase/config";
import { getAuth } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { signOut } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const account = () => {

    // const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [studentNumber, setNumber] = useState('');


    const auth = getAuth(app);
    const router = useRouter();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user account information loading..')
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      console.log("Document data:", docSnap.data());
                      setEmail(user.email);
                      setName(docSnap.data().displayName)
                      setNumber(docSnap.data().studentNumber)
                    } else {
                      console.log("No such document!");
                    }
            })
            } else {
                router.push('/login')
            }
        });
    }, [])


    // function getData(uid){
    //     setLoading(true);
    //     // const docRef = doc(database, "usersCollection", uid);
        
    //     setLoading(false);
    // }



   const signOutHandler = () => {
        signOut(auth).then(() => {
            router.push('/')
            console.log('Signed out successfully!')
        }).catch((error) => {
            alert(error);
        });
   }

    return(<div>
            <Navi/>
            <h1>{name}</h1>
            <h1>{studentNumber}</h1>
            <h1>{email}</h1>
            <button onClick={signOutHandler}>
                Sign out
            </button>

        </div>)

}

export default account;
