function getColumnDefinition() {
    return {
        display_name: "display_name",
        field_name: "field_name",
        sortable: false,
        sort_type: "String",
        sort_direction: true,
        apply_sort: false
    }
}

function fetchColumnDefinition() {
    var col_defs = [
        {
            display_name: "Name",
            field_name: "name",
            sortable: true,
            sort_type: "String"
        },
        {
            display_name: "Address",
            field_name: "address",
            sortable: true,
            sort_type: "String"
        },
        {
            display_name: "Email",
            field_name: "email",
            sortable: false,
            sort_type: "String"
        }
    ];
    return col_defs;
}

function fetchGridData() {
    var grid_data = new Array();
    for (var i = 0; i < 5; i++) {
        grid_data.push({
            name: 'name ' + i,
            address: 'address ' + i,
            email: 'email' + i + "@fsoft.com.vn"
        });
    }
    return grid_data;
}

var max = 3;

function fetchTreeData() {
    return buildTreeExampleData(max);
}

function buildTreeExampleData(depth) {
    var array = new Array();
    if (depth > 0) {
        for (var i = 0; i < max; i++) {
            array.push({
                name: "nodeIndex" + i + "Depth" + (max - depth),
                expanded: false,
                children: buildTreeExampleData(Number(depth) - 1)
            });
        }
    }
    return array;
}

function fetchTreeGridData() {
    return buildTreeGridExampleData(max);
}

function buildTreeGridExampleData(depth) {
    var array = new Array();
    if (depth > 0) {
        for (var i = 0; i < max; i++) {
            array.push({
                name: "nodeIndex" + i + "Depth" + (max - depth),
                address: "address" + i,
                email: "email" + i + "@fsoft.com.vn",
                expanded: false,
                children: buildTreeGridExampleData(Number(depth) - 1)
            });
        }
    }
    return array;
}