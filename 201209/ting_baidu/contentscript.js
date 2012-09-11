
(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyListPages();
        },
        modifyListPages:function(){
            var items = $(".song-list li").first();
            items.each(function(){
                var self = $(this),
                    href = self.find(".song-title a").attr("href"),
                    song_id,
                    ajax_url;

                song_id = href.slice(7,href.length);
                ajax_url = "http://ting.baidu.com/song/"+song_id+"/download";

                $.ajax({
                    url:ajax_url,
                    type:"GET",
                    success:function(data){
                        var operation_pos = data.indexOf("operation"),
                            link_start_pos = data.indexOf("link=",operation_pos),
                            link_end_pos = data.indexOf('id',link_start_pos);

                        var link = data.slice(link_start_pos+10,link_end_pos);

                        console.log(operation_pos,link_start_pos,link_end_pos,link);

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
