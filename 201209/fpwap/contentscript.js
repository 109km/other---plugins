
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyGlobalPages();
        },
        modifyGlobalPages:function(){
            $("#down").mouseover(function(){
                if($(this).attr("hover") != "true"){
                    var down_btn = $(this),
                        old_href = down_btn.attr("href"),
                        params = wanDouJiaExt.request_url(old_href),
                        name = params["name"],
                        new_href;
                    new_href = old_href + "#name=" + name + "&content-type=image";
                    down_btn.attr("href",new_href).attr("download",name+".jpg").attr("hover","true");
                }
            });

            $(".installdown").not("#down").click(function(){
                $("#down").attr("hover","false");
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