let active = 1;
const ratioWH = 1.4;

const imageList = [
    'image/BTQ_2903.jpg',
    'image/thiep 1.jpg',
    'image/thiep 2.jpg',
    'image/BTQ_3173.jpg',
    'image/BTQ_3210.jpg',
    'image/BTQ_3215.jpg',
    'image/BTQ_3032.jpg'
];

function getPreferSize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
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
let imgCount = 0;
const countFn = () => {
    imgCount++;
    if (imgCount === imageList.length) {
        setTimeout(imgLoaded, 1000);
    }
};
$(document).ready(() => {
    for (let i = 0; i < imageList.length; i++) {
        $('body').append(`
            <div class="page page-${i}" onclick="pageClick(${i})">
                <div class="page-content page-content-${i}">
                    <img src="${imageList[i]}" onload="countFn()">
                </div>
            </div>
        `);
    }
    let hammerTime = new Hammer(document.body);
    hammerTime.on("swiperight", () => {
        back();
    });
    hammerTime.on("swipeleft", () => {
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

function imgLoaded() {
    preferSize = getPreferSize();
    for (let i = 0; i < 5; i++) {
        $(".page-" + i).css({
            "z-index": 100 - i,
            width: `${preferSize.width}px`,
            height: `${preferSize.height}px`
        });
    }
    setTimeout(() => {
        $('#loading').remove();
        for (let i = 0; i < imageList.length; i++) {
            $(".page-" + i).css({
                "transition": "all ease 2s",
            });
        }
        updateStyle();
    }, 0);
}

function next() {
    if (active < imageList.length - 1) {
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

function pageClick (pageIndex) {
    if (pageIndex < active) {
        back();
    } else if (pageIndex > active) {
        next();
    }
}

function updateStyle() {
    preferSize = getPreferSize();

    let leftStyle = getLeftStyle();
    let centerStyle = getCenterStyle();
    let rightStyle = getRightStyle();

    $(".page-" + active).css(centerStyle);
    for (let i = 0; i < active; i++) {
        $(".page-" + i).css(leftStyle);
    }
    for (let i = active + 1; i < imageList.length; i++) {
        $(".page-" + i).css(rightStyle);
    }
}
