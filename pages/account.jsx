import Navi from "../components/Navi";
import   {useRouter} from 'next/router';
import { useEffect, useState } from "react";
import { app, database } from "../firebase/config";
import { getAuth } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { signOut } from "@firebase/auth";
import { getDoc } from "firebase/firestore";
import { database } from "../firebase/config";

const account = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user account information loading..')
            } else {
                router.push('/login')
            }
        });
    }, [])


    async function getData(){
        setLoading(true);
        const docRef = doc(db, "cities", "SF");
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    }, [])
    
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
            <h1></h1>

            <button onClick={signOutHandler}>
                Sign out
            </button>

        </div>)

}

export default account;
