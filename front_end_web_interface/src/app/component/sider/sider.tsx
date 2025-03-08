'use client'
import React, { useState, useEffect } from 'react'

const Sider = ({data,callData,run}) => {
    {/* gird preview */}
    let arr:number[] = []
    const [currentGrid,setCurrentGrid] = useState(5)
    const [start,setStart] = useState([])
    arr = Array.from({ length: currentGrid * currentGrid }, (_, i) => i + 1);
    const sizeChange = (e) => {
        setCurrentGrid(e.target.value)
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        setStart([])
        run({
            called: false,
            arr: []
          })
       
    }

    const nodeClick = (e) => {
        const v = parseInt(e.target.value);
        setStart((prevStart) => {
             if (prevStart.includes(v)) {
                return prevStart.filter(item => item !== v);
            } else {
                return [...prevStart, v];
            }
        });
    
        // Toggle background color
        e.target.style.backgroundColor = e.target.style.backgroundColor === "red" ? "" : "red";
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })

        run({
            called: false,
            arr: []
          })
    };
    useEffect(() => {
        console.log(start);
    }, [start]);

    // duration
    const [hour,setHour] = useState(0)
    const [min,setMin] = useState(0)

    const moreHour = () =>{
        if(hour == 23){
            setHour(0)
            return
        }
        setHour(hour + 1)
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
          })
    }
    const lessHour = () =>{
        if(hour > 0){
            setHour(hour - 1)
        }
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })

        run({
            called: false,
            arr: []
          })
    }
    const moreMin = () =>{
        if(min == 50){
            setMin(0)
            return
        }
        setMin(min + 10)
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }
    const lessMin = () =>{
        if(min >= 10){
            setMin(min - 10)
        }
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }

    //moisture level
    const [moisture,setMoisture] = useState(40)

    const moistureChange = (e) => {
        setMoisture(e.target.value)
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }

    //windStrength
    const [windLevel,setWindLevel] = useState(0.5)

    const windStrengthChange = (e) => {
        setWindLevel(e.target.value /10)
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }
    
    //temp level
    const [tempLevel,setTempLevel] = useState(25)

    const TempChange = (e) => {
        setTempLevel(e.target.value)
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }

    //wind direct
    const [windDirect,setWinDirect] = useState("N")

    const north = () => {
        setWinDirect("N")
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }

    const south = () => {
        setWinDirect("S")
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }
    
    const east = () => {
        setWinDirect("E")
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }
    
    const west = () => {
        setWinDirect("W")
        data({
            "gridSize": currentGrid,
            "moisture": moisture,
            "step": min + 60 * hour,
            "windDirection": windDirect,
            "windStrength": windLevel,
            "airTemperature": tempLevel,
            "fireStarts": start
        })
        run({
            called: false,
            arr: []
        })
    }


  return (
    <div className='h-full bg-p-white w-1/3  pt-20 overflow-y-scroll flex flex-col items-center px-3  border-t-2 relative'>

        {/* sim btn */}
        <div className='fixed bg-p-white  bottom-0 right-0 w-1/3 h-16 flex justify-center items-center px-16' >
            <button className='bg-p-red text-xl font-semibold text-p-white font-prompt py-2 w-full rounded-lg hover:bg-p-red/80 hover:text-white transition duration-200'  onClick={callData}>SIMULATE</button>
        </div>

        {/* gird preview */}
        <div className=''>
            <div className={`border-2 w-96 h-96   grid overflow-clip border-p-black/50`} style={{gridTemplateColumns: `repeat(${currentGrid},1fr)`}}>
                {
                    arr.map((node) => {
                        return <button onClick={nodeClick} value={node} key={node} className='border-[1px] hover:bg-p-red border-p-black/20 hover:border-p-black/50 text-transparent'></button>
                    })
                }
            </div>
            <label htmlFor="default-range" className="block text-sm font-medium text-p-black mt-2 font-prompt ">{"Grid Size: " + currentGrid + " X " + currentGrid}</label>
            <input id="default-range" type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={sizeChange} defaultValue={10} min={5} max={50}></input>
        </div>

        {/* moisture slider */}
        <div className='w-96 text-p-black'>
            <p>moisture {moisture}</p>
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={moistureChange} defaultValue={40} min={5} max={65}></input>
        </div>
        
        {/* Temp slider */}
        <div className='w-96 text-p-black'>
            <p>temp {tempLevel}</p>
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={TempChange} defaultValue={25} min={10} max={45}></input>
        </div>
        
        {/* wind Strength slider */}
        <div className='w-96 text-p-black'>
            <p>windStrength {windLevel}</p>
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={windStrengthChange} defaultValue={2} min={0} max={10}></input>
        </div>

        {/* wind direction */}
            <p className='text-p-black'>wind direct {windDirect}</p>
        <div className='flex w-96 justify-evenly text-p-black'>
            <button onClick={north}>N</button>
            <button onClick={south}>S</button>
            <button onClick={east}>E</button>
            <button onClick={west}>W</button>
        </div>
        
        
        {/* time selector */}
        <div className='w-96'> 
            <p className='text-sm font-medium text-p-black mt-2 font-prompt mb-2'>Duration: {hour + " h "+ min + " m "}</p>
            <div className='flex justify-evenly'>
                <div className='flex text-p-black  *:py-1 *:'>
                    <button className='w-8 rounded-tl-md rounded-bl-md  bg-slate-200 hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={lessHour}>-</button>
                    <p className='w-12 text-center bg-slate-200/50'>{hour}</p>
                    <button className='w-8 rounded-tr-md rounded-br-md bg-slate-200 hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={moreHour}>+</button>
                </div>
                
                <div className='flex text-p-black  *:py-1 *:'>
                    <button className='w-8 rounded-tl-md rounded-bl-md  bg-slate-200 hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={lessMin}>-</button>
                    <p className='w-12 text-center bg-slate-200/50'>{min}</p>
                    <button className='w-8 rounded-tr-md rounded-br-md bg-slate-200 hover:bg-blue-300 active:bg-sky-400 transition duration-150' onClick={moreMin}>+</button>
                </div>

            </div>


        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
       
    </div>
  )
}

export default Sider