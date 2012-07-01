(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.changeAppDownloadBtn();
            wanDouJiaExt.modifyDetailPage();
        },
        changeAppDownloadBtn:function(){

            if($('body').hasClass('no_bg')){
                return false;
            }

            var app_download_btn = $('.red','.commend'),
                 old_href = app_download_btn.attr('href'),
                 params = wanDouJiaExt.request_url(old_href),
                 name = params.name,
                 new_href = old_href + "#name=" + name +
                     "&content-type=" + encodeURIComponent("application/vnd.android.package-archive");
            app_download_btn.attr('href',new_href).attr('rel','download');
        },
        modifyDetailPage:function(){

            if( !$('body').hasClass('no_bg') ){
                return false;
            }

            var download_btn = $('.down_left a','.no_bg'),
                 old_href = download_btn.attr('href'),
                 pic_url = $('.imgborder img','.img_box').attr('src'),
                 params = wanDouJiaExt.request_url(old_href),
                 name = params.name,
                 type = params['360ext'],
                 content_type,
                 new_href;

            // judge what type it is
            if(type == 'jpg'){
                content_type = 'image/jpeg';
            }else if( type == 'gif' ){
                content_type = 'image/gif';
            }else if ( type == 'png' ){
                content_type = 'image/png';
            }else if( type == 'bmp' ){
                content_type = 'image/bmp';
            }else if( type == 'tiff' ){
                content_type = 'image/tiff';
            }

            new_href = old_href + "#name=" + name +
                "&content-type=" + encodeURIComponent(content_type) +
                "&image=" + encodeURIComponent(pic_url);

            download_btn.attr('href',new_href).attr('rel','download');

            $('.down_right').click(function(){
                setTimeout(function(){
                    $('#show_tip').height(parseInt($('#bigimg').height())+12);
                },200);
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
        }
    };
    wanDouJiaExt.init();
})(jQuery);