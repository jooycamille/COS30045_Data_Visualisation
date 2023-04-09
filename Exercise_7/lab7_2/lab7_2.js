function init() {
  //define dataset
  var dataset = [45, 25, 20, 10, 6, 5];

  var w = 500;
  var h = 500;

  var outerRadius = w / 2;
  var innerRadius = 0;

  var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  //define color
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  //define a default pie layout
  var pie = d3.pie();

  //create SVG element
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //set up groups
  var arcs = svg.selectAll("g.arc")
  .data(pie(dataset))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

  //draw arcs path
  arcs.append("path")
  .attr("fill", function(d, i) {
        return color(i);
  })
  .attr("d", function (d, i) {
        return arc(d, i);
  });

  //generate text labels
  arcs
  .append("text")
  .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
  })
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "20px")
  .attr("font-weight", "bold")
  .text(function (d) {
        return d.value;
  })
}
window.onload = init;
