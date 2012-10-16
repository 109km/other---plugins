(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyDownPage();
        },
        modifyDownPage:function(){
            // no downurl
            setTimeout(function(){
                var btns = $("#t_v_list .dbtn");
                if( btns.length > 0 ){
                    btns.each(function(){
                        var self = $(this),
                            hash_id = self.attr('rel'),
                            url = "http://jobsfe.funshion.com/query/v1/mp4/"+hash_id+".json",
                            name = self.parent().find("i").text();

                        $.getJSON(
                            url,
                            null,
                            function(data){
                                var down_url = data["playlist"][0]["urls"][0];
                                down_url += "#name=" + name + "&content-type=video/mp4";
                                self.find('.dbtn').hide();
                                var btn = $('<a class="dbtn normal my_btn" href="'+down_url+'" download="">下载</a>');
                                self.append(btn);
                            }
                        );

                    });
                }
            },2000);


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
            $('a','body').removeAttr('target');
        }
    };
    wanDouJiaExt.init();
})(jQuery);