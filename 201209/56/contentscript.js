
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;

            if( url.indexOf("do=player") > 0 ){
                wanDouJiaExt.modifyDetailPage();
            }

            wanDouJiaExt.modifyGlobalPages();

        },
        modifyGlobalPages:function(){

            var items = $(".m_v_list li");
            items.each(function(){
                var self = $(this),
                    old_href = self.find('.dwn a').attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href;
                new_href = old_href + "#name=" + name + "&content-type=video/mp4";
                self.find('.dwn a').attr("href",new_href).attr("download",name+".mp4");
            });

        },
        modifyDetailPage:function(){
            var down_video = $(".q56_view_right .bottom10").first().find('.q56_full_btn_style01'),
                old_down_href = down_video.attr("href"),
                video_params = wanDouJiaExt.request_url(old_down_href),
                name = decodeURIComponent(video_params["name"]),
                new_down_href = old_down_href + "#name=" + name + "&content-type=video/mp4";
            
            down_video.attr("href",new_down_href).attr("download",name+".mp4");

            var old_app_href = $("#1_a").attr("href"),
                params = wanDouJiaExt.request_url(old_app_href),
                new_name = params["name"],
                new_app_href = old_app_href + "#name=" + new_name + "&content-type=application";
            $("#1_a").attr("href",new_app_href).attr("download",new_name+".apk");
            
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