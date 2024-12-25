import { CustomComponent, SanityExample } from '@/components'
import React from 'react'

const Home = () => {
  return (
    <div className='p-8 space-y-10'>
      <h1 className='text-2xl font-bold'>Standard Coding Practices</h1>
      <CustomComponent />
      <SanityExample />
    </div>
  )
}

export default Home