$.ajax({
    url: "http://127.0.0.1:7000/service/simcitybuildit/items",
    dataType: "json",
    success: function(data, status, request) {
        console.log(data);
    },
    error: function(request, status, error) {
        console.log(request);
        console.log(status);
        console.log(error);
    }
});