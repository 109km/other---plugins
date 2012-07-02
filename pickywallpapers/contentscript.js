(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
        },
        modifyHomePage:function(){
            var items = $("ul.items li");
            if( items.length > 0 ){
                items.each(function(){
                    var self = $(this),
                        pic_url = self.find("img").attr("src"),
                        tag_a = self.find("a"),
                        pic_name,
                        new_url,
                        params;

                    params = pic_url.split(/\//g);
                    pic_name = params[params.length-1];
                    tag_a.append("<span class='down'>点击下载</span>");
                    new_url = "http://wallpaper.pickywallpapers.com/1280x720/"+pic_name +
                        "#name=" + encodeURIComponent(pic_name) + "&image=" + encodeURIComponent(pic_url)
                        + encodeURIComponent("image/jpeg");

                    tag_a.attr("rel","download").attr("href",new_url);
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
        }
    };
    wanDouJiaExt.init();
})(jQuery);