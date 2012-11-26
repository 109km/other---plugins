
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyGlobalPage();
            wanDouJiaExt.modifyDownloadList();

            if ( url.indexOf("shuku") > 0 ){
                wanDouJiaExt.modifyListSytle();
            }
            if ( url.indexOf("cp/book") > 0 ){
                wanDouJiaExt.modifyDeailPage();
            }
            if ( url.indexOf("index") > 0 ){
                wanDouJiaExt.modifyIndexPage();
            }

        },
        modifyGlobalPage:function(){
            if ( $(".logo .right1").length > 0 ){
                var self = $(".logo .right1 a"),
                    download_link = self.attr("href"),
                    prams = wanDouJiaExt.request_url(download_link),
                    name = prams['name'];

                var down_link = download_link + "#name=" + name + "&content-type=application";
                self.attr("href",down_link).attr("download","");
            }
            if ( $(".insInfo a").length > 0 ){
                var self = $(".insInfo a"),
                    download_link = self.attr("href"),
                    prams = wanDouJiaExt.request_url(download_link),
                    name = prams['name'];

                var down_link = download_link + "#name=" + name + "&content-type=application";
                self.attr("href",down_link).attr("download","");
            }

            if ( $(".jds .an a").length > 0 ){
                var self = $(".jds .an a"),
                    download_link = self.attr("href"),
                    prams = wanDouJiaExt.request_url(download_link),
                    name = prams['name'];

                var down_link = download_link + "#name=" + name + "&content-type=book";
                self.attr("href",down_link).attr("download","");
            }
        },
        modifyDownloadList:function(){
            var items = $(".left .jds,.left11 .jds");
            if(items.length > 0){
                items.each(function(){
                    var self = $(this),
                        download_link = self.find(".title a").attr("href"),
                        start = download_link.indexOf("360/") + 4,
                        end  = download_link.indexOf(".html",start) - 3,
                        book_id = download_link.slice(start,end),
                        name = self.find(".title a").text();

                    var down_link = "http://res.read.ifeng.com/book/apk/IfengOpenBook_"+book_id+".apk" + "#name=" + name + "&content-type=book";
                    //self.attr("href",down_link).attr("download","");
                    self.append('<p style="clear:both;text-align: center;"><a href="'+down_link+'" download="">免费下载</a><p>');

                });
            }

        },
        modifyListSytle:function(){
            $(".xmzt div").first().width(540);
        },
        modifyDeailPage:function(){
            var self = $(".jds .nr .jj .an").next().next().find("a"),
                download_link = self.attr("href"),
                prams = wanDouJiaExt.request_url(download_link),
                name = prams['name'];
            var down_link = download_link + "#name=" + name + "&content-type=book";
            self.attr("href",down_link).attr("download","");

            var download_link = location.href,
                start = download_link.indexOf("360/") + 4,
                end  = download_link.indexOf(".html",start) - 3,
                book_id = download_link.slice(start,end),
                book_name = $(".jds .title a").first().text();
            var book_link = "http://res.read.ifeng.com/book/apk/IfengOpenBook_"+book_id+".apk" + "#name=" + book_name + "&content-type=book";
            $(".mulu ul li").last().find("a").attr("href",book_link).attr("download","");

            $(".xmzt div").first().width(540);
            $(".neirong h1").width(520);

            $("#top_frag").parent().find("div a").first().attr("href","http://mobile.book.ifeng.com/ifengReading.apk?c=360#name=凤凰开卷&content-type=application").attr("download","");

        },
        modifyIndexPage:function(){
            $(".neirong h1").width(750);
            $(".neirong h1 .jds").width(530);

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