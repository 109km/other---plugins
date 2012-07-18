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
                             name = $.trim(img.attr("title")),
                             referer,new_pic,file_name;

                        referer = "#name=" + name + "&content-type=image/jpeg"
                            + "&image=" + src;
                        
                        new_pic = src + referer;
                        file_name = name + ".jpg"
                        img.wrap("<a href='"+new_pic +"' download='"+file_name+"'></a>");
                        self.append("<p><a href='"+new_pic+"' download='"+file_name+"' class='download_pic'>点击下载</a></p>");

                        self.hover(function(){
                            self.addClass("hover");
                        },function(){
                            self.removeClass("hover");
                        });
                        
                        var title = '<h2>' + name + '</h2>';
                        self.find(".photo a").fancybox({
                            fixed:true,closeBtn:true,title:title,maxWidth:500,scrolling:"no",nextClick:false,mouseWheel:false,arrows:false,
                            afterLoad:function(){
                                var fancy = this;
                                setTimeout(function(){
                                    var fancy_down_url = fancy.href,
                                        fancy_file_name = fancy_down_url.slice(fancy_down_url.indexOf("#name=")+6,fancy_down_url.indexOf("&") ) + ".jpg";
                                    
                                    $(".fancybox-inner").append("<h3><a href='"+fancy_down_url+"' download='"+fancy_file_name+"' class='download'>点击图片可下载</a></h3>");
                                    $(".fancybox-inner img").wrap("<a href='"+fancy_down_url+"' download='"+fancy_file_name+"'></a>");
                                },200);
                            }
                        });
                        
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