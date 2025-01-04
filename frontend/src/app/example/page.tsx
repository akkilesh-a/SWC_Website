import { CustomComponent, SanityExample } from '@/components'
import React from 'react'

const Example = () => {
  return (
    <div className='p-8 space-y-10'>
      <h1 className='text-2xl font-bold'>Standard Coding Practices</h1>
      <CustomComponent />
      <SanityExample />
    </div>
  )
}

export default Example