(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            setTimeout(function(){
                wanDouJiaExt.modifyGlobalPage();
            },1000);
        },
        modifyGlobalPage:function(){

            $("a.download_link").live("click",function(e){
                e.stopPropagation();
            });


            var items = $(".li_song");
            if ( items.length > 0 ){
                items.each(function(){

                    var self = $(this),
                        song_id = self.attr("id"),
                        download_link = "",
                        name = self.find('.li_name').text(),
                        node;
                    $.get("http://360web.shoujiduoduo.com/ringweb/ringweb.php?type=geturl&act=down&360=1&rid=" + song_id ,function(data){
                        download_link = data;
                        download_link = download_link + "#name=" + name + "&content-type=audio";
                        self.find(".li_op a").hide();
                        node = $('<a href="'+download_link+'" download="'+name+'.mp3" class="download_link"><img class="download" src="http://bcs.duapp.com/duoduo-ring/360web%2Fimg%2Fdownsong.png"></a>');
                        self.find(".li_op").append(node);

                        self.addClass("loaded");

                    });
                });
            }

            $("div.nextpage,a.a_nav").click(function(e){
                setTimeout(function(){
                    var items = $(".li_song").not(".loaded");
                    if ( items.length > 0 ){
                        items.each(function(){

                            var self = $(this),
                                song_id = self.attr("id"),
                                download_link = "",
                                name = self.find('.li_name').text(),
                                node;
                            $.get("http://360web.shoujiduoduo.com/ringweb/ringweb.php?type=geturl&act=down&360=1&rid=" + song_id ,function(data){
                                download_link = data;
                                download_link = download_link + "#name=" + name + "&content-type=audio";
                                self.find(".li_op a").hide();
                                node = $('<a href="'+download_link+'" download="'+name+'.mp3" class="download_link"><img class="download" src="http://bcs.duapp.com/duoduo-ring/360web%2Fimg%2Fdownsong.png"></a>');
                                self.find(".li_op").append(node);

                                self.addClass("loaded");

                            });
                        });
                    }
                },1000);
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
        },
        removeTarget:function(){
            setTimeout(function(){
                $('a','body').removeAttr('target');
            },1000);
        }
    };
    wanDouJiaExt.init();


})(jQuery);