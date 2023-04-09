function init() {
  //define data source
  var dataset = [21, 1, 25, 14, 11, 2, 19, 23, 16, 8, 4, 13];

  //define chart dimensions
  var width = 800;
  var height = 300;
  var margins = { top: 30, right: 30, bottom: 30, left: 40 };

  function colorPicker(v) {
    if (v < 20) {
      return "#956da1";
    } else if (v >= 20) {
      return "#8a5c5c";
    }
  }

  //define the scale for the x-axis
  var xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, width - (margins.left + margins.right)])
    .paddingInner(0.05);

  var xAxis = d3.axisBottom().scale(xScale);

  //define the scale for the y-axis
  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - (margins.top + margins.bottom), 0]);

  var yAxis = d3.axisLeft().ticks(5).scale(yScale);

  //create the chart
  var svg = d3
    .select(".barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //add the bars to the chart
  svg
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d, i) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d, i) {
      return height - (margins.top + margins.bottom) - yScale(d);
    })
    .attr("fill", function (d) {
      return colorPicker(d);
    });

  //create the y-axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis);

  //add the y-axis label
  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margins.left + ", 0) rotate(-90)")
    .attr("y", -5 - margins.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .text("y-axis");

  //On Click Update with new data
  d3.selectAll(".buttonClick").on("click", function () {
    //see which p was clicked
    var buttonID = d3.select(this).attr("id");

    if (buttonID == "add") {
      //add data
      var maxValue = 25;
      var newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber);
    } else {
      //remove data
      dataset.shift();
    }

    //update scale domains
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]);

    //select...
    var bars = svg
      .selectAll("rect") //selects all rects(as yet nonexistent)
      .data(dataset); //binds data to selection, returns update selection

    //enter...
    bars
      .enter() //extracts the enter selection
      //placeholder elements
      .append("rect") //create a 'rect' inside each of the placeholder elements
      .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
      .attr("x", width)
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d, i) {
        return height - (margins.top + margins.bottom) - yScale(d);
      })
      .attr("fill", function (d) {
        return colorPicker(d);
      })
      .merge(bars) //update...
      .transition()
      .duration(500)
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d, i) {
        return height - (margins.top + margins.bottom) - yScale(d);
      })
      .attr("fill", function (d) {
        return colorPicker(d);
      });

    //exit...
    bars.exit().transition().duration(500).attr("x", width).remove();
  });
}
window.onload = init;
