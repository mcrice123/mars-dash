import { useId, useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { asset } from '@/lib/utils'

export default function MarsLineChart({
    xKey,               // key used to access values for x-axis
    yKey,               // key used to access values for y-axis
    xType,              // type of values for x-axis
    yType,              // type of values for y-axis
    className,
    width,              // width of the chart
    height,             // height of the chart
    marginTop,          // spacing above the chart
    marginRight,        // spacing to the right of the chart
    marginBottom,       // spacing below the chart
    marginLeft,         // spacing to the left of the chart
    ceiling,            // max on y-axis
    floor,              // min on y-axis
    route               // file path to data file
}) { 
  const [data, setData] = useState([]);
  console.log(xType, yType)

  const getData = () => {
    d3.json(asset(route))
      .then(response => {
        let arr = [];
        const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
        Object.entries(response).map((d, index) => {
            let obj = {
                [xKey]: xType === "date" ? parseTime(d[1][xKey]) : +parseFloat(d[1][xKey]),
                [yKey]: yType === "date" ? parseTime(d[1][yKey]) : +parseFloat(d[1][yKey])
            };
            arr.push(obj);
        });
        return arr;
      })
      .then(json => setData(json));
    };

    // Gets and sets data in state
    useEffect(() => {
        getData();
    }, []);
    
    
    let yMax = d3.max(data, (d) => d[yKey]);
    let yMin = d3.min(data, (d) => d[yKey]);
    yMax = d3.max([yMax, ceiling]);
    yMin = d3.min([yMin, floor]);
    const yExtent = d3.extent([yMin, yMax]);
    const xExtent = d3.extent(data, (d) => d[xKey]);
    
    // Declare the x (horizontal position) scale.
    const x = xType === "date"
        ? d3.scaleTime(xExtent, [marginLeft, width - marginRight])
        : d3.scaleLinear(xExtent, [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = yType === "date"
        ? d3.scaleTime(yExtent, [height - marginBottom, marginTop])
        : d3.scaleLinear(yExtent, [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d[xKey]))
        .y(d => y(d[yKey]));

    console.log(line(data));

    // Create the SVG container.
    let svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // set refs
    const gx = useRef(null);
    const gy = useRef(null);

    // Update chart when data is available
    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

    return (
        <svg width={width} height={height}>
            <g ref={gx} transform={`translate(0,${height - marginBottom})`}></g>
            <g ref={gy} transform={`translate(${marginLeft},0)`}></g>
            <path fill="none" stroke="steelblue" strokeWidth="1.5" d={line(data)} />
        </svg>
    );
};

