(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.autoLogin();
            wanDouJiaExt.modifyHomePage();
            wanDouJiaExt.removeTarget();
        },
        autoLogin:function(){
            if( $("#loginform").length > 0 ){
                $("body").hide();
                $("#account").val("wandoujia_qyer");
                $(".infoform_txt[type='password']").val("wandoujia163");
                $(".infoform_btn input").val("aHR0cDovL2d1aWRlLnF5ZXIuY29tLw==");
                $("#loginbtn").trigger("click");
            }

            if( location.href.indexOf("guide") < 0 && location.href.indexOf("login") < 0 && $("#loginform").length == 0){
                $("body").hide();
                setTimeout(function(){
                    location.href = "http://guide.qyer.com/";
                },3000);
            }
        },
        modifyHomePage:function(){
            var insert = function(){
                var items = $(".gui_jnlist_item");
                
                if(items.length == 0){
                    return false;
                }

                items.each(function(){
                    var self = $(this),
                        title = self.find(".gui_jnlist_item_tit a"),
                        href = title.attr("href"),
                        id = href.slice(href.indexOf("id_")+3,href.length),
                        pic_url = self.find(".gui_jnlist_item_pic img").attr("src"),
                        name = title.text(),
                        down_url = "http://guide.qyer.com/index_action_downguide_id_"+id+"_isdown_1" + "#name=" +
                            encodeURIComponent(name) +"&image=" + encodeURIComponent(pic_url) +
                            "&content-type=" + encodeURIComponent("application/pdf"),
                        down_btn;

                    self.find(".gui_jnlist_item_pic a").attr("href",down_url);
                    title.attr("href",down_url);
                    
                    if( self.find(".user_down").length == 0){
                        down_btn = '<p class="user_down"><a href="'+down_url+'" rel="download">点击下载</a></p>';
                        self.append(down_btn);
                    }
                });
            };
            setTimeout(function(){
                insert();
            },2000);
            
            $(".ui_page_item").click(function(){
                setTimeout(function(){
                    insert();
                },3000);
            });

            $(".ui_sort_item").click(function(){
                setTimeout(function(){
                    insert();
                },3000);
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
            },3000);
        }
    };
    wanDouJiaExt.init();
})(jQuery);