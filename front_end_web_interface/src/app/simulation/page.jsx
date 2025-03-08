'use client'
import React, { useEffect, useState } from 'react'
import Sider from '../component/sider/sider'
import axios from 'axios'
import * as d3 from 'd3'


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

  // useEffect(() => {
  //   console.log(para);
  // }, [para]);

  const simulate = async () => {
    // alert("call");

    let newStartArr = [];
    newStartArr = []

    para.fireStarts.forEach((x) => {
      const r = Math.floor(x / para.gridSize);
      let c = x % para.gridSize - 1;
      if (c === -1) {
        c = para.gridSize;
      }
      newStartArr.push([r, c]);
    });

    // console.log(process.env.REACT_APP_BACK);

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

      // console.log(apiResult.status);
      if (apiResult.status === 200) {
        setRunResult({
          called: true,
          arr: apiResult.data.result
        });
      }

      // runResult.arr.map(item=> console.log(item))
    } catch (error) {
      console.error("Error fetching simulation:", error);
    }
  };

  useEffect(() => {
    if (runResult.called) {
      const stepData = runResult.arr;

      // Line Chart
      const svgLine = d3.select("#line-chart-svg");
    svgLine.selectAll("*").remove(); // ล้างกราฟเก่าทุกครั้งก่อนวาดใหม่

    const dataLine = stepData.map(step => {
      const counts = step.reduce((acc, row) => {
        acc[0] += row.filter(cell => cell === 1).length; // เซลล์ที่ไม่ถูกเผา
        acc[1] += row.filter(cell => cell === 2).length; // เซลล์ที่กำลังไหม้
        acc[2] += row.filter(cell => cell === 3).length; // เซลล์ที่กลายเป็นขี้เถ้า
        return acc;
      }, [0, 0, 0]);
      return {
        step: stepData.indexOf(step),
        burning: counts[1],
        burned: counts[2],
        unburned: counts[0]
      };
    });

    // กำหนด margin และขนาดกราฟ
    const margin = { top: 50, right: 30, bottom: 0, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // สเกลสำหรับแกน X และ Y
    const xLine = d3.scaleLinear()
      .domain([0, para.step])
      .range([0, width]);

    const yLine = d3.scaleLinear()
      .domain([0, d3.max(dataLine, d => Math.max(d.burning, d.burned, d.unburned))])
      .nice()
      .range([height, 0]);

    // สร้างเส้นของแต่ละกลุ่ม
    const lineBurning = d3.line()
      .x(d => xLine(d.step))
      .y(d => yLine(d.burning));

    const lineBurned = d3.line()
      .x(d => xLine(d.step))
      .y(d => yLine(d.burned));

    const lineUnburned = d3.line()
      .x(d => xLine(d.step))
      .y(d => yLine(d.unburned));

    // สร้าง SVG container
    const chart = svgLine.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


    // เพิ่มเส้นกราฟ
    chart.append("path")
      .datum(dataLine)
      .attr("fill", "none")
      .attr("stroke", "#fd7e14") // สีของไฟที่กำลังไหม้
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("d", lineBurning);

    chart.append("path")
      .datum(dataLine)
      .attr("fill", "none")
      .attr("stroke", "#343a40") // สีของขี้เถ้า
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("d", lineBurned);

    chart.append("path")
      .datum(dataLine)
      .attr("fill", "none")
      .attr("stroke", "#28a745") // สีของเซลล์ที่ไม่ถูกเผา
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("d", lineUnburned);

    // เพิ่มแถบแกน Y
    chart.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yLine).ticks(5)) // จำนวน tick
      .attr('font-size', '12px')
      .selectAll("text") // เลือก text ของ Y-axis
      .style("fill", "black");


    // เพิ่มแถบแกน X
    chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xLine).ticks(para.step).tickFormat(d3.format("d"))) // แสดงตัวเลขในรูปแบบของ integer
      .attr('font-size', '12px')
      .selectAll("text") // เลือก text ของ Y-axis
      .style("fill", "black");

      

    // เพิ่ม title และ label
    svgLine.append("text")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", margin.top - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-family", "Prompt")
      .text("Fire Spread Simulation over Time");

    svgLine.append("text")
      .attr("x", -margin.top -200)
      .attr("y", margin.left - 25)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "14px")
      .style("font-family", "Prompt")
      .text("Number of Cells");

    svgLine.append("text")
      .attr("x", width + margin.left + margin.right - 20)
      .attr("y", height + margin.top + margin.bottom - 10)
      .style("font-size", "14px")
      .text(`Step(every ${para.step/10}  min.)`);

    // เพิ่ม tooltip สำหรับการแสดงข้อมูลเมื่อวางเมาส์
    const tooltip = d3.select("#line-chart-svg")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#f4f4f4")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .style("opacity", 0);

      

    chart.selectAll("path")
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        tooltip.html(`Step: ${event.x}, Burning: ${d.burning}, Burned: ${d.burned}, Unburned: ${d.unburned}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    }
  }, [runResult]);

  return (
    <div className="w-screen h-screen flex">
      <main className="w-2/3 overflow-y-scroll">
        {runResult.called ? (
          <div className="w-full min-h-full flex flex-col items-center gap-20 pt-40 ">
            <div className='bg-white w-[800px] h-[400px] mb-[-460px] rounded-2xl'></div>
            <div>
              <svg id="line-chart-svg" width="700" height="400" className=''></svg>
            </div>
            <div className='w-full flex justify-center pb-28'>
              
              <div className='w-10/12 rounded-2xl pb-24 justify-center grid gap-16 bg-white'>
               <h1 className='mb-[-50px] mt-12 text-4xl text-p-black font-prompt'>Heatmap</h1>
                {runResult.arr.map((i,index)=>{
                if((index + 1) % (para.step / 10) === 0 || index === 0 && index !== para.step){

                  return <div>
                   <p className='text-p-black font-prompt'>{`Minute: ${index +1}`}</p>
                    <div key={index} className="w-96 h-96 border-2 border-black grid" style={{gridTemplateColumns: `repeat(1,1fr)`}}>
                        {
                          i.map((n,index)=>{
                            return <div key={index} className='w-full bg-amber-100 grid' style={{gridTemplateColumns: `repeat(${[para.gridSize]},1fr)`}}>
                              {n.map((x,index)=>{
                                if(x === 1){
                                  return <div key={index} className='bg-green-400'></div>
                                }else if(x=== 2){
                                  return <div key={index} className='bg-orange-400'></div>
                                }else{
                                  return <div key={index} className='bg-amber-950'></div>
                                }
                              })}
                            </div>
                          })
                        }
                    </div>
                  
                  </div>
                }
                })}
              </div>
            </div>


            
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

