import { LandingImageWithContent } from '@/components'
import { SubHeading, Text } from '@/components/ui'
import Image from 'next/image'
import React from 'react'

const AboutPage = () => {
  return (
    <div>
        <LandingImageWithContent variant='text' heading='About' subheading='Student Welfare Committee' />
        <div className='flex flex-col md:flex-row justify-between items-center space-x-8 space-y-8 md:space-y-0 md:space-x-0'>
            <Image src='/about/placeholder.png' className='w-[40vw]' width={700} height={100} alt='About' />
            <div className='text-center space-y-8 px-16 w-auto'>
                <SubHeading className='underline'>Student Welfare Committee</SubHeading>
                <div className='space-y-4'>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ex, 
                        elementum eu velit ac, porta semper justo. Donec laoreet dapibus mi 
                        faucibus dictum. Nullam semper diam ac diam condimentum posuere. 
                        Suspendisse potenti. Nunc sapien mi, mattis a justo vitae, porta placerat velit. 
                        Maecenas rutrum ligula non sodales varius. Nulla et risus sed felis porttitor eleifend. 
                        Donec vitae venenatis arcu. Nulla facilisi. Pellentesque commodo facilisis tempus.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec sem ex, elementum eu velit ac, porta semper justo. 
                        Donec laoreet dapibus mi faucibus dictum. Nullam semper diam ac diam condimentum posuere. 
                        Suspendisse potenti. Nunc sapien mi, mattis a justo vitae.
                    </Text>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutPage