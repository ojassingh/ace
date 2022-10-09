import Navi from "../../components/Navi";
import styles from '../../styles/Events.module.scss';
import { collection, getDocs, doc, getDoc} from "firebase/firestore";
import { database } from "../../firebase/config";
import EventCard from "../../components/eventCard";
import Footer from "../../components/Footer";
import Image from "next/image";
import spiderman from '../../public/spiderman.jpeg'

const events = ({events}) => {

    const eventList = JSON.parse(events);

    return(<div className='bg-black text-white'>
        <Navi/>
        <h1 className="ml-4 px-16 font-semibold text-6xl text-blue-700">Events</h1>
        <div className="grid justify-items-center">
          <div className="grid grid-auto-rows grid-cols-3 justify-items-center gap-10 m-10">
                {
                    eventList.map((event)=>{
                        return(<div key={event.id}>
                            <EventCard 
                                id={event.id}
                                name={event.name}
                                date={event.date}
                            />
                        </div>)
                    })
                }
          </div>
        </div>
        <br/>
        <div>
        <div className="mx-16 grid grid-cols-10 gap-4">
              <div className="col-span-6 bg-blue-100/10 rounded-md">
                <div className="ml-4 p-10">
                    <h1 className="font-semibold text-blue-500 text-5xl">Nationals</h1>
                    <br/>
                    <p className="text-lg">DECA U Nationals (formerly Provincials) is an annual 3-day undergraduate conference packed with competition, networking opportunities, and connections with thousands of other post-secondary students from 21 other universities across the province. With a broad range of competition categories from marketing to finance to consulting, there will be something that will fit everyone’s interests.

                    The much celebrated conference, which takes place every January at the Sheraton Hotel, leaves delegates with unforgettable experiences and relationships that will last a lifetime. Please note that DECA U Membership is mandatory in order to be eligible to attend Nationals. Sign up for membership starts September and lasts until October. Visit us at our booth or online to register for membership. Information regarding booth hours will be posted on our Facebook page.</p>
                </div>
              </div>

              <div className="col-span-4 bg-blue-100/10 rounded-md">
                <div className="ml-4 p-10">
                      <Image 
                        src={spiderman}
                        alt=''
                        // height='64'
                        // width='64'
                      />
                </div>
              </div>
            </div>

            <div className="mt-12 mx-16 grid grid-cols-10 gap-4">
              <div className="col-span-6 bg-blue-100/10 rounded-md">
                <div className="grid place-content-center ml-4 p-10">
                      <Image 
                        src={spiderman}
                        alt=''
                        height='200'
                        width='200'
                      />
                </div>
              </div>

              <div className="col-span-4 bg-blue-100/10 rounded-md">
                <div className="ml-4 p-10">
                    <h1 className="text-5xl text-blue-500 font-semibold">Apricity</h1>
                    <br/>
                    <p>Apricity (formerly Chapter Invitational) is an independent DECA conference held by individual schools (ie. Waterloo, Queen’s, Ryerson), which are not tied to DECA U Nationals. They are held throughout the year, and students from other universities are welcome to attend. Registration details for these invitationals will be provided as we approach conference dates.</p>
                </div>
              </div>
            </div>
        </div>
        <Footer/>
    </div>);
}


export const getStaticProps = async () => {
  
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
