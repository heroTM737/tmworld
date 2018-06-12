$(document).ready(function () {
    let lastActive = null;
    $('#navigation .nav-item').each(function (i, v) {
        var li = $(v);
        if (li.attr('class') && li.attr('class').includes('active')) {
            lastActive = li;
        }
        var pageId = li.attr('data-id');
        if (pageId == 'home') {
            li.click(function () {
                if ($('#navigation').hasClass('home')) {
                    $('#navigation').removeClass('home');
                    $('.spa').removeClass('home');
                    activePage('intro');
                } else {
                    $('#navigation').addClass('home');
                    $('.spa').addClass('home');
                    activePage(null);
                }
            });
        } else {
            li.click(function () {
                if ($('#navigation').hasClass('home')) {
                    $('#navigation').removeClass('home');
                    $('.spa').removeClass('home');
                }
                if (lastActive) {
                    lastActive.removeClass('active');
                }
                li.addClass('active');
                lastActive = li;
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
    })
});

function activePage(id) {
    if (id) {
        $('#' + id).addClass('active');
    }
    $('#navigation .nav-item').each(function (i, v) {
        var pageId = $(v).attr('data-id');
        if (pageId != id) {
            $('#' + pageId).removeClass('active');
        }
    });
}