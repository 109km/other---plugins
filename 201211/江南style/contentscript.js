
(function($){
    var wanDouJiaExt = {
	    init: function(){
            wanDouJiaExt.modifyHome();
	    },
        modifyHome:function(){
            if ( $("div.mainCol div.body div.c").length > 0 ){
                $("div.mainCol div.body div.c").append('<div class="down_div" style="text-align: right;padding-right: 30px;"><a class="btn-min" style="color:black;" href="http://v.youku.com/v_show/id_XNDYyNDE3MTA4.html#name=屌丝style&content-type=video/mp4" download="">\u4e0b\u8f7d</a></div>');
            }

            var items_1 = $("div.tabContent li.jj_item");
            items_1.each(function(){
                var self = $(this),
                    name = self.find('.text a').text(),
                    down_url = self.find('.text a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="">\u4e0b\u8f7d</a></div>');
                //self.find("a").attr("href",down_url).attr("download","");
            });
            /*
            var items_2 = $("div.stillsBox li");
            items_2.each(function(){
                var self = $(this),
                    name = "优酷视频",
                    down_url = self.find('a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></div>');
                //self.find('a').attr("href",down_url).attr("download","");
            });
            */

            var items_3 = $("div.collgrid6t ul.v");
            items_3.each(function(){
                var self = $(this),
                    name = self.find('.v_title a').text(),
                    down_url = self.find('.v_title a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></div>');
                //self.find('a').attr("href",down_url).attr("download","");
            });

            var fn_download = $('#fn_download');
            if(fn_download.length > 0){
                fn_download.each(function(){
                    $('#fn_download').hide();
                    var p = $('#fn_download').parent();
                    var down_url = window.location.href;
                    var title = $.trim($('.title').text());
                    down_url = down_url + "#name=" + title + "&content-type=video/mp4";
                    p.append('<a class="btn-min" style="color:black;width:80px;height:26px;text-align:center;display:block;" href="'+down_url+'" download="">\u4e0b\u8f7d</a>');
                });
            }

        }
    };

    wanDouJiaExt.init();

})(jQuery);
