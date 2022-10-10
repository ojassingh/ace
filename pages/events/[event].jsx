import { getDocs, collection, getDoc, doc} from "firebase/firestore";
import { database } from "../../firebase/config";
import Navi from "../../components/Navi";
import Footer from "../../components/Footer";
import { Timestamp } from "firebase/firestore";
import PreviewPage from "../../components/PreviewPage";
import Contact from "../../components/Contact";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Disclosure } from "@headlessui/react";
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CarouselComp from "../../components/CarouselComp";
import { useState, useEffect} from "react";
// import { doc, getDoc} from "firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { app } from '../../firebase/config'
import { getAuth } from "@firebase/auth";
import UpdateEvent from "../../components/UpdateEvent";
import DeleteEvent from "../../components/DeleteEvent";

const event = ({data, eventID}) => {
  
  const event = JSON.parse(data);

  const auth = getAuth(app);

  // const [admin, setAdmin] = useState(null);
  const [button, setButton] = useState(null);
  const [removeButton, setDelete] = useState(null);

  const formatDate = (date) => {
    const date1 = new Timestamp(date.seconds, date.nanoseconds).toDate().toString();
    return date1.substring(0,25);
  }

  

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                
                
                getDoc(doc(database, "usersCollection", user.uid)).then(docSnap => {
                    if (docSnap.exists()) {
                      if(docSnap.data().memberType=='admin'){

                        setButton(<UpdateEvent
                            eventID={eventID}
                            name={event.name}
                            date={event.date}
                            deadline={event.deadline}
                            finalDate={event.finalDate}
                            // date={date1}
                            // deadline={date2}
                            // finalDate={date3}
                            price={event.price}
                            gMPrice={event.gMPrice}
                            description={event.description}
                            location={event.location}
                            gmOnly={event.gmOnly}
                        />)

                        setDelete(
                          <DeleteEvent id={eventID}/>
                        )
                      }
                    }
            })
                   
            } else {
                console.log('No one is logged in')
            }
        });
    }, [])


    return(<div className="">
        <Navi/>
        <div className="bg-beige">
          <div id="content" className="px-16 mt-6">
            <div className="flex">
              <h1 className="text-black font-semibold text-5xl">{event.name} <span>
                {button}
                {/* <button onClick={()=>{alert(eventID)}}>Click for eventID</button> */}
                {removeButton}
              </span></h1>
            </div>

            <div id="info-col" className="rounded-md text-xl mt-5 py-5 text-black">
                <div className="drop-shadow-lg rounded-lg bg-blue-100/70 grid grid-cols-2">
                  <div className="drop-shadow-md mb-10 mt-10 grid content-center">
                    <PreviewPage name={event.name} price={event.price} gMPrice={event.gMPrice} gmOnly={event.gmOnly}/>
                  </div>

                  <ul className="mt-5 ml-3 pt-8 px-8">
                  {event.gmOnly && <li className="mb-2 flex font-medium text-sm text-red-500">This is an exclusive general member event only!</li>}
                      <li className="mb-2 flex font-medium"><span className="text-blue-600 font-semibold mr-2">When? </span> {formatDate(event.date)}</li>
                      <li className="mb-2 font-medium"><span className="text-blue-600  font-semibold mr-2">Event ends: </span> {formatDate(event.finalDate)}</li>
                      <li className="mb-2 font-medium"><span className="text-red-500  font-semibold mr-2">Deadline to register:</span> {formatDate(event.deadline)}</li>
                      <li className="mb-2 font-medium"><span className="text-blue-600  font-semibold mr-2">General member price:</span> ${event.gMPrice.toString()}</li>
                      {!event.gmOnly && <li className="mb-2 font-medium"><span className="text-blue-600  font-semibold mr-2">Price:</span> ${event.price.toString()}</li>}
                      <li className="mb-2 flex font-medium"><span className="text-blue-600 font-semibold mr-2">📍 Location: </span> {event.location}</li>
                  </ul>
                  
                </div>
              </div>
          </div>
          
          <div id="content" className="gap-4 pb-20 grid grid-cols-10 px-16">
            <div className="drop-shadow-lg col-span-6 p-10 bg-blue-100/70 rounded-lg">
                    <div id='description' className="text-black">
                      <h1 className="text-4xl text-blue-600 font-bold">About the event:</h1>
                      <div className='mt-32 px-28'>
                          
                            <ReactQuill
                            className="scale-150"
                            theme="bubble"
                            readOnly='true'
                            value={event.description}
                          />

                      </div>
                  </div>
            </div>
            
            <div className="text-black col-span-4 gap-4 rounded-lg">
                 <div className="grid grid-rows-2 gap-4">
                    

                 <div className="drop-shadow-lg p-10 bg-blue-100/70 rounded-md">
                      <h1 className="text-2xl text-purple-500 font-semibold">Check out our FAQS!</h1>
                      <div className="mt-6 w-full m-2">
                      <div className="mx-auto w-full max-w-md rounded-2xl bg-blue-100/70 p-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Can students from other UofT campuses signup?</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                              Both the UTSG and UTM campus have their own unique DECA chapters! You're welcome to signup with the chapter that corresponds to your campus, but unfortunately, membership within our chapter (DECA UTSC), is restricted to Scarborough campus students. However, students from other UofT campuses are welcome to register for some of our events, like our case competition Apricity!
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>What is a Case Competition?</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                              Case competitions are a unique opportunity that allows students to apply classroom-level knowledge to real-life scenarios. This also provides DECA members with a chance to gain a variety of hard and soft skills. Additionally, case competitions allow participants to best structure their points against fellow students to instill confidence and booksmart lessons. At DECA UTSC, we intend to allow our general members to find their energy and passion for case competitions and foster a sense of respect for the business field. A great way to practice your skills and learn more is through our own internal case competition, hosted annually in the Fall. Stay tuned to our social media for more details about this event!
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>How do I become a General Member?</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                              Becoming a General Member is a very rewarding role at DECA UTSC. Few of the reasons include access to all of our training workshops and modules, internal case competitions, discounts on all our events, DECA U Canada's resources and content, and much, much, more. General Memberships make for a very valuable experience. For the 2020-2021 year, General Memberships close on October 15, 2020. To register, you will first need to create an account by clicking here. Once you create an account, you will be able to register for general membership.
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>What are Nationals?</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                              Nationals is the flagship event, hosted by DECAU, where—historically—over 1300 delegates have participated across Ontario. Since their rebranding last year, Nationals now hosts schools from all over Canada. Each chapter competes in around 18 categories that include individual cases, team cases, as well as various special cases. Delegates have an incredible time networking with hundreds of other student leaders and distinguished industry professionals. This year, Nationals will be held virtually over a series of days in January and DECAU will work to capture the organization's true spirit as it continues to inspire emerging student leaders. Nationals are only open to DECA general members, so it’s best to sign up before October 15th and take advantage of the Training program that is exclusively open to you.
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>How do I prepare for Nationals?</span>
                                <ChevronDownIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
                              You can prepare for Nationals by attending the Delegate Development workshops in the Fall term, and follow along to the training modules and content made available to you. It’s also helpful to take advantage of the mock presentation opportunities with the Delegate Development team that occurs later in fall, as part of our training program to help you practice your skills. Another great way to perfect and polish yourself in anticipation of Nationals, is through Mock Nationals. Mock Nationals allows students to participate and practice in a mock run-through of how Nationals will be, later on in the year. After spending enough time learning and practicing with the Delegate Development team through training workshops, Delegates have the opportunity to present to different judges and practice the category which they aim to pursue at Nationals. Mock Nationals takes place sometime at the end of November, which is great because it wraps up our Training sessions nicely and you get a better sense of your understanding of the content, as well as any areas where you may want to improve before Nationals.
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    </div>
                    </div>
                    
                    <div className="drop-shadow-lg p-10 bg-blue-100/70 rounded-md">
                    <h1 className="text-2xl text-purple-500 font-semibold">Learn more about us ...</h1>
                        <p className="font-medium mt-3">
                        At ACE, we strive to ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis finibus nunc et bibendum. Vestibulum facilisis mi massa, a ornare massa suscipit id. Nam pretium aliquam turpis, at faucibus elit. Phasellus bibendum dictum leo, eget bibendum massa consectetur vitae. Vestibulum viverra maximus nibh ac pretium. Aenean non diam rhoncus metus aliquet interdum at at nisl. Nunc porttitor libero sed mattis facilisis.
                        </p>
                    </div>
                 </div>
            </div>
            
          </div>
          
          <CarouselComp/>
        </div>
        <div className="mt-20">
          <Contact/>
          <Footer/>
        </div>
        
    </div>);
}

export default event;

export async function getStaticProps(context){
    
    const eventId = context.params.event;
    const docRef = doc(database, "events", eventId);
    const docSnap = await getDoc(docRef);
    const data = JSON.stringify(docSnap.data())

    return {
      props: { 
          data: data,
          eventID: eventId
       },
      revalidate: 10
    }

}

export async function getStaticPaths() {
  
    const entries = await getDocs((collection(database, "events")));
    const data = entries.docs.map(entry => ({
      id: entry.id.toString(),
      ...entry.data()
    }));

    const paths = data.map((event) => ({
      params: { event: event.id.toString() },
    }))
  
    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}


