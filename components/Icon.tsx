import Image from 'next/image'
import React from 'react'

const Icon = ({ className, src, size=24, alt, onClick }: any) => {
    return (
        <Image
            className={className}
            width={size}
            height={size}
            src={src}
            alt={alt}
            onClick={onClick}
        />
    )
}

export default Icon