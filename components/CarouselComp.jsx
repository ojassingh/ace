import { Carousel } from "flowbite-react";
import logo from '../public/logo-white.jpg'

import Image from "next/image";

const CarouselComp = () => {
    return(
        <div className="mx-16 bg-black h-128">
            {/* <div className=""> */}
            <Carousel className="rounded-lg">
                <Image
                width='5184'
                height='3456'
                src={logo}
                alt="..."
                />
                <Image
                width='5184'
                height='3456'
                src={logo}
                alt="..."
                />
                <Image
                width='5184'
                height='3456'
                src={logo}
                alt="..."
                />
                <Image
                width='5184'
                height='3456'
                src={logo}
                alt="..."
                />
                {/* <Image
                src={logo5}
                alt="..."
                /> */}
            </Carousel>
            {/* </div> */}
        </div>
)
}

export default CarouselComp;

