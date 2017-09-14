fs = require('fs')
fs.readFile(__dirname + '/storage.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var storage = {};
    var rows = data.split("\n");
    for (var i in rows) {
        var pair = rows[i].split("\t");
        storage[pair[0]] = Number(pair[1].replace("\r", ""));
    }

    fs.writeFile(__dirname + '/storage.json', JSON.stringify(storage), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file storage.json was saved!");
    });
});