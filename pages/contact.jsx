import { useState } from 'react';
import Footer from '../components/Footer';
import Navi from '../components/Navi';
import styles from '../styles/Contact.module.scss'
import emailjs from '@emailjs/browser';
import Router, { useRouter } from 'next/router';

const contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    var templateParams = {
        name: name,
        email: email,
        message: message
    }

    const eventHandler = (e) => {
        e.preventDefault()
        console.log('Initiating contact form request ...');
        emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, e.target, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, templateParams)
        .then((result) => {
            console.log('Success, code: ' + result.text);
            router.reload();
            alert('Message sent! We will get back to you shortly.')

        }, (error) => {
            alert(error.text + ' Send an email to ace.uoftscarborough@gmail.com');
        });
    }

    return(<div className='bg-beige'>
        <Navi/>
        <div className='mt-28'>
            <div className="font-inter justify-center h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                                <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-bold tracking-tight">
                                    Get in touch
                                </h1>
                                <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                                    Fill in the form if you have any questions!
                                </p>
                                <p className='text-md text-gray-600 dark:text-gray-400 mt-2'>We'll get back to you as soon as we can.</p>

                                <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        University of Toronto, Scarborough. Postal Code: M1C 1A4.
                                    </div>
                                </div>

                                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        ace.uoftscarborough@gmail.com
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={eventHandler} className="p-6 flex flex-col justify-center">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="hidden">Full Name</label>
                                    <input value={name} onChange={(e)=>setName(e.target.value)} type="name" name="name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 text-white rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 font-semibold focus:border-indigo-500 focus:outline-none"/>
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="email" className="hidden">Email</label>
                                    <input onChange={(e)=>setEmail(e.target.value)} type="email" value={email} name="email" id="email" placeholder="Email" className="text-white w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700  font-semibold focus:border-indigo-500 focus:outline-none"/>
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="message" className="hidden">Email</label>
                                    <textarea onChange={(e)=>{setMessage(e.target.value)}} type="text" value={message} name="message" id="message" placeholder="Type your message here.." className="text-white w-100 mt-2 py-10 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700  font-semibold focus:border-indigo-500 focus:outline-none"/>
                                </div>

                                <button type="submit" className="text-white md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='-mt-36'>
                <Footer/>
            </div>
        </div>
        
    </div>);
}   

export default contact;