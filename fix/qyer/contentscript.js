

(function($){
    var wanDouJiaExt = {
        init: function(){
            if(location.href.indexOf("index_action")>= 0 ){
                wanDouJiaExt.modifyDetailPage();
            }
            wanDouJiaExt.removeTarget();
        },
        modifyDetailPage:function(){
            $(".jn_cover a,.jn_author_info a").removeAttr("href");

            var
                name = $(".gui_banner_title_cn").text(),
                down_url = "http://tg-con.wandoujia.com:29421/qiongyou/"+name+".pdf" + "#name=" +
                    name + "&content-type=application/pdf",
                file_name = name + ".pdf",
                down_btn ;

            down_btn = $('<p class="down_btn"><a href="'+down_url+'" download="'+file_name+'">点此下载</a></p>');

            $(".gui_banner_title").append(down_btn);
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