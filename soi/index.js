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

let rate = 0.1;
// let rate = 1;
$(document).ready(function () {
    $('.hover-container').on('mousemove', function (event) {
        let containerW = $(this).outerWidth();
        let containerH = $(this).outerHeight();
        let containerT = $(this).offset().top;
        let containerL = $(this).offset().left;

        let content = $('.hover-content');

        let centerY = containerT + containerH / 2;
        let top = event.pageY - centerY;
        if (top < -50) {
            top = -50;
        } else if (top > 0) {
            top = 0;
        }

        let centerX = containerL + containerW / 2;
        let left = event.pageX - centerX;
        if (left < -50) {
            left = -50;
        } else if (left > 0) {
            left = 0;
        }

        content.css('top', top + 'px');
        content.css('left', left + 'px');
    });
});