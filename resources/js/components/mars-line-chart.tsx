import { useId, useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { asset } from '@/lib/utils'

export default function MarsLineChart({
    className,
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    route
}) { 
  const [data, setData] = useState([]);

  const getData = () => {
    d3.json(asset(route))
      .then(response => {
        let arr = [];
        const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
        Object.entries(response).map((d, index) => {
            index == 0 && console.log(d[1].date)
            d[1].date = parseTime(d[1].date);
            d[1].close = +parseFloat(d[1].close);
            arr.push(d[1]);
        });
        return arr;
      })
      .then(json => setData(json));
  };

  // Gets and sets data in state
  useEffect(() => {
    getData();
  }, []);

    const patternId = useId();
    
    // Declare the x (horizontal position) scale.
    const x = d3.scaleTime(d3.extent(data, (d) => d.date), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.close)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));

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

