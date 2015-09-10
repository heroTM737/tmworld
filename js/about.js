$(document).ready(function () {
    $('#id_code').keyup(function (e) {
        if (e.keyCode == 13) {
            runCode();
        }
    });
})

function scrollToID(id) {
    var targetOffset = $('#' + id).offset().top;
    $('html,body').animate({
        scrollTop: targetOffset
    }, 300, "linear");
}

var show = true;

function toogleMenu() {
    show ? showMenu() : hideMenu();

    show = !show;
}

function showMenu() {
    $(".menu li").css("display", "block");
    $.each($(".menu li"), function (index, obj) {
        $(obj).animate({
            top: (index * 40) + "px",
            left: "55px"
        }, 100, "linear");
    });
}

function hideMenu() {
    $.each($(".menu li"), function (index, obj) {
        $(obj).animate({
            top: "5px",
            left: "5px"
        }, 100, "linear", function () {
            $(".menu li").css("display", "none");
        });
    });
}

//define simple map
var map = {};
map.mine = "image/about/wave_dolphin.jpg";
map.one = "image/girl/girl_1.jpg";
map.two = "image/girl/girl_2.jpg";

function runCode() {
    var code = $("#id_code").val();
    if (map[code] !== undefined) {
        $("#id_cover img").attr("src", map[code]);
    }
}