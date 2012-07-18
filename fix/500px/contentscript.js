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

            /*
            $("#photo_category").removeAttr("id").removeAttr("onchange");
            var origin_url = location.origin;
            $("select.ddown").change(function(){
                location.href = "http://www.baidu.com";
            });
            */

            if(location.href.indexOf("fresh") < 0){
                $(".subheader .tabs").append('<li class="clickable "><a href="http://500px.com/fresh/today">Fresh</a></li>');

                if( location.href.indexOf("fresh/today") >= 0 ){
                    $(".subheader .tabs li").removeClass("active");
                    $(".subheader .tabs li").last().addClass("active");
                }
            }
            //hide the right ul
            $("#header .right").hide();

            //modify items
            var items = $('.photo_thumb');
            items.each(function(){
                var self = $(this),
                     title = self.find('.title a'),
                     photo = self.find('.photo img'),
                     photo_link = photo.parent(),
                     author_name = self.find(".info a").text(),
                     rate = self.find(".rating"),
                     name = $.trim(title.text()),
                     pic_url,down_url,
                     file_name;

                file_name = name + '.jpg';
                pic_url = photo.attr('src');
                down_url = pic_url;
                down_url = down_url.replace(/3\.jpg/g,"4.jpg");
                down_url = down_url + "#name=" + name +
                    "&content-type=image/jpeg"+
                    "&image=" + pic_url;
                
                photo_link.addClass("fancy_box");
                photo.parent().attr("href",down_url).attr("download",file_name);
                rate.html('<a href="'+down_url+'" download="'+file_name+'">点击下载</a>');

                title.replaceWith("<span class='title_link'>"+name+"</span>");

                self.find(".info").html(author_name);
                
                self.find(".fancy_box").fancybox({
                    fixed:true,closeBtn:true,title:false,maxWidth:600,nextClick:false,mouseWheel:false,arrows:false,
                    afterLoad:function(){
                        var fancy = this;
                        setTimeout(function(){
                            var fancy_down_url = fancy.href,
                                fancy_file_name = fancy_down_url.slice(fancy_down_url.indexOf("#name=")+6,fancy_down_url.indexOf("&") )+".jpg";
                            $(".fancybox-inner").append("<a href='"+fancy_down_url+"' download='"+fancy_file_name+"' class='btn_down'>点击图片可下载</a>");
                            $(".fancybox-inner img").wrap("<a href='"+fancy_down_url+"' download='"+fancy_file_name+"'></a>");
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