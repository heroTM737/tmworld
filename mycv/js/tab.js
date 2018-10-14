function createTabs() {
    $(".tabs").each(function (tabContainerIndex, tabContainer) {
        var firstId = $(this).find("li").first().attr("data-id");
        openTab(firstId);

        $(this).find("li").each(function (liIndex, li) {
            $(li).click(function () {
                openTab($(li).attr("data-id"));
            });
        });

        function openTab(id) {
            $(".tabs ul li").removeClass('active');
            $(".tabs ul li[data-id=" + id + "]").addClass('active');
            $(tabContainer).find(".tab").each(function (tabIndex, tab) {
                if ($(tab).attr("data-id") == id) {
                    $(tab).css("display", "flex");
                } else {
                    $(tab).css("display", "none");
                }
            });
        }
    });
}