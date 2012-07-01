(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.removeTarget();
        },
        modifyHomePage:function(){
            var items = $(".product_boxindex","#main_content");
            if( items.length > 0 ){
                items.each(function(){
                    var old_href = $(this).find('.index_details a').attr('href'),
                        pic_url = $(this).find('.prod_image').attr('src'),
                        params , new_href;
                    params = wanDouJiaExt.request_url(old_href);
                    new_href = "http://114.80.224.44/360packages/" + params['id'] + "_1.apk#name="
                        + encodeURIComponent(params['name']) +
                        "&content-type=" + encodeURIComponent("application/vnd.android.package-archive")
                        + "&image=" + encodeURIComponent(pic_url);
                    $(this).find('.index_details a').attr('href',new_href).attr("rel","download");
                });
            }
        },
        modifyDetailPage:function(){
            var item = $('.product_box_details','#center_content');
            if( item.length == 1 ){
                var pic_url = item.find('.prod_image').attr('src'),
                    old_href = item.find('.prod_title a').attr('href'),
                    params,new_href;

                params = wanDouJiaExt.request_url(old_href);
                new_href = "http://114.80.224.44/360packages/" + params['id'] + "_1.apk#name="
                    + encodeURIComponent(params['name']) +
                    "&content-type=" + encodeURIComponent("application/vnd.android.package-archive")
                    + "&image=" + encodeURIComponent(pic_url);

                item.find('.prod_title a').attr('href',new_href).attr("rel","download");
                item.find('.title a').attr('href',new_href).attr("rel","download");

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