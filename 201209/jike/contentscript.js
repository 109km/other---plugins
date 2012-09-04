
(function($){
    var wanDouJiaExt = {
        init: function(){

            wanDouJiaExt.modifyDetailPage();

        },
        modifyDetailPage:function(){
            var btn = $("#popupGetImg");
            if(btn.length>0){
                btn.mouseover(function(){
                    var params = wanDouJiaExt.request_url(location.href),
                        old_href = $(this).attr("href"),
                        name = params["q"],
                        new_href = old_href + "#name=" + name + "&content-type=image";
                    btn.attr("href",new_href).attr("download",name+".jpg");
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