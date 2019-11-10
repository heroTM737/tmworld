let active = 1;
let leftStyle = {
    transform: "rotate(-45deg)",
    top: "50vh",
    left: "-75vw",
    opacity: 0.7
}
let centerStyle = {
    transform: "rotate(0deg)",
    top: "10vw",
    left: "10vw",
    opacity: 1
}
let rightStyle = {
    transform: "rotate(45deg)",
    top: "50vh",
    left: "95vw",
    opacity: 0.7
}
$(document).ready(() => {
    for (let i = 0; i < 5; i++) {
        $(".page" + i).css({
            "z-index": 100 - i,
            "height": window.innerHeight - window.innerWidth * 0.2
        });
    }
    for (let i = 0; i < active; i++) {
        $(".page" + i).css(leftStyle);
    }
    for (let i = active + 1; i < 5; i++) {
        $(".page" + i).css(rightStyle);
    }
    let hammertime = new Hammer(document.body);
    hammertime.on("swiperight", () => {
        back();
    });
    hammertime.on("swipeleft", () => {
        next();
    });
})

function next() {
    if (active < 4) {
        $(".page" + active).css(leftStyle);
        $(".page" + (active + 1)).css(centerStyle);
        active++;
    }

}

function back() {
    if (active > 0) {
        $(".page" + active).css(rightStyle);
        $(".page" + (active - 1)).css(centerStyle);
        active--;
    }
}
