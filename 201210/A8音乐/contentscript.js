
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            setTimeout(function(){
                wanDouJiaExt.modifyDownloadList();
            },1000);

        },
        modifyDownloadList:function(){
            var links = $("a.down");
            // focus pic
            if( links.length > 0 ){
                links.each(function(){
                    var old_href = $(this).attr('href'),
                        params , new_href ;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=audio/mp3';
                    $(this).attr('download','').attr('href',new_href);

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