
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyListPages();
        },
        modifyListPages:function(){

            $(".tab-list li").last().hide();

            $(".base-info .singer-name").text("中国好声音专刊");

            var baidu_declaration = $('<p class="baidu_declaration">音乐内容来自百度ting，试听请直接进入<a href="http://music.baidu.com/artist/16183933" target="_default">百度ting页面</a></p>');
            $(".base-info .singer-name").after(baidu_declaration);
            var add_links = function(p){
                if( p != null && p != undefined ){
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
                    ajax_url = "http://music.baidu.com/song/"+song_id+"/download";
                    console.log(ajax_url);
                    $.ajax({
                        url:ajax_url,
                        type:"POST",
                        success:function(data){
                            var data = data.toString();
                            var operation_pos = data.indexOf("bit128"),
                                link_start_pos = data.indexOf("?link=",operation_pos),
                                link_end_pos = data.indexOf('"',link_start_pos);

                            var link = data.slice(link_start_pos+6,link_end_pos);
                            link = link + "#name=" + name + "&content-type=audio";

                            title.attr("href",link).attr("download","");

                            var down_btn = $('<a href="'+link+'" download="" class="down_btn">下载</a>');
                            self.find('.fun-icon').append(down_btn);


                            var author_list_pos = data.indexOf("author_list"),
                                author_start = data.indexOf("<a",author_list_pos),
                                author_end = data.indexOf("/a>",author_start);

                            var author_html = data.slice(author_start,author_end+3);

                            var author_tag = $(author_html);
                            self.find('.hot-info').append(author_tag);

                        }
                    });
                });
            }
            
            var check_down = setInterval(function(){
                if ($(".song-list").find('.down_btn').length > 0 ){
                    //clearInterval(check_down);
                }else{
                    add_links();
                }
            },1000);
            
            $(".album-list li").each(function(){
                var self = $(this),
                    container = self.find('.songlist-expand');

                self.click(function(){
                    var check = setInterval(function(){
                        if (container.find('.down_btn').length > 0 ){
                            clearInterval(check);
                        }else{
                            add_links(self);
                        }
                    },1000);
                });

                self.find(".songlist-fold-hook").click(function(){
                    var check = setInterval(function(){
                        if (container.find('.down_btn').length > 0 ){
                            clearInterval(check);
                        }else{
                            add_links(self);
                        }
                    },1000);
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
