import Footer from "../components/Footer";
import Navi from "../components/Navi";
import { MyModal } from "../components/AdminControls";
import { database, app} from "../firebase/config";
import { getAuth } from "@firebase/auth";
import { getDocs, collection, doc, getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { onAuthStateChanged } from "@firebase/auth";

const delegate = ({sessions}) => {

    const sessionList = JSON.parse(sessions);
    const auth = getAuth(app);
    const[button, setButton]= useState('')

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      if(docSnap.data().memberType=='admin'){
                        setButton(
                      <MyModal/>
                      )
                      }
                    } else {
                      console.log("No such document!");
                    }
            })
            }
        });
    }, [])


    return(<div className="bg-black text-white">
        <Navi/>
        <div className="grid justify-items-end">
          <div className="flex">
            {button}
          </div>
        </div>
        <div id="training-session-display" className="grid grid-auto-rows grid-cols-4 items-stretch gap-10 justify-items-center m-10">

            {
                sessionList.map((session)=>{
                    return(<div key={session.id}>
                        <SessionCard 
                            id={session.id}
                            date={session.date}
                            name={session.name}
                            link={session.qLink}
                        />
                    </div>)
                })
            }

        </div>
        <div className="grid grid-cols-2">
            <h1>
                Delegate, Cheesecake
            </h1>
            <p>
                Becoming a DECA UTSC Delegate is a very valuable and enriching experience. At DECA UTSC, our goal is to ensure that you achieve the best possible experience that DECA has to offer. With numerous benefits, and various opportunities to develop your skills, we want all of you to reap the rewards and unlock your potential.
            </p>
        </div>
        <div className="grid grid-cols-2">
            <p>
                In order to become a 'delegate,' you must register as a General Member. General Memberships have many perks, and is required to gain access to DECA U Canada events/content, as well as our training sessions. Please note, you must be a student at the Scarborough campus of UofT to register for DECA UTSC. Check out our Delegate Package for more details!
            </p>
            <h1>
                How?
            </h1>
        </div>
        <Footer/>
    </div>);
}
export default delegate;

export const getStaticProps = async () => {
  
    const entries = await getDocs((collection(database, "training")));
    const data = entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));

    const sessions = JSON.stringify(data);

    
    return {
      props: {
        sessions,
      },
      revalidate: 10
    }
  }