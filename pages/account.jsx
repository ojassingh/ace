import Navi from "../components/Navi";
import   {useRouter} from 'next/router';
import { useEffect } from "react";

const account = () => {

    const session = supabase.auth.session();
    const router = useRouter();

    if(session == null){
        useEffect(()=>{router.push('/login')}, []);
    }

    return(<div>
            <Navi/>

            <h1></h1>

            <button onClick={()=> {
                supabase.auth.signOut();
                router.push('./')
            }}>
                Sign out
            </button>

        </div>)
}


// export async function getServerSideProps(){

    
//     const res = await fetch('/api/auth')
//     const data = await res.json();

//     return{ 
//         props: {data}
//     }
// }


export default account;