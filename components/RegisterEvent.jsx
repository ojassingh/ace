import { useState } from "react";
import Image from 'next/image';
import logo from '../public/logo-white.jpg'


const RegisterEvent = (props) => {

    const eventHandler = () => {
        console.log('Clicked');
    }

    const [view, setView] = useState(<div className='grid justify-items-center'>
        <button className='m-4 px-20 py-2 bg-indigo-700 text-white rounded-md'
            onClick={eventHandler}
        >
            Register
        </button>
  </div>)

    return(<div>
        <div className='px-5 py-3 grid justify-items-center text-black'>
            <Image 
              className='ml-4' src={logo} alt="aceutsc-logo" width="64" height="64"
            />
            <div className='grid justify-items-center'>
              <h1 className='flex'>{props.name}</h1>
                {view}
            </div>
        </div>
    </div>)
}


export default RegisterEvent;