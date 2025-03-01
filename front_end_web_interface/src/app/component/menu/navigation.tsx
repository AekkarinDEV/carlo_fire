import React from 'react'
import Link from 'next/link'

const TopNavMenu = () => {
  return (
    <nav className='w-1/3 flex justify-center items-center gap-14 *:text-p-black *:font-prompt'>
        <Link href={"/simulation"}>
            <button>Simulation</button>
        </Link>
        <Link href={"/about"}>
            <button>About</button>
        </Link>
    </nav>
  )
}

export default TopNavMenu