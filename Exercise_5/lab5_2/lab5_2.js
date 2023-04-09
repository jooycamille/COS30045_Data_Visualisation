function init() {
  var dataset = [21, 1, 25, 14, 11, 2, 19, 23, 16, 8, 1, 13];
  var width = 800;
  var height = 300;
  var margins = { top: 30, right: 30, bottom: 30, left: 30 };
  var maxValue = 25;

  function colorPicker(v) {
    if (v < 20) {
      return "#956da1";
    } else if (v >= 20) {
      return "#8a5c5c";
    }
  }

  var xScale = d3
    .scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, width - (margins.left + margins.right)])
    .paddingInner(0.05);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - (margins.top + margins.bottom), 0]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().ticks(5).scale(yScale);

  var svg = d3
    .select(".barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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

  //AXIS
  svg
    .append("g")
    .attr("class", "x axis")
    .attr(
      "transform",
      "translate(" + margins.left + "," + (height - margins.top) + ")"
    )
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis);

  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margins.left + ", 0) rotate(-90)")
    .attr("y", -5 - margins.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .text("y-axis");

  //Update Data Button
  d3.select("#update").on("click", function () {
    var numValues = dataset.length;

    dataset = [];

    for (var i = 0; i < numValues; i++) {
      var newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber);
    }

    svg
      .selectAll("rect")
      .data(dataset)
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("height", function (d, i) {
        return height - (margins.top + margins.bottom) - yScale(d);
      })
      .attr("fill", function (d) {
        return colorPicker(d);
      });
  });

  //Transition 1 button
  d3.select("#trans1").on("click", function () {
    var numValues = dataset.length;

    dataset = [];

    for (var i = 0; i < numValues; i++) {
      var newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber);
    }

    svg
      .selectAll("rect")
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i * 100;
      })
      .duration(500)
      .transition()
      .duration(2000)
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("height", function (d, i) {
        return height - (margins.top + margins.bottom) - yScale(d);
      })
      .attr("fill", function (d) {
        return colorPicker(d);
      });
  });

  //Transition 2 button
  d3.select("#trans2").on("click", function () {
    var numValues = dataset.length;

    dataset = [];

    for (var i = 0; i < numValues; i++) {
      var newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber);
    }

    svg
      .selectAll("rect")
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("height", function (d, i) {
        return height - (margins.top + margins.bottom) - yScale(d);
      })
      .attr("fill", function (d) {
        return colorPicker(d);
      });
  });
}
window.onload = init;
