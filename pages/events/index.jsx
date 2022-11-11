import Navi from "../../components/Navi";
import { collection, getDocs, doc, getDoc} from "firebase/firestore";
import { database } from "../../firebase/config";
import EventCard from "../../components/eventCard";
import Footer from "../../components/Footer";
import Image from "next/image";
import logo from '../../public/logo.jpg'
import CarouselComp from '../../components/CarouselComp'
import { motion } from "framer-motion";
import box from '../../public/box.png'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/config';
import { useState, useEffect } from "react";
import Link from "next/link";
const events = ({events}) => {

    const [pic1, setPic1] = useState('')
    const [pic2, setPic2] = useState('')

    useEffect(()=>{
        // const storage = getStorage();
        getDownloadURL(ref(storage, 'images/pic11.JPG'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            // const img = document.getElementById('myimg');
            // img.setAttribute('src', url);
            // img.style.width = '798.0px';
            // img.style.height = '300.0px';
            setPic1(url);
            // console.log(url);
        })
        .catch((error) => {
            // Handle any errors
        });

        getDownloadURL(ref(storage, 'images/pic19.jpg'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            setPic2(url);
            // console.log(url);
        })
        .catch((error) => {
            // Handle any errors
        });
    }, [])

    const eventList = JSON.parse(events);

    return(<div className='bg-beige text-black'>
        <Navi/>
        <h1 className="ml-4 px-16 font-semibold text-6xl text-black">Events</h1>
        <div className="grid justify-items-center">
          <div className="flex flex-wrap justify-items-center gap-10 m-10">
                {(eventList.length > 0) && 
                    eventList.map((event)=>{
                        return(<motion.div whileHover={{scale: 1.05}} key={event.id}>
                            <EventCard 
                                id={event.id}
                                name={event.name}
                                date={event.date}
                                gmOnly={event.gmOnly}
                            />
                        </motion.div>)
                    })
                }
          </div>
          {(eventList.length == 0) && <div className="grid justify-items-center">
                    <Image src={box} width='100' height='100'/>
                    <p className="text-gray-500 text-sm">No events to display for now. Stay tuned for more!</p>
                </div>}
        </div>
        <br/>
        <div>


        <div className="grid justify-items-center">
          <div className="flex gap-4">
            <motion.img src={pic1} whileHover={{scale: 1.1}}
                                className="h-120 ml-8 bg-white bg-white rounded-lg drop-shadow-xl">
            </motion.img>

            <motion.img src={pic2} whileHover={{scale: 1.1}}
                              className="h-120 ml-4 bg-white bg-white rounded-lg drop-shadow-xl flex">
              </motion.img>
          </div>
        </div>

        <div className=' px-16 py-10 grid justify-items-center'>
            <motion.div whileHover={{scale: 1.03}}
                             className="ml-4 bg-white px-20 py-10 bg-white rounded-lg drop-shadow-xl grid justify-items-center">

            <h1 className="align-center font-semibold text-blue-500 text-5xl">Nationals</h1>                
            <h1 className='mt-3 font-medium text-green-400'>Compete for glory!</h1>    
            <p className="mt-3 text-lg">
            ACE Nationals (formerly Provincials) is an annual 3-day undergraduate conference packed with competition, networking opportunities, and connections with thousands of other post-secondary students from 21 other universities across the province. With a broad range of competition categories from marketing to finance to consulting, there will be something that will fit everyone’s interests.

            The much celebrated conference, which takes place every January at the Sheraton Hotel, leaves delegates with unforgettable experiences and relationships that will last a lifetime. Please note that ACE Membership is mandatory in order to be eligible to attend Nationals. Sign up for membership starts September and lasts until October. Visit us at our booth or online to register for membership. Information regarding booth hours will be posted on our Facebook page.
            </p>
            </motion.div>
            
        </div>

        <div className='px-16 grid justify-items-center'>
            
            <motion.div whileHover={{scale: 1.03}}
                             className="w-150 ml-8 bg-white p-10 bg-white rounded-lg drop-shadow-xl mb-12">
                             {/* <div className="m-auto"> */}
                              <div className="grid justify-content-center">
                                <h1 className="text-center text-5xl text-blue-500 font-semibold">Apricity</h1>
                              </div>
                                <p className="mt-3 text-lg">
                                  Apricity (formerly Chapter Invitational) is an independent ACE conference held by individual schools (ie. Waterloo, Queen’s, Ryerson), which are not tied to ACE Nationals. They are held throughout the year, and students from other universities are welcome to attend. Registration details for these invitationals will be provided as we approach conference dates.
                                </p>
                             {/* </div> */}
            </motion.div>
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
      revalidate: 20
    }
  }
  

export default events;
