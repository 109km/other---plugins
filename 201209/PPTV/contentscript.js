
(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.mofifyDownload();
            //wanDouJiaExt.removeTarget();
        },
        mofifyDownload:function(){
            var items = $(".piclist li");
            items.each(function(){
                var self = $(this),
                    item_name = self.find(".pica"),
                    name = item_name.text(),
                    catid= item_name.attr("catid"),
                    chid = item_name.attr("chid"),
                    get_url;

                self.find("a").click(function(e){
                    e.preventDefault();
                    var _self = $(this);
                    if( catid && chid){
                        get_url = "http://app.topic.pptv.com/360app/desktop/download/api/" + catid + "/" + chid + ".html?cb=get_download_url";
                        $.ajax({
                            url:"get_url",
                            type:"POST",
                            success:function(data){
                                var download_url = data.slice(data.indexOf(':"')+2,data.indexOf('"}')-2);
                                download_url = decodeURIComponent(download_url);
                                download_url = download_url + "#name=" + name + "&content-type=video/mp4";
                                _self.attr("download",name+".mp4").attr("href",download_url);
                            }
                        });
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