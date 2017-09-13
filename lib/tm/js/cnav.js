$(document).ready(function () {
    $(".cnav").each(function(ci, cv){
        var selected = $(cv).find("ul li");
        var size = selected.length;
        var rotateStep = 360 / size;
        var skew = 90 - 360 / size;
        var textRotate = (180 - rotateStep) / 2;
        var childrenTransform = "skew(-" + skew + "deg) rotate(-" + textRotate + "deg) scale(1)";
        selected.each(function (index, value) {
            var rotate = rotateStep * index;
            $(value).css("transform", "rotate(" + rotate + "deg) skew(" + skew + "deg) scale(1)");
            $(value).children("a").css("transform", childrenTransform);

            if (rotate >= 180) {
                $(value).find("a i").css("transform", "rotate(180deg)");
                $(value).find("a span").css("transform", "rotate(180deg)");
            }
        });
    });
});