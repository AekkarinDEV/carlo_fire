'use client'
import React, { useState } from 'react'

const Sider = () => {

    const [currentGrid,setCurrentGrid] = useState(30)

  return (
    <div className='h-full bg-p-white w-1/3 z-0 overflow-scroll flex flex-col items-center px-3 pt-5'>

        {/* gird preview */}
        <div className=''>
            <div className={'border-2 w-96 h-96 border-p-black/50 rounded-md grid grid-cols-' + currentGrid}>

            </div>
        </div>
    </div>
  )
}

export default Sider