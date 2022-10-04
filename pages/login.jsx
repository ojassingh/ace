import styles from '../styles/Login.module.scss';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navi from '../components/Navi';
import { useState, Fragment, useEffect} from 'react';
import { useRouter } from 'next/router';
import {signInWithEmailAndPassword} from "firebase/auth";
import { onAuthStateChanged, getAuth} from 'firebase/auth';
import { app } from '../firebase/config';
import Footer from '../components/Footer';
const login = () => {

    const router = useRouter();
    const auth = getAuth(app);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log('User is already signed in, so redirecting.');
                router.push('/account');
            } else {
                console.log('No Login detected.')
            }
        });
    }, [])
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Logged in Successfully")
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode || errorMessage)
        });
    } 


    return(
        <Fragment>
        <Navi/>
        <div className={styles.container}>
                <div className='align-middle'>
                    <h1 className={styles.title}>Welcome back, padawan.</h1>
                    <div>
                        <div htmlFor='email'>Email address</div>
                        <input id='email' type='email' className='text-black rounded-md' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p>We'll never share your email.</p>

                        <div htmlFor='password'>Password</div>
                        <input id='password' type='password' className='text-black rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <motion.button className='underline underline-offset-1 text-cyan-500' >
                        <Link href='/signup'>Forgot password?</Link>
                    </motion.button>
                    <br/>

                    <motion.button onClick={(e) => {
                        e.preventDefault()
                        loginHandler(email, password)
                        }} 
                        
                        className="outline outline-offset-2 outline-1 my-8 mr-5 rounded-full hover:bg-green-500 outline-white-500 px-10 py-3 ..."
                    whileHover={{ translateY: -10}}> 
                        Log In
                    </motion.button>
                    <br/>
                    
                    <motion.button className='underline underline-offset-1 text-cyan-500'>
                        <Link href='/signup'>Don't have an account? Sign up.</Link>
                    </motion.button>
                    <br/>
                </div>
        </div>
        <Footer/>
        </Fragment>
    );
}

export default login;