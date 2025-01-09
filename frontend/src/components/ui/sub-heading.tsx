import React, { ReactNode } from 'react'

const SubHeading = ({children,className}:{children?:ReactNode,className?:string}) => {
  return (
    <div className={`text-xl sm:text-4xl md:text-5xl font-dmSerifText ${className}`}>{children}</div>
  )
}

export default SubHeading