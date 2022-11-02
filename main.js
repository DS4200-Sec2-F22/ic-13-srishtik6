
// constants for page set up 
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

const svg = d3.select("#line_chart_1")
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform", `translate(${MARGINS.left},${MARGINS.top})`);


d3.csv('data/city-hall.csv',

  function(d){
    return {date : d.DateTime_Measured, value : d.Total_Demand_KW }
  }).then(

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, VIS_WIDTH ]);
    svg.append("g")
      .attr("transform", `translate(0, ${VIS_HEIGHT})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ VIS_HEIGHT, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})

