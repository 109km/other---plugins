
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyListPages();
        },
        modifyListPages:function(){

            $(".tab-list li").last().hide();
            var add_links = function(p){
                if( p != null || p != undefined ){
                    var items = $(".song-list li",p);
                }else{
                    var items = $(".song-list li");
                }
                items.each(function(){
                    var self = $(this),
                        title = self.find(".song-title a"),
                        href = title.attr("href"),
                        name = title.attr("title"),
                        song_id,
                        ajax_url;

                    song_id = href.slice(6,href.length);
                    ajax_url = "http://ting.baidu.com/song/"+song_id+"/download";

                    $.ajax({
                        url:ajax_url,
                        type:"POST",
                        success:function(data){
                            var data = data.toString();
                            var operation_pos = data.indexOf("bit128"),
                                link_start_pos = data.indexOf("?link=",operation_pos),
                                link_end_pos = data.indexOf('"',link_start_pos);

                            var link = data.slice(link_start_pos+6,link_end_pos);
                            link = link + "#name=" + name + "&content-type=video";

                            title.attr("href",link).attr("download",name+".mp3");

                            var down_btn = $('<a href="'+link+'" download="'+name+'.mp3">下载</a>');
                            self.find('.fun-icon').append(down_btn);
                        }
                    });
                });
            }

            add_links();

            $(".album-list li").each(function(){
                var self = $(this),
                    container = self.find('.songlist-expand');

                self.click(function(){
                    if (container.html() == ''){
                        setTimeout(function(){
                            add_links(self);
                        },500);
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
        },
        removeTarget:function(){
            setTimeout(function(){
                $('a','body').removeAttr('target');
            },1000);
        }
    };
    wanDouJiaExt.init();


})(jQuery);
