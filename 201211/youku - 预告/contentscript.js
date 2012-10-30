
(function($){
    var wanDouJiaExt = {
	    init: function(){
            wanDouJiaExt.modifyHome();
	    },
        modifyHome:function(){

            var items_1 = $("div.collgrid4w div.items ul.v");
            if (items_1.length > 0){
                items_1.each(function(){
                    var self = $(this),
                        name = self.find('.v_title a').text(),
                        down_url = self.find('.v_title a').attr("href");

                    down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                    self.append('<li class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="">\u4e0b\u8f7d</a></li>');
                    //self.find("a").attr("href",down_url).attr("download","");
                });
            }

            var items_2 = $("div.collgrid4w div.items ul.p");
            if (items_2.length > 0){
                items_2.each(function(){
                    var self = $(this),
                        name = self.find('.p_title a').text(),
                        down_url = self.find('.p_title a').attr("href");

                    down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                    self.append('<li class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></li>');
                    //self.find('a').attr("href",down_url).attr("download","");
                });
            }

            /*
            var items_3 = $("div.collgrid6t ul.v");
            items_3.each(function(){
                var self = $(this),
                    name = self.find('.v_title a').text(),
                    down_url = self.find('.v_title a').attr("href");

                down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                self.append('<div class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></div>');
                //self.find('a').attr("href",down_url).attr("download","");
            });
            */

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

            var links = $(".baseinfo a,.basedata a");
            if ( links.length > 0 ){
                links.click(function(e){
                    e.preventDefault();
                });
            }

            var zhengpian_btn = $("a.btnplayposi");
            if ( zhengpian_btn.length > 0 ){
                zhengpian_btn.each(function(){
                    var self = $(this),
                        name = $("#title_wrap span.name").text(),
                        down_url = self.attr("href");

                    down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                    $("ul.baseaction li.action").append('<a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a>');
                    //self.find('a').attr("href",down_url).attr("download","");
                });
            }

            var result_items = $("div.result ul.p");
            if ( result_items.length > 0 ){
                $("#filter div.item").eq(3).find("li").not(".current").hide();

                result_items.each(function(){
                    var self = $(this),
                        name = self.find('.p_title a').text(),
                        down_url = self.find('.p_title a').attr("href");

                    down_url = down_url + "#name=" + name + "&content-type=video/mp4";
                    self.append('<li class="down_div"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+name+'.mp4">\u4e0b\u8f7d</a></li>');
                    //self.find('a').attr("href",down_url).attr("download","");
                });
            }


        }

    };

    wanDouJiaExt.init();

})(jQuery);
