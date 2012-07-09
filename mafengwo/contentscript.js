(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
        },
        modifyHomePage:function(){
            var items = $(".book_item");
            items.each(function(){
                var self = $(this),
                    href = self.find("dt a").attr("href"),
                    id = href.slice(href.indexOf("-")+1,href.indexOf(".html")),
                    url_jpg , url_pdf , down_url;
                
                url_jpg = "http://www.mafengwo.cn/mdd/book_down.php?type=jpegdown&mddid=" + id;
                url_pdf = "http://www.mafengwo.cn/mdd/book_down.php?type=pdfdown&mddid=" + id;
                $.ajax({
                    url:url_jpg,
                    type:"GET",
                    success:function(data){
                        console.log(data);
                    },
                    error:function(){
                        console.log(2);
                    }
                });

                
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