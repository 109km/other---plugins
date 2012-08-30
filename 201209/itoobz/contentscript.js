
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            if( url.indexOf("index_client") >= 0){
                wanDouJiaExt.modifyHomePage();
            }

            if(url.indexOf("360client_itoo_content") >= 0){
                wanDouJiaExt.modifyDetailPage();
            }

        },
        modifyHomePage:function(){
            var client_btn = $(".latestnews a"),
                client_old_href = client_btn.attr("href"),
                params = wanDouJiaExt.request_url(client_old_href),
                name = params["name"],
                client_new_href;

            client_new_href = client_old_href + "#name=" + name +"&content-type=application";
            client_btn.attr("href",client_new_href).attr("download",name+".apk");

        },
        modifyDetailPage:function(){
            $("div").first().css("float","none");
            var pic_old_href = $(".btn1 a").attr("href"),
                pic_name = wanDouJiaExt.request_url(pic_old_href)["name"],
                pic_new_href;
            pic_new_href = pic_old_href + "#name=" + pic_name +"&content-type=image";
            $(".btn1 a").attr("href",pic_new_href).attr("download",pic_name+".jpg");
            $(".index a").first().attr("href",pic_new_href).attr("download",pic_name+".jpg");

            var app_old_href = $(".btn2 a").attr("href"),
                app_name = wanDouJiaExt.request_url(app_old_href)["name"],
                app_new_href;
            app_new_href = app_old_href + "#name=" + app_name +"&content-type=application";
            $(".btn2 a").attr("href",app_new_href).attr("download",app_name+".apk");


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