$(document).ready(function(){
    $.each($(".tab"), function(index, obj){
        $(obj).children(".tab-title").click(function(){
            $(".tab .tab-content").attr("style","display:none");
            $(obj).children(".tab-content").attr("style","display:block");
        });
    });
    
    $(".tab .tab-content").first().attr("style","display:block");
})