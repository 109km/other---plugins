


(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            if ( url.indexOf("hashid") > 0 ){
                wanDouJiaExt.modifyDetailPage();
            }else{
                wanDouJiaExt.modifyHomePage();
            }

            wanDouJiaExt.modifyGlobePage();

        },
        modifyGlobePage:function(){
            if ( $("#t_v_banner .bnfr a").length > 0 ){
                var old_href = $("#t_v_banner .bnfr a").attr("href"),
                    params = wanDouJiaExt.request_url(old_href),
                    name = decodeURIComponent(params["name"]),
                    new_href = old_href + "#name=" + name + "&content-type=video/mp4";

                $("#t_v_banner .bnfr a").attr("href",new_href).attr("download",name+".mp4");
            }
        },
        modifyHomePage:function(){
            var timer = setInterval(function(){
                if ( $('#t_v_list li').length > 0 ){
                    $('#t_v_list li').each(function(){
                        if ( $(this).find(".my_btn").length == 0 ){
                            var self = $(this),
                                hashid = self.find('.dbtn').attr("rel").toString(),
                                url = "http://jobsfe.funshion.com/query/v1/mp4/"+hashid+".json",
                                name = self.find("p a").text();
                            $.getJSON(
                                url,
                                null,
                                function(data){
                                    var down_url = data["playlist"][0]["urls"][0];
                                    down_url += "#name=" + name + "&content-type=video/mp4";
                                    self.find('.dbtn').hide();
                                    var btn = $('<a class="dbtn normal my_btn" href="'+down_url+'" download="'+name+'.mp4">下载</a>');
                                    self.append(btn);
                                }
                            );
                        }
                    });
                    //clearInterval(timer);
                }
            },1000);

        },
        modifyDetailPage:function(){

            if ( $('#dbtn_big').length > 0 ){
                setTimeout(function(){
                    var self = $('#dbtn_big'),
                        hashid = self.attr("rel").toString(),
                        url = "http://jobsfe.funshion.com/query/v1/mp4/"+hashid+".json",
                        name = $("#player").find(".title em").text();

                    $.getJSON(
                        url,
                        null,
                        function(data){
                            var down_url = data["playlist"][0]["urls"][0];
                            down_url += "#name=" + name + "&content-type=video";
                            self.hide();
                            var btn = $('<a class="btn my_btn" href="'+down_url+'" download="">下载本集</a>');
                            self.after(btn);
                        }
                    );
                },1000);
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
        }
    };

    wanDouJiaExt.init();

})(jQuery);
