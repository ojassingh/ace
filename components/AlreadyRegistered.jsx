import Image from "next/image";
import logo from '../public/logo-white.jpg'
import { useState, useEffect} from "react";


const AlreadyRegistered = (props) => {

    const [view, setView] = useState(<div className='grid justify-items-center'>
    <h1 className='text-sm text-gray-500'>Registration for this event is free!</h1>
    </div>)


    return(<div className='bg-white rounded-lg w-64 grid justify-items-center'>
    <section className='px-10 rounded-lg bg-white'>
      <div className='px-5 py-3 grid justify-items-center text-black'>
          <Image 
            className='ml-4' src={logo} alt="aceutsc-logo" width="64" height="64"
          />
          <div className='grid justify-items-center'>
            <h1 className='text-semibold text-center'>{props.name}</h1>
            <p className="text-gray-500 text-sm mt-1">You are already registered</p>
          </div>
      </div>
      <div className='grid justify-items-center'>
        <button className='mx-4 mb-4 px-20 py-2 bg-indigo-700 text-white rounded-md' disabled>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        </button>
      </div>
    </section>
  </div>)
}

export default AlreadyRegistered;