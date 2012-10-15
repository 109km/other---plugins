(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
            wanDouJiaExt.modifyDetailPage();
        },
        modifyHomePage:function(){
            var focus_links = $(".list_01 li a");
            // focus pic
            if( focus_links.length > 0 ){
                focus_links.each(function(){
                    var old_href = $(this).attr('href'),
                        params , new_href ;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = params['url'] + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=' + encodeURIComponent('video/mp4');

                    $(this).attr('download','').attr('href',new_href);

                });
            }

            var banner = $(".banner a");
            if( banner.length > 0 ){
                banner.each(function(){
                    var old_href = $(this).attr('href'),
                        params , new_href ,pic_url;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=' + encodeURIComponent('application');

                    $(this).attr('download','').attr('href',new_href);

                });
            }

            var text_btns = $(".two .font3");
            if( text_btns.length > 0 ){
                text_btns.each(function(){
                    var old_href = $(this).attr('href'),
                        params , new_href ,pic_url;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=' + encodeURIComponent('application');

                    $(this).attr('download','').attr('href',new_href);

                });
            }

            var slides = $("#slides .slide a");
            if( slides.length > 0 ){
                slides.each(function(){
                    var old_href = $(this).attr('href'),
                        params , new_href ;

                    params = wanDouJiaExt.request_url(old_href);
                    if (params["url"] != null && params["url"] != "" && params["url"] != undefined){
                        new_href = params["url"] + '#name=' +  decodeURIComponent(params['name']) +
                            '&content-type=' + encodeURIComponent('video/mp4');

                        $(this).attr('download','').attr('href',new_href);
                    }

                });
            }


        },
        modifyDetailPage:function(){
            var items = $('.ztlist li');
            if (items.length > 0){
                items.each(function(){
                    var old_href = $(this).find('a').first().attr('href'),
                        params , new_href ,pic_url;

                    pic_url = $(this).find('img').attr('src');
                    params = wanDouJiaExt.request_url(old_href);
                    new_href = params['url'] + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=' + encodeURIComponent('video/mp4');

                    $(this).find('a').attr('download','').attr('href',new_href);

                });
            }

            var list_items = $(".ptlist li");
            if (list_items.length > 0){
                list_items.each(function(){
                    var old_href = $(this).find('a').first().attr('href'),
                        params , new_href ,pic_url;

                    pic_url = $(this).find('img').attr('src');
                    params = wanDouJiaExt.request_url(old_href);
                    new_href = params['url'] + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=' + encodeURIComponent('video/mp4');

                    $(this).find('a').attr('download','').attr('href',new_href);

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
            $('a','body').removeAttr('target');
        }
    };
    wanDouJiaExt.init();
})(jQuery);