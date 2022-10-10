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
        <div className={styles.container}>
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
    <Footer/>
    </Fragment>);
}

export default signup;