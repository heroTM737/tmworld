activePage = 0;
performNext = true;
let uy = Math.floor(($(window).height() - 20) / 4);
let ux = uy;
let activeImgIndex = 0;
let imgList = [
    { w: 2, h: 1, src: './img/gallery/IMG_20190414_170429.jpg' },
    { w: 2, h: 1, src: './img/gallery/IMG_20190414_170525.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20180813_085132.jpg' },
    { w: 2, h: 1, src: './img/gallery/IMG_20190415_100329.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20190415_100353.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20190415_100358.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20190415_100400.jpg' },
    { w: 1, h: 2, src: './img/gallery/IMG_20190415_100922.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20190415_101122.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20190415_101554.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20190415_101639.jpg' },
    { w: 1, h: 1, src: './img/gallery/beauty_20181102155605.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20180813_090104.jpg' },
    { w: 1, h: 1, src: './img/gallery/IMG_20180813_085005.jpg' },
];
imgList.forEach(item => {
    item.w = Math.random() > 0.5 ? 2 : 1;
    item.h = Math.random() > 0.5 ? 2 : 1;
});
function nextPage() {
    if (activePage < 3) {
        return activePage + 1;
    }
    return activePage;
}
function backPage() {
    if (activePage > 0) {
        return activePage - 1;
    }
    return activePage;
}

var lastScrollTop = 0;
document.getElementById("container").addEventListener("wheel", function (event) {
    event.preventDefault();

    // if (performNext) {
    //     var st = $(this).scrollTop();
    //     if (st > lastScrollTop) {
    //         goToId(nextPage());
    //     }
    //     else if (st == lastScrollTop) {
    //         //do nothing 
    //         //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
    //     }
    //     else {
    //         goToId(backPage());
    //     }
    //     lastScrollTop = st;
    // }

    if (performNext) {
        if (event.deltaY > 0) {
            goToId(nextPage());
        } else if (event.deltaY < 0) {
            goToId(backPage());
        }
    }
});

function goToId(nextPage) {
    if (nextPage !== activePage) {
        performNext = false;
        activePage = nextPage;
        $('#container').animate({
            scrollTop: $(window).height() * nextPage
        }, 400, 'swing', function () {
            setTimeout(() => performNext = true, 100)
        });
        if (nextPage !== 2) {
            $(".img-container").css("top", "0px");
            $(".img-container").css("left", "0px");
        } else if (nextPage === 2) {
            imgList.forEach((item, itemIndex) => {
                $("#ic" + itemIndex).css("top", item.y * uy + "px");
                $("#ic" + itemIndex).css("left", item.x * ux + "px");
            });
        }
        $(".menu-item").removeClass("active");
        $("#menu" + nextPage).addClass("active")

        doTextRotate(nextPage === 0);
    }

}

