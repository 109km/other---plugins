(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyHomePage();
        },
        modifyHomePage:function(){
            var check = setInterval(function(){
                // single case
                if( $("#trailers-handle").find(".dropdown-list").length > 0 ){
                    // hide the 720p 1080p
                    $("#trailers-dropdown").show();
                    $("#trailers .OverlayPanel").removeAttr("href");
                    var items = $("#trailers-handle").find(".dropdown-list li .target-quicktimeplayer");

                    items.each(function(){
                        var self = $(this),
                            old_href = self.attr("href"),
                            parent = self.closest("#trailers"),
                            title = document.title.slice( 0,document.title.indexOf("-")-1),
                            pic_url = parent.find(".OverlayPanel img").attr("src"),
                            filename = old_href.slice(old_href.lastIndexOf("/")+1,old_href.length),
                            self_html = self.text(),
                            new_href;

                        new_href = old_href + "#name=" + title + "&image=" + pic_url +
                            "&content-type=video/mov" ;

                        this.onclick = '';
                        
                        self.attr("href",new_href).attr("download",filename).attr("rel","");
                        
                        if(self_html.indexOf("720")>=0 || self_html.indexOf("1080")>= 0 ){
                                self.parent().hide();
                            }

                        if(self_html.indexOf("i") >= 0){
                            var size = self_html.slice(self_html.indexOf("("),self_html.indexOf(")")+1);
                            self.text("phone" + size).addClass("bold");
                        }

                    });

                    // 展示下载列表
                    var down_list = $("#trailers-handle .dropdown-list").html(),
                        prev = $("#trailers-dropdown .first");

                    prev.html(down_list);
                    $("#trailers-handle .button").hide();
                    prev.find(".dropdown-overlay").show();
                    prev.find(".dropdown-overlay .hd span").hide();

                    var down_items = prev.find(".dropdown-overlay li"),
                        counter;
                    for(var a = 0 ; a<down_items.length; a++){
                        if($(down_items[a]).hasClass("hr")){
                            counter = a;
                        }
                    }

                    for( var i = 0 ; i<counter; i++){
                        $(down_items[i]).hide();
                    }


                    clearInterval(check);
                }

                // multiple case
                if($("#trailers-handle").find(".dropdown-list").length == 0 && $("#trailers .column .dropdown-handle").length > 0){
                    $("#trailers .column .dropdown-handle").each(function(){
                        var parent = $(this).closest(".column");
                        parent.find(".button").hide();
                        parent.find(".OverlayPanel").removeAttr("href");
                        parent.find(".OverlayPanel span").remove();
                        var items = parent.find(".dropdown-list li .target-quicktimeplayer");
                        items.each(function(){
                            var self = $(this),
                                old_href = self.attr("href"),
                                title = document.title.slice( 0,document.title.indexOf("-")-1),
                                pic_url = parent.find(".OverlayPanel img").attr("src"),
                                filename = old_href.slice(old_href.lastIndexOf("/")+1,old_href.length),
                                self_html = self.text(),
                                new_href;

                            new_href = old_href + "#name=" + title + "&image=" + pic_url +
                                "&content-type=video/mov";

                            self.attr("href",new_href).attr("download",filename);
                            this.onclick = '';
                            
                            if(self_html.indexOf("720")>=0 || self_html.indexOf("1080")>= 0 ){
                                self.parent().hide();
                            }
                            if(self_html.indexOf("i") >= 0){
                                var size = self_html.slice(self_html.indexOf("("),self_html.indexOf(")")+1);
                                self.text("phone" + size).addClass("bold");
                            }

                        });


                        // 展示下载列表
                        var down_list = parent.find(".dropdown-list").html(),
                            prev = parent.prev();

                        prev.html(down_list);

                        prev.find(".dropdown-overlay").show();
                        prev.find(".dropdown-overlay .hd span").hide();
                        var down_items = prev.find(".dropdown-overlay li"),
                            counter;
                        for(var a = 0 ; a<down_items.length; a++){
                            if($(down_items[a]).hasClass("hr")){
                                counter = a;
                            }
                        }

                        for( var i = 0 ; i<counter; i++){
                            $(down_items[i]).hide();
                        }

                    });

                    clearInterval(check);
                }
            },1500);

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