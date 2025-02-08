import React from 'react'

const DarkModePage = () => {
  return (
    <div className='relative h-[100vh] overflow-hidden'>
        <video className='absolute min-h-[100%] min-w-[100%] w-auto h-auto -top-32 -z-10' autoPlay loop muted>
            <source src="video.mp4" type='video/mp4' />
        </video>
    </div>
  )
}

export default DarkModePage