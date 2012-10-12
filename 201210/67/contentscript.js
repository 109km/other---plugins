(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.removeTarget();
        },
        modifyHomePage:function(){
            var focus_links = $('a','.focus');
            // focus pic
            if( focus_links.length > 0 ){
                focus_links.each(function(){
                    var old_href = $(this).attr('href'),
                        params , new_href ,pic_url;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = params['url'] + '#name=' +  params['name'] +
                        '&content-type=' + encodeURIComponent('video/mp4');

                    $(this).attr('rel','download').attr('href',new_href);

                });
            }

            // list
            var small_slider_links = $('.cont .box','.ctt');
            if( small_slider_links.length > 0 ){
                small_slider_links.each(function(){
                    var old_href = $(this).find('a').first().attr('href'),
                        params , new_href ,pic_url;

                    pic_url = $(this).find('img').attr('src');
                    params = wanDouJiaExt.request_url(old_href);
                    new_href = params['url'] + '#name=' +  params['name'] +
                        '&content-type=' + encodeURIComponent('video/mp4') +
                        '&image=' + encodeURIComponent(pic_url);

                    $(this).find('a').attr('rel','download').attr('href',new_href);

                });
            }

        },
        modifyDetailPage:function(){
            var items = $('li','.jslist');
            items.each(function(){
                var old_href = $(this).find('a').first().attr('href'),
                    params , new_href ,pic_url;

                pic_url = $(this).find('img').attr('src');
                params = wanDouJiaExt.request_url(old_href);
                new_href = params['url'] + '#name=' +  params['name'] +
                    '&content-type=' + encodeURIComponent('video/mp4') +
                    '&image=' + encodeURIComponent(pic_url);

                $(this).find('a').attr('rel','download').attr('href',new_href);

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