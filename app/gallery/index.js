$(document).ready(function () {
    $(".gallery .perspective").each(function (index, value) {
        // $(value).css("left", (150 * index) + "px");
    });

    $.ajax("vietnam.svg", {
        dataType: "text",
        success: function (data, status, request) {
            $("#map").html(data);
            initLocation();
        }
    });

    $(".popup").on("click", closeGallery);
});

function openGallery(e) {
    // event.stopPropagation();
    $(".popup").addClass("open");
}

function closeGallery() {
    $(".popup").removeClass("open");
}

function initLocation() {
    var p = [
        getCoords(20.15, 105.90),
        getCoords(21.034038, 105.849813),
        getCoords(21.08916667, 107.87194444),
        getCoords(22.34750000, 103.81750000),
        getCoords(20.87666667, 107.13722222),
        getCoords(20.85333333, 104.61694444),
        getCoords(19.7648088, 105.9147426),
    ];
    var svg = d3.select(document.getElementById("vietnam_location_map"));
    for (var i in p) {
        var group = svg.append("g")
        .on("click", openGallery);
        group.append("circle")
            .attr("class", "location")
            .attr("cx", p[i].x)
            .attr("cy", p[i].y)
            .attr("r", "5");

            group.append("image")
            .attr("image", "location")
            .attr("xlink:href", "image/tien.jpg")
            .attr("x", p[i].x + 5)
            .attr("y", p[i].y - 15)
            .attr("width", "30px")
            .attr("height", "30px");
    }



}

function getCoords(lat, lon) {
    var width = 381.07504;
    var height = 800.61719;

    var xfactor = 52.36945126;
    var xoffset = 102.18416667 * xfactor;
    var x = (lon * xfactor) - xoffset;

    var yfactor = 54.035919;
    var yoffset = 8.56666667 * yfactor;
    var y = height - (lat * yfactor) + yoffset;

    return { x: x, y: y };
}