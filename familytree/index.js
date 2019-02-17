
$(function () {
    createTabs();

    var selector = $('.content-container');
    selector.scroll(function () {
        //remove all active
        $("#menu li").children().removeClass("active");

        //active current id
        var scroll = selector.scrollTop();
        var wh = selector.height();
        var index = parseInt(scroll / wh);
        $("#menu li").children().eq(index).addClass("active");
    });
});