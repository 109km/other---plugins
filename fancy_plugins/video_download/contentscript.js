(function($){

    var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var uTF8Encode = function(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };

    var uTF8Decode = function(input) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < input.length ) {
            c = input.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = input.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = input.charCodeAt(i+1);
                c3 = input.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    $.extend({
        base64Encode: function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = uTF8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
            }
            return output;
        },
        base64Decode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = keyString.indexOf(input.charAt(i++));
                enc2 = keyString.indexOf(input.charAt(i++));
                enc3 = keyString.indexOf(input.charAt(i++));
                enc4 = keyString.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = uTF8Decode(output);
            return output;
        }
    });
})(jQuery);



(function($){
    var wanDouJiaExt = {
        init: function(){
            // youku home
            if( wanDouJiaExt.page_url == "http://www.youku.com/" ){
                wanDouJiaExt.modifyHomePage();
            }
            // youku detail
            if( wanDouJiaExt.page_url.indexOf("v_show")>= 0){
                wanDouJiaExt.modifyDetailPage();
            }
            // soku home
            if( wanDouJiaExt.page_url == "http://www.soku.com/" ){
                wanDouJiaExt.modifySokuHome();
            }

            if( wanDouJiaExt.page_url.indexOf("soku")>= 0){
                wanDouJiaExt.removeTag();
            }


            wanDouJiaExt.modifyGlobe();
            wanDouJiaExt.clearAds();
            wanDouJiaExt.removeTarget();


        },
        page_url : location.href,
        base_down_url:"http://videodl.sinaapp.com/?url=",
        modifyGlobe:function(){
            var head_search_form = $('#headSearchForm'),
                submit_btn = $('#headSearchForm .sokutool button');
            head_search_form.removeAttr("onsubmit");
            submit_btn.removeAttr("onclick");

            head_search_form.submit(function(e){
                e.preventDefault();
                wanDouJiaExt.jump_search("#headq");
            });
            submit_btn.click(function(e){
                e.preventDefault();
                wanDouJiaExt.jump_search("#headq");
            });
        },
        modifyHomePage:function(){
            $("body .window .collfocus .collappend .items").find(".clear").hide();
            $(".tabs li a").removeAttr("href");
            $('.caption .title a').removeAttr("href");
        },
        modifyDetailPage:function(){
            // disable ads
            var video_layer = $('<div class="video_layer"></div>'),
                btn_layer =$('<div class="video_btn_layer"></div>'),
                player = $("#player"),
                width = player.width()-40,
                height = player.height()-40;
            player.find("object").append('<param name="wmode" value="transparent">');
            video_layer.height(height).width(width);
            player.append(video_layer).append(btn_layer);

            // remove title link
            $("#vpvideotitle a").removeAttr("href");

            $("#vpofficialtitle a").length>0 && $("#vpofficialtitle a").removeAttr("href");

            // add download btn
            var down_url = wanDouJiaExt.base_down_url + $.base64Encode(wanDouJiaExt.page_url),
                name = $.trim(document.title.slice(0,document.title.indexOf("-")));

            down_url = down_url + "#name=" + name + "&content-type=video/mp4";
            var down_btn = $('<a class="download_btn" href="'+down_url+'" rel="download">下载视频</a>');

            $("h1.title").append(down_btn);

        },
        modifyPlayList:function(){

        },
        modifySokuHome:function(){
            var search_box = $('.socore form'),
                search_btn = $('.socore .sobtn');

            search_box.removeAttr("onsubmit");
            search_box.submit(function(e){
                e.preventDefault();
                wanDouJiaExt.jump_search("#headq");
            });
            search_btn.click(function(e){
                e.preventDefault();
                wanDouJiaExt.jump_search("#headq");
            });

            $(".autolist li").live("click",function(e){
                e.preventDefault();
                var val = $(this).attr("hitq");
                wanDouJiaExt.jump_search(false,val);
            });

        },
        clearAds:function(){
            setInterval(function(){
                var count=0;
                $('div','body').each(function(){
                    var self = $(this);
                    if ( self.attr('id').indexOf("ab_") >= 0 ){
                        self.css("display","none");
                        count++;
                    }
                });

                if (count == 0){
                    wanDouJiaExt.is_check_ads = false;
                }

            },1500);

        },
        jump_search : function(input,val){

            var key_word = input != false ? $(input).val() : val,
                url = "http://www.soku.com/search_video/q_" + key_word;
            location.href = url;

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
        removeTag:function(){

            $('.sooption .options li').each(function(i){
                if(i > 1)
                {
                    $(this).remove();
                }
            });
        },
        removeTarget:function(){
            setTimeout(function(){
                $('a','body').removeAttr('target');
            },1000);
        }
    };
    wanDouJiaExt.init();
})(jQuery);