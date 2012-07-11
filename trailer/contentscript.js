(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
            //wanDouJiaExt.removeTarget();
        },
        modifyHomePage:function(){
            setTimeout(function(){
                $("#trailers-dropdown .dropdown-handle").click(function(){
                    var parent = $(this).closest(".column");
                    
                    parent.find(".dropdown-list li").last().hide();
                    
                    var items = parent.find(".dropdown-list .hd .target-quicktimeplayer");
                    items.each(function(){
                        var self = $(this),
                            old_href = self.attr("href"),
                            title = document.title.slice( 0,document.title.indexOf("-")-1),
                            pic_url = parent.find(".OverlayPanel img").attr("src"),
                            new_href;

                        new_href = old_href + "#name=" + encodeURIComponent(title) + "&image=" + encodeURIComponent(pic_url) +
                            "&content-type=" + encodeURIComponent("video/mov");
                        
                        self.attr("href",new_href).attr("rel","download");

                    });
                });
            },3000);

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
            },3000);
        }
    };
    wanDouJiaExt.init();
})(jQuery);