var selector = $('.content-container');
$(function () {
    createTabs();

    selector.scroll(function () {
        //remove all active
        $("#menu li").children().removeClass("active");

        //active current id
        var scroll = selector.scrollTop();
        var wh = selector.height();
        console.log(scroll, wh);
        var index = parseInt(scroll / wh);
        $("#menu li").children().eq(index).addClass("active");
    });
});