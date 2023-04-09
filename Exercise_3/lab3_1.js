function init() {
    var w = 550;
    var h = 150;
    var padding = 40;

    var dataset = [
        [5, 20],
        [500, 90],
        [250, 50],
        [100, 33],
        [330, 95],
        [410, 12],
        [475, 44],
        [25, 67],
        [85, 21],
        [220, 88]
    ];

    var xScale = d3.scaleLinear()
        .domain([d3.min(dataset, function (d) {
            return d[0];
        }), d3.max(dataset, function (d) {
            return d[0];
        })])
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(dataset, function (d) {
            return d[1];
        }), d3.max(dataset, function (d) {
            return d[1];
        })])
        .range([h - padding, padding]);

    function colorPicker(v) {
        if (v < 480) {
            return "slategrey";
        } else if (v >= 480) {
            return "red";
        }
    }

    //create SVG element
    var svg = d3.select(".scatterPlot")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("circle")
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
    svg.selectAll("text")
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
}

window.onload = init;