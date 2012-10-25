(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyDownPage();
            wanDouJiaExt.modifyGlobe();
        },
        modifyGlobe:function(){
            var banner = $("#t_v_banner .bnfr a");
            if (banner.length >0){
                var old_href = banner.attr('href'),
                    params , new_href ;

                params = wanDouJiaExt.request_url(old_href);
                new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                    '&content-type=application';

                banner.attr("href",new_href).attr("download","");
            }
        },
        modifyDownPage:function(){
            // no downurl
            setTimeout(function(){
                var href = location.href;
                var btns = $("#t_v_list .dbtn");
                if( btns.length > 0 ){
                    if ( href.indexOf("kumi") == -1 ){
                        btns.each(function(){
                            var self = $(this),
                                hash_id = self.attr('rel'),
                                url = "http://jobsfe.funshion.com/query/v1/mp4/"+hash_id+".json",
                                name = self.parent().find("i").text();

                            document.domain = "funshion.com";

                            $.getJSON(
                                url ,
                                null,
                                function(data){
                                    var down_url = data["playlist"][0]["urls"][0];
                                    down_url += "#name=" + name + "&content-type=video/mp4";
                                    self.hide();
                                    var btn = $('<a class="dbtn normal my_btn" href="'+down_url+'" download="">下载</a>');
                                    self.after(btn);
                                }
                            );

                        });
                    }else{
                        btns.each(function(){
                            var self = $(this),
                                str1 =self.attr("old_name"),
                                str2 =self.attr("new_name");
                            var text = "k2.kumi.cn/"+str2.substr(1,2)+"/"+str2.substr(3,2)+"/"+str2;
                            $.ajax({
                                type: "POST",
                                url: "http://app.kumi.cn/api/down360_new.php",
                                data: "url="+text,
                                success: function(msg){
                                    var down_url = "http://"+msg+"?name="+str1+"&vsrc=%E9%85%B7%E7%B1%B3%E7%BD%91&360ext=mp4" + "#name="+str1+"&content-type=video/mp4";
                                    self.hide();
                                    var btn = $('<a class="dbtn normal my_btn" href="'+down_url+'" download="">下载</a>');
                                    self.after(btn);
                                }
                            });
                        });

                    }
                }

                var btns2 = $("#t_v_list0 .dbtn");
                if( btns2.length > 0 ){
                    btns2.each(function(){
                        var old_href = $(this).attr('href'),
                            params , new_href ;

                        params = wanDouJiaExt.request_url(old_href);
                        new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                            '&content-type=' + 'video/mp4';

                        $(this).hide();
                        var btn = $('<a class="dbtn normal my_btn" href="'+new_href+'" download="">下载</a>');
                        $(this).after(btn);

                    });
                }

                var detail_btn = $("#t_v_src .btn");
                if ( detail_btn.length >0){
                    var self = detail_btn;
                    if ( href.indexOf("kumi") >=0 ){
                        var script = $("body script").last().html().toString();
                        var str1_start=script.indexOf('str1 ="')+7,
                            str1_end = script.indexOf('"',str1_start),
                            str2_start = script.indexOf('str2 ="',str1_end)+7,
                            str2_end = script.indexOf('"',str2_start);

                        var str1 = script.slice(str1_start,str1_end),
                            str2 = script.slice(str2_start,str2_end);

                        var text = "k2.kumi.cn/"+str2.substr(1,2)+"/"+str2.substr(3,2)+"/"+str2;
                        $.ajax({
                            type: "POST",
                            url: "http://app.kumi.cn/api/down360_new.php",
                            data: "url="+text,
                            success: function(msg){
                                var down_url = "http://"+msg+"?name="+str1+"&vsrc=%E9%85%B7%E7%B1%B3%E7%BD%91&360ext=mp4" + "#name="+str1+"&content-type=video/mp4";
                                self.hide();
                                var btn = $('<a class="btn" href="'+down_url+'" download="">下载本集</a>');
                                self.after(btn);
                            }
                        });

                    }else{
                        var old_href = self.attr('href'),
                            params , new_href ;

                        params = wanDouJiaExt.request_url(old_href);
                        new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                            '&content-type=' + 'video/mp4';

                        self.hide();
                        var btn = $('<a class="btn" href="'+new_href+'" download="">下载本集</a>');
                        self.after(btn);
                    }

                }

                var detail_big_btn = $("#t_v_info .dbtn_big");
                if ( detail_big_btn.length > 0 ){
                    var old_href = detail_big_btn.attr('href'),
                        params , new_href ;

                    params = wanDouJiaExt.request_url(old_href);
                    new_href = old_href + '#name=' +  decodeURIComponent(params['name']) +
                        '&content-type=' + 'video/mp4';

                    detail_big_btn.hide();
                    var btn = $('<a class="dbtn_big" href="'+new_href+'" download=""></a>');
                    detail_big_btn.after(btn);
                }


                

            },1000);





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