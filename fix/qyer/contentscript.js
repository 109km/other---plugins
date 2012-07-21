

(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.autoLogin();
            if(location.href.indexOf("index_action")>= 0 ){
                wanDouJiaExt.modifyDetailPage();
            }

            wanDouJiaExt.removeTarget();
        },
        autoLogin:function(){

            // 从guide跳到login
            if( $("#asynclogininfo .qyer_head_login_entry").length > 0 && $("#asynclogininfo .qyer_head_login_entry a").length == 3 && location.href.indexOf("guide") >= 0 ){
                $("body").hide();
                location.href = "http://login.qyer.com/login.php";
            }

            // 执行登录
            if( $("#loginform").length > 0 ){
                $("body").hide();
                $("#account").val("wandoujia_qyer");
                $(".infoform_txt[type='password']").val("wandoujia163");
                $(".infoform_btn input").val("aHR0cDovL2d1aWRlLnF5ZXIuY29tLw==");
                $("#loginbtn").trigger("click");
            }

        },
        modifyDetailPage:function(){
            $(".jn_cover a,.jn_author_info a").removeAttr("href");

            var href = location.href,
                id = href.slice(href.indexOf("id_")+3,href.length),
                name = $(".gui_banner_title_cn").text(),
                down_url = "http://guide.qyer.com/index_action_downguide_id_"+id+"_isdown_1" + "#name=" +
                    name + "&content-type=application/pdf",
                file_name = name + ".pdf",
                down_btn ;

            var cdb_auth = wanDouJiaExt.cookie("cdb_auth").toString();

            wanDouJiaExt.cookie("cdb_auth",cdb_auth,{domain:"qyer.com"});

            console.log(document.cookie);
            down_btn = $('<p class="down_btn"><a href="'+down_url+'" download="'+file_name+'">点此下载</a></p>');

            $(".gui_banner_title").append(down_btn);
            down_btn.click(function(){
                location.href = down_url;
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