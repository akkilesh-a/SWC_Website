import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Image className='w-[100vw] h-[100vh]' src="/vit-chennai-campus.png" width={1000} height={100} alt='VIT-Chennai' />
    </div>
  )
}

export default Home