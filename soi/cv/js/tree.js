let radius = 5;
let lineFunction = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .curve(d3.curveNatural);
let svgWidth = 600;
let svgHeight = 450;
let svg = d3.select("#tree-container").append("svg")
    .attr('id', 'treesvg')
    // .attr('width', svgWidth)
    // .attr('height', svgHeight)
    .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
let map = {};
$.get('data.json', function (result) {
    savedData = result;
    for (let i in result) {
        let id = result[i].type;
        let group = d3.select('#' + id);
        if (group.empty()) {
            group = svg.append('g').attr('id', id).attr('class', id)
        }
        createPath(i, result[i], group);
    }
    //bring leaf to front
    let parent = $('#leaf').parent();
    parent.prepend($('#leaf').detach());
});

function createPath(id, data, parent) {
    let group = parent.append("g")
        .attr('id', id);

    let lineGraph = null;

    let drag = d3.drag();
    drag.on('drag', function (d, i) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
        lineGraph.attr('d', lineFunction(data));
    });

    let lineData = null;
    if (data.type == 'leaf') {
        lineData = doTransform(data.data, data.transform);
    } else {
        lineData = data.data;
    }

    // drawCircle(group, data.data, drag);
    lineGraph = group.append("path")
        .attr("d", lineFunction(lineData))
        .on('click', function (a, b, c) {
            selectPath(id);
        });

    map[id] = {
        data,
        group,
        drag,
        lineGraph
    }
}

function rotatePoint(pointToRotate, centerPoint, angleInDegrees) {
    let angleInRadians = angleInDegrees * (Math.PI / 180);
    let cosTheta = Math.cos(angleInRadians);
    let sinTheta = Math.sin(angleInRadians);
    let x = (cosTheta * (pointToRotate.x - centerPoint.x) - sinTheta * (pointToRotate.y - centerPoint.y) + centerPoint.x);
    let y = (sinTheta * (pointToRotate.x - centerPoint.x) + cosTheta * (pointToRotate.y - centerPoint.y) + centerPoint.y);
    return {
        x: Number(x),
        y: Number(y)
    };
}

function doTransform(data, transform) {
    let newData = JSON.parse(JSON.stringify(data));
    let cx = 0;
    let cy = 0;
    for (let i in newData) {
        newData[i].x *= Number(transform.scale);
        newData[i].y *= Number(transform.scale);
        cx += newData[i].x;
        cy += newData[i].y;
    }
    cx = cx / data.length;
    cy = cy / data.length;
    let center = { x: cx, y: cy };
    for (let i in newData) {
        newData[i] = rotatePoint(newData[i], center, Number(transform.rotate));
    }
    let translate = transform.translate.split(' ');
    for (let i in newData) {
        newData[i].x += Number(translate[0]);
        newData[i].y += Number(translate[1]);
    }
    return newData;
}

function toSpring() {
    $('#treesvg').attr('class', 'spring');
    for (let i in savedData) {
        if (savedData[i].type == 'leaf') {
            d3.select('#' + i + ' path')
                .transition()
                .duration(1000)
                .attrTween('d', function (d) {
                    let startScale = 0.05;
                    let scale = Number(savedData[i].transform.scale);
                    return function (t) {
                        let newTransform = JSON.parse(JSON.stringify(savedData[i].transform));
                        newTransform.scale = startScale + (scale - startScale) * t;

                        let data = doTransform(savedData[i].data, newTransform);
                        return lineFunction(data);
                    };
                });
        }
    }
}

function toSummer() {
    $('#treesvg').attr('class', 'summer');

    for (let i in savedData) {
        if (savedData[i].type == 'leaf') {
            d3.select('#' + i + ' path')
                .interrupt()
                .transition()
                .duration(1000)
                .attr('d', lineFunction(doTransform(savedData[i].data, savedData[i].transform)));
        }
    }
}

function fallLeaf(id) {
    map[id].lineGraph.attr('d', lineFunction(doTransform(savedData[id].data, savedData[id].transform)));
    d3.select('#' + id + ' path')
        .transition()
        .duration(5000)
        .delay(Math.floor(Math.random() * 10000))
        .attrTween('d', function (d) {
            let rotate = Number(savedData[id].transform.rotate);
            let rotateTarget = Math.random() > 0.5 ? 0 : 180;
            let translate = savedData[id].transform.translate.split(' ');
            let translateX = Number(translate[0]);
            let translateY = Number(translate[1]);
            let translateXTarget = Math.floor(Math.random() * svgWidth);
            let translateYTarget = 420;
            return function (t) {
                let newTranslateX = translateX + (translateXTarget - Number(translate[0])) * t;
                let newTranslateY = translateY + (translateYTarget - Number(translate[1])) * t;
                let newRotate = rotate + (rotateTarget - rotate) * t;

                let newTransform = JSON.parse(JSON.stringify(savedData[id].transform));
                newTransform.translate = newTranslateX + ' ' + newTranslateY;
                newTransform.rotate = newRotate;

                let data = doTransform(savedData[id].data, newTransform);
                return lineFunction(data);
            };
        })
        .on('end', function () {
            if ($('#treesvg').attr('class') == 'autumn') {
                fallLeaf(id);
            }
        });
}

function toAutumn() {
    $('#treesvg').attr('class', 'autumn');

    for (let i in savedData) {
        if (savedData[i].type == 'leaf') {
            fallLeaf(i);
        }
    }
}

function toWinter() {
    $('#treesvg').attr('class', 'winter');

    for (let i in savedData) {
        if (savedData[i].type == 'leaf') {
            d3.select('#' + i + ' path')
                .interrupt()
                .attr('d', lineFunction(doTransform(savedData[i].data, savedData[i].transform)));
        }
    }
}