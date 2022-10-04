import Navi from "../../components/Navi";
import styles from '../../styles/Events.module.scss';
import { collection, getDocs, doc, getDoc} from "firebase/firestore";
import { database } from "../../firebase/config";
import { Fragment, useEffect, useState } from "react";
import { onAuthStateChanged} from "@firebase/auth";
import { app } from "../../firebase/config";
import EventCard from "../../components/eventCard";
import { Suspense } from "react";
import Footer from "../../components/Footer";
import { getAuth } from "@firebase/auth";
import { MyModal } from "../../components/AdminControls";

const events = ({events}) => {

    const eventList = JSON.parse(events);
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

    return(<div className={styles.container}>
        <Navi/>
        <div className="grid justify-items-end">
          <div className="flex">
            {/* <p className="inline-block">Admin Controls:</p> */}
            {button}
          </div>
        </div>
        <h1 className="ml-4 pl-10 text-5xl">Events</h1>
        <div className="grid grid-auto-rows grid-flow-col gap-10 place-content-center content-evenly m-10">

            {
                eventList.map((event)=>{
                    return(<div key={event.id}>
                    {/* <Suspense fallback={`Loading...`}> */}
                        <EventCard 
                            id={event.id}
                            name={event.name}
                            date={event.date}
                        />
                    {/* </Suspense> */}
                    </div>)
                })
            }

        </div>
        <br/>
        <div>
            <div className="ml-4 p-10">
                <h1 className="text-5xl">Nationals</h1>
                <br/>
                <p>DECA U Nationals (formerly Provincials) is an annual 3-day undergraduate conference packed with competition, networking opportunities, and connections with thousands of other post-secondary students from 21 other universities across the province. With a broad range of competition categories from marketing to finance to consulting, there will be something that will fit everyone’s interests.

                The much celebrated conference, which takes place every January at the Sheraton Hotel, leaves delegates with unforgettable experiences and relationships that will last a lifetime. Please note that DECA U Membership is mandatory in order to be eligible to attend Nationals. Sign up for membership starts September and lasts until October. Visit us at our booth or online to register for membership. Information regarding booth hours will be posted on our Facebook page.</p>
            </div>
            <div className="ml-4 p-10">
                <h1 className="text-5xl">Apricity</h1>
                <br/>
                <p>Apricity (formerly Chapter Invitational) is an independent DECA conference held by individual schools (ie. Waterloo, Queen’s, Ryerson), which are not tied to DECA U Nationals. They are held throughout the year, and students from other universities are welcome to attend. Registration details for these invitationals will be provided as we approach conference dates.</p>
            </div>
        </div>
        <Footer/>
    </div>);
}


export const getStaticProps = async () => {
    const auth = getAuth(app);
    

    const entries = await getDocs((collection(database, "events")));
    const data = entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));

    const events = JSON.stringify(data);

    
    return {
      props: {
        events,
      },
      revalidate: 10
    }
  }
  

export default events;
