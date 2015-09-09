

$(document).ready(function () {
    //create default data
    var list = ["dota2_1", "juggernaut_1", "juggernaut_2", "juggernaut_3", "juggernaut_4", "lina_1", "razor_1", "drowranger_1"];
    
    var template = $(".menu").html();
    
    $(".menu").html("");
    
    for (var i in list){
        var current = template.slice(0);
        while (current.indexOf("nameputhere") >= 0){
            current = current.replace("nameputhere", list[i]);
        }
        $(".menu").append(current);
    }
    
    //assign event for each tab
    $.each($(".tab"), function (index, obj) {
        $(obj).children(".tab-title").click(function () {
            openTab(obj);
        });
    });

    //open first tab as default
    openTab($(".tab").first());
})

function openTab(obj) {
    $(".tab .tab-content").attr("style", "display:none");

    //load tab content if not
    var html = $(obj).children(".tab-content").html();
    if (html.indexOf("<xmp>") >= 0) {
        html = html.replace("<xmp>", "");
        html = html.replace("</xmp>", "");
        $(obj).children(".tab-content").html(html);
    }

    $(obj).children(".tab-content").attr("style", "display:block");

}