import Footer from "../components/Footer";
import Navi from "../components/Navi";
import { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import PersonCard from "../components/PersonCard";
import { motion } from "framer-motion";
function AboutPage(){

    // PRESIDENTS
    const [pic1, setPic1] = useState('');
    const [pic2, setPic2] = useState('');
    const [pic3, setPic3] = useState('');
    const [pic4, setPic4] = useState('');
    const [pic5, setPic5] = useState('');
    const [pic6, setPic6] = useState('');


    // DIRECTORS 
    const [pic7, setPic7] = useState('');
    const [pic8, setPic8] = useState('');
    const [pic9, setPic9] = useState('');
    const [pic10, setPic10] = useState('');
    const [pic11, setPic11] = useState('');
    const [pic12, setPic12] = useState('');
    const [pic13, setPic13] = useState('');
    const [pic14, setPic14] = useState('');
    const [pic15, setPic15] = useState('');
    const [pic16, setPic16] = useState('');
    const [pic17, setPic17] = useState('');
    const [pic18, setPic18] = useState('');
    const [pic19, setPic19] = useState('');
    const [pic20, setPic20] = useState('');


    //ASSOCIATES
    const [pic21, setPic21] = useState('');
    const [pic22, setPic22] = useState('');
    const [pic23, setPic23] = useState('');
    const [pic24, setPic24] = useState('');
    const [pic25, setPic25] = useState('');
    const [pic26, setPic26] = useState('');
    const [pic27, setPic27] = useState('');
    const [pic28, setPic28] = useState('');
    const [pic29, setPic29] = useState('');
    const [pic30, setPic30] = useState('');
    const [pic31, setPic31] = useState('');
    const [pic32, setPic32] = useState('');
    const [pic33, setPic33] = useState('');


    const seniors = [
        {
            id: 1,
            src: pic1,
            name: 'Aditi Bendale',
            role: 'Co-President'
        },
        {
            id: 2,
            src: pic2,
            name: 'Sara Bhalla',
            role: 'Co-President',
        },
        {
            id: 3,
            src: pic3,
            name: 'Sauhaard Walia',
            role: 'VP of Events'
        },
        {
            id: 4,
            src: pic4,
            name: 'Brinda Batra',
            role: 'VP of Business Development'
        },
        {
            id: 5,
            src: pic5,
            name: 'Shruthi Balamurali',
            role: 'VP of Marketing '
        },
        {
            id: 6,
            src: pic6,
            name: 'Sandy Ho', 
            role: 'VP of Delegate Development'
        },
    ]

    const directors = [
        {
            id: 7,
            src: pic7,
            name: 'Ojas Singh',
            role: 'Director of IT'
        },
        {
            id: 8,
            src: pic8,
            name: 'Allison Lyew',
            role: 'Human Relations Director'
        },
        {
            id: 9,
            src: pic9,
            name: 'Anvitha Ivernad S.',
            role: 'Events Director'
        },
        {
            id: 10,
            src: pic10,
            name: 'Bruna Anzanello Barp',
            role: 'Corporate Relations Director'
        },
        {
            id: 11,
            src: pic11,
            name: 'Celine Zhou',
            role: 'Delegate Development Director'
        },
        {
            id: 12,
            src: pic12,
            name: 'Faith Chhoyang',
            role: 'Marketing Director'
        },
        {
            id: 13,
            src: pic13,
            name: 'Gonzalo Calderon Gomez',
            role: 'Corporate Relations Director'
        },
        {
            id: 14,
            src: pic14,
            name: 'Lorena Madrazo',
            role: 'Social Media Director'
        },
        {
            id: 15,
            src: pic15,
            name: 'Natalia Wong',
            role: 'Delegate Development Director'
        },
        {
            id: 16,
            src: pic16,
            name: 'Shaan Bhojwani',
            role: 'Delegate Development Director'
        },
        {
            id: 17,
            src: pic17,
            name: 'Shizhe Zhong',
            role: 'Events Director'
        },
        {
            id: 18,
            src: pic18,
            name: 'Teresa Liu',
            role: 'Events Director'
        },
        {
            id: 19,
            src: pic19,
            name: 'Vani Sivanesachselvan',
            role: 'Finance and Data Analytics Director '
        },
    ]

    useEffect(()=>{
        // const storage = getStorage();
        getDownloadURL(ref(storage, 'images/AditiBendale.jpg'))
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

        getDownloadURL(ref(storage, 'images/SaraBhalla.jpg'))
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

        getDownloadURL(ref(storage, 'images/SauhaardWalia.jpg'))
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

        getDownloadURL(ref(storage, 'images/BrindaBatra.jpg'))
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

        getDownloadURL(ref(storage, 'images/SruthiBalamurali.jpg'))
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
            setPic5(url);
        })

        getDownloadURL(ref(storage, 'images/SandyHo.jpg'))
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
            setPic6(url);
        })


        //DIRECTORS

        getDownloadURL(ref(storage, 'images/Ojas_Singh.jpg'))
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
            setPic7(url);
        })

        getDownloadURL(ref(storage, 'images/AllisonLyew.jpg'))
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
            setPic8(url);
        })


        getDownloadURL(ref(storage, 'images/AnvithaIvernadS.jpg'))
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
            setPic9(url);
        })

        getDownloadURL(ref(storage, 'images/BrunaAnzanelloBarp.jpg'))
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
            setPic10(url);
        })


        getDownloadURL(ref(storage, 'images/CelineZhou.JPG'))
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
            setPic11(url);
        })

        getDownloadURL(ref(storage, 'images/FaithChhoyang.jpg'))
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
            setPic12(url);
        })

        getDownloadURL(ref(storage, 'images/GonzaloCalderonGomez.jpeg'))
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
            setPic13(url);
        })

        getDownloadURL(ref(storage, 'images/LorenaMadrazo.jpg'))
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
            setPic14(url);
        })

        getDownloadURL(ref(storage, 'images/NatalieWong.jpg'))
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
            setPic15(url);
        })

        getDownloadURL(ref(storage, 'images/ShaanBhojwani.jpeg'))
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
            setPic16(url);
        })

        getDownloadURL(ref(storage, 'images/ShizheZhong.JPG'))
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
            setPic17(url);
        })

        getDownloadURL(ref(storage, 'images/TERESALIU.jpg'))
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
            setPic18(url);
        })

        getDownloadURL(ref(storage, 'images/VaniSivanesachselvan.jpeg'))
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
            setPic19(url);
        })


        //

        // getDownloadURL(ref(storage, 'images/pic10.jpg'))
        // .then((url) => {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // This can be downloaded directly:
        //     const xhr = new XMLHttpRequest();
        //     xhr.responseType = 'blob';
        //     xhr.onload = (event) => {
        //     const blob = xhr.response;
        //     };
        //     xhr.open('GET', url);
        //     xhr.send();
        //     setPic20(url);
        // })

        // getDownloadURL(ref(storage, 'images/pic10.jpg'))
        // .then((url) => {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // This can be downloaded directly:
        //     const xhr = new XMLHttpRequest();
        //     xhr.responseType = 'blob';
        //     xhr.onload = (event) => {
        //     const blob = xhr.response;
        //     };
        //     xhr.open('GET', url);
        //     xhr.send();
        //     setPic21(url);
        // })

        // getDownloadURL(ref(storage, 'images/pic10.jpg'))
        // .then((url) => {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // This can be downloaded directly:
        //     const xhr = new XMLHttpRequest();
        //     xhr.responseType = 'blob';
        //     xhr.onload = (event) => {
        //     const blob = xhr.response;
        //     };
        //     xhr.open('GET', url);
        //     xhr.send();
        //     setPic22(url);
        // })

        .catch((error) => {
            // Handle any errors
        });
    }, [])


    return(<div className="bg-beige">
        <Navi/>
        <div className="px-16">
            <motion.div whileHover={{scale: 1.01}} className="drop-shadow-xl bg-white p-10 rounded-lg">
            <h1 className="text-6xl text-blue-500 font-semibold">Learn more about ACE!</h1>
            <p className="text-lg mt-10 leading-7">
                Starting in the United States, DECA U (now Ace) has made its name internationally as non-profit organization with more than 200,000 members. ACE provides delegates with the opportunity network with business professionals develop professional skills and mature as a business student.

                Every year, ACE Ontario hosts Nationals (formerly Provincials Conference), which has become the largest undergraduate conference in Canada. Universities and colleges from all across Ontario gather together square off against each other in many different categories.

                Many of the delegates that attend and take part in ACE are future entrepreneurs, marketers, and leaders. As a result, you will find a number of companies and their representative at every ACE event.
            </p>
            {/* <h1>Meet our team</h1> */}
            </motion.div>

            <div className="mt-10 drop-shadow-xl bg-white p-10 rounded-lg">
            <h1 className="text-6xl text-blue-500 font-semibold">Meet the team!</h1>


                <div id="senior-section" className="mt-10">
                <h1 className="mb-10 text-center text-4xl font-semibold text-blue-500">Say hello to the Senior Team!</h1>
                    <div className="flex flex-wrap">
                        {seniors.map((person)=>{
                            return(
                                <PersonCard
                                    key={person.id} src={person.src} name={person.name} role={person.role}
                                />
                            )
                        })}
                    </div>
                </div>


                <div className="mt-10" id="director-section">
                <h1 className="mb-10 text-center text-4xl font-semibold text-blue-500">Here are our directors!</h1>
                    <div className="flex flex-wrap">
                        {directors.map((person)=>{
                            return(
                                <PersonCard
                                    key={person.id} src={person.src} name={person.name} role={person.role}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>);
}

export default AboutPage;