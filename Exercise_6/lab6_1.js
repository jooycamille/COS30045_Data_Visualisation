function init() {
  //define data source
  var dataset = [21, 1, 25, 14, 11, 2, 19, 23, 16, 8, 4, 13];

  //define chart dimensions
  var width = 800;
  var height = 300;
  var margin = 20;
  var maxValue = 25;

  //define the scale for the x-axis
  var xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([margin, width - margin])
    .paddingInner(0.1);

  //define the scale for the y-axis
  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - margin, margin]);

  var yAxis = d3.axisLeft().ticks(5).scale(yScale);

  //create SVG element
  var svg = d3
    .select(".barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //create bars
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - margin - yScale(d);
    })
    .attr("fill", "#956da1")
    .append("title");
    // .text(function (d) {
    //   return "This value is " + d;
    // });

  var mouseMovements = function () {
    svg
      .selectAll("rect")
      .on("mouseover", function (event, d) {
        //change colour on hover
        d3.select(this).attr("fill", "orange");

        //get the bar's x/y values
        var xPosition =
          parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) + margin;

        //create the tooltip label
        svg
          .append("text")
          .attr("id", "tooltip")
          .attr("x", xPosition)
          .attr("y", yPosition)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .attr("fill", "black")
          .text(d);
      })
      .on("mouseout", function () {
        //change the colour back
        d3.select(this).attr("fill", "#956da1");

        //remove the tooltip
        d3.select("#tooltip").remove();
      });
  };

  mouseMovements();

  //create the y-axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin + ", 0)")
    .call(yAxis);

  //add the y-axis label
  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margin + ", 0) rotate(-90)")
    .attr("y", -margin - 10)
    .attr("x", -height / 2)
    .attr("dy", "1em")
    .text("y-axis");

  //On Click Update with data

  //Add Data
  d3.select("#add").on("click", function () {
    //add random number to the dataset
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);

    //update scale domains
    xScale.domain(d3.range(dataset.length));

    //select...
    var bars = svg.selectAll("rect").data(dataset);

    //enter...
    bars
      .enter()
      .append("rect")
      .attr("x", width)
      .attr("y", function (d, i) {
        return yScale(d);
      })
      // .attr("width", xScale.bandwidth())
      // .attr("height", function (d, i) {
      //   return height - margin - yScale(d);
      // })
      .merge(bars)
      .transition()
      // .delay(500)
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d, i) {
        return height - margin - yScale(d);
      })
      .attr("fill", "#956da1");

    mouseMovements();
  });

  //Remove Data
  d3.select("#remove").on("click", function () {
    dataset.shift();

    //update scale domains
    xScale.domain(d3.range(dataset.length));

    //select...
    var bars = svg.selectAll("rect").data(dataset);

    //exit...
    bars.exit().transition().duration(500).attr("x", width).remove();

    //enter...
    bars
      .transition()
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d, i) {
        return height - margin - yScale(d);
      });
  });
}
window.onload = init;
