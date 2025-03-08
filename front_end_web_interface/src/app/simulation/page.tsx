'use client'
import React, { useEffect, useState } from 'react'
import Sider from '../component/sider/sider'
import axios from 'axios'


const Page = () => {
  const [runResult, setRunResult] = useState({
    called: false,
    arr: []
  });

  const [para, setPara] = useState({
    gridSize: 20,
    moisture: 40.0,
    step: 30,
    windDirection: "N",
    windStrength: 1.0,
    airTemperature: 45.0,
    fireStarts: []
  });

  useEffect(() => {
    console.log(para);
  }, [para]);

  const simulate = async () => {
    alert("call");

    let newStartArr = [];

    para.fireStarts.forEach((x) => {
      const r = Math.floor(x / para.gridSize);
      let c = x % para.gridSize - 1;
      if (c === -1) {
        c = para.gridSize;
      }
      newStartArr.push([r, c]);
    });

    console.log(process.env.REACT_APP_BACK);

    try {
      const apiResult = await axios.post(
        `${process.env.BACK}/fire/`,
        {
          gridSize: para.gridSize,
          moisture: para.moisture,
          step: para.step,
          windDirection: para.windDirection,
          windStrength: para.windStrength,
          airTemperature: para.airTemperature,
          fireStarts: newStartArr
        }
      );

      console.log(apiResult.status);
      if (apiResult.status === 200) {
        setRunResult({
          called: true,
          arr: apiResult.data.result
        });
      }

      runResult.arr.map(item=> console.log(item))
    } catch (error) {
      console.error("Error fetching simulation:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <main className="w-2/3 overflow-y-scroll">
        {runResult.called ? (
          <div className="w-full min-h-full flex flex-col justify-center items-center gap-20 ">
            <br />
            <br />
            <br />
            <br />
            {runResult.arr.map((i,index)=>{
              return <div key={index} className="w-96 h-96 border-2 border-black grid" style={{gridTemplateColumns: `repeat(1,1fr)`}}>
                  {
                    i.map((n,index)=>{
                      return <div key={index} className='w-full bg-amber-100 grid' style={{gridTemplateColumns: `repeat(${[para.gridSize]},1fr)`}}>
                        {n.map((x,index)=>{
                          if(x === 1){
                            return <div key={index} className='bg-yellow-200'></div>
                          }else if(x=== 2){
                            return <div key={index} className='bg-red-200'></div>
                          }else{
                            return <div key={index} className='bg-gray-800'></div>
                          }
                        })}
                      </div>
                    })
                  }
              </div>
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <p className="text-xl text-p-black/50">WAIT FOR SIMULATION....</p>
          </div>
        )}
      </main>
      <Sider run={setRunResult} data={setPara} callData={simulate} />
    </div>
  );
};

export default Page;

