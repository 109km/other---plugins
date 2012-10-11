
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyDownloadList();

        },
        modifyDownloadList:function(){
            var items = $(".downBtn"),
                down_btn = $('.download a');
            if(items.length > 0){
                items.each(function(){
                    var self = $(this),
                        download_link = self.attr("onclick").toString(),
                        start = download_link.indexOf("URI('") + 5,
                        end  = download_link.indexOf("')",start),
                        name = download_link.slice(start,end);

                    var down_link = "http://59.151.117.187:8090/zybook/iReader/u/p/download.php?f=iReader&name=" + name +
                        "&360ext=apk&download_file=" + encodeURI(name) + ".apk" +
                        "#name=" + name + "&content-type=book";

                    self.hide();
                    self.after('<a class="downBtn" href="'+down_link+'" download="">免费下载</a>');

                });
            }

            if (down_btn.length > 0){
                var old_href = down_btn.attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = params["name"];
                var new_href = old_href + "#name=" + name + "&content-type=application";
                down_btn.attr("href",new_href).attr("download","");
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