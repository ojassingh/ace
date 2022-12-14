import { motion } from "framer-motion";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/config';
import { useEffect, useState } from "react";


const ClubInfo = () => {

const [pic1, setPic1] = useState('')
const [pic2, setPic2] = useState('')

    useEffect(()=>{
        // const storage = getStorage();
        getDownloadURL(ref(storage, 'images/pic9.JPG'))
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

        getDownloadURL(ref(storage, 'images/pic1.JPG'))
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


    return(<div className='bg-blue-700'>
        <div className='px-16 py-10 flex flex-wrap gap-10 place-content-center'>
            <motion.div whileHover={{scale:1.05}}
                             className="w-150 bg-white p-10 bg-white rounded-lg drop-shadow-xl flex ">
                             <div className="m-auto">
                                <h1 className='leading-tight text-4xl font-semibold text-black'>Join one of the most lucrative clubs at the University of Toronto.</h1>
                                <h1 className='mt-3 flex font-medium text-green-400'>We would love to have you in our team! Learn more <Link href='/about'><p  className='mx-1 cursor-pointer underline'>about us</p></Link></h1>    
                                <p className="mt-3 text-lg">
                                    We strive to assist and support our delegate base to succeed in future opportunities by building their communication, critical thinking and networking skills.
                                </p>
                             </div>
            </motion.div>
            <motion.img src={pic2} whileHover={{scale:1.05}}
                             className=" w-140  bg-white bg-white rounded-lg drop-shadow-xl flex md:mx-auto">
            </motion.img>
    
        </div>
        <div className='px-16 pb-10 flex flex-wrap gap-10'>
            <motion.img src={pic1} whileHover={{scale:1.05}}
                             className=" w-140  bg-white bg-white rounded-lg drop-shadow-xl md:mx-auto">
            </motion.img>

            <motion.div whileHover={{scale:1.05}}
                             className=" w-150 bg-white p-10 bg-white rounded-lg drop-shadow-xl ">
                             <div className="m-auto">
                                <h1 className='leading-tight text-4xl font-semibold text-black'>How can you be involved?</h1>
                                <h1 className='flex mt-3 font-medium text-green-400'>Check out all our upcoming <Link href='/events'><p  className='mx-1 cursor-pointer underline'>events</p></Link> and <Link href='/delegate'><p className="ml-1 cursor-pointer underline">training sessions!!</p></Link></h1>    
                                <p className="mt-3 text-lg">
                                    Every year DECA UTSC hosts a number of events such as competitions, workshops, and social events. If you want to develop your soft skills and professional skills, and meet new people, join us at our events as they are catered towards YOU!
                                </p>
                             </div>
            </motion.div>
        </div>
    </div>);
}

export default ClubInfo;