function init() {
  //width and height
  var w = 1000;
  var h = 500;

  var projection = d3
    .geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(5000);

  //define path generator
  var path = d3.geoPath().projection(projection);

  //create SVG element
  var svg = d3.select("#map").append("svg").attr("width", w).attr("height", h);

  var color = d3
    .scaleQuantize()
    .range([
      "rgb(242,240,247)",
      "rgb(203,201,226)",
      "rgb(158,154,200)",
      "rgb(117,107,177)",
      "rgb(84,39,143)"
    ]);

  //load in the CSV data
  d3.csv("../dataFiles/VIC_LGA_unemployment.csv").then(function (data) {
    console.log(data);
    color.domain([
      d3.min(data, function (d) {
        return d.value;
      }),
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);

    //load in GeoJSON data
    d3.json("../dataFiles/LGA_VIC.json").then(function (json) {
      console.log(json);
      //merge the ag. data and GeoJSON
      //loop through once for each ag. data value
      for (var i = 0; i < data.length; i++) {
        //grab LGA name
        var dataLGA = data[i].LGA;

        //grab unemployment data value, and convert from string to float
        var DataUnemployed = parseFloat(data[i].unemployed);

        //find the corresponding LGA inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonLGA = json.features[j].properties.LGA_name;

          if (dataLGA == jsonLGA) {
            //copy the data value into the JSON
            json.features[j].properties.value = DataUnemployed;

            //stop looking through JSON
            break;
          }
        }
      }

      //bind data and create one path per GeoJSON feature
      svg
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function (d) {
          //get data value
          var value = d.properties.value;

          if (value) {
            //if value exists
            return color(value);
          } else {
            //if value is undefined...
            return "#ccc";
          }
        });

      d3.csv("../dataFiles/VIC_city.csv").then(function (data) {
        console.log(data);

        svg
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function (d) {
            return projection([d.lon, d.lat])[1];
          })
          .attr("r", 5)
          .style("fill", "yellow")
          .style("stroke", "gray")
          .style("stroke-width", 0.25)
          .style("opacity", 0.75)
          .append("title")
          .text(function (d) {
            return d.place;
          });
      });
    });
  });
}
window.onload = init;
