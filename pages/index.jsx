import Intro from '../components/Intro';
import ClubInfo from '../components/ClubInfo';
import Contact from '../components/Contact';
import Navi from '../components/Navi';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {useState} from 'react';

function Home() {


  return (
        <Fragment>
        <Navi/>
        <Intro/>
        <ClubInfo/>
        <Contact/>
      </Fragment>
  )
}
export default Home;


// import { useState, useEffect } from 'react'
// import { supabase } from '../utils/supabaseClient'
// import Auth from '../components/Auth'
// import Account from '../components/Account'

// export default function Home() {
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     setSession(supabase.auth.session())

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <div className="container" style={{ padding: '50px 0 100px 0' }}>
//       {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
//     </div>
//   )}
