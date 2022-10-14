import { Carousel } from "flowbite-react";
import { useEffect, useState} from "react";
import { storage } from "../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
const CarouselComp = () => {

    const [pic1, setPic1] = useState('');
    const [pic2, setPic2] = useState('');
    const [pic3, setPic3] = useState('');
    const [pic4, setPic4] = useState('');

    useEffect(()=>{
        // const storage = getStorage();
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

            setPic1(url);
        })
        .catch((error) => {
            // Handle any errors
        });

        getDownloadURL(ref(storage, 'images/pic21.jpg'))
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

            setPic2(url);
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
            setPic3(url);
        })

        getDownloadURL(ref(storage, 'images/pic4.png'))
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
            setPic4(url);
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
                src={pic1}
                alt="..."
                />
                <img
                id="myimg2"
                // width='5184'
                // height='3456'
                src={pic2}
                alt="..."
                />
                <img
                id="myimg3"
                // width='5184'
                // height='3456'
                src={pic3}
                alt="..."
                />
                <img
                id="myimg4"
                // width='5184'
                // height='3456'
                src={pic4}
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

