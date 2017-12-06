$(document).ready(function() {
    var tick = 3;
    var speed = 1; //pixel per tick
    $(".bubbleContainer").each(function(containerIndex, container){
        var containerWidth = $(container).width();
        var containerHeight = $(container).height();
        var bw = bh = 60;
    
        $(window).on("resize", function(){
            containerWidth = $(window).width();
            containerHeight = $(window).height();
        });
    
        var angles = [];
        $(container).children(".bubble").each(function() {
            var randomAngle = Math.random() * Math.PI * 2;
            angles.push(randomAngle);
            $(this).css("top", containerHeight / 2 - bh / 2);
            $(this).css("left", containerWidth / 2 - bw / 2);
        });
    
        var top, left, difx, dify;
        setInterval(function() {
            $(container).children(".bubble").each(function(bubbleIndex) {
                top = parseFloat($(this).css("top"));
                left = parseFloat($(this).css("left"));
    
                dify = speed * Math.sin(angles[bubbleIndex]);
                difx = speed * Math.cos(angles[bubbleIndex]);
    
                top += dify;
                left += difx;
                
                $(this).css("top", top);
                $(this).css("left", left);
    
                if (top <= 0 || top + bh >= containerHeight) {
                    angles[bubbleIndex] = -angles[bubbleIndex];
                }
    
                if (left <= 0 || left + bw >= containerWidth) {
                    angles[bubbleIndex] = Math.PI - angles[bubbleIndex];
                    angles[bubbleIndex] = angles[bubbleIndex] % (Math.PI * 2);
                }
            });
        }, tick);
    });
    
});