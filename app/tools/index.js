//RGB - Hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function convertRGB2Hex() {
    var r = Number($("#red").val());
    var g = Number($("#green").val());
    var b = Number($("#blue").val());
    var hex = rgbToHex(r, g, b).toUpperCase();

    $("#hex").val(hex);
    $("#hexSharp").val("#" + hex);
}

function convertHex2RGB() {
    var hex = $("#hex").val();
    var rgb = hexToRgb(hex);
    $("#red").val(rgb.r);
    $("#green").val(rgb.g);
    $("#blue").val(rgb.b);
}

//HTML Entities
function decodeHTMLEntities(str) {
    str = str.split("&nbsp;").join(" ");
    str = str.split("&lt;").join("<");
    str = str.split("&gt;").join(">");
    str = str.split("&amp;").join("&");
    str = str.split("&quot;").join("\"\"");
    str = str.split("&apos;").join("''");
    str = str.split("&cent;").join("¢");
    str = str.split("&pound;").join("¢");
    str = str.split("&yen;").join("¥");
    str = str.split("&euro;").join("€");
    str = str.split("&copy;").join("©");
    str = str.split("&reg;").join("®");
    return str;
}

function encodeHTMLEntities(str) {
    str = str.split(" ").join("&nbsp;");
    str = str.split("<").join("&lt;");
    str = str.split(">").join("&gt;");
    str = str.split("&").join("&amp;");
    str = str.split("\"\"").join("&quot;");
    str = str.split("''").join("&apos;");
    str = str.split("¢").join("&cent;");
    str = str.split("¢").join("&pound;");
    str = str.split("¥").join("&yen;");
    str = str.split("€").join("&euro;");
    str = str.split("©").join("&copy;");
    str = str.split("®").join("&reg;");
    return str;
}

function doEncodeHTMLEntities() {
    var decoded = $("#HTMLDecodedText").val();
    console.log(decoded);
    var encoded = encodeHTMLEntities(decoded);
    $("#HTMLEncodedText").val(encoded);
}

function doDecodeHTMLEntities() {
    var encoded = $("#HTMLEncodedText").val();
    var decoded = decodeHTMLEntities(encoded);
    $("#HTMLDecodedText").val(decoded);
}