function init() {
  //width and height
  var w = 500;
  var h = 300;

  var projection = d3
    .geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(2450);

  var color = d3
    .scaleQuantize()
    .range([
      "rgb(242,240,247)",
      "rgb(203,201,226)",
      "rgb(158,154,200)",
      "rgb(117,107,177)",
      "rgb(84,39,143)",
    ]);

  //define path generator
  var path = d3.geoPath().projection(projection);

  //create SVG element
  var svg = d3
    .select("#map")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

  //load in GeoJSON data
  d3.csv("../dataFiles/VIC_LGA_unemployment.csv").then(function (data) {
    console.log(data);

    d3.json("../dataFiles/LGA_VIC.json").then(function (json) {
      //loop through each LGA in the CSV data
      for (var i = 0; i < data.length; i++) {
        var lgaName = data[i].lga;
        var unemployment = parseFloat(data[i].unemployed);

        //find the correspinding LGAnin the JSON data
        for (var j = 0; j < json.features.length; i++) {
          var jsonLgaName = json.features[j].properties.lga;
          if (lgaName === jsonLgaName) {
            //copy the unemployment data into the JSON data
            json.features[j].properties.unemployed = unemployment;
            break;
          }
        }
      }

      color.domain([
        d3.min(data, function (d) {
          return d.unemployed;
        }),
        d3.max(data, function (d) {
          return d.unemployed;
        }),
      ]);

      //bind data and create one path per GeoJSON feature
      svg
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function (d) {
          var unemployment = d.properties.unemployed;

          if (unemployment) {
            return color(unemployment);
          } else {
            return "#ccc";
          }
        })
        .attr("d", path);

      //load the city data and create circles for each city
      d3.csv(
        "../dataFiles/VIC_city.csv".then(function (cityData) {
          console.log(cityData);

          svg
            .selectAll("circle")
            .data(cityData)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
              return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function (d) {
              return projection([d.lon, d.lat])[1];
            })
            .attr("r", 3)
            .style("fill", "red")
            .style("stroke", "gray")
            .style("stroke-width", 0.25)
            .style("opacity", 0.75);
        })
      );
    });
  });
}
window.onload = init;
