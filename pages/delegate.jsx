import Footer from "../components/Footer";
import Navi from "../components/Navi";
import { database} from "../firebase/config";
import { getDocs, collection} from "firebase/firestore";
import { motion } from "framer-motion";
import SessionCard from "../components/SessionCard";
import Image from 'next/image';
import pdf from '../public/pdf-file.png'
import box from '../public/box.png'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/config';
import { useState, useEffect} from "react";

const delegate = ({sessions}) => {

    const [link, setLink] = useState('');

    useEffect(()=>{
        // const storage = getStorage();
        getDownloadURL(ref(storage, 'Delegate_Package.pdf'))
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

            setLink(url);

            // // Or inserted into an <img> element
            // const img = document.getElementById('myimg');
            // img.setAttribute('src', url);
            // img.style.width = '100px';
            // img.style.height = '100px';
        })
        .catch((error) => {
            // Handle any errors
        });

        getDownloadURL(ref(storage, 'images/young-businesswoman-with-rocket.png'))
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
            const img = document.getElementById('myimg2');
            img.setAttribute('src', url);
            img.style.width = '532px';
            img.style.height = '532px';
        })
        .catch((error) => {
            // Handle any errors
        });
    }, [])

    const sessionList = JSON.parse(sessions);

    return(<div className="bg-beige">
        <Navi/>
        <div>
        <h1 className="px-16 font-semibold text-6xl text-black">Training Sessions</h1>
        <div className="grid justify-items-center">
        <div id="training-session-display" className="grid grid-auto-rows grid-auto-cols items-stretch gap-4 m-10">

            {(sessionList.length > 0) &&
                sessionList.map((session)=>{
                    return(<motion.div whileHover={{scale:1.1}}
                    key={session.id}>
                        <SessionCard 
                            id={session.id}
                            date={session.date}
                            name={session.name}
                            link={session.qLink}
                            gmOnly={session.gmOnly}
                        />
                    </motion.div>)
                })
            }

            {(sessionList.length == 0) &&
                <div className="grid justify-items-center">
                    <Image src={box} width='100' height='100'/>
                    <p className="mt-4 text-gray-500 text-sm">No sessions to display for now. Stay tuned for more!</p>
                </div>
            }

        </div>
        </div>
        
        <div>
        <div className="mx-16 grid grid-cols-10 gap-4">
              <div className="drop-shadow-xl col-span-5 bg-white rounded-lg">
                <div className="p-10">
                    <h1 className="font-semibold text-blue-500 text-5xl">Become a Delegate</h1>
                    <br/>
                    <p className="text-lg">Becoming a DECA UTSC Delegate is a very valuable and enriching experience. At DECA UTSC, our goal is to ensure that you achieve the best possible experience that DECA has to offer. With numerous benefits, and various opportunities to develop your skills, we want all of you to reap the rewards and unlock your potential.</p>
                </div>
              </div>
              <div className="rounded-lg drop-shadow-xl bg-white col-span-5 p-10">
                    <h1 className="text-5xl text-blue-500 font-semibold">How can you be a Delegate?</h1>
                    <br/>
                    <p>In order to become a 'delegate,' you must register as a General Member. General Memberships have many perks, and is required to gain access to DECA U Canada events/content, as well as our training sessions. Please note, you must be a student at the Scarborough campus of UofT to register for DECA UTSC. Check out our Delegate Package for more details!</p>
                </div>
        </div>
        <div className="mx-16 mb-16 mt-10">
              <div className="drop-shadow-xl bg-white rounded-lg">
                <div className="grid justify-items-center p-10">
                    <h1 className="text-center font-semibold text-blue-500 text-5xl">Our Delegate package!</h1>
                    <br/>
                    <a href={link} target='_blank'><Image src={pdf} width='100px' height='100px'/></a>
                    <p className="text-center font-medium">Take a look at the delegate package for all the information you need!</p>
                </div>
              </div>
        </div>
        </div>
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