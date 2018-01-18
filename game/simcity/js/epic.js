var sourceItems = null;
var activeItems = [];
var filter = "";

$.ajax({
    url: "http://128.199.190.81:7000/service/simcitybuildit/items",
    dataType: "json",
    success: function (data, status, request) {
        buildEpic(data);
    },
    error: function (request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
    }
});

function buildEpic(items) {
    sourceItems = items;
    buildFilterdItemList(sourceItems);
}

function buildFilterdItemList(items) {
    var html = "";
    if (filter == null || filter == "") {
        for (i in items) {
            html += "<div class=\"item\" onclick=\"addToItemTable('" + items[i].name + "')\"> <img src=\"" + items[i].image + "\"/>" + items[i].name + "</div>";
        }
    } else {
        for (i in items) {
            if (items[i].name.toLowerCase().includes(filter)) {
                html += "<div class=\"item\" onclick=\"addToItemTable('" + items[i].name + "')\"> <img src=\"" + items[i].image + "\"/>" + items[i].name + "</div>";
            }
        }
    }

    $("#itemList").html(html);
}

function addToItemTable(name) {
    var item = null;
    for (i in sourceItems) {
        if (sourceItems[i].name == name) {
            item = sourceItems.splice(i, 1)[0];
            activeItems.push(item);
            break;
        }
    }
    onFilterChange(filter);
    var html = "<tr onclick=\"addToItemList('" + name + "', this)\" class=\"item\">";
    html += "<td><img src=\"" + item.image + "\"/></td>";
    html += "<td>" + name + "</td>";
    html += "<td><input type='number' onclick=\"(function abc(e){e.stopPropagation();})(event);\"/></td>";
    html += "</tr>";
    $("#itemTable").append(html);
}

function addToItemList(name, el) {
    el.parentNode.removeChild(el);
    for (i in activeItems) {
        if (activeItems[i].name == name) {
            sourceItems.push(activeItems.splice(i, 1)[0]);
            break;
        }
    }
    onFilterChange(filter);
}

function onFilterChange(value) {
    filter = value;
    buildFilterdItemList(sourceItems);
}