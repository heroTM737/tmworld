let active = 1;
const ratioWH = 1.4;

function getPreferSize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    console.log(w, h);
    let width = 0;
    let height = 0;
    if (h / w > ratioWH) {
        width = Math.floor(w * 0.8);
        height = width * ratioWH;
    } else {
        height = Math.floor(h * 0.8);
        width = height / ratioWH;
    }
    return {width, height}
}

let preferSize = getPreferSize();

function getCenterStyle() {
    return {
        transform: "rotate(0deg)",
        top: `calc(50vh - ${preferSize.height / 2}px)`,
        left: `calc(50vw - ${preferSize.width / 2}px)`,
        width: `${preferSize.width}`,
        height: `${preferSize.height}`,
        opacity: 1
    }
}

function getLeftStyle() {
    return {
        transform: "rotate(-45deg)",
        top: `calc(100vh - ${preferSize.height / 2}px`,
        left: `-${preferSize.width / 2}px`,
        width: `${preferSize.width}`,
        height: `${preferSize.height}`,
        opacity: 0.7
    }
}

function getRightStyle() {
    return {
        transform: "rotate(45deg)",
        top: `calc(100vh - ${preferSize.height / 2}px)`,
        left: `calc(100vw - ${preferSize.width / 2}px)`,
        width: `${preferSize.width}`,
        height: `${preferSize.height}`,
        opacity: 0.7
    }
}

$(document).ready(() => {
    preferSize = getPreferSize();
    for (let i = 0; i < 5; i++) {
        $(".page" + i).css({
            "z-index": 100 - i,
            width: `${preferSize.width}px`,
            height: `${preferSize.height}px`
        });
    }
    setTimeout(() => {
        $('#loading').css({
            opacity: '0'
        });
        for (let i = 0; i < 5; i++) {
            $(".page" + i).css({
                "transition": "all ease 2s",
            });
        }
        setTimeout(() => {
            updateStyle();
        }, 200);
    }, 0);
    let hammertime = new Hammer(document.body);
    hammertime.on("swiperight", () => {
        back();
    });
    hammertime.on("swipeleft", () => {
        next();
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === "ArrowRight") {
            next();
        } else if (e.code === "ArrowLeft") {
            back();
        }
    });

    window.onresize = updateStyle;
});

function next() {
    if (active < 4) {
        active++;
        updateStyle()
    }
}

function back() {
    if (active > 0) {
        active--;
        updateStyle()
    }
}

function updateStyle() {
    preferSize = getPreferSize();

    let leftStyle = getLeftStyle();
    let centerStyle = getCenterStyle();
    let rightStyle = getRightStyle();

    $(".page" + active).css(centerStyle);
    for (let i = 0; i < active; i++) {
        $(".page" + i).css(leftStyle);
    }
    for (let i = active + 1; i < 5; i++) {
        $(".page" + i).css(rightStyle);
    }
}
