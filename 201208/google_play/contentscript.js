

(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.mofifyDownloadTip();
            wanDouJiaExt.removeTarget();
        },
        mofifyDownloadTip:function(){
            $('.buy-button-price').click(function(){
                var self = $(this);
                setTimeout(function(){
                    if( self.text() == 'Install' && $('#co-dialog-install').css("display") != "none"){
                        $("#co-dialog-button-row").append('<div class="user_tip">Google Play apps download on your phone.</div>');
                    }
                },200)
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