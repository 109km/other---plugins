(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyListPage();
            wanDouJiaExt.modifyDetailPage();
            wanDouJiaExt.removeTarget();
        },
        modifyListPage:function(){

            var type = wanDouJiaExt.request_url(window.location.href)['type'];
            //热门，最新，好评
            if( !!type ){
                type = type == 1 ? '':type;
            }else{
                type = '';
            }
            var items = $('li','#nr'+type);

            // 如果是首页
            if( window.location.href.indexOf("index") > 0 || window.location.href.indexOf("php") < 0 ){
                items.each(function(){
                    var pic_url = encodeURIComponent($(this).find('img').first().attr('src')),
                        rank = $.inArray(this,items),list_box;

                    // class name
                    rank = rank < 10 ? ("0"+rank) : rank;

                    list_box = $('.posi_' + rank);

                    // modify the corresponding list_box
                    list_box.find('.ul_list a').each(function(){
                        var self = $(this);
                        var attr_onclick,
                            evid,
                            name,
                            params,
                            text,
                            new_href;

                        attr_onclick = $(this).attr('onclick').toString();

                        params = attr_onclick.split(',');
                        // evid , used for downloading link
                        evid = params[0].slice(params[0].indexOf("'{")+1,params[0].indexOf("}'")+1);
                        // name
                        name = params[1].slice(params[1].indexOf("'")+1,params[1].length-4) ;

                        text = "k2.kumi.cn/"+evid.substr(1,2)+"/"+evid.substr(3,2)+"/"+evid+".mp4";
                        $.ajax({
                            type:"POST",
                            url:"../../api/down360.php",
                            data:"url=" + text,
                            success:function(msg){
                                new_href = 'http://' + msg  + "#name=" + encodeURIComponent(name)
                                    + "&content-type=" + encodeURIComponent('video/mp4') + "&image=" + pic_url;
                                self.removeAttr("onclick").attr("href",new_href).attr("rel","download");
                            }
                        })

                    });

                });
            }else{
                items.each(function(){
                    var pic_url = $(this).find('img').first().attr('src'),
                         old_href = $(this).find('.gk_xz2').attr("href"),
                         new_href , name , params;
                    params = wanDouJiaExt.request_url(old_href);
                    name = params['name'];

                    new_href  = old_href + "#name=" + encodeURIComponent(name) +
                        "&content-type=" + encodeURIComponent("video/mp4") +
                        "&image=" + pic_url;

                    $(this).find('.gk_xz2').attr("href",new_href).attr("rel","download");
                });
            }

        },
        modifyDetailPage:function(){
            var video = $('embed','.vid');
            video.width(760);
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