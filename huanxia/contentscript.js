(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.removeTarget();
            wanDouJiaExt.removeTitle();
        },
        modifyDetailPage:function(){
            var item = $('.mainarea','.wrap').first();

            if( item.length > 0 ){
                var pic_url = item.find('.wleft img').attr('src'),
                     old_href = item.find('.wbutton .view').attr('href'),
                     params,new_href;

                params = wanDouJiaExt.request_url(old_href);
                new_href = old_href + "#name="
                    + encodeURIComponent(params['name']) +
                    "&content-type=" + encodeURIComponent("application/vnd.android.package-archive")
                    + "&image=" + encodeURIComponent(pic_url);

                item.find('.wbutton .view').attr('href',new_href).attr("rel","download");
                
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
            $('a','body').removeAttr('target');
        },
        removeTitle:function(){
            $('.limit').removeAttr('title');
        }
    };
    wanDouJiaExt.init();
})(jQuery);