import { useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import {setTheDescription} from "./SetEvent";

const SetDescription = () => {

    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }


    return(<>  

        <div className="mt-4">
            <button
                type="button"
                className="inline-flex rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={openModal}
            >
                Add a description 👉
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
                      Let's add a the event description ...
                      <br/>
                      <p className="mt-2 text-xs text-blue-500">Once you're done completing the form, click submit.</p>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-md text-bold text-gray-500">
                        Fill in the following form:
                      </p>
                    </div>

                    <div className="grid">
                        <ReactQuill
                            className="mt-4"
                        />
                    </div>

                    
  
                    <div className="grid grid-cols-2 mt-20 grid justify-items-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel.
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
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
      </>);
}

export default SetDescription;