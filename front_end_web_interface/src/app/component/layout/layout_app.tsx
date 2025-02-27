import React, { ReactNode } from 'react'
import HeaderApp from '../header/header_app'

const LayoutApp= ({children}:{children:ReactNode}) => {
  return (
    <div className='min-h-screen w-screen bg-p-white'>
        <HeaderApp/>
        {children}
    </div>
  )
}

export default LayoutApp