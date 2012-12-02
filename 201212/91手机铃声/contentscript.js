(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyGlobalPage();
        },
        modifyGlobalPage:function(){

            var items1 = $(".ring_list1 li");
            if ( items1 ){
                items1.each(function(){
                    var self = $(this),
                        name = $.trim(self.find("h3 a").text()),
                        link = self.find(".link1").attr("href"),
                        start = link.indexOf("(") + 2,
                        end = link.indexOf("mp3",start)+3,
                        mp3_link = link.slice(start,end);

                    mp3_link = mp3_link + "#name=" + name + "&content-type=audio";

                    self.find(".link3").attr("href",mp3_link).attr("download","");

                });
            }


            var items2 = $(".ring_list2 tbody tr");
            if ( items2 ){
                items2.each(function(){
                    var self = $(this),
                        name = $.trim(self.find(".col1 a").text()),
                        link = self.find(".col1 a").attr("href"),
                        start = link.indexOf("(") + 2,
                        end = link.indexOf("mp3",start)+3,
                        mp3_link = link.slice(start,end);

                    mp3_link = mp3_link + "#name=" + name + "&content-type=audio";

                    self.find(".link3").attr("href",mp3_link).attr("download","");

                });
            }
            if ( $(".sort_tabCon") ){
                $(".sort_tabCon").first().show();
            }
            var items3 = $(".sort_con_con .sort_list1_con tr");
            if ( items3 ){
                items3.each(function(){
                    var self = $(this),
                        name = $.trim(self.find(".col2 a").text()),
                        link = self.find(".col2 a").attr("href"),
                        mp3_link;

                    $.ajax({
                        url:link,
                        success:function(data){
                            var data = data.toString();
                            var start = data.indexOf("src=")+ 4,
                                end = data.indexOf("mp3",start)+3,
                                src = data.slice(start,end);
                            mp3_link = "http://ringdown.91.2366.com" + decodeURIComponent(src);
                            mp3_link = mp3_link + "#name=" + name + "&content-type=audio";
                            self.find(".col2 a").attr("href",mp3_link).attr("download","");
                        }
                    });


                });
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
        },
        removeTarget:function(){
            setTimeout(function(){
                $('a','body').removeAttr('target');
            },1000);
        }
    };
    wanDouJiaExt.init();


})(jQuery);