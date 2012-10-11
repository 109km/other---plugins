
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            if ( url.indexOf("album.jsp") > 0 || url.indexOf("play.jsp") > 0 ){
                wanDouJiaExt.modifyDownloadList();
            }

            wanDouJiaExt.modifyGlobalPage();


        },
        modifyGlobalPage:function(){
            var self = $(".ad a"),
                download_link = self.attr("onclick").toString(),
                download_arr = download_link.split(","),
                start = download_arr[0].indexOf("('") + 2,
                end  = download_arr[0].indexOf(".apk",start) + 4,
                url = download_arr[0].slice(start,end),
                name = download_arr[1].slice(1,download_arr[1].length-1);

            var down_link = url + "#name=" + name + "&content-type=application";
            self.attr("href",down_link).attr("download","");
            self.removeAttr("onclick");
        },
        modifyDownloadList:function(){
            var items = $(".btn-download"),
                items_2 = $(".titleFun .tInfo .btn-1");
            if(items.length > 0){
                items.each(function(){
                    var self = $(this),
                        download_link = self.attr("onclick").toString(),
                        download_arr = download_link.split(","),
                        start = download_arr[0].indexOf("('") + 2,
                        end  = download_arr[0].indexOf(".mp4",start) + 4,
                        url = download_arr[0].slice(start,end),
                        name = download_arr[1].slice(1,download_arr[1].length-1);

                    var down_link = url + "#name=" + name + "&content-type=video/mp4";
                    self.attr("href",down_link).attr("download","");
                    self.removeAttr("onclick");
                    //self.hide();
                    //self.after('<a class="downBtn" href="'+down_link+'" download="">免费下载</a>');

                });
            }

            if(items_2.length > 0){
                items_2.each(function(){
                    var self = $(this),
                        download_link = self.attr("onclick").toString(),
                        download_arr = download_link.split(","),
                        start = download_arr[0].indexOf("('") + 2,
                        end  = download_arr[0].indexOf(".mp4",start) + 4,
                        url = download_arr[0].slice(start,end),
                        name = download_arr[1].slice(1,download_arr[1].length-1);

                    var down_link = url + "#name=" + name + "&content-type=video/mp4";
                    self.attr("href",down_link).attr("download","");
                    self.removeAttr("onclick");
                    //self.hide();
                    //self.after('<a class="downBtn" href="'+down_link+'" download="">免费下载</a>');

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