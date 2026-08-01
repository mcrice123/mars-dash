import { useId, useState } from 'react';
import * as d3 from 'd3';

const MarsBarChart = ({ 
    data, 
    width, 
    height 
}) => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const x = d3
        .scaleBand()
        .domain(data?.map((d) => d.name))
        .range([0, chartWidth])
        .padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).range([chartHeight, 0]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                {data?.map((d) => (
                <rect
                    key={d.name}
                    x={x(d.name)}
                    y={y(d.value)}
                    width={x.bandwidth()}
                    height={chartHeight - y(d.value)}
                    fill={hoveredBar === d.name ? 'orange' : 'steelblue'}
                    onMouseEnter={() => setHoveredBar(d.name)}
                    onMouseLeave={() => setHoveredBar(null)}
                />
                ))}
                <g
                className="x-axis"
                transform={`translate(0,${chartHeight})`}
                ref={(node) => d3.select(node).call(d3.axisBottom(x))}
                />
                <g className="y-axis" ref={(node) => d3.select(node).call(d3.axisLeft(y))} />
            </g>
        </svg>
    );
};

export default MarsBarChart;