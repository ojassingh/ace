import styles from '../styles/Login.module.scss';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navi from '../components/Navi';
import { Fragment } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { database } from '../firebase/config';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { app } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import Footer from '../components/Footer';
import Image from 'next/image';

const signup = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [studentNumber, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [memberType, setMember] = useState('regular'); //regular members or general members
    const [userType, setUser] = useState('guest'); // admins or guests


    const signInHandler = (email, password, studentNumber, name) =>{

      const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
            const user = userCredential.user;
            // sendEmailVerification(user)
            // alert("Check email for verification!")
            const docData = {
              // uid: userCredential.user.uid,
              email: email, 
              displayName: name, 
              studentNumber: studentNumber,
              memberType: memberType,
              userType: userType,
            }
            setDoc(doc(database, "usersCollection", user.uid), docData);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode || errorMessage)
          // ..
        });
    }


    return(<Fragment>
        <Navi/>
        <div className='mx-20'>
        <div className='grid grid-cols-2'>
          <div className=''>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width='50' height='50'/>
                    Flowbite    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="dorp-shadow-xl text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email}/>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password}/>
                            </div>
                            <div>
                                <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Number</label>
                                <input type="text" name="studentNumber" id="studentNumber" placeholder="1234567890" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            
                            <button type="submit" className="w-full text-black bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
          </section>
          </div>
          <div className='align-middle'>
          <h1 className={styles.title}>Hello, young padawan.</h1>

          <div>

              <p htmlFor='email'>Email address</p>
              <input className='text-black rounded-sm' id='email' type='email' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              
              <p htmlFor='text'>Full Name</p>
              <input className='text-black rounded-sm' id='name' type='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
              />

              <p htmlFor='text'>Student Number</p>
              <input className='text-black rounded-sm' id='studentNumber' type='number'
                  value={studentNumber}
                  onChange={(e) => setNumber(e.target.value)} 
              />

              <p htmlFor='password'>Password</p>
              <input className='text-black rounded-sm' id='password' type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <br/>

          <motion.button className="outline outline-offset-2 outline-1 my-8 mr-5 rounded-full hover:bg-green-500 outline-white-500 px-10 py-3 ..."
                whileHover={{ translateY: -10}}
                onClick={(e) => {
                e.preventDefault()
                signInHandler(email, password, studentNumber, name)
              }} 
          > 
                  Create an account
          </motion.button>
          <br/>
          
          <motion.button className='underline underline-offset-1 text-cyan-500'>
              <Link href='/login'>Already have an account? Log in.</Link>
          </motion.button>
        
          </div>
        </div>
    </div>
    <Footer/>
    </Fragment>);
}

export default signup;