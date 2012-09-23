


(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyHomePage();
        },
        modifyHomePage:function(){
            var timer = setInterval(function(){
                if ( $('#t_v_list li').length > 0 ){
                    $('#t_v_list li').each(function(){
                        document.domain = "funshion.com";
                        var self = $(this),
                            hashid = self.find('.dbtn').attr("rel").toString(),
                            url = "http://jobsfe.funshion.com/query/v1/mp4/"+hashid+".json";

                        //wanDouJiaExt.downSoft(hashid);
                        /*
                        F.jsonp(url,function(data){
                            console.log(data);
                        });
                        */
                        /*
                        $.jsonp({
                            url:url,
                            success:function(data){
                                console.log(data);
                            }
                        });
                         */

                        $.ajax({
                            async:false,
                            url:url,
                            type:"GET",
                            dataType:"jsonp",
                            success:function(data){
                                console.log(data);
                                //var data = $.parseJSON(data);
                                //var down_url = data["playlist"]["urls"][0];

                            },
                            complete:function(d){
                                console.log(d);

                            },
                            error:function(d){
                                //console.log(d);
                            }
                        });


                    });
                    clearInterval(timer);
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
        }
    };

    wanDouJiaExt.init();

})(jQuery);
