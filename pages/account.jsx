import Navi from "../components/Navi";
import   {useRouter} from 'next/router';
import { useEffect } from "react";

const account = () => {

    const router = useRouter();

    return(<div>
            <Navi/>

            <h1></h1>

            <button onClick={()=> {
                router.push('./')
            }}>
                Sign out
            </button>

        </div>)
}


export default account;