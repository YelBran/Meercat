$(function () {
    var appName = navigator.appName;
    if (appName == "Microsoft Internet Explorer") {
        var appVersion = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
        if (appVersion == "MSIE6.0" || appVersion == "MSIE7.0" || appVersion == "MSIE8.0" || appVersion == "MSIE9.0") {
            $('#show-hint').html('!!!为了您更好的浏览效果，请使用IE10.0版本以上浏览器，或使用极速模式');
        }
    }

    $(function () {
        $.scrollUp({scrollText:''});
    });
});
