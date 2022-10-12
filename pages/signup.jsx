import { motion } from 'framer-motion';
import Link from 'next/link';
import Navi from '../components/Navi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { database } from '../firebase/config';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { app } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import Footer from '../components/Footer';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/config';
import { Spinner } from 'flowbite-react';

const signup = () => {

    useEffect(()=>{
        // const storage = getStorage();
        getDownloadURL(ref(storage, 'images/logo-white.jpg'))
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
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
            img.style.width = '100px';
            img.style.height = '100px';
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

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [studentNumber, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [memberType, setMember] = useState('regular'); //regular members or general members
    const [userType, setUser] = useState('guest'); // admins or guests
    const router = useRouter();


    const signInHandler = (email, password, studentNumber, name) =>{

        setLoading(true);
        console.log(name)
        console.log(email);
        console.log(studentNumber);

      const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
            const user = userCredential.user;
            // sendEmailVerification(user)
            // alert("Check email htmlFor verification!")
            const docData = {
              // uid: userCredential.user.uid,
              email: email, 
              displayName: name, 
              studentNumber: studentNumber,
              memberType: memberType,
              userType: userType,
              registeredEvents: [],
            }
            setDoc(doc(database, "usersCollection", user.uid), docData);
            router.push('/')
            alert('You are now signed up!')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode || errorMessage)
          // ..
        });

        setLoading(false);
    }


    return(<div className='bg-beige'>
        <Navi/>
        <div className='drop-shadow-xl mb-20 mx-20'>
        <div className='grid grid-cols-2 gap-4'>
          <div className=''>
          <section className="px-10 py-10 rounded-lg bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img id='myimg' className="w-9 h-9 mr-2" src='' alt="logo"/>
                    ACE Uoft Scarborough    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-6 py-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="drop-shadow-xl text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">

                            <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input value={name} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={(e)=>{
                                setName(e.target.value);
                            }}/>
                            </div>

                            <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={(e)=>{
                                setEmail(e.target.value);
                            }}/>
                            </div>

                            <div>
                                <label htmlFor="studentNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Number</label>
                                <input type="text" name="studentNumber" id="studentNumber" placeholder="1234567890" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={studentNumber} onChange={(e)=>{
                                    // console.log(e.target.value);
                                    setNumber(e.target.value)
                                }}/>
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password} onChange={(e)=>{
                                    // console.log(e.target.value);
                                    setPassword(e.target.value)
                                }}/>
                            </div>
                            
                            {!loading && 
                            <div className='grid justify-items-center'>
                                <button type="submit" className="px-32 rounded-lg py-2 text-white bg-blue-600" onClick={(e) => {
                                e.preventDefault()
                                signInHandler(email, password, studentNumber, name);
                                }} 
                                >
                                    Create account
                                </button>
                            </div>
                            }

                            {loading && <div className='grid justify-items-center'>
                                <button disabled type="submit" className="px-32 rounded-lg py-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4"
                                ><Spinner
                                    color="success"
                                    aria-label="Success spinner example"
                                />
                                    <p className='ml-4'>Loading ...</p>
                                </button>
                            </div>}

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
          </section>
          </div>
          <div className='flex'>
            {/* <motion.div> */}
                <motion.div whileHover={{ scale: 1.2 }} className='m-auto'>
                    <img id='myimg2' className="rounded-lg" src='' alt="logo"/>
                </motion.div>
            {/* </motion.div> */}
          </div>
        </div>
    </div>
    <Footer/>
    </div>);
}

export default signup;