function init() {
    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data;
    
        barChart(wombatSightings);
    });
    
    function barChart() {
        var w = 1000;
        var h = 400;
        var barPadding = 5;

        var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h); // create a variable for the svg selection.

        
        function colorPicker(v) {
            if (v <= 20) {
                return "#b366ff";
            } else if (v > 20) {
                return "#cc99ff";
            }
        }

        svg.selectAll("text")
        .data(wombatSightings)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.wombats;
        })
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length) + (w / wombatSightings.length - barPadding) / 2; 
        })
        .attr("y", function(d) {
            return h - (d.wombats * 10) - 5;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        ;

        svg.selectAll("rect") //build the chart
        .data(wombatSightings)
        .enter() //create elements if they do not already exist
        .append("rect") // creates a rectangle
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length);
        })
        .attr("y", function(d){
            return h - (d.wombats * 10); //to flip the bar
        })
        .attr("width", w / wombatSightings.length - barPadding)
        .attr("height", function(d) {
            return d.wombats * 10;
        })
        .attr("fill", function(d) {
            return colorPicker(d.wombats); // call the color picker to get the fill
        });
    }
}
window.onload = init;