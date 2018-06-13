$(document).ready(function () {
    bindAction('#navigation .nav-item');
    bindAction('#navigation2 .nav-item');
    
});

function bindAction(selector) {
    $(selector).each(function (i, v) {
        var li = $(v);
        if (li.attr('class') && li.attr('class').includes('active')) {
            lastActive = li;
        }
        var pageId = li.attr('data-id');
        if (pageId == 'home') {
            li.click(function () {
                toSpring();
                if ($('#navigation').hasClass('home')) {
                    $('#navigation').removeClass('home');
                    $('#navigation2').removeClass('home');
                    $('.spa').removeClass('home');
                    activePage('intro');
                } else {
                    $('#navigation').addClass('home');
                    $('#navigation2').addClass('home');
                    $('.spa').addClass('home');
                    activePage(null);
                }
            });
        } else {
            li.click(function () {
                if ($('#navigation').hasClass('home')) {
                    $('#navigation').removeClass('home');
                    $('#navigation2').removeClass('home');
                    $('.spa').removeClass('home');
                }
                switch (pageId) {
                    case 'intro': toSpring(); break;
                    case 'experience': toSummer(); break;
                    case 'interests': toAutumn(); break;
                    case 'contact': toWinter(); break;
                }
                activePage(pageId);
            });
        }

        if (i == 0) {
            $('#' + pageId).addClass('active');
        }
    });
}

function activePage(id) {
    $('#navigation .nav-item').each(function (i, v) {
        var pageId = $(v).attr('data-id');
        if (pageId == id) {
            $('#' + pageId).addClass('active');
            $('#' + pageId).css('z-index', 3);
            $(v).addClass('active');
        } else {
            $('#' + pageId).removeClass('active');
            $('#' + pageId).css('z-index', 2);
            $(v).removeClass('active');
        }
    });
}