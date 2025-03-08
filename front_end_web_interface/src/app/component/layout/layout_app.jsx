import React, { ReactNode } from 'react'
import HeaderApp from '../header/header_app'


const LayoutApp= ({children}) => {
  return (
    <div className='min-h-screen w-screen bg-p-white/95  '>
        <HeaderApp/>
        <div className='flex w-screen'>
          <main>
            {children}
          </main>
        </div>
    </div>
  )
}

export default LayoutApp