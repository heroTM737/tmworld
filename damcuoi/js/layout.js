$(document).ready(function () {
    alignLayer();
    window.addEventListener("scroll", alignLayer);
});
let last2 = 200;
let reset2 = true;
function alignLayer() {
    let st = $(window).scrollTop();
    let wh = window.innerHeight;
    let ph = st / wh;
    for (let i = 0; i < 4; i++) {
        let top = (i - ph) * 100;
        if (top < 0) {
            top /= 3;
        }
        $(".layer" + i).css("top", top + 'vh')
        //layer 2 animation
        // if (i === 2) {
        //     if (0 <= top && top <= 30 && last2 > 30) {
        //         reset2 = true;
        //         imgList.forEach((item, itemIndex) => {
        //             $("#ic" + itemIndex).css("top", item.y * uy + "px");
        //             $("#ic" + itemIndex).css("left", item.x * ux + "px");
        //         });
        //     } else if (reset2 && top > 100) {
        //         reset2 = false;
        //         $(".img-container").css("top", "0px");
        //         $(".img-container").css("left", "0px");
        //     }
        //     last2 = top;
        // }

    }
}