import styles from '../styles/Login.module.scss';
import { FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navi from '../components/Navi';
import { useState, Fragment} from 'react';
import { useRouter } from 'next/router';
import {signInWithEmailAndPassword} from "firebase/auth";
import { onAuthStateChanged, getAuth} from 'firebase/auth';
import { app } from '../firebase/config';
const login = () => {

    const router = useRouter();
    const auth = getAuth(app);
    onAuthStateChanged(auth, function(user) {
        if (!user) {
            router.push('/account')
        } 
    });
    // firebase.initializeApp(config);
    // var db = firebase.firestore();
    
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
                    <FormControl>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input id='email' type='email' className='text-black rounded-md' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormHelperText>We'll never share your email.</FormHelperText>

                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' type='password' className='text-black rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FormControl>

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
        </Fragment>
    );
}

// THE FOLLOWING IS A BACKUP SUPABASE AUTH PLATFORM. DO NOT USE THIS IF FIREBASE IS ACTIVE.

// const login = () => {

//     const router = useRouter();
//     const session = supabase.auth.session();

//     if(!!session){
//         router.push('/account')
//     }

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const loginHandler = async (email, password) => {
//         try {
//             const { error } = await supabase.auth.signIn({
//                 email: email, 
//                 password: password 
//             })
//             if (error) throw error
//           } catch (error) {
//             alert(error.error_description || error.message)
//           } finally {
//             router.push('/')
//           }
//     }

//     return(
//     <Fragment>
//     <Navi/>
//     <div className={styles.container}>
//             <div className='align-middle'>
//                 <h1 className={styles.title}>Welcome back, padawan.</h1>
//                 <FormControl>
//                     <FormLabel htmlFor='email'>Email address</FormLabel>
//                     <Input id='email' type='email' className='text-black rounded-md' 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <FormHelperText>We'll never share your email.</FormHelperText>

//                     <FormLabel htmlFor='password'>Password</FormLabel>
//                     <Input id='password' type='password' className='text-black rounded-md'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)} 
//                     />
//                 </FormControl>

//                 <motion.button className='underline underline-offset-1 text-cyan-500' >
//                     <Link href='/signup'>Forgot password?</Link>
//                 </motion.button>
//                 <br/>

//                 <motion.button onClick={(e) => {
//                     e.preventDefault()
//                     loginHandler(email, password)
//                     }} 
                    
//                     className="outline outline-offset-2 outline-1 my-8 mr-5 rounded-full hover:bg-green-500 outline-white-500 px-10 py-3 ..."
//                 whileHover={{ translateY: -10}}> 
//                     Log In
//                 </motion.button>
//                 <br/>
                
//                 <motion.button className='underline underline-offset-1 text-cyan-500'>
//                     <Link href='/signup'>Don't have an account? Sign up.</Link>
//                 </motion.button>
//                 <br/>
//             </div>
//     </div>
//     </Fragment>
//     );
// }


export default login;