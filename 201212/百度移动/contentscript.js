(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyHomePage();
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.removeTarget();
        },
        modifyHomePage:function(){
            var items = $("a.download,a.s-index-down");
            items.each(function(){
                var self = $(this),
                    tjurl = self.attr("tjurl"),
                    params = wanDouJiaExt.request_url(tjurl),
                    tj = params["tj"],
                    name_start = tj.lastIndexOf("_") + 1,
                    name_end = tj.length,
                    name = tj.slice(name_start,name_end);

                var old_href = self.attr("href"),
                    new_href = old_href + "#name=" + name + "&content-type=application";

                self.attr("href",new_href).attr("download","");

            });

        },
        modifyDetailPage:function(){
            if ( $("#down_as_durl") ){
                var item = $("#down_as_durl"),
                    url = item.attr("href"),
                    name = $("#appname").text();

                url = url + "#name=" + name + "&content-type=application";
                item.attr("href",url);

                $.ajax({
                    url:url,
                    success:function(data){
                        console.log(data);
                    }
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
                $('a','body').attr('target',"_self");
            },1000);
        }
    };
    wanDouJiaExt.init();


})(jQuery);