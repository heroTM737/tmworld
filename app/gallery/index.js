$(document).ready(function () {
    $(".gallery .perspective").each(function (index, value) {
        $(value).css("left", (300 + 150 * index) + "px");
    });
});