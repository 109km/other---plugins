
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;

            if( url.indexOf("index") > 0 ){
                wanDouJiaExt.modifyHomePage();
            }

            if( url.indexOf("list") > 0 ){
                wanDouJiaExt.modifyListPage();
            }

            if( url.indexOf("play") > 0 ){
                wanDouJiaExt.modifyDetailPage();
            }

            wanDouJiaExt.modifyDownloadList();

        },
        modifyDownloadList:function(){
            var items = $(".box li");
            items.each(function(){
                var self = $(this),
                    download_link = self.find("a").last(),
                    old_href = download_link.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href;

                new_href = old_href + "#name=" + name + "&content-type=video/mp4";
                download_link.attr("href",new_href).attr("download",name+".mp4");

            });
        },
        modifyHomePage:function(){
            var ad_url = $(".fous_r a").attr("href"),
                params = wanDouJiaExt.request_url(ad_url),
                ad_new_url;

            ad_new_url = ad_url + "#name=" + decodeURIComponent(params["name"]) + "&content-type=application";
            $(".fous_r a").attr("href",ad_new_url).attr("download",decodeURIComponent(params["name"])+".apk");
        },
        modifyListPage:function(){
            var ad_url = $(".top3 a").attr("href"),
                params = wanDouJiaExt.request_url(ad_url),
                ad_new_url;
            ad_new_url = ad_url + "#name=" + decodeURIComponent(params["name"]) + "&content-type=application";
            $(".top3 a").attr("href",ad_new_url).attr("download",decodeURIComponent(params["name"])+".apk");
        },
        modifyDetailPage:function(){
            var old_href = $(".play dt a").first().attr("href"),
                params = wanDouJiaExt.request_url(old_href),
                new_href;
            new_href = old_href + "#name=" + decodeURIComponent(params["name"]) + "&content-type=video/mp4";
            $(".play dt a").first().attr("href",new_href).attr("download",decodeURIComponent(params["name"])+".mp4");

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