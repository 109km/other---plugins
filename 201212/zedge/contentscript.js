(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyGlobalPage();
        },
        modifyGlobalPage:function(){
            $("#ctype option").eq(1).trigger("click");
            $("#ctypeMenu li").eq(2).hide();
            $("#ctypeMenu li").eq(3).hide();

            $("#item #itemcontainer .downtemp").click(function(){
                var timer = setInterval(function(){

                    if($("#lightbox .content .downtemp").length > 0){

                        var btn = $("#lightbox .content .downtemp"),
                            old_href = btn.attr("href"),
                            name = $("#itemcontainer .titlebar h4.inline-block").first().text(),
                            new_href;


                        new_href = old_href + "#name=" + name + "&content-type=image";
                        btn.attr("href",new_href).attr("download","");
                        /*
                        btn.click(function(e){
                            e.preventDefault();
                            $.get(
                                old_href,
                                function(data){
                                    console.log(data);
                                }
                            );

                        });
                        */

                        clearInterval(timer);

                    }

                },500);
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