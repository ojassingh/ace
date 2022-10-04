import { getDocs, collection, getDoc, doc} from "firebase/firestore";
import { database } from "../../firebase/config";
import Navi from "../../components/Navi";
import Footer from "../../components/Footer";

const event = ({data}) => {

    const event = JSON.parse(data);

    return(<div>
        <Navi/>
        <h1>Hello event {event.name} </h1>
        <div dangerouslySetInnerHTML={{__html:event.description}}></div>
        {/* <p>{event.description}</p> */}
        {/* {event.description} */}
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
