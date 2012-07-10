/**
 * content script
 * filter module of the rank page & add a download link for each book.
 * users can click on the download link and save the book as a txt file format.
 * @author mllong0925@gmail.com
 * @since 2012-03
 */
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
        addDownLoadButton: function(){
                //页面左下侧视频列表
                $('.pack_video_card').each(function(){
                    var downloadLink = $(this).children('div').eq(0).children('a').eq(0).attr('href');
                    downloadLink = downloadLink.replace(/[\ ]*/ig,'');
                    $(this).children('div').eq(1).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='javascript:void()'>\u4e0b\u8f7d</a></h6>");
                    $(this).children('div').eq(1).children('h6').eq(0).children('a').eq(0).click(function(){
                        window.externalCall('portal', '-videourl', downloadLink);
                    });
                    $(this).children('div').eq(1).children('h6').eq(1).children('a').eq(0).click(function(){
                        window.externalCall('portal', '-videourl', downloadLink);
                    });
                });
                //页面左下侧视频列表
                $('.pack_playlist_card').each(function(){
                    var downloadLink = $(this).children('div').eq(0).children('a').eq(0).attr('href');
                    downloadLink = downloadLink.replace(/[\ ]*/ig,'');
                    $(this).children('div').eq(1).append("<h6 class='info' style='text-align:center'><a class='btn-min' href='javascript:void()'>\u4e0b\u8f7d</a></h6>");
                    $(this).children('div').eq(1).children('h6').eq(1).children('a').eq(0).click(function(){
                        window.externalCall('portal', '-videourl', downloadLink);
                    });
                    $(this).children('div').eq(1).children('h6').eq(0).children('a').eq(0).click(function(){
                        window.externalCall('portal', '-videourl', downloadLink);
                    });
                });
            if(this.tabName == 'tudou-video'){
                $('#download').attr('href', 'javascript:');
                //$('#download').attr('class', 'btn-mini');
                $('#download').click(function(){
                    window.externalCall('portal', '-videourl', window.location.href);
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
