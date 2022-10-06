import { getDocs, collection, getDoc, doc} from "firebase/firestore";
import { database } from "../../firebase/config";
import Navi from "../../components/Navi";
import Footer from "../../components/Footer";
import { Timestamp } from "firebase/firestore";
import PreviewPage from "../../components/PreviewPage";
import Contact from "../../components/Contact";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const event = ({data}) => {


  const event = JSON.parse(data);

  const formatDate = (date) => {
    const date1 = new Timestamp(date.seconds, date.nanoseconds).toDate().toString();
    return date1.substring(0,25);
  }

    return(<div className="bg-black h-screen">
        <Navi/>
        <div id="content" className="px-16 mt-6">
          <h1 className="font-semibold text-5xl text-white">{event.name} </h1>

          <div id="info-col" className="rounded-md text-xl mt-5 py-5 text-white">
             <div className="grid gap-4 grid-cols-2">
              <div className="rounded-lg bg-blue-100/10">
              <div className="mb-10 mt-10 grid content-center">
                  <PreviewPage name={event.name} price={event.price}/>
                </div>

                <ul className="mt-5 ml-3 pt-8 px-8">
                {event.gmOnly && <li className="mb-2 flex font-medium text-sm text-red-500">This is an exclusive general member event only!</li>}
                    <li className="mb-2 flex font-medium"><span className="text-blue-300 font-semibold mr-2">When? </span> {formatDate(event.date)}</li>
                    <li className="mb-2 font-medium"><span className="text-blue-300  font-semibold mr-2">Event ends: </span> {formatDate(event.finalDate)}</li>
                    <li className="mb-2 font-medium"><span className="text-red-300  font-semibold mr-2">Deadline to register:</span> {formatDate(event.deadline)}</li>
                    <li className="mb-2 font-medium"><span className="text-green-400  font-semibold mr-2">General member price:</span> {event.gMPrice}</li>
                    {!event.gmOnly && <li className="mb-2 font-medium"><span className="text-green-400  font-semibold mr-2">Price:</span> {event.price}</li>}
                    <li className="mb-2 flex font-medium"><span className="text-blue-300  font-semibold mr-2">📍 Location: </span> {event.location}</li>
                </ul>
                
              </div>

              <div className="bg-blue-100/10 rounded-lg h-full">
                  <div id='description' className="p-10 text-white">
                    <h1 className="text-4xl font-bold">About the event:</h1>
                    {/* <div className="p-2 text-md" dangerouslySetInnerHTML={{__html: event.description}}></div> */}
                    <ReactQuill
                      className="text-md"
                      theme="bubble"
                      readOnly='true'
                      value={event.description}
                      formats
                    />
                </div>
              </div>
             </div>
          </div>

        </div>
        <div className="h-14 bg-black"></div>
        <Contact/>
        <Footer/>
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
