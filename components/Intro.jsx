import { SimpleGrid, Box, Container, Button} from '@chakra-ui/react';
import styles from '../styles/Home.module.scss';
import Torus from '../components/Torus';
import Navi from '../components/Navi';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { AspectRatio } from '@chakra-ui/react';
// const bg = require("../public/website-background.mp4");

export default function Intro() {
  return (
    <Fragment>
      <div className={styles.container}>

      <SimpleGrid columns={2}>
            <Box>
              <h1 className={styles.introheading}>
              Place a really cool phrase here.{<br/>}
              And here.
              </h1>

              <div className='flex'>

              <motion.button className="bg-red-500 hover:bg-white hover:text-black outline outline-offset-2 outline-1 my-8 mr-10 rounded-full outline-none px-10 py-4 shadow-md shadow-red-500/50 hover:shadow-none ..."
              whileHover={{ translateY: -10}}> 
                EVENTS
              </motion.button>

              <motion.button className="outline outline-offset-2 outline-1 my-8 mr-5 rounded-full hover:bg-violet-500 outline-white-500 px-10 py-3 ..."
              whileHover={{ translateY: -10}}> 
                GET IN TOUCH
              </motion.button>
              
            </div>  
            <p>DECA UTSC is a student-led club, built to improve career centric skills amongst undergraduates. Join us. Emerge a leader.</p>
            </Box>
            <Box>
              <Torus/>
            </Box>
          </SimpleGrid>
    </div>
    </Fragment>
  )
}


// export function getServerSideProps(){
//   return{
//     props{

//     }
//   }
// }