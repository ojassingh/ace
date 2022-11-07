import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from "react"
import { collection, addDoc} from "firebase/firestore"
import { database } from "../firebase/config"
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
// import QuillToolbar from "./EditorToolbar";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const SetEvent = (props) => {
  const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date())
    const [deadline, setDeadline] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date());
    const [descr, setDescr] = useState('');
    const [gMPrice, setGMPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [loc, setLoc] = useState('');
    const [loading, setLoading] = useState(false);
    const [gmOnly, setGmOnly] = useState(false);
    const [quest, setQuest] = useState('');
    // const [free, setFree] = useState(false);


    // function isValid(price, free){
    //   if(price==0 && free){
    //     return true
    //   }
    //   else if(free==false && price!=0){
    //     return true
    //   }
    //  else{
    //     return false
    //  }
    // }

    // const[value, setValue] = useState(initialValue);

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

    const getTimestamp = (date) => {
        const datefinal = Date.parse(date)
        const timestamp = Timestamp.fromMillis(datefinal);
        // console.log(date);
        return timestamp;
    }

    async function eventHandler(){
        setLoading(true);
        const startDate = getTimestamp(date);
        const finalDate = getTimestamp(endDate);
        const dead = getTimestamp(deadline);
        // console.log(timestamp)
        closeModal();

        const docRef = await addDoc(collection(database, "events"), {
            name: name,
            date: startDate,
            finalDate: finalDate,
            deadline: dead,
            price: price,
            gMPrice: gMPrice,
            description: descr,
            location: loc,
            gmOnly: gmOnly,
            registered: [],
        })

        if(price > 0 || gMPrice > 0){

          const product = await stripe.products.create({
            id: docRef.id,
            name: name,
          });

          const newPrice = await stripe.prices.create({
            unit_amount: 20,
            currency: 'cad',
            product: docRef.id,
          });

        }

        console.log("Document written with ID: ", docRef.id);
        router.push('/events');

    }

    const [descOpen, setDescOpen] = useState(false)

    function closeDesc() {
        setDescOpen(false)
      }
    
      function openDesc() {
        setDescOpen(true)
      }

    return(<>  

        <div className="mt-4">
            <button
                type="button"
                className="rounded-md border border-transparent bg-blue-100 w-64 ... py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={openModal}
            >
                Add Event
            </button>
        </div>



        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-60" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
  
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Let's add a new event!
                      <br/>
                      <p className="mt-2 text-xs text-red-500">Note: this will be added to the <span className="text-blue-500">/events</span> page</p>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-md text-bold text-gray-500">
                        Fill in the following form:
                      </p>
                    </div>

                    <div>
                            <p className="mt-3 text-sm text-gray-500">Event Name</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="name"
                                placeholder="Networking Event X..."
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                required={true}
                            />
                        </div>

                        <div>
                            <p className="mt-3 text-sm text-gray-500">Start Date & Time</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="name"
                                type="datetime-local"
                                placeholder="yyyy-mm-dd"
                                value={date}
                                onChange={(e)=>setDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="mt-3 text-sm text-gray-500">End Date & Time</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="name"
                                type="datetime-local"
                                placeholder="yyyy-mm-dd"
                                value={endDate}
                                onChange={(e)=>setEndDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="mt-3 text-sm text-gray-500">Deadline to register</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="name"
                                type='datetime-local'
                                value={deadline}
                                placeholder="yyyy-mm-dd"
                                onChange={(e)=>setDeadline(e.target.value)}
                            />
                        </div>

                    {/* <div className="pt-4 pb-2">
                        <div className="flex">
                        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-blue-500">Select if this event is free of charge.</label>
                        <input id="link-checkbox" type="checkbox" className=" ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded-lg border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={free===true}
                            onClick={()=>setFree(!free)}
                        />
                        </div>
                    </div> */}

                    <div className="pt-4 pb-2">
                        <div className="flex">
                        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-blue-500">Just a General Member event?</label>
                        <input id="link-checkbox" type="checkbox" value="" className=" ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded-lg border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            // value={gmOnly}
                            onClick={()=>setGmOnly(!gmOnly)}
                        />
                        </div>
                    </div>
                        
                    <div className="grid grid-cols-2">

                        {(!gmOnly) && <div>
                            <p className="mt-3 text-sm text-gray-500">Price for non-general members</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="price"
                                value={price}
                                placeholder="Input number value only"
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </div>}

                        {<div>
                            <p className="mt-3 text-sm text-gray-500">Price for general members / exclusive members</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="gmprice"
                                value={gMPrice}
                                placeholder="Input number only"
                                onChange={(e)=>setGMPrice(e.target.value)}
                            />
                        </div>}
                        <div>
                            <p className="mt-3 text-sm text-gray-500">Location</p>
                            <input
                                className="mt-2 inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                id="location"
                                value={loc}
                                placeholder="ex. UTSC Bridge"
                                onChange={(e)=>setLoc(e.target.value)}
                            />
                        </div>

                      <>  
                    
                        {/* <p className="mt-3 text-sm text-gray-500">Location</p> */}
                        <div className="mt-2">
                            <p className="mt-3 text-sm text-gray-500">Add a description</p>
                            <button
                                type="button"
                                className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={openDesc}
                            >
                                Click to add 👉
                            </button>
                        </div>



                        <Transition appear show={descOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeDesc}>
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <div className="fixed inset-0 bg-black bg-opacity-60" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">

                                <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                                >
                                <Dialog.Panel className="w-max max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                    Let's add a the event description ...
                                    <br/>
                                    <p className="mt-2 text-xs text-blue-500">Once you're done completing the form, click submit.</p>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    <p className="text-md text-bold text-gray-500">
                                        Fill in the following form:
                                    </p>
                                    </div>

                                    <div className="mt-2 text-black rounded-lg grid w-96">
                                    {/* <QuillToolbar /> */}
                                      <ReactQuill
                                              className="mt-4 w-96"
                                              theme="snow"
                                              value={descr}
                                              onChange={(e)=>setDescr(e)}   
                                              placeholder='spread your message...' 
                                              // modules={modules}
                                              // formats={formats} 
                                    />

                                    </div>

                                    

                                    <div className="grid grid-cols-2 mt-20 justify-items-center">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeDesc}
                                    >
                                        Cancel.
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        value={descr}
                                        onClick={closeDesc}
                                    >
                                        Done.
                                    </button>

                                    </div>

                                </Dialog.Panel>
                                </Transition.Child>
                            </div>
                            </div>
                        </Dialog>
                        </Transition>
                        </>

                    </div>

                    {/* <button onClick={()=>console.log(descr)}>fuck yeah</button> */}

                    

                    <div className="mt-4 grid justify-items-end">
        


                      {/* <SetDescription/> */}

                    </div>

                    {/* {(isValid(price, free) && isValid(gMPrice, free)) && <div>
                          <p className="font-semibold text-sm text-red-500">!!Please check the box is the price is 0!!</p>
                      </div>} */}
  
                    <div className="mt-4 gap-2 grid grid-cols-2">

                      <button
                        type="button"
                        className="left-0 justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel.
                      </button>

                      <button
                        type="button"
                        className="left-0 justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={eventHandler}
                      >
                        Submit.
                      </button>

                    </div>

                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>);
}

export default SetEvent;