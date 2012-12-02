
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyDownloadList();
        },
        modifyDownloadList:function(){
            if ( $(".post li") ){
                $(".post").each(function(){
                    $(this).find("li").first().hide();
                });
            }

            var items = $(".post-detail");
            if(items.length > 0){
                items.each(function(i){
                    var self = $(this),
                        download_link = self.find("img").attr("src"),
                        name = $(".post-title").text();

                    var down_link = download_link + "#name=" + name + "("+ (i + 1)+")"  + "&content-type=image";
                    //self.attr("href",down_link).attr("download","");
                    self.find("img").after('<p style="clear:both;text-align: center;"><a href="'+down_link+'" download="" class="btn-green">免费下载</a><p>');

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