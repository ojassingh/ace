import { useState } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from "react"
import SetEvent from "./SetEvent"
import SetSession from "./SetSession"
import Link from "next/link"



export function MyModal() {
    let [isOpen, setIsOpen] = useState(false)
  
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

  
    return (
      <>
        <div className="ml-5 mr-5">
          <button
            type="button"
            onClick={openModal}
            className="mt-2 text-blue-500 font-semibold rounded-md bg-gray-900/10 mr-10 px-5 py-3 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 z-50"
          >
            Admin Controls
          </button>
        </div>
  
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                      {/* Add Event */}
                    </Dialog.Title>
                    <div className="mt-2 grid justify-items-center">
                      <p className="text-md font-semibold text-blue-600">
                        Click the option you would like to choose:
                      </p>
                    </div>

                    <div className="grid justify-items-center">
                        <SetEvent/>
                        <SetSession/>
                        <a
                            href="/masterdata"
                            className="mt-4 rounded-md border border-transparent bg-blue-100 w-64 ... py-2 text-sm font-medium text-blue-900 hover:bg-blue-200">
                                {/* <Link href='/masterdata'>Master data</Link> */}
                                <div className="grid justify-items-center"><p>Master Data</p></div>
                          </a>
                    </div>
  
                    <div className="mt-4 grid justify-items-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Go back.
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }