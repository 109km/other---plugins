
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;

            if( url.indexOf("index") > 0 ){
                wanDouJiaExt.modifyHomePage();
            }

            if( url.indexOf("index") == -1 ){
                wanDouJiaExt.modifyListPage();
            }

            wanDouJiaExt.modifyGlobalPages();

        },
        modifyGlobalPages:function(){

            var ad_url = $("#downloadClient").attr("href"),
                params = wanDouJiaExt.request_url(ad_url),
                ad_new_url;
            console.log($("#downloadClient"))
            ad_new_url = ad_url + "#name=" + decodeURIComponent(params["name"]) + "&content-type=application";
            $("#downloadClient").attr("href",ad_new_url).attr("download",decodeURIComponent(params["name"])+".apk");

        },
        modifyHomePage:function(){
            var items = $(".list li .mLeft");
            items.each(function(){
                var self = $(this),
                    old_href = self.find('.button1').attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href;
                new_href = old_href + "#name=" + name + "&content-type=video/mp4";
                self.find('a').not('.button2').attr("href",new_href).attr("download",name+".mp4");
            });
        },
        modifyListPage:function(){
            var container;
            $("ul").each(function(){
                if ( $(this).attr("class").indexOf("list") >=0 || $(this).parent().attr("class").indexOf("list") >=0 ){
                    container = $(this);
                }
            });
            
            if( typeof(container) == "undefined" ){
                return false;
            }else{
                var items = $("li",container);
                items.each(function(){
                    var self = $(this),
                        old_href = self.find('a').first().attr("href"),
                        params = wanDouJiaExt.request_url(old_href),
                        name = decodeURIComponent(params["name"]),
                        new_href;
                    new_href = old_href + "#name=" + name + "&content-type=video/mp4";
                    self.find('a').first().attr("href",new_href).attr("download",name+".mp4");
                });
            }

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