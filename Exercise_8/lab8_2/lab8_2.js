function init() {
  //width and height
  var w = 500;
  var h = 300;

  //create SVG element
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

  //set the colour range
  var color = d3
    .scaleQuantize()
    .range([
      "rgb(242,240,247)",
      "rgb(203,201,226)",
      "rgb(158,154,200)",
      "rgb(117,107,177)",
      "rgb(84,39,143)",
    ]);

  //define projection
  var projection = d3
    .geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(2450);

  //define path generator
  var path = d3.geoPath().projection(projection);

  //load in the data
  d3.csv(
    "../COS30045 8.1 and 8.2 Resources/VIC_LGA_unemployment.csv",
    function (data) {
      if (data == null) {
        d3.select("#chart").append("p").text("Data failed to load");
      }

      console.log("it works"); //to check if it's reading the data file
      // ################################# DELETE CODE ABOVE ##########################################################

      color.domain([
        d3.min(data, function (d) {
          return d.unemployed;
        }),
        d3.max(data, function (d) {
          return d.unemployed;
        }),
      ]);
      //load in GeoJSON data
      d3.json(
        "../COS30045 8.1 and 8.2 Resources/LGA_VIC.json",
        function (json) {
          console.log("it works");
          //merge the data and GeoJSON

          //loop through once foe each data value
          for (var i = 0; i < data.length; i++) {
            //grab LGS name
            var dataLga = data[i].lga;

            //grab unemployed data value, and convert from string to float
            var dataUnemployed = parseFloat(data[i].unemployed);

            //find the corresponding LGA inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
              var jsonLga = json.features[j].properties.LGA_name;

              if (dataLga == jsonLga) {
                //copy the data value into the JSON
                json.features[j].properties.unemployed = dataUnemployed;

                //stop looking through the JSON
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
              //get unemployment data value
              var unemployment = d.properties.unemployed;

              if (unemployment) {
                //if unemployment data exists...
                return color(unemployment);
              } else {
                //if unemployment data is undefined...
                return "#ccc";
              }
            });
        }
      );
    }
  );
}
window.onload = init;
