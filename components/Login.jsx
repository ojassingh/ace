import styles from '../styles/Login.module.scss';
import { FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navi from '../components/Navi';
import { useState, useContext, Fragment} from 'react';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter()
    const sesh = supabase.auth.session();

    if(!!sesh){
        alert('hello already signed in')
    }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginHandler = async (email, password) => {
        try {
            const { error } = await supabase.auth.signIn({
                email: email, 
                password: password 
            })
            if (error) throw error
          } catch (error) {
            alert(error.error_description || error.message)
          } finally {
            router.push('/')
          }
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

export default Login;