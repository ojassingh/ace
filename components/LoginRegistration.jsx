import { useState } from 'react';
import Image from 'next/image';
import logo from '../public/logo-white.jpg'
import { useRouter } from 'next/router';

export default function LoginRegistration(props) {


  const [view, setView] = useState(<div className='grid justify-items-center'>
    <h1 className='text-sm text-gray-500'>{props.name}</h1>
  </div>)


  const router = useRouter();

  return (
    <div className='grid justify-items-center'>
      <section className='px-10 rounded-lg bg-white'>
        <div className='px-5 py-3 grid justify-items-center text-black'>
            <Image 
              className='ml-4' src={logo} alt="aceutsc-logo" width="64" height="64"
            />
            <div className='grid justify-items-center'>
              <h1 className='flex'>{props.name}</h1>
              {/* {view} */}
            </div>
        </div>
        <div className='grid justify-items-center'>
          <button className='m-4 px-20 py-2 bg-indigo-700 text-white rounded-md'  onClick={(e)=>{
            e.preventDefault()
            router.push('/login')
          }}>
            Log in to register
          </button>
        </div>
      </section>
    </div>
  );
}
