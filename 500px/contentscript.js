(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
        },
        modifyHomePage:function(){
            //remove logo's link
            $("#logo a").removeAttr("href");

            //hide the last two menu
            $("#header .left").find("li").hide();
            $("#header .left").find("li").first().show();
            $("#header .left").find("li").first().find("li").show();


            //hide the right ul
            $("#header .right").hide();

            //modify items
            var items = $('.photo_thumb');
            items.each(function(){
                var self = $(this),
                     title = self.find('.title a'),
                     photo = self.find('.photo img'),
                     rate = self.find(".rating"),
                     name = title.text(),
                     pic_url,down_url;


                pic_url = photo.attr('src');
                down_url = pic_url;
                down_url = down_url.replace(/3\.jpg/g,"4.jpg");
                down_url = down_url + "#name=" + encodeURIComponent(name) +
                    "&content-type=" + encodeURIComponent("image/jpeg") +
                    "&image=" + encodeURIComponent(pic_url);

                photo.parent().attr("href",down_url).attr("rel","download");
                rate.html('<a href="'+down_url+'">点击查看</a>');

                title.removeAttr("href");
                
                self.find(".photo a").fancybox({
                    fixed:true,closeBtn:true,title:name,maxWidth:600,nextClick:false,mouseWheel:false,arrows:false,
                    afterLoad:function(){
                        setTimeout(function(){
                            $(".fancybox-inner").append("<a href='"+down_url+"' rel='download' class='btn_down'>点击图片可下载</a>");
                            $(".fancybox-inner img").wrap("<a href='"+down_url+"' rel='download'></a>");
                        },200);
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