(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            wanDouJiaExt.modifyAppDetail();
            wanDouJiaExt.modifyWallpaperList();
            wanDouJiaExt.modifyVideoPage();
            wanDouJiaExt.removeTarget();
        },
        modifyAppDetail:function(){
            var item = $(".commend .ban_left .download .down a");
            if( item.length > 0 ){
                item.html("下载到豌豆荚");
            }
        },
        modifyWallpaperList:function(){
            // add download btns
            var items = $(".list0Body .listL .lb");

            if(items.length>0){
                items.each(function(){
                    var
                        self = $(this),
                        pic_src = self.find("img").attr("src"),
                        pic_link = self.find(".lbConTxt").first(),
                        link = self.find(".lbConTxt a"),
                        pic_id = pic_src.slice(pic_src.lastIndexOf("/")+1,pic_src.lastIndexOf("/")+7),
                        group_id = pic_src.slice( pic_src.indexOf("mid_")+4, pic_src.indexOf("mid_")+7),
                        mid_pic = "http://img9.zol.com.cn/dp_800/"+group_id+"/"+ pic_id +".jpg",
                        big_pic = "http://img9.zol.com.cn/desk_pic/big_"+group_id+"/"+pic_id+".jpg",
                        file_name =link.eq(1).text() + ".jpg",
                        down_url = big_pic + "#name=" + file_name + "&image=" + pic_src + "&content-type=image/jpeg",
                        btns = $('<div class="lbConTxt"><a class="left">预览</a><a class="right" href="'+down_url+'" download="'+file_name+'">下载</a></div>');

                    // replace the small pics with mid pics
                    self.find("img").attr("src",mid_pic);
                    link.removeAttr("href");
                    //link.attr("href",mid_pic).attr("data-lightview-options","width:640,height:480").addClass("lightview");
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
                                width:640,
                                height:480,
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
                        new_href = old_href + "#name=" + file_name + "&content-type=video/rmvb";

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
        }
    };
    wanDouJiaExt.init();
})(jQuery);