import { Carousel } from "flowbite-react";
import logo from '../public/logo-white.jpg'
import { useEffect} from "react";
import { storage } from "../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
const CarouselComp = () => {

    useEffect(()=>{
        // const storage = getStorage();
        getDownloadURL(ref(storage, 'images/pic1.JPG'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
            img.style.width = '1080px';
            img.style.height = '720px';
        })
        .catch((error) => {
            // Handle any errors
        });

        getDownloadURL(ref(storage, 'images/pic7.JPG'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            const img = document.getElementById('myimg2');
            img.setAttribute('src', url);
            img.style.width = '1080px';
            img.style.height = '720px';
        })

        getDownloadURL(ref(storage, 'images/pic10.JPG'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            const img = document.getElementById('myimg3');
            img.setAttribute('src', url);
            img.style.width = '1080px';
            img.style.height = '720px';
        })

        getDownloadURL(ref(storage, 'images/pic17.jpg'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            const img = document.getElementById('myimg4');
            img.setAttribute('src', url);
            img.style.width = '1080px';
            img.style.height = '720px';
        })

        .catch((error) => {
            // Handle any errors
        });
    }, [])


    return(
        <div className="mx-64 bg-black h-128 drop-shadow-xl rounded-lg">
            {/* <div className=""> */}
            <Carousel className="grid justify-items-center">
                <img
                id="myimg"
                // width='5184'
                // height='3456'
                src={logo}
                alt="..."
                />
                <img
                id="myimg2"
                // width='5184'
                // height='3456'
                src={logo}
                alt="..."
                />
                <img
                id="myimg3"
                // width='5184'
                // height='3456'
                src={logo}
                alt="..."
                />
                <img
                id="myimg4"
                // width='5184'
                // height='3456'
                src={logo}
                alt="..."
                />
                {/* <img
                src={logo5}
                alt="..."
                /> */}
            </Carousel>
            {/* </div> */}
        </div>
)
}

export default CarouselComp;

