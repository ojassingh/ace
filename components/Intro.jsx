import styles from '../styles/Home.module.scss';
import Torus from '../components/Torus';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Intro() {
  return (
    <Fragment>
      <div className='bg-beige h-150 ... px-16 py-10'>
      <div className='grid grid-cols-2'>
            <div>
              <h1 className='mt-8 text-7xl font-bold text-black'>
              Place a really cool phrase here.{<br/>}
              And here.
              </h1>

              <div className='flex'>

              <motion.button
              whileHover={{ translateY: -10}}> 
                <Link href='/events'><p className="bg-red-500 hover:text-black outline outline-offset-2 outline-1 my-8 mr-10 rounded-full outline-none px-10 py-4 shadow-md shadow-red-500/50 hover:shadow-none ...">EVENTS</p></Link>
              </motion.button>

              <motion.div
              whileHover={{ translateY: -10}}> 
                <Link href='/contact'><p className="cursor-pointer outline outline-offset-2 outline-1 my-8 mr-5 rounded-full hover:bg-violet-500 outline-white-500 px-10 py-3 ...">GET IN TOUCH</p></Link>
              </motion.div>
              
            </div>  
            <p className='text-xl font-normal'>ACE UTSC (formerly "DECA")  is a student-led club, built to improve career centric skills amongst undergraduates. Join us. Emerge a leader.</p>
            </div>
            <div>
              <Torus/>
            </div>
          </div>
    </div>
    </Fragment>
  )
}
