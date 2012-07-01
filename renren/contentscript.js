(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
        },
        modifyHomePage:function(){
            var items = $(".post","#postList"),
                change_item = function(o){
                    var self = $(o);

                    if(self.find(".post-photo").length > 0 ){
                        self.removeAttr("onclick").removeAttr("onmouseover").removeAttr("onmouseout");
                        self.addClass("removed");
                        var img = self.find("img"),
                             src = img.attr("src"),
                             name = img.attr("title"),
                             referer;
                        referer = "#name=" + encodeURIComponent(name) + "&content-type=" + encodeURIComponent("image/jpeg")
                            + "&image=" + encodeURIComponent(src);
                        img.wrap("<a href='"+src + referer +"' rel='download'>");
                    }else{
                        self.hide();
                    }

                };
            // init
            if( items.length > 0 ){
                items.each(function(){
                    change_item(this);
                });
            }

            setInterval(function(){
                var new_items = $(".post","#postList").not(".removed");
                if(new_items.length > 0){
                    new_items.each(function(){
                        change_item(this);
                    });
                }
            },1000);

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