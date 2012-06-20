(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyDetailPage();
        },
        modifyDetailPage:function(){
            var items = $('li','.list01');
            
            items.each(function(){
                var pic_url = $(this).find('.picture_xq img').attr('src'),
                     download_btn = $(this).find('.btnv1'),
                     attr_onclick ,
                     old_href,
                     new_href,
                     params,
                    // replace the <div> element with <a>
                     new_elem;

                // change the onclick code as a string,
                // function toString changes a function to a string
                attr_onclick = download_btn.attr('onclick').toString();
                old_href = attr_onclick.slice(attr_onclick.indexOf("='")+2,attr_onclick.length-3);
                params = wanDouJiaExt.request_url(old_href);

                new_href = old_href + "#name=" + params['name'] + "&content-type=" +
                    encodeURIComponent("video/mp4") + "&image=" + encodeURIComponent(pic_url);

                //create <a> , in order to take <div> 's place
                new_elem = '<a rel="download" href="'+ new_href +'" class="btnv1">下载</a>';
                download_btn.replaceWith(new_elem);

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