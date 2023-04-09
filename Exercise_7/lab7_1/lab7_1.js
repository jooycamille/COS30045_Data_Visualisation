function init() {
  var w = 1000;
  var h = 500;
  var padding = 100;

  var dataset;

  d3.csv("Unemployment_78-95.csv", function (d) {
    return {
      date: new Date(+d.year, +d.month - 1),
      number: +d.number,
    };
  }).then(function (data) {
    console.table(dataset, ["date", "number"]);
    dataset = data;

    areaChart(dataset);
  });

  // function lineChart() {
  //   //set up scale
  //   var xScale = d3
  //     .scaleTime()
  //     .domain([
  //       d3.min(dataset, function (d) {
  //         return d.date;
  //       }),
  //       d3.max(dataset, function (d) {
  //         return d.date;
  //       }),
  //     ])
  //     .range([padding, w]);

  //   var yScale = d3
  //     .scaleLinear()
  //     .domain([
  //       0,
  //       d3.max(dataset, function (d) {
  //         return d.number;
  //       }),
  //     ])
  //     .range([h - padding, 0]);

  //   //define line generator
  //   var line = d3
  //     .line()
  //     .x(function (d) {
  //       return xScale(d.date);
  //     })
  //     .y(function (d) {
  //       return yScale(d.number);
  //     });

  //   //Setup SVG and Path
  //   var svg = d3
  //     .select("#chart")
  //     .append("svg")
  //     .attr("width", w)
  //     .attr("height", h);

  //   svg.append("path").datum(dataset).attr("class", "line").attr("d", line);

  //   //Create Axes
  //   var xAxis = d3.axisBottom().ticks(10).scale(xScale);

  //   var yAxis = d3.axisLeft().scale(yScale);

  //   svg
  //     .append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0, " + (h - padding) + ")")
  //     .call(xAxis);

  //   svg
  //     .append("g")
  //     .attr("class", "y axis")
  //     .attr("transform", "translate(" + padding + ", 0)")
  //     .call(yAxis);

  //   //Add Annotations
  //   svg
  //     .append("line")
  //     .attr("class", "line halfMilMark")
  //     // .attr("fill", "red")
  //     //start of line
  //     .attr("x1", padding)
  //     .attr("y1", yScale(500000))
  //     //end of line
  //     .attr("x2", w)
  //     .attr("y2", yScale(500000))
  //     .attr("stroke-dasharray", "5, 5");

  //   svg
  //   .append("text")
  //   .attr("class", "halfMilLabel")
  //   .attr("x", padding + 10)
  //   .attr("y", yScale(500000) - 7)
  //   .attr("fill", "red")
  //   .text("Half a Million unemployed");
  // }

  function areaChart(d) {
    var xScale = d3
      .scaleTime()
      .domain([
        d3.min(dataset, function (d) {
          return d.date;
        }),
        d3.max(dataset, function (d) {
          return d.date;
        }),
      ])
      .range([padding, w]);

    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d.number;
        }),
      ])
      .range([h - padding, 0]);

    //define line generator
    var line = d3
      .area()
      .x(function (d) {
        return xScale(d.date);
      })
      .y1(function (d) {
        return yScale(d.number);
      })
      .y0(function (d) {
        return yScale(0);
      });

    //SetUp SVG and Path
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.append("path").datum(dataset).attr("class", "area").attr("d", line);

    //Create Axes
    var xAxis = d3.axisBottom().ticks(10).scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    svg
      .append("g")
      .attr("transform", "translate (0, " + (h - padding) + ")")
      .attr("class", "x axis")
      .call(xAxis);
    svg
      .append("g")
      .attr("transform", "translate (" + padding + ", 0)")
      .attr("class", "y axis")
      .call(yAxis);

    //Add Annotations
    svg
      .append("line")
      .attr("class", "halfMilMark")
      //start of line
      .attr("x1", padding)
      .attr("y1", yScale(500000))
      //end of line
      .attr("x2", w)
      .attr("y2", yScale(500000))
      .attr("stroke-dasharray", "5, 5")
      .attr("stroke", "red");

    svg
      .append("text")
      .attr("class", "halfMilLabel")
      .attr("x", padding + 10)
      .attr("y", yScale(500000) - 7)
      .text("Half a million unemployed");
  }
}
window.onload = init;
