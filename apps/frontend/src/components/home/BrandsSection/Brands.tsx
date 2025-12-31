import { Carousel } from "@/components/ui/carousel"
import React from "react"
import BrandCarousel from "./BrandCarousel"


const images = [

    "/images/brands/p.jpg",
    "/images/brands/p2.jpg",
]


function Brands() {
    return (
        <section id="Testimonial"
            className="flex flex-col space-y-0  scroll-my-2  md:space-y-4 w-full   lg:justify-center items-center lg:py-0 "
        >
            <div className="flex  w-full h-full">

                <div className="container felx flex-col w-full justify-center h-full md:p-y-2">
                    <div className="relative flex flex-row justify-center opacity-90   w-full h-full mt-8  rounded-lg ">
                        {/* <PartnerCarousel/>   */}
                        <BrandCarousel />
                    </div>

                </div>

            </div>


        </section>

    )
}

export default Brands