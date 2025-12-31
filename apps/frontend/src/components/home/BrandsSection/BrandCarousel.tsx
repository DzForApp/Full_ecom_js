import { animate, AnimatePresence, motion, useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import useMeasure from "react-use-measure"
import BrandCard from './BrandCard'


const BrandLogos = [
    "/images/brands/p.jpg",
    "/images/brands/p2.jpg",
    "/images/brands/toy.png",
    "/images/brands/volks.png",
    "/images/brands/nissan.png",
    "/images/brands/volvo.png",
    "/images/brands/mazda.png",
    "/images/brands/peugeot.png",
    "/images/brands/man.png",

]


export default function BrandCarousel() {


    let [ref, { width }] = useMeasure()

    const xTranslation = useMotionValue(0)

    useEffect(() => {
        let controls;
        let finalPosition = -width / 2 - 8;

        controls = animate(xTranslation, [0, finalPosition], {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0
        })

        return controls.stop;
    }, [xTranslation, width]);


    return (
        <section className="relative md:py-4 overflow-hidden   w-full  ">
            <AnimatePresence >
                <motion.div
                    className=" relative flex gap-4  "
                    ref={ref}
                    style={{ x: xTranslation }}
                >

                    {[...BrandLogos, ...BrandLogos].map((item, index) => (

                        <div className=" p-0 flex  justify-center" key={index}  >
                            <BrandCard image={item} key={index} />

                        </div>


                    ))}

                </motion.div>
            </AnimatePresence>

        </section>
    )
}
