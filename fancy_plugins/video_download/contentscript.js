(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.clearAds();
            //wanDouJiaExt.removeTarget();
        },
        modifyDetailPage:function(){

            // disable ads
            var video_layer = $('<div class="video_layer"></div>'),
                player = $("#player"),
                width = player.width(),
                height = player.height()-100;
            player.find("object").append('<param name="wmode" value="transparent">');
            video_layer.height(height).width(width);
            player.append(video_layer);



        },
        clearAds:function(){
            $('div','body').each(function(){
                var self = $(this);
                if ( self.attr('id').indexOf("ab_") >= 0 ){
                    self.css("display","none!important");
                }
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
            $('a','body').removeAttr('target');
        }
    };
    wanDouJiaExt.init();
})(jQuery);