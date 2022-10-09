import Intro from '../components/Intro';
import ClubInfo from '../components/ClubInfo';
import Contact from '../components/Contact';
import Navi from '../components/Navi';
import { Fragment } from 'react';
import Footer from '../components/Footer';

function Home() {


  return (
        <div>
        <Navi/>
        <Intro/>
        <ClubInfo/>
        <Contact/>
        <Footer/>
      </div>
  )
}
export default Home;
