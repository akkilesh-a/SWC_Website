import { BlueButton, DirectorNote, LandingImageWithContent } from '@/components'
import React from 'react'

const Home = () => {
  return (
    <div>
        <div>
            <LandingImageWithContent variant='image' image='/swc-logos/swc-logo-white.png' /> 
        </div>
        <div>
            <StudentWelfareCommitteeDescription />
        </div>
        <div>
            <DirectorNote/>
        </div>
    </div>
  )
}

const StudentWelfareCommitteeDescription=()=>{
    return(
        <div className='text-center flex flex-col justify-center items-center space-y-8 p-16 bg-[#F6F6F6]'>
            <h1 className='underline font-bold font-dmSerifDisplay text-7xl '>Student Welfare Committee</h1>
            <div  className='w-[400px] md:w-[700px] font-inter'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ex, 
                    elementum eu velit ac, porta semper justo. Donec laoreet dapibus mi faucibus dictum. 
                    Nullam semper diam ac diam condimentum posuere. Suspendisse potenti. Nunc sapien mi, 
                    mattis a justo vitae, porta placerat velit. Maecenas rutrum ligula non sodales varius. 
                    Nulla et risus sed felis porttitor eleifend. Donec vitae venenatis arcu. Nulla facilisi. 
                    Pellentesque commodo facilisis tempus.
                </p>
            </div>
            <BlueButton text={"More About SWC"}/>
        </div>
    )
}

export default Home