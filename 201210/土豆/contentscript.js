/**
 * content script
 * filter module of the rank page & add a download link for each book.
 * users can click on the download link and save the book as a txt file format.
 * @author mllong0925@gmail.com
 * @since 2012-03
 */
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
            if( location.href.indexOf("soku")>=0){
                wanDouJiaExt.modifySoku();
            }

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
            '^(?:http|https)://tv\\.tudou\\.com.*?$': 'tudou-tv',
            '^(?:http|https)://movie\\.tudou\\.com.*?$': 'tudou-movie',
            '^(?:http|https)://zy\\.tudou\\.com.*?$': 'tudou-zy',
            '^(?:http|https)://cartoon\\.tudou\\.com.*?$': 'tudou-cartoon',
            '^(?:http|https)://www\\.tudou\\.com/top/.*$': 'tudou-top',
            '^(?:http|https)://www\\.tudou\\.com/albumcover/.*?\\.html.*$' : 'tudou-album',
            '^(?:http|https)://www\\.tudou\\.com/playlist/album/id[\\d]+\\.html' : 'tudou-album',
            '^(?:http|https)://www\\.tudou\\.com/playlist/p/.*?\\.html' : 'tudou-video',
            '^(?:http|https)://tudou\\.letv\\.com/playlist/p/le/.+/play\\.html' : 'tudou-video',
            '^(?:http|https)://www\\.tudou\\.com/programs/view' : 'tudou-video',
            '^(?:http|https)://so\\.tudou\\.com/nisearch' : 'tudou-search'
        },
        subPagePattern: {
            '^(?:http|https)://(?:movie|tv|zy|cartoon)\\.tudou\\.com/albumtop' : 'tudou-albumtop',
            '^(?:http|https)://(?:movie|tv|zy|cartoon)\\.tudou\\.com/labeltop/.*?\\.html.*$' : 'tudou-albumtop'
        },
        modifySoku:function(){
            $(".page_content").prev().hide();

            $("#search_result a").each(function(){
                var self = $(this);
                self.attr("target","_self");
            });

            $(".g-mini-nav .g-link .first").next().hide();
            
        },
        removeFootElement: function(){
            if(this.tabName.indexOf('tudou') >=0){
//                if(this.tabName == 'tudou-tv'|| this.tabName == 'tudou-movie'|| this.tabName == 'tudou-zy' || this.tabName == 'tudou-cartoon'||this.tabName == 'tudou-top'||this.tabName == 'tudou-albumtop'|| this.tabName == 'tudou-albumtop-zy'){
                    $('.g-bot-main').remove();
                    $('.g-licence ul').eq(1).remove();
                    $('.g-licence ul').eq(1).remove();
                    $('.g-licence ul li').eq(1).remove();
                    $('.g-licence ul li').eq(1).remove();
                    $('.g-licence ul li').eq(1).remove();
                    $('.g-bot').css('width', 780);
                    $('.g-bot').css('min-width', 780);
                    $('.g-licence').css('width', 780);
//                }
            }
        },
        removeHeadElement: function(){
            if(this.tabName.indexOf('tudou') >=0){
                setInterval("$('.pay-panel a').each(function(){$(this).attr('target', '_blank');});", 1000);
                setInterval("$('.pay-guide a').each(function(){$(this).attr('target', '_blank');});", 1000);
                $(window).load(function(){
                    setInterval("$('#sy-panel').css('display', 'none');", 1000);
                });
                if(this.tabName == 'tudou-cartoon'|| this.tabName == 'tudou-tv'||this.tabName == 'tudou-movie'||this.tabName == 'tudou-zy'){
                    $('#hotspot').remove();
                    $('#adex_board').remove();
                    $('.promotion').remove();
                }
                if(this.tabName == 'tudou-tv'){
                    $('#dailyPanel').remove();
                    $('#secGuide').remove();
                    $('#secGroup').remove();
                }else if(this.tabName == 'tudou-movie'){
                    $('#secGroup').remove();
                }else if(this.tabName == 'tudou-zy'){
                    $('#dailyPanel').remove();
                    $('#secGroup').remove();
                }

                if(this.tabName == 'tudou-tv'|| this.tabName == 'tudou-movie'|| this.tabName == 'tudou-zy'){
                    //$('#dramaTab .h .tab li').eq(1).remove();
                    //$('#dramaTab .h .tab li').eq(1).remove();
                }
                if(this.tabName == 'tudou-tv'|| this.tabName == 'tudou-movie'|| this.tabName == 'tudou-zy' || this.tabName == 'tudou-cartoon'||this.tabName == 'tudou-top'||this.tabName == 'tudou-albumtop'){
                    $('.g-top .g-bar').remove();
                    $('.g-top .ie-pinsite').remove();
                    $('.g-nav-main .g-nav-master #g-nav-first').remove();
                    $('.g-nav .g-nav-sub').remove();
                    $('.g_subnav').remove();
                    $('.g-upload').css('display', 'none');                    
                    $('.fr .s .b .h .ap').remove();

                    //页面样式重排
                    $('#gTop').css("margin-bottom","5px");
                    $('.g-top').css('width', 780);
                    $('.g-top').css('margin-left', 'auto');
                    $('.g-top').css('margin-right', 'auto');
                    $('.g-top').css('min-width', 780);
                    $('.g-main').css('width', 780);
                    $('.g-extra').css('width', 80);
                    $('.g-extra').css('padding-left', 0);
                    $('.g-nav').css('width', 780);
                    $('.fr').css('width', 780);
                    $('.fr .s').css('width', 125);
                    $('.fr .s .b .h').css('width', 'auto');
                    $('.fr .s .cate .h').css('width', 'auto');
                    $('.fr .s').css('float', 'left');
                    $('.fr .s .cate .c').css('width', 88);
                    $('.fr .s .cate').css('width', 125);
                    $('.fr .s .b').css('margin-left', 5);
                    $('.fr .s .b').css('width', 125);
                    $('.fr .s .b').css('display', 'none');
                    $('.fr .s .cate').css('display', 'block');
                    $('.fr .catelist').css('height', 'auto');
                    $('.fr .catelist').css('width', 'auto');
                    $('.s .cate dl').css('width', 'auto');
                    $('.s .cate dl').css('max-height', 100000);
                }
            }
        },
        removeMainElement: function(){
            if(this.tabName.indexOf('tudou') >=0){
                $('.pack .ext').css('display','none');
                if(this.tabName == 'tudou-cartoon'){
                    $('.s .seed').remove();
                    $('.s .update').remove();
                    $('.s .gallery').remove();
                    $('.s .ad_banner').remove();
                    $('.s .playlist').remove();
                    $('.s .rebang').remove();
                    //$('#secContact').remove();
                    $('#sec6').remove();
                    $('#rankList1').remove();
                    $('#rankList2').remove();
                    $('.rank_dj').remove();
                    $('.catelist').children('dl').eq(1).remove();
                    $('.catelist').children('dl').eq(1).remove();
                    $('.ap').remove();
                    $('#secCooperation').remove();
                }else if(this.tabName == 'tudou-albumtop'){
                    $('#adex_top_banner').remove();
                    $('.side_col').children('div').eq(1).remove();
                    $('.side_col').css('width', 80);
                    $('.nav_ch .sort').css('width', 'auto');
                    $('.main_col').css('width', 700);
                    $('.main_col').css('padding', 0);
                    $('.main_col').css('float', 'left');
                    $('.showcase').css('width', 'auto');
                    $('.showcase .row').css('width', 'auto');
                    $('.pack_album').css('width', 117);
                    $('.pack_video_card').css('width',117);
                    $('.page-content').css('width', 780);
                    $('.nav_ch .sort').css('padding-left', 3);
                    $('.nav_ch .sort li').css('width', 'auto');
                    $('.nav_ch .sort li').css('margin-right', 5);
                }else if(this.tabName == 'tudou-top'){
                    $('.tab_2_filter_select_3 ol').css('top', 0);
                    $('.tab_2 .tab_2_filter_select_2 ol').css('top', 0);
                    $('.tab_2 .tab_2_filter_select_4 ol').css('top', 0);
                    $('#mainCol').css('width', 670);
                    $('#adex_top_banner').remove();
                    $('.page_content').css('width', 780);
                    $('.page_content').css('background', 'none');
                    $('.frame_2cols').css('padding',0);
                    $('.frame_2cols').css('width','auto');
                    $('.main_col').css('width',670);
                    $('.main_col').css('float','left');
                    $('.showcase .item').css('width',130);
                    $('.page_content').css('padding', 0);
                    $('.pack_video_card .caption').css('max-height', 18);

                }else if(this.tabName == 'tudou-tv'){
                    $('.s .seed').remove();
                    $('.s .ad_banner').remove();
                    $('.s .drama').remove();
                    //$('.s').children('div').eq(1).remove();
                    $('#secRise').remove();
                    $('.s .special').remove();
                    $('#secTopcn').remove();
                    $('#secTophk').remove();
                    $('#secTophk1').remove();
                    $('#secTophk2').remove();
                    $('.ap').remove();
                    $('.catelist').children('dl').eq(2).remove();
                }else if(this.tabName == 'tudou-zy'){
                    $('.s .seed').remove();
                    $('.s .ad_banner').remove();
                    $('.s .top10').remove();
                    $('.s .classic').remove();
                    $('#secHot').remove();
                    $('#secTopcn').remove();
                    $('#secTopeu').remove();
                    $('#secTd').remove();
                    $('.top10b').remove();
                    $('.top_user').remove();
                    $('.tvs').remove();
                    $('.ap').remove();
                }else if(this.tabName == 'tudou-movie'){
                    $('.s .seed').remove();
                    $('.s .ad_banner').remove();
                    $('.s .special').remove();
                    $('.s .topic').remove();
                    $('.s .top10').remove();
                    $('.s .classic').remove();
                    $('.s .hotinfo').remove();
                    $('#secTophk1').remove();
                    $('#secTophk2').remove();
                    $('#secStar').remove();
                    $('.ap').remove();
                    $('.catelist').children('dl').eq(3).remove();
                }else if(this.tabName == 'tudou-album'){
                    $('.g-mini-user').remove();
                    $('.g-link .g-link-more').remove();
                    $('.g-link').children('li').eq(0).remove();
                    $('.g-link').children('li').eq(0).attr('class', 'first');
                    $('.g-link').append("<li><a href='http://cartoon.tudou.com' target='_self'>\u52a8\u6f2b</a></li><li><a href='http://www.tudou.com/top'>\u6392\u884c</a></li>");
                    $('.pay-info').remove();
                    $('.rank_list').remove();
                    $('.recommend').remove();
                    $('.cover_banner').remove();
                    $('.g-sitemap').remove();
                    $('.album-repaste').remove();
                    $('.post').remove();
                    $('#secCast').remove();
                    $('.catelist').children('dl').eq(2).remove();
                    $('.album-action').remove();
                    //页面样式重排
                    $('.album-txt-list a').css('color', 'gray');
                    $('.fr').css('width', 780);
                    $('.fr .s').css('width', 125);
                    $('.fr .s .b .h').css('width', 'auto');
                    $('.fr .s .cate .h').css('width', 'auto');
                    $('.fr .s').css('float', 'left');
                    $('.fr .s .cate .c').css('width', 88);
                    $('.fr .s .cate').css('width', 125);
                    $('.fr .s .b').css('margin-left', 5);
                    $('.fr .s .b').css('width', 125);
                    $('.fr .catelist').css('height', 'auto');
                    $('.fr .catelist').css('width', 'auto');
                    $('.s .cate dl').css('width', 'auto');
                    $('.s .cate dl').css('max-height', 100000);
                    $('.fr .s .b .h .ap').remove();
                    $('.cast a').each(function(){
                        $(this).attr('href', 'javascript:void();');
                    });

                    //页面重排
                    $('.g-mini').css('min-width', 0);
                    $('.g-mini').css('width', 'auto');
                    $('.s .b').css('width',120);
                    $('.cast .sc3').css('width', 100);
                    $(window).load(function(){
                        $('#tbtk').remove();
                    });
                }else if(this.tabName == 'tudou-search'){
                    $('.g-mini-user').remove();
                    $('.g-link .g-link-more').remove();
                    $('.g-link').children('li').eq(0).remove();
                    $('.g-link').children('li').eq(0).attr('class', 'first');
                    $('.g-link').append("<li><a href='http://cartoon.tudou.com' target='_self'>\u52a8\u6f2b</a></li><li><a href='http://www.tudou.com/top'>\u6392\u884c</a></li>");
                    $('.ad_banner').remove();
                    $('#sideCol').remove();
                    $('#adFromBAIDU').remove();
                    $('#searchTab').children('li').eq(1).remove();
                    $('.inner_promo').remove();

                    //页面样式重排
                    $('.pack .caption a').css('display', 'block');
                    $('.pack .caption a').css('height', 18);
                    $('.pack .caption a').css('overflow', 'hidden');
                    $('.page_content').css('width', 780);
                    $('.frame_2cols .main_col').css('margin', '0 auto');
                    $('.frame_2cols .main_col').css('float', 'none');
                    $('.g-mini').css('min-width', 0);
                    $('.g-mini').css('width', 'auto');
                    $('.s .b').css('width',120);
                    $('.cast .sc3').css('width', 100);
                }else if(this.tabName == 'tudou-video'){
                    $('.g-mini-user').remove();
                    $('.g-link .g-link-more').remove();
                    $('.g-link').children('li').eq(0).remove();
                    $('.share_collapsed').remove();
                    $('#owner_info').remove();
                    $('#more_videos').remove();
                    $('.container').remove();
                    $('.share_box').remove();
                    $('.conwrap').remove();
                    $(window).load(function(){
                        $('.container').remove();
                        $('.conwrap').remove();
                        $('.pay-panel a').attr('target', '_blank');
                    });
                    function checkFlash(){
                        try{
                            var href = $('#noticeWithoutFlash .abutton').attr('href');
                            var check = $('#noticeWithoutFlash').attr('setted');
                            if(typeof href != 'undefined' && typeof check == 'undefined'){
                                $('#noticeWithoutFlash p a').each(function(){
                                    $(this).attr('href', 'javascript:');
                                });
                                $('#noticeWithoutFlash .abutton').each(function(){
                                    $(this).attr('href', 'javascript:');
                                });
                                $('#noticeWithoutFlash .abutton').each(function(){
                                    $(this).click(function(){
                                        window.externalCall("common", "_open_internet_link_", "http://dl.wandoujia.com/files/flash/flashplayer.exe");
                                    });
                                });
                                $('#noticeWithoutFlash').attr('setted', 1);
                            }
                        }catch(e){};
                    }
                    setInterval(checkFlash, 500);
                    $('.widescreen .dig_wrap').css('left', 340);
                    $('.widescreen .bury_wrap').css('left', 420);
                    $('.widescreen .otl .fqa').css('right', -300);
                    $('.widescreen .otl .report').css('right', -330);
                    $('.g-link').children('li').eq(0).attr('class', 'first');
                    $('.g-link').append("<li><a href='http://cartoon.tudou.com' target='_self'>\u52a8\u6f2b</a></li><li><a href='http://www.tudou.com/top'>\u6392\u884c</a></li>");
                    $('.videowrap').css('min-width', 780);
                    $('.videowrap .auto, .conwrap .auto').css('width', 780);
                    $('#promotion').css('display', 'block');
                    $('.g-mini-play').css('min-width', 780);
                    $('.vcate-play').css('width', 780);
                    $('.col3_t1').css('width', 780);
                    $('#playerObject').css('width', 780);
                    $('.player').css('width', 780);
                    $('#relatives').css('width', 'auto');
                    $('.container').children('div').eq(2).remove();
                    $('.container .main').css('margin-left', 10);
                    $('.g-bot-play').css('width', 780);
                    $('.g-licence').css('width', 780);
                    $('.g-bot').css('width', 780);
                    $('.g-bot-play').css('min-width', 780);
                    $('.g-bot').css('min-width', 780);
                    $('.rel_list').css('width', 695);
                    $('.scroll_tracker').css('width', 695);
                    $('.player_extra').css('width', 780);
                }
            }
        },
        removeElement: function(){
            $('body').css('width',780);
            $('body').css('margin','0 auto');
            $('body').css('overflow-x','hidden');
            if(this.tabName.indexOf('tudou') >= 0){
                this.removeHeadElement();
                this.removeMainElement();
                this.removeFootElement();
            }
        },
        changeLinkTarget: function(){
            if(this.tabName.indexOf('tudou') >= 0){
                //所有的链接都在tab内完成,不触发创建新窗口的操作,防止弹出其他浏览器页面,而其他浏览器的页面将会变成没有被过滤的完整页面
                $('a').each(function(){
                    $(this).attr('target', '_self');
                    if(wanDouJiaExt.tabName != 'tudou-search'){
                        var href = $(this).attr('href');
                        if(href.indexOf('zone.tudou.com')>=0){
                            $(this).attr('href', 'javascript:void();');
                            if(wanDouJiaExt.tabName == 'tudou-zy'){
                                $(this).remove();
                            }
                        }else if(href.indexOf('www.tudou.com/albumtop/person')>=0){
                            $(this).attr('href', 'javascript:void();');
                        }else if(href == 'http://www.tudou.com'){
                            $(this).attr('href', 'http://tv.tudou.com');
                        }else if(href.indexOf('www.tudou.com/home')>=0){
                            $(this).attr('href', 'javascript:void();');
                        }else if(href.indexOf('www.tudou.com/community')>=0){
                            $(this).attr('href', 'javascript:void();');
                        }else if(href.indexOf('www.tudou.com/my/dj')>=0){
                            $(this).attr('href', 'javascript:void();');
                        }
                    }else{
                        $('.logo a').attr('href', 'http://tv.tudou.com');
                        var href = $(this).attr('href');
                        if(href == 'http://www.tudou.com/community/doudizu.html'){
                            $(this).attr('href', 'javascript:void();');
                        }else if(href == 'http://www.tudou.com/my/dj/'){
                            $(this).attr('href', 'javascript:void();');
                        }
                    }
                });
                $('form').each(function(){
                    $(this).attr('target', '_self');
                });
                if(this.tabName == 'tudou-video'){
                    $('#fqa').attr('href', 'javascript:void();');
                    $('#album_info a').each(function(){
                        $(this).attr('href', 'javascript:void();');
                    });
                    $('.vcate-play li a').each(function(){
                        $(this).attr('href', 'javascript:void();');
                    });
                }else if(this.tabName == 'tudou-album'){
                    $('.album-txt-list a').each(function(){
                        $(this).attr('href', 'javascript:void();');
                    });
                }else if(this.tabName == 'tudou-search'){
                    $('.info a').attr('href', 'javascript:void();');
                }
            }           
        },
        count_icode : function(link,default_icode){
            return link.match(/\/(albumplay|oplay)\/[\w-]+\/([\w-]+)/) != null ? link.match(/\/(albumplay|oplay)\/[\w-]+\/([\w-]+)/)[2] : default_icode
        },
        addDownLoadButton: function(){
            //页面左下侧视频列表
            $('.pack_video_card').each(function(){
                var downloadLink = $(this).find('.txt a').eq(0).attr('href'),
                    self = $(this),
                    name = self.find(".caption a").attr("title"),
                    down_url,
                    listData,
                    icode;
                $.ajax({
                    url:downloadLink,
                    success:function(data){
                        if( data.indexOf("listData") < 0 ){
                            // list 中每个视频的iid
                            var iid = $.trim(data.slice(data.indexOf("iid: ") + 5 , data.indexOf("," ,data.indexOf("iid: ")) ));
                            $.ajax({
                                url:"http://m.tudou.com/view.do?code="+iid,
                                success:function(m_html){
                                    var encode_url_1 = m_html.indexOf("encodeurl="),
                                        encode_url_2,encode_url_3,encode_url_4;
                                    
                                    if( encode_url_1 >= 0){
                                        encode_url_2 = m_html.indexOf("encodeurl=",encode_url_1);
                                        encode_url_3 = m_html.indexOf("encodeurl=",encode_url_2);
                                        encode_url_4 = m_html.indexOf("encodeurl=",encode_url_3);
                                    }

                                    var encode_url = m_html.slice(encode_url_4+10,m_html.indexOf('"',encode_url_4));
                                    down_url = $.base64Decode(encode_url) + "#name=" + name + "&content-type=video/mp4";
                                    if( down_url != null && down_url != undefined && encode_url_1 > 0){
                                        self.find('div.txt').eq(0).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='"+down_url+"' download=''>下载</a></h6>");
                                    }else if ( self.find('div.txt').eq(0).find(".btn-min").length == 0 ){
                                        self.find('div.txt').eq(0).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='javascript:void()'>暂不提供下载</a></h6>");
                                    }

                                }
                            });
                        }else{
                            var default_icode = data.slice(data.indexOf("|| '")+4,data.indexOf("'",data.indexOf("|| '")+4));
                            listData = data.slice( data.indexOf("listData") , data.indexOf("})",data.indexOf("listData"))+1);
                            icode = wanDouJiaExt.count_icode(downloadLink,default_icode);
                            listData = listData.split("}");
                            for(var i in listData){
                                // 如果icode在此项中
                                if( listData[i].indexOf(icode) >= 0 ){
                                    // list 中每个视频的iid
                                    var iid = listData[i].slice(listData[i].indexOf('iid')+4,listData[i].indexOf(",",listData[i].indexOf('iid')+3));
                                    document.domain = "tudou.com";
                                    $.ajax({
                                        url:"http://m.tudou.com/view.do?code="+iid,
                                        success:function(m_html){
                                            var encode_url_1 = m_html.indexOf("encodeurl="),
                                                encode_url_2 = m_html.indexOf("encodeurl=",encode_url_1),
                                                encode_url_3 = m_html.indexOf("encodeurl=",encode_url_2),
                                                encode_url_4 = m_html.indexOf("encodeurl=",encode_url_3);
                                            var encode_url = m_html.slice(encode_url_4+10,m_html.indexOf('"',encode_url_4));
                                            down_url = $.base64Decode(encode_url) + "#name=" + name + "&content-type=video/mp4";
                                            if( down_url != null && down_url != undefined && encode_url_1 > 0){
                                                self.find('div.txt').eq(0).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='"+down_url+"' download=''>下载</a></h6>");
                                            }else if ( self.find('div.txt').eq(0).find(".btn-min").length == 0 ){
                                                self.find('div.txt').eq(0).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='javascript:void()'>暂不提供下载</a></h6>");
                                            }

                                        }
                                    });

                                }
                            }
                        }
                    },
                    error:function(){
                        self.find('div.txt').eq(0).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='javascript:void()'>暂不提供下载</a></h6>");
                    }
                });

            });

            if($("#player").length > 0){
                var downloadLink = location.href,
                    listData,
                    down_url,
                    icode;

                $.ajax({
                    url:downloadLink,
                    success:function(data){

                        if( data.indexOf("listData") < 0 ){
                            // list 中每个视频的iid
                            var iid = $.trim(data.slice(data.indexOf("iid: ") + 5 , data.indexOf("," ,data.indexOf("iid: ")) ));
                            $.ajax({
                                url:"http://m.tudou.com/view.do?code="+iid,
                                success:function(m_html){
                                    var encode_url_1 = m_html.indexOf("encodeurl="),
                                        encode_url_2 = m_html.indexOf("encodeurl=",encode_url_1),
                                        encode_url_3 = m_html.indexOf("encodeurl=",encode_url_2),
                                        encode_url_4 = m_html.indexOf("encodeurl=",encode_url_3);
                                    var name = $("#vcate_title").html();
                                    var encode_url = m_html.slice(encode_url_4+10,m_html.indexOf('"',encode_url_4));
                                    down_url = $.base64Decode(encode_url) + "#name=" + name + "&content-type=video/mp4";

                                    if( down_url != null && down_url != undefined && encode_url_1 > 0){
                                        var down_btn = $('<a href="'+down_url+'" download="'+name+'.mp4" id="wandou_down">下载此视频</a>');
                                        $("#player").after(down_btn);
                                        //$('#download').attr('href', down_url).attr("download",name+".mp4");
                                    }else if ( $('#wandou_down').length == 0){
                                        var down_btn = $('<a href="javascript:;" id="wandou_down">暂不提供下载</a>');
                                        $("#player").after(down_btn);
                                    }

                                }
                            });
                        }else{
                            var default_icode = data.slice(data.indexOf("|| '")+4,data.indexOf("'",data.indexOf("|| '")+4));
                            listData = data.slice( data.indexOf("listData") , data.indexOf("})",data.indexOf("listData"))+1);
                            icode = wanDouJiaExt.count_icode(downloadLink,default_icode);
                            listData = listData.split("}");
                            for(var i in listData){
                                // 如果icode在此项中
                                if( listData[i].indexOf(icode) >= 0 ){
                                    // list 中每个视频的iid
                                    var iid = listData[i].slice(listData[i].indexOf('iid')+4,listData[i].indexOf(",",listData[i].indexOf('iid')+3));
                                    document.domain = "tudou.com";
                                    $.ajax({
                                        url:"http://m.tudou.com/view.do?code="+iid,
                                        success:function(m_html){
                                            var encode_url_1 = m_html.indexOf("encodeurl="),
                                                encode_url_2 = m_html.indexOf("encodeurl=",encode_url_1),
                                                encode_url_3 = m_html.indexOf("encodeurl=",encode_url_2),
                                                encode_url_4 = m_html.indexOf("encodeurl=",encode_url_3);
                                            var name = $("#vcate_title").html();
                                            var encode_url = m_html.slice(encode_url_4+10,m_html.indexOf('"',encode_url_4));
                                            down_url = $.base64Decode(encode_url) + "#name=" + name + "&content-type=video/mp4";
                                            if( down_url != null && down_url != undefined && encode_url_1 > 0){
                                                var down_btn = $('<a href="'+down_url+'" download="'+name+'.mp4" id="wandou_down">下载此视频</a>');
                                                $("#player").after(down_btn);
                                                //$('#download').attr('href', down_url).attr("download",name+".mp4");
                                            }else if ( $('#wandou_down').length == 0){
                                                var down_btn = $('<a href="javascript:;" id="wandou_down">暂不提供下载</a>');
                                                $("#player").after(down_btn);
                                            }

                                        }
                                    });

                                }
                            }
                        }
                        

                    }
                });
            }
        }
    };
    if(window.location.href=="http://www.tudou.com/"){
        window.location.href="http://tv.tudou.com/";
    }
    wanDouJiaExt.init();
    function checkWD(){
        if(typeof top.wd_video_analyze_download == 'undefined'){
            return false;
        }else{
            return true;
        }
    }
    function addInterval(){
      clearInterval(sh);
      wanDouJiaExt.addDownLoadButton();
    }
    var sh = setInterval(addInterval, 500);
})(jQuery);
