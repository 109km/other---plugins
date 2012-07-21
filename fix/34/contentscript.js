/**
 * content script
 * chrome extension for www.ted.com by wandoujia
 *
 * @author mllong0925@gmail.com
 * @since 2012-05
 */
(function(){
    var wanDouJiaExt = {
        tabName: null,
	    init: function(){
            this.tabName = this.getTabName();
            if(this.tabName != null){
                var sub = this.getSubTabName();
                if(sub != null){
                    this.tabName = sub;
                }
                this.removeElement();
                this.changeLinkTarget();
                //this.addDownLoadButton();
            }
            $("#header #logo").removeAttr("href");
            $("#header .nav a").removeAttr("href");
	    },
        getTabName: function(){
            for( var pattern in this.pagePattern ){
                if( window.location.href.match(new RegExp(pattern, 'i')) ){
                    return this.pagePattern[pattern];
                }
            }
            return null;
        },
        getSubTabName: function(){
            for( var pattern in this.subPagePattern ){
                if( window.location.href.match(new RegExp(pattern, 'i')) ){
                    return this.subPagePattern[pattern];
                }
            }
            return null;
        },
        pagePattern: {
            '^(?:http|https)://www\\.ted\\.com/talks': 'ted-talks',
            '^(?:http|https)://www\\.ted\\.com/speakers': 'ted-speakers',
        },
        subPagePattern: {
            '^(?:http|https)://(?:movie|tv|zy|cartoon)\\.tudou\\.com/labeltop/.*?\\.html.*$' : 'tudou-albumtop'
        },
        removeFootElement: function(){
            $('#footer').hide();
        },
        removeHeadElement: function(){
            $('#header').css('margin-top', 5);
            $('#utilityNav').hide();
            $('#nav ul').hide();
            $('#nav .primary').show();
            $('#nav .primary li').eq(2).hide();
            $('#nav .primary li').eq(3).hide();
            $('#search').hide();
            $('#auth_nav').hide();
            $('.nav ul').hide();
            $('.nav .main').show();
            $('.nav .main li').eq(2).hide();
            $('.nav .main li').eq(3).hide();
            $('#nav ul').eq(0).show();
            $('#nav ul li').eq(2).hide();
            $('#nav ul li').eq(3).hide();
            $('.nav ul').eq(0).show();
            $('.nav ul').eq(0).children('li').eq(2).hide();
            $('.nav ul').eq(0).children('li').eq(3).hide();
        },
        removeMainElement: function(){
            if(this.tabName == 'ted-speakers'){
                $('#container').css('width', 770);
                $('div.browseTemplate #maincontent div.browser').css('float', 'left');
                $('div.browseTemplate #maincontent div.local').css('width', 100);
                $('div.browseTemplate #maincontent div.local select').css('width', 100);
                $('.themes_links').hide();
                $('div#body.viewTemplate #contextual').css('width', 200);
                $('div.viewTemplate #contextual dl.box dd').css('width', 200);
                $('div.viewTemplate #contextual dl.box dt').css('height', 'auto');
                $('div.viewTemplate #contextual dl.box dt').css('float', 'none');
                $('div.viewTemplate #contextual dl.box dt').css('padding-left', 41);
                $('div.viewTemplate #contextual dl.box .play_icon').css('left', 45);
                $('div.viewTemplate #contextual dl.box dd ul li').css('padding', 0);
                $('div.viewTemplate #contextual dl.box dd ul li h4 a').css('display', 'block');
                $('div.viewTemplate #contextual dl.categories dt').eq(0).hide();
                $('div.viewTemplate #contextual dl.categories dt').eq(1).hide();
                $('div.viewTemplate #contextual dl.categories dt').eq(3).hide();
                $('div.viewTemplate #contextual dl.categories dd').eq(0).hide();
                $('div.viewTemplate #contextual dl.categories dd').eq(1).hide();
                $('div.viewTemplate #contextual dl.categories dd').eq(3).hide();
                $('div.viewTemplate #maincontent #speakerscontent div.why>p').eq(3).hide();
                $('#quotes>p').hide();
                $('a:contains("Email to a friend")').hide();
            }else if(this.tabName == 'ted-talks'){
                $('#wrapper').css('width', 770);
                $('.lead-panel h2').css('width', 400);
                $('.lead-panel .quote-links').hide();
                $('#sidebar').css('width', 95);
                $('#sidebar').css('background', 'none');
                $('#sidebar select').css('width', 95);
                $('#container').css('background', 'none');
                $('#sidebarBottom').hide();
                $('.about iframe').hide();
                $('#maincontent').css('width', 770);
                $('#maincontent .about').css('width', 200);
                $('#conversations').hide();
                $('#conversation').hide();
                $('.contentPod').hide();
                $('.video-details').hide();
                $('#share_and_save').hide();

                $('#share_and_save div.addthis').hide();
                $('#share_and_save div.share').hide();
                $('#share_and_save div.save .email').hide();
                $('#share_and_save div.save .favorite').hide();
                $('#share_and_save div.save a.sprite').hide();
                $('#container').css('width', 770);
                $('.quote-actions .share_quote').hide();
                $('.quote-actions .trans').hide();
                $('#download_dialog p').hide();
                $('#sidebar>p').hide();
                $('.talk-tools ul li').hide();
                $('.talk-tools ul li:contains("Download")').show();
                $('.talk-tools ul li:contains("Download") span').css('font-size', 20);
                $('#downloadTalk').attr('style', 'background:linear-gradient(#fff, #eee);background:-webkit-linear-gradient(#fff, #eee);box-shadow:0 -1px 0 #fefcfc inset,0 0 8px rgba(0,0,0,0.3);-moz-shadow:0 -1px 0 #fefcfc inset,0 0 8px rgba(0,0,0,0.3); -webkit-shadow:0 -1px 0 #fefcfc inset,0 0 8px rgba(0,0,0,.3);border:1px solid #959492;padding:10px 65px 10px 25px;text-decoration:none;display:inline-block;color:#FF2B06;font-size:28px;font-weight:bold;width:auto;height:auto;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;-webkit-box-shadow:0 1px #fff;-moz-box-shadow: 0 1px #fff;text-indent:0px;box-shadow:0 -1px 0 #ccc inset,0 0 8px rgba(0, 0, 0, 0.4);');
                function checklist(){
                    $('#adSpace').hide();
                    $('div.box.talks ul li').css('height', 130);
                    $('.ui-dialog div.column').eq(0).hide();
                    $('#download_dialog h3:contains("Video")').hide();
                    $('#video_downloads .downloads dt:contains("Video downloads are available")').hide();
                    $('#video_downloads .downloads dt:contains("Save video file to")').hide();
                    $('#video_downloads .downloads dd:contains("Desktop")').hide();
                    $('#video_downloads .downloads dd:contains("iTunes")').hide();
                    $('#video_downloads .downloads dd:contains("Right-click")').hide();
                    $('#download_dialog>p').hide();
                }
                setInterval(checklist, 500);
            }
        },
        removeElement: function(){
            $('body').css('width',770);
            $('body').css('margin','0 auto');
            $('body').css('overflow-x','hidden');
            this.removeHeadElement();
            this.removeMainElement();
            this.removeFootElement();
        },
        changeLinkTarget: function(){
                //所有的链接都在tab内完成,不触发创建新窗口的操作,防止弹出其他浏览器页面,而其他浏览器的页面将会变成没有被过滤的完整页面
                $('a').each(function(){
                    $(this).attr('target', '_self');
                });
                $('form').each(function(){
                    $(this).attr('target', '_self');
                });
                $('#speakerscontent .why>p a').each(function(){
                    $(this).css('color', '#545454');
                    $(this).attr('href', 'javascript:');
                });
                function clearAd(){
                    $('.about a').each(function(){
                        var link = $(this).attr('href');
                        if(typeof link != 'undefined' && link.indexOf('doubleclick')>=0){
                            $(this).remove();
                        }
                    });
                    $('#attributionText a').each(function(){
                        $(this).css('color', '#777');
                        $(this).attr('href', 'javascript:');
                    });
                }
                setInterval(clearAd, 500);
        },
        addDownLoadButton: function(){
            //页面左下侧视频列表
            if($('#download_url').attr('setted') != 1){
                var download = $('#download_url').attr('href');
                $('#download_url').attr('href', 'javascript:');
                var title = $('title').html();
                if(title.indexOf('|') >= 0){
                    title = title.substr(0, title.indexOf('|'));
                }
                $('#download_url').click(function(){
                        var video = {};
                        video.title = title;
                        video.url = download;
                        video.format = 'mp4';
                        video.source = 'vender';
                        window.externalCall('portal', '-videourl', JSON.stringify([video]));
                });
                $('#download_url').attr('setted', 1);
            }else{
                var download = $('#download_url').attr('href');
                if(download != 'javascript:'){
                    $('#download_url').unbind('click');
                    $('#download_url').attr('href', 'javascript:');
                    var title = $('title').html();
                    if(title.indexOf('|') >= 0){
                        title = title.substr(0, title.indexOf('|'));
                    }
                    $('#download_url').click(function(){
                        var video = {};
                        video.title = title;
                        video.url = download;
                        video.format = 'mp4';
                        video.source = 'vender';
                        window.externalCall('portal', '-videourl', JSON.stringify([video]));
                    });
                }
            }
        } 
    };
    if(window.location.href=="http://www.ted.com/"){
        window.location.href="http://www.ted.com/talks";
    }
    wanDouJiaExt.init();
    function checkWD(){
        return true;
    }
    function addInterval(){
        if(checkWD()){
            clearInterval(sh);
            wanDouJiaExt.addDownLoadButton();
        }
    }
    var sh = setInterval(addInterval, 500);
    function ajaxCheck(){
        if(checkWD()){
            wanDouJiaExt.addDownLoadButton();
        }
    }
    setInterval(ajaxCheck, 300);
})();
