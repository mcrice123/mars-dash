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
        const parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
        Object.entries(response).map((d, index) => {
            index == 0 && console.log(d[1].date)
            arr.push({ date: parseTime(d[1].date), close: parseFloat(d[1].close) });
        });
        return arr;
      })
      .then(json => setData(json));
  };

  useEffect(() => {
    getData();
  }, []);

    const patternId = useId();
    
    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(data, (d) => d.date), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.close)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));

    // Create the SVG container.
    let svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Daily close ($)"));

    // Append a path for the line.
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(data));

    let svgRef = useRef(null);
    useEffect(()=>{
        if(svgRef.current){
            svgRef.current.replaceWith(svg.node())
        } 
    }, []);

    return (
        <svg ref={svgRef} >
        </svg>
    );
};

