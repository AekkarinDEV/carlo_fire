'use client'
import React, { useState } from 'react'

const Sider = () => {
    {/* gird preview */}
    const [currentGrid,setCurrentGrid] = useState(5)
    const arr:number[] = []
    for(let i = 1; i <= currentGrid * currentGrid; i++){
       arr.push(i)
    }
    const sizeChange = (e) => {
        setCurrentGrid(e.target.value)
    }

    // duration
    const [hour,setHour] = useState(0)
    const [min,setMin] = useState(0)

    const moreHour = () =>{
        if(hour == 23){
            setHour(0)
            return
        }
        setHour(hour + 1)
    }
    const lessHour = () =>{
        if(hour > 0){
            setHour(hour - 1)
        }
    }
    const moreMin = () =>{
        if(min == 50){
            setMin(0)
            return
        }
        setMin(min + 10)
    }
    const lessMin = () =>{
        if(min >= 10){
            setMin(min - 10)
        }
    }

  return (
    <div className='h-full bg-p-white w-1/3 z-0 overflow-scroll flex flex-col items-center px-3 pt-5 border-t-2'>

        {/* gird preview */}
        <div className=''>
            <div className={`border-2 w-96 h-96   grid overflow-clip border-p-black/50`} style={{gridTemplateColumns: `repeat(${currentGrid},1fr)`}}>
                {
                    arr.map((node) => {
                        return <div key={node} className='border-[1px] hover:bg-p-red border-p-black/20 hover:border-p-black/50'></div>
                    })
                }
            </div>
            <label htmlFor="default-range" className="block text-sm font-medium text-p-black mt-2 font-prompt ">{"Grid Size: " + currentGrid + " X " + currentGrid}</label>
            <input id="default-range" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={sizeChange} defaultValue={10} min={5} max={50}></input>
        </div>

        {/* time selector */}
        <div className='w-96'> 
            <p className='text-sm font-medium text-p-black mt-2 font-prompt mb-2'>Duration: {hour + " h "+ min + " m "}</p>
            <div className='flex justify-evenly'>
                <div className='flex text-p-black *:bg-slate-200 *:py-1 *:'>
                    <button className='w-8 rounded-tl-md rounded-bl-md  hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={lessHour}>-</button>
                    <p className='w-12 text-center'>{hour}</p>
                    <button className='w-8 rounded-tr-md rounded-br-md hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={moreHour}>+</button>
                </div>
                
                <div className='flex text-p-black *:bg-slate-200 *:py-1 *:'>
                    <button className='w-8 rounded-tl-md rounded-bl-md  hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={lessMin}>-</button>
                    <p className='w-12 text-center'>{min}</p>
                    <button className='w-8 rounded-tr-md rounded-br-md hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={moreMin}>+</button>
                </div>

            </div>


        </div>
    </div>
  )
}

export default Sider