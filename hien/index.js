$(document).ready(function () {
    $('#navigation ul li').each(function (i, v) {
        var li = $(v);
        var pageId = li.attr('data-id');
        li.click(function () {
            activePage(pageId);
        });
        if (i == 0) {
            $('#' + pageId).addClass('active');
        }
    })
});

function activePage(id) {
    $('#' + id).addClass('active');
    $('#navigation ul li').each(function (i, v) {
        var pageId = $(v).attr('data-id');
        if (pageId != id) {
            $('#' + pageId).removeClass('active');
        }
        
    });
    
}