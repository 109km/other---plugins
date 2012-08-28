

(function($){
    var wanDouJiaExt = {
        init: function(){
            var href = location.href;

            if( href == "http://www.1mobile.com/" ){
                wanDouJiaExt.modifyHomePage();
            }

            if( href.indexOf("html") >= 0 && href.indexOf("applists") < 0 && href.indexOf("downloads")<0 ){
                wanDouJiaExt.modifyDetailPage();
            }

            if( href.indexOf("applists") >=0 || href.indexOf("downloads")>=0 || href.indexOf("search")>=0){
                wanDouJiaExt.modifyListPage();
            }
            
            wanDouJiaExt.modifyGlobe();
            wanDouJiaExt.removeTarget();
        },
        
        modifyGlobe:function(){
            $('.mainnav .nav span').last().hide();
            $('.share').hide();
            if($("#home .btn a").length > 0){
                var old_href = $("#home .btn a").attr("href"),
                    new_href = old_href+"#name=1MobileMarket&content-type=apk";
                $("#home .btn a").attr("href",new_href).attr("download","1MobileMarket.apk");
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
                    name = self.find('.ptit a').text(),
                    old_href = self.find('.downbtn').attr('href'),
                    params = wanDouJiaExt.request_url(old_href),
                    pic = self.find('.pic img').attr("src") !=null ? self.find('.pic img').attr("src") : '' ,
                    new_href = params.url + "#name=" + encodeURIComponent(name) +"&content-type=apk&icon=" + pic;
                self.find('.downbtn').attr("href",new_href).attr("download",name+".apk");

            });

            var btns_right = $('.container .rightside .downbtn');
            if( btns_right.length > 0 ){
                btns_right.each(function(){
                    var self = $(this),
                        old_href = self.attr('href'),
                        params = wanDouJiaExt.request_url(old_href),
                        name = self.closest("li").find('a').first().find('b').text(),
                        new_href = params["url"] + "#name=" + name +"&content-type=apk";
                    self.attr("href",new_href).attr("download",name+".apk");
                });
            }

        },
        modifyDetailPage:function(){
            var btn = $('.detailbox .smalldownbtn'),
                big_btn = $('.detailbox .bigdownbutton'),
                name = $('.detailinfo .apptitle').text(),
                icon = $('.detailbox .appdown .pic img').attr("src");
            if( btn.length > 0){
                btn.each(function(){
                    var self = $(this),
                        old_href = self.attr('href'),
                        params = wanDouJiaExt.request_url(old_href),
                        new_href = params.url + "#name=" + encodeURIComponent(name) +"&content-type=apk&icon="+icon;
                    self.attr("href",new_href).attr("download",name+".apk");
                    big_btn.attr("href",new_href).attr("download",name+".apk");
                });
            }

            var btns_right = $('.container .sidetoplist .downbtn');
            if( btns_right.length > 0 ){
                btns_right.each(function(){
                    var self = $(this),
                        old_href = self.attr('href'),
                        params = wanDouJiaExt.request_url(old_href),
                        name = self.closest("li").find('a').first().find('b').text(),
                        new_href = params["url"] + "#name=" + name +"&content-type=apk";
                    self.attr("href",new_href).attr("download",name+".apk");
                });
            }
        },
        modifyListPage:function(){
            var btns_left;
            if( $('.mainbox').length > 0 ){
                btns_left =$('.container .mainbox .downbtn');
            }else{
                btns_left = $('.container .bigleft .downbtn');
            }
            if( btns_left.length > 0 ){
                btns_left.each(function(){
                    var self = $(this),
                        old_href = self.attr('href') == null ? self.parent().attr('href') : self.attr('href') ,
                        params = wanDouJiaExt.request_url(old_href),
                        name = self.closest("li").find('.ptit a').text(),
                        icon = self.closest("li").find('.pic img').attr('src'),
                        new_href = params["url"] + "#name=" + encodeURIComponent(name) +"&content-type=apk&icon="+icon;
                    if(  self.attr('href') == null ){
                        self.parent().attr("href",new_href).attr("download",name+".apk");
                    }else{
                        self.attr("href",new_href).attr("download",name+".apk");
                    }

                });
            }

            var btns_right = $('.container .sidetoplist .downbtn');
            if( btns_right.length > 0 ){
                btns_right.each(function(){
                    var self = $(this),
                        old_href = self.attr('href'),
                        params = wanDouJiaExt.request_url(old_href),
                        name = self.closest("li").find('a').first().find('b').text(),
                        new_href = params["url"] + "#name=" + name +"&content-type=apk";
                    self.attr("href",new_href).attr("download",name+".apk");
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