

(function($){
    var wanDouJiaExt = {
        init: function(){
            var href = location.href;

            if( href == "http://www.1mobile.com/" || href.indexOf("applists") >=0 || href.indexOf("downloads")>=0 || href.indexOf("search")>=0 ){
                wanDouJiaExt.modifyHomePage();
            }

            if( href.indexOf("html") >= 0 && href.indexOf("applists") < 0 && href.indexOf("downloads")<0 ){
                wanDouJiaExt.modifyDetailPage();
            }
            
            wanDouJiaExt.modifyGlobe();
            wanDouJiaExt.removeTarget();
        },
        
        modifyGlobe:function(){
            $('.mainnav .nav span').last().hide();
            $('.share').hide();
            if($(".adv-190-190 a").length > 0){
                var new_href = "http://f.1mobile.com/mobile_software/channel/1MobileMarket_31.apk" + "#name=1MobileMarket&content-type=apk";
                $(".adv-190-190 a").attr("href",new_href).attr("download","1MobileMarket.apk");
            }
        },
        modifyHomePage:function(){
            // hide the tab

            // change download url
            var btns = $('.container .appbox li');
            if(btns.length == 0){
                return false;
            }

            btns.each(function(){
                var self = $(this),
                    name = self.find('.ptit a').attr("title"),
                    old_href = self.find('.b').attr('href'),
                    params = wanDouJiaExt.request_url(old_href),
                    pic = self.find('.pic img').attr("src") !=null ? self.find('.pic img').attr("src") : '' ,
                    new_href = params.url + "#name=" + encodeURIComponent(name) +"&content-type=apk&icon=" + pic;
                //self.find('.btninstall').attr("href",new_href).attr("download",name+".apk");

                var down_btn = $('<a class="down" href="'+new_href+'">Install</a>');
                self.append(down_btn);
            });

            var btns_right = $('.container .rightside .b');
            if( btns_right.length > 0 ){
                btns_right.each(function(){
                    var self = $(this),
                        old_href = self.attr('href'),
                        params = wanDouJiaExt.request_url(old_href),
                        name = self.closest("li").find('a').first().find('b').text(),
                        new_href = params["url"] + "#name=" + name +"&content-type=apk";
                    var down_btn = $('<a class="down" href="'+new_href+'">Install</a>');
                    self.closest("li").append(down_btn);
                });
            }

        },
        modifyDetailPage:function(){
            var btn = $('.downbtnbox .optionbox strong .b'),
                big_btn = $('.downloadbox .bigdownbutton'),
                name = $('.detailinfo .apptitle').text(),
                icon = $('.detailbox .appdown .pic img').attr("src");
            if( !!btn ){
                console.log(btn.attr('href'));
                var old_href = btn.attr('href'),
                    params = wanDouJiaExt.request_url(old_href),
                    new_href = params.url + "#name=" + encodeURIComponent(name) +"&content-type=apk&icon="+icon;
                big_btn.attr("href",new_href);
                var down_btn = $('<a class="down" href="'+new_href+'">Install</a>');
                btn.closest(".appdown").append(down_btn);
            }

            var btns_right = $('.container .rightside .b');
            if( btns_right.length > 0 ){
                btns_right.each(function(){
                    var self = $(this),
                        old_href = self.attr('href'),
                        params = wanDouJiaExt.request_url(old_href),
                        name = self.closest("li").find('a').first().find('b').text(),
                        new_href = params["url"] + "#name=" + name +"&content-type=apk";
                    var down_btn = $('<a class="down" href="'+new_href+'">Install</a>');
                    self.closest("li").append(down_btn);
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