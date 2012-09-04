
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;

            if( url.indexOf("Aide360/book") > 0 ){
                wanDouJiaExt.modifyDetailPage();
            }

            if( url.indexOf("Aide360") == -1 ){
                wanDouJiaExt.modifyHomePage();
            }

            if( url.indexOf("ftypes") > 0 ){
                wanDouJiaExt.modifyTypePage();
            }

            wanDouJiaExt.modifyGlobalPage();

        },
        modifyGlobalPage:function(){
            $("div").first().width(760);
        },
        modifyTypePage:function(){
            $(".main div").first().width(760);
        },
        modifyHomePage:function(){
            var items_1 = $('.shade .btn2');
            items_1.each(function(){
                var self = $(this),
                    old_href = self.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href = old_href + "#name=" + name + "&content-type=book";
                self.attr("href",new_href).attr("download",name + ".txt");
            });

            var items_2 = $('.shade2 .sbtn2');
            items_2.each(function(){
                var self = $(this),
                    old_href = self.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href = old_href + "#name=" + name + "&content-type=book";
                self.attr("href",new_href).attr("download",name + ".txt");
            });

        },
        modifyDetailPage:function(){
            var items = $(".intro-link-my .btn1")
            items.each(function(){
                var self = $(this),
                    old_href = self.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href = old_href + "#name=" + name + "&content-type=book";

                self.attr("href",new_href).attr("download",name + ".txt");
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