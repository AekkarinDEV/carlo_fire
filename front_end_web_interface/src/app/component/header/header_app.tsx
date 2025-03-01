import Image from 'next/image'
import React from 'react'
import TopNavMenu from '../menu/navigation'

const HeaderApp = () => {
  return (
    <div className='w-screen h-16 bg-p-white flex items-center'>
        <div className='flex items-center pl-6 w-1/3'>
            <Image src={'/gif/fire.gif'} alt='fire_gif' width={40} height={40} className='mb-1.5'/>
            <h1 className='font-playful text-4xl text-p-black '>CARLO FIRE</h1>
        </div>
        <TopNavMenu/>
        <div></div>
    </div>
  )
}

export default HeaderApp