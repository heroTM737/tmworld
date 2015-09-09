$(document).ready(function () {

})

function scrollToID(id) {
    var targetOffset = $('#' + id).offset().top;
    $('html,body').animate({
        scrollTop: targetOffset
    }, 300, "linear");
}

var show = true;
function toogleMenu(){
    show ? showMenu(): hideMenu();
    
    show = !show;
}

function showMenu() {
    $(".menu li").css("display", "block");
    $.each($(".menu li"), function (index, obj) {
        $(obj).animate({
            top: (index * 40) + "px",
            left: "90px"
        }, 100, "linear");
    });
}

function hideMenu() {
    $.each($(".menu li"), function (index, obj) {
        $(obj).animate({
            top: "5px",
            left: "5px"
        }, 100, "linear", function(){
            $(".menu li").css("display", "none");
        });
    });

    
}