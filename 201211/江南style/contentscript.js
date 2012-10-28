
(function($){
    var wanDouJiaExt = {
	    init: function(){
            wanDouJiaExt.modifyHome();
	    },
        modifyHome:function(){
            var items_1 = $("div.tabContent li.jj_item");
            items_1.each(function(){
                var self = $(this),
                    name = self.find('.text a').text(),
                    down_url = self.find('.text a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="">\u4e0b\u8f7d</a></div>');
                self.find("a").attr("href",down_url).attr("download","");
            });

            var items_2 = $("div.stillsBox li");
            items_2.each(function(){
                var self = $(this),
                    name = "优酷视频",
                    down_url = self.find('a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></div>');
                self.find('a').attr("href",down_url).attr("download","");
            });

            var items_3 = $("div.collgrid6t ul.v");
            items_3.each(function(){
                var self = $(this),
                    name = self.find('.v_title a').text(),
                    down_url = self.find('.v_title a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></div>');
                self.find('a').attr("href",down_url).attr("download","");
            });

        }
    };

    wanDouJiaExt.init();

})(jQuery);
