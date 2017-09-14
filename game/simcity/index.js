$.ajax("data/storage.json", {
    success: function (data, status, request) {
        var resize = function () {
            $("#storageTable").empty();

            var htmlColumn = [];
            var number_of_row = Math.floor($(window).height() / 30) - 1;
            if (number_of_row > 30) {
                number_of_row = 30;
            }

            var count = 0;
            var col_index = 0;
            for (var key in data) {
                if (count == 0) {
                    htmlColumn[col_index] = "<table><tbody><tr><td>Volumn</td><td>Quantity</td></tr>";
                }
                htmlColumn[col_index] += "<tr><td>" + key + "</td><td>" + data[key] + "</td></tr>";
                count++;
                if (count >= number_of_row) {
                    count = 0;
                    htmlColumn[col_index] += "</tbody></table>";
                    col_index++;
                }
            }

            for (var i in htmlColumn) {
                $("#storageTable").append(htmlColumn[i]);
            }
        }
        resize();
        $(window).resize(resize);

        window.calculateStorage = function () {
            var cv = Number($("#sccv").val());
            var ev = Number($("#scev").val());

            if (cv % 5 != 0) {
                console.log("Current volumn should be mutiple of 5");
                return;
            }

            if (ev % 5 != 0) {
                console.log("Expect volumn should be mutiple of 5");
                return;
            }

            if (ev <= cv) {
                console.log("Expect volumn must greater than Current volumn");
                return;
            }

            if (cv < 45) {
                console.log("Storage volumn start at 40");
                return;
            }

            var sum = 0;
            while (cv < ev) {
                cv += 5
                if (data[cv + ""]) {
                    sum += data[cv + ""];
                }
            }
            $("#scss").val(sum);
            $("#scap").val((sum * 3 * 500) + " vnd");
        }

    }
});