$(window).on('load', () => {
    let matrix = [];
    let x, y = 0;
    for (x = 0; x < 100; x++) {
        matrix[x] = [];
        for (y = 0; y < 100; y++) {
            matrix[x][y] = false;
        }
    }
    let mx = 999;
    let my = 3;
    let isFit = (x, y, w, h) => {
        if (y > my) {
            return false;
        }
        if (matrix[x][y]) {
            return false;
        }
        if (w === 2 && matrix[x + 1][y]) {
            return false;
        }
        if (h === 2) {
            if (y + 1 > my || matrix[x][y + 1]) {
                return false;
            }
        }
        if (w === 2 && h === 2 && matrix[x + 1][y + 1]) {
            return false;
        }
        return true;
    }
    let takePlace = (x, y, w, h) => {
        matrix[x][y] = true;
        if (w === 2) {
            matrix[x + 1][y] = true;
        }
        if (h === 2) {
            matrix[x][y + 1] = true;
        }
        if (w === 2 && h === 2) {
            matrix[x + 1][y + 1] = true;
        }
    }
    imgList.forEach((item, itemIndex) => {
        for (x = 0; x < 30; x++) {
            for (y = 0; y <= my; y++) {
                if (isFit(x, y, item.w, item.h)) {
                    item.x = x;
                    item.y = y;
                    takePlace(x, y, item.w, item.h);
                    $('#gallery').append(`
                        <div 
                            id="ic${itemIndex}" 
                            onclick="openImage(${itemIndex})" 
                            class="img-container w${item.w} h${item.h}" style="top: ${y * uy}px;left:${x * ux}px;width:${item.w * ux}px;height: ${item.h * uy}px;"
                        >
                            <div class="img-wrapper">
                                <img id="g${itemIndex}" src="${item.src}" alt="T&H">
                            </div>
                        </div>
                    `);
                    return;
                }
            }
        }
    });
    let count = 0;
    imgList.forEach((item, itemIndex) => {
        var img = new Image();
        img.onload = function () {
            item.ow = this.naturalWidth;
            item.oh = this.naturalHeight;
            if (item.w / item.h * this.naturalHeight < this.naturalWidth) {
                $("#g" + itemIndex).css('height', '100%')
            } else {
                $("#g" + itemIndex).css('width', '100%')
            }
        }
        img.src = item.src;
    });
    let textRotate = $("#textRotate").text();
    let charList = [];
    for (i = 0; i < textRotate.length; i++) {
        charList.push(textRotate.charAt(i));
    }
    textRotate = '';
    charList.forEach((item, itemIndex) => {
        textRotate += `
            <div id="char${itemIndex}" class="text-rotate" style="transition-delay: ${itemIndex * 0.05}s">${item}</div>
        `
    });
    window.charList = charList;
    $("#textRotate").html(textRotate);
    doTextRotate(false);
    doTextRotate(true);

    let colorList = ["#EF9A9A", "#F48FB1", "#CE93D8", "#B39DDB", "#9FA8DA", "#90CAF9", "#81D4FA", "#80DEEA", "#80CBC4", "#A5D6A7", "#C5E1A5", "#E6EE9C"];
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    let messageList = [];
    for (i = 0; i < 20; i++) {
        messageList.push({
            sender: 'Tiến ' + i,
            time: new Date().getMilliseconds(),
            content: "Đám cưới tuyệt vời " + i,
            id: Math.floor(Math.random() * 100000),
            colorIndex: Math.floor(Math.random() * colorList.length)
        });
    }

    messageList.forEach((item) => {
        $("#messageGroup").append(`
            <div id="msg${item.id}" class="message-container">
                <div class="message-header">
                    <div class="sender">${item.sender}</div>
                    <div class="content">${new Date(item.time).toDateString()}</div>
                </div>
                <div class="content">${item.content}</div>
            </div>
        `);
    });

    let alignMessages = () => {
        messageList.forEach((item, itemIndex) => {
            let top = `calc(${itemIndex % 5} * 16vh + 10vh)`;
            let left = Math.floor(itemIndex / 5) * 350 + 100;
            let angle = Math.floor(Math.random() * 30) - 15;
            $("#msg" + item.id).css({
                top: top,
                left: `${left}px`,
                transform: `rotate(${angle}deg)`,
                'background-color': colorList[item.colorIndex]
            });
        });
    }
    alignMessages();
    window.addMessage = () => {
        let item = {
            sender: $("#msgSender").val(),
            time: new Date().getMilliseconds(),
            content: $("#msgContent").val(),
            id: Math.floor(Math.random() * 100000),
            colorIndex: Math.floor(Math.random() * colorList.length)
        }
        messageList.unshift(item);
        $("#msgEditor").css("display", "none");
        // $("#messageGroup").prepend(`
        //     <div 
        //         id="msg${item.id}" 
        //         class="message-container" 
        //         style="top: calc(50vh - 150px);left: calc(50vw - 150px);transform: rotate(0deg);background-color: ${colorList[item.colorIndex]};z-index: 3;"
        //     >
        //         <div class="message-header">
        //             <div class="sender">${item.sender}</div>
        //             <div class="content">${new Date(item.time).toDateString()}</div>
        //         </div>
        //         <div class="content">${item.content}</div>
        //     </div>
        // `);
        // setTimeout(() => {
        //     alignMessages();
        //     $("#msg" + item.id).css("z-index", "1");
        //     $("#msgContent").val("");
        // }, 0);

        $("#messageGroup").prepend(`
            <div 
                id="msg${item.id}" 
                class="message-container" 
                style="top: calc(10vh);left: 100px;transform: rotate(-8deg);background-color: rgb(128, 222, 234);z-index: 1;animation: fromCenter 3s;"
            >
                <div class="message-header">
                    <div class="sender">${item.sender}</div>
                    <div class="content">${new Date(item.time).toDateString()}</div>
                </div>
                <div class="content">${item.content}</div>
            </div>
        `);
        alignMessages();
    }
    window.showAddMessage = () => {
        $("#msgEditor").css("display", "block");
    }
    window.cancelAddMessage = () => {
        $("#msgEditor").css("display", "none");
    }
    cancelAddMessage();
});

function doTextRotate(check) {
    if (check) {
        let totalRight = 25;
        let correctIndex = 0;
        setTimeout(() => {
            charList.slice().reverse().forEach((item, itemIndex) => {
                correctIndex = charList.length - 1 - itemIndex;
                $("#char" + correctIndex).css({
                    top: "90px",
                    right: totalRight + "px",
                    transform: "rotate(360deg)",
                    opacity: "1"
                });
                let addWidth = $("#char" + correctIndex).width();
                totalRight += addWidth > 10 ? addWidth : 10;
            });
        }, 0);
    } else {
        charList.forEach((item, itemIndex) => {
            $("#char" + itemIndex).css({
                top: "-100px",
                right: "-100px",
                transform: "rotate(0deg)",
                opacity: "0"
            });
        });
    }
}

function nextImage() {
    if (activeImgIndex < imgList.length - 1) {
        activeImgIndex++;
        $("#activeImg").attr(("src"), imgList[activeImgIndex].src)
    }
}

function backImage() {
    if (activeImgIndex > 0) {
        activeImgIndex--;
        $("#activeImg").attr(("src"), imgList[activeImgIndex].src)
    }
}

function openImage(imgIndex) {
    activeImgIndex = imgIndex;
    $("#activeImg").attr(("src"), imgList[activeImgIndex].src);
    $("#imageViewer").css("display", "flex");
    setTimeout(() => $("#imageViewer").css("opacity", "1"), 0)
}

function closeImage() {
    $("#imageViewer").css("opacity", "0")
    setTimeout(() => $("#imageViewer").css("display", "none"), 500)
}