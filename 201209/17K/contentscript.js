
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;

            if( url.indexOf("intro") > 0 ){
                wanDouJiaExt.modifyDetailPage();
            }

            if( url.indexOf("all") > 0 ){
                wanDouJiaExt.modifyListPage();
            }

            wanDouJiaExt.modifyGlobalPages();

        },
        modifyGlobalPages:function(){
            var header_down = $(".header .ad a"),
                header_old_href = header_down.attr("href"),
                params = wanDouJiaExt.request_url(header_old_href),
                header_new_href;
            header_new_href = header_old_href + "#name=" + decodeURIComponent(params["name"])
                + "&content-type=application/vnd.android.package-archive";
            header_down.attr("href",header_new_href).attr("download",decodeURIComponent(params["name"]) +".apk");

        },
        modifyListPage:function(){
            var items = $(".td5 a");
            if(items.length == 0){
                return false;
            }
            items.each(function(){
                var self = $(this),
                    old_href = self.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href = old_href + "#name=" + name + "&content-type=application";

                self.attr("href",new_href).attr("download",name + ".apk");
            });
        },
        modifyDetailPage:function(){
            var header_down = $(".limg .ad1 a"),
                header_old_href = header_down.attr("href"),
                params = wanDouJiaExt.request_url(header_old_href),
                header_new_href;
            header_new_href = header_old_href + "#name=" + decodeURIComponent(params["name"])
                + "&content-type=application/vnd.android.package-archive";
            header_down.attr("href",header_new_href).attr("download",decodeURIComponent(params["name"]) +".apk");

            var items = $(".download-ct a")
            items.each(function(){
                var self = $(this),
                    old_href = self.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href = old_href + "#name=" + name + "&content-type=application";

                self.attr("href",new_href).attr("download",name + ".apk");
            });
        },

        // get params from a url
        request_url:function (url){
            var url = url,
                request = new Object(),
                strs;
            if (url.indexOf("?") != -1) {
                var str = url.substr(url.indexOf("?")+1,url.length-url.indexOf("?"));
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    request[strs[i].split("=")[0]] = strs[i].split("=")[1];
                }
            }
            return request;
        },
        removeTarget:function(){
            setTimeout(function(){
                $('a','body').removeAttr('target');
            },1000);
        }
    };
    wanDouJiaExt.init();


})(jQuery);