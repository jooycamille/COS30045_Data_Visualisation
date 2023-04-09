function init() {
  var w = 700;
  var h = 300;
  var padding = 40;

  var dataset = [
    [10, 20],
    [500, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150],
  ];

  // Scaling
  var xScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, function (d) {
        return d[0];
      }),
      d3.max(dataset, function (d) {
        return d[0];
      }),
    ])
    .range([padding, w - padding]);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, function (d) {
        return d[1];
      }),
    ])
    .range([h - padding, padding]);

  // Axis
  var xAxis = d3.axisBottom().ticks(10).scale(xScale);

  var yAxis = d3.axisLeft().ticks(5).scale(yScale);

  //function to differentiate the value by color 
  function colorPicker(v) {
    if (v < 480) {
      return "slategrey";
    } else if (v >= 480) {
      return "red";
    }
  }

  //create SVG element
  var svg = d3
    .select(".scatterPlot")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
      return xScale(d[0]);
    })
    .attr("cy", function (d) {
      return yScale(d[1]);
    })
    .attr("r", 4)
    .attr("fill", function (d) {
      return colorPicker(d[0]);
    });

  //Labels
  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
      return d[0] + "," + d[1]; //text display
    })
    .attr("x", function (d) {
      return xScale(d[0]);
    })
    .attr("y", function (d) {
      return yScale(d[1]);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "red")
    .attr("margin", "5px");

  //Axis
  //x-axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);
  
  // y-axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);
}

window.onload = init;
