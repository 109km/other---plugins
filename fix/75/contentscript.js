(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.removeTarget();
            wanDouJiaExt.removeTitle();
        },
        modifyHomePage:function(){
            var item = $('.con_left_top','.con').first();
            if( item.length > 0 ){
                $('#imgBookFileUrl').live('click',function(e){
                    var pic_url = item.find('#imgLink img').attr('src'),
                         old_href = $(this).attr('href'),
                         params,new_href;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = old_href + "#name="
                        + params['name'] +
                        "&content-type=application/vnd.android.package-archive"
                        + "&image=" + pic_url;
                    $(this).attr('href',new_href).attr("download",params['name']+".apk");
                });
            }

        },
        modifyDetailPage:function(){
            var item = $('.read_content').first();
            if( item.length > 0 ){
                var pic_url = item.find('.read_pic img').attr('src'),
                     old_href = item.find('.order a').attr('href'),
                     params,new_href;

                params = wanDouJiaExt.request_url(old_href);
                new_href = old_href + "#name="
                        + decodeURIComponent(params['name']) +
                        "&content-type=application/vnd.android.package-archive"
                        + "&image=" + pic_url;
                item.find('.order a').attr('href',new_href).attr("download",decodeURIComponent(params['name'])+".apk");
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
            $('#imgBookDescription').mouseover(function(){
                $(this).removeAttr('title');
            });
            $('font','.read_con_right').removeAttr('title');
        }
    };
    wanDouJiaExt.init();
})(jQuery);