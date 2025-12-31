import React from 'react'
import Image from 'next/image';

interface CardProps {
    image: string;
}

const BrandCard: React.FC<CardProps> = ({ image }) => {
    return (
        <div className='relative overflow-hidden flex h-[190px] mx-8  min-w-64 '>

            <Image
                src={image}
                fill
                className='relative object-contain '
                alt={'no avatar'}
                priority={true}
            />
        </div>
    )
}

export default BrandCard