
(function($){

    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyAppDetail();
            wanDouJiaExt.modifyWallpaperList();
            wanDouJiaExt.modifyVideoPage();
            wanDouJiaExt.removeTarget();
        },
        modifyAppDetail:function(){
            var item = $(".commend .ban_left .download .down a");
            if( item.length > 0 ){
                var name = $("#appname").text(),
                    old_href = item.attr("href"),
                    pic_url = $('.commend .pic img').attr("src"),
                    new_href;
                new_href = old_href + "#name=" + name +".apk" + "&image=" + pic_url +
                    "&content-type=application/vnd.android.package-archive";

                item.html("下载到豌豆荚");
                item.attr("download",name+".apk").attr("href",new_href);
            }
        },
        modifyWallpaperList:function(){
            var items = $(".list0Body .listL .lb");
            if(items.length>0){
                items.each(function(){
                    var
                        self = $(this),
                        pic_src = self.find("img").attr("src"),
                        link = self.find(".lbConTxt a"),
                        pic_id = pic_src.slice(pic_src.lastIndexOf("/")+1,pic_src.lastIndexOf("/")+7),
                        group_id = pic_src.slice( pic_src.indexOf("mid_")+4, pic_src.indexOf("mid_")+7),
                        mid_pic = "http://img9.zol.com.cn/dp_800/"+group_id+"/"+ pic_id +".jpg",
                        big_pic = "http://img9.zol.com.cn/desk_pic/big_"+group_id+"/"+pic_id+".jpg",
                        name = link.eq(1).text(),
                        file_name =name + ".jpg",
                        down_url = big_pic + "#name=" + file_name + "&content-type=image/jpeg" +
                            "&image=" + pic_src,
                        btns = $('<div class="lbConTxt"><a class="left">预览</a><a class="right" href="'+down_url +'" rel="download">下载</a></div>');


                    // replace the small pics with mid pics
                    self.find("img").attr("src",mid_pic);
                    link.removeAttr("href");
                    //link.attr("href",mid_pic).attr("data-lightview-options","viewport:false,width:400,height:300").addClass("lightview");
                    self.append(btns);

                    self.click(function(e){
                        if(e.srcElement.className == "right"){
                            return;
                        }
                        Lightview.show({
                            url:mid_pic,
                            type:"image",
                            options:{
                                viewport:false,
                                width:400,
                                height:300,
                                effects:false
                            }
                        });
                    });

                });
            }
        },
        modifyVideoPage:function(){
            var lists = $(".numlist");
            if( lists.length > 0 ){
                lists.eq(1).hide();
                lists.eq(2).hide();

                lists.first().find("h3").html("全集下载地址：");

                $(".nrlj a").removeAttr("href");
            }

            var down_list = $(".bor");
            if(down_list.length > 0 ){
                down_list.before('<h1 class="my_tips">点击下面的链接即可下载<h1/>');
                var items = $(".liebiao li");
                if(items.length > 0){
                    items.each(function(){
                        var link = $(this).find(".file_name"),
                            file_name = link.attr("title"),
                            old_href = link.attr("href"),
                            new_href;
                        new_href = old_href + "#name=" + file_name + "&content-type=video/mp4";

                        link.attr("download",file_name);
                        link.attr("href",new_href);

                    });
                }
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
        },
        cookie:function(name, value, options) {
            if (typeof value != 'undefined') {
                options = options || {};
                if (value === null) {
                    value = '';
                    options = $.extend({}, options);
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString();
                }
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        }
    };
    wanDouJiaExt.init();
})(jQuery);