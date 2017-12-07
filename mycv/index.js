$(function () {
    createTabs();

    $(window).scroll(function () {
        //remove all active
        $("#menu li").children().removeClass("active");

        //active current id
        var scroll = $(window).scrollTop();
        var wh = $(window).height();
        var index = parseInt(scroll / wh);
        $("#menu li").children().eq(index).addClass("active");
    });
});