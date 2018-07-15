var startDate = new Date("Jul 20, 2016 00:00:00").getTime();
var oneMinute = 60 * 1000;
var oneHour = 60 * oneMinute;
var oneDay = 24 * oneHour;

setInterval(function () {
    var date = new Date();
    var distance = date.getTime() - startDate;

    var day = Math.floor(distance / oneDay);

    var left = distance - day * oneDay;
    var hour = Math.floor(left / oneHour);

    left = left - hour * oneHour;
    var minute = Math.floor(left / oneMinute);

    left = left - minute * oneMinute;
    var second = Math.floor(left / 1000);

    $('#day').html(day);
    $('#hour').html(hour);
    $('#minute').html(minute);
    $('#second').html(second);

}, 1000);