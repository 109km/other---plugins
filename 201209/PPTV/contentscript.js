
(function($){
    var wanDouJiaExt = {
        init: function(){
            setTimeout(function(){
                wanDouJiaExt.mofifyDownload();
            },500);

            //wanDouJiaExt.removeTarget();
        },
        mofifyDownload:function(){

            var map = $("#Map");
            map.find("area").each(function(){
                var link = $(this);

                if(link.attr("href").length > 4){
                    var old_href = link.attr("href"),
                        params = wanDouJiaExt.request_url(old_href),
                        name = params["name"],
                        new_href;
                    new_href = old_href + "#name=" + name + "&content-type=application"

                    link.attr("href",new_href).attr("download",name+".apk");

                }
            });

            var items = $(".piclist li");
            items.each(function(){
                var self = $(this),
                    item_name = self.find(".pica"),
                    name = item_name.text(),
                    catid= item_name.attr("catid"),
                    chid = item_name.attr("chid"),
                    links = self.find("a"),
                    get_url;

                if( catid && chid){
                    get_url = "http://app.topic.pptv.com/360app/desktop/download/api/" + catid + "/" + chid + ".html?cb=get_download_url";
                    $.ajax({
                        url:get_url,
                        type:"POST",
                        success:function(data){
                            var data = data.toString();
                            var download_url = data.slice(data.indexOf(':"')+2,data.indexOf('"}')-2);
                            download_url = download_url.replace(/\\\//g,"/");
                            download_url = download_url + "#name=" + name + "&content-type=video/mp4";

                            var hover_link = $('<a class="hover_link" href="'+download_url+'" download="'+name+'.mp4"></a>');
                            self.append(hover_link);
                            hover_link.hover(function(){
                                self.trigger("mouseover");
                            },function(){
                                self.trigger("mouseout");
                            });
                            //links.attr("download",name+".mp4").attr("href",download_url);
                        }
                    });
                }

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