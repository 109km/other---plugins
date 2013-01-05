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
                this.addDownLoadButton();
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
            '^(?:http|https)://tv\\.youku\\.com': 'youku-tv',
            '^(?:http|https)://movie\\.youku\\.com': 'youku-movie',
            '^(?:http|https)://zy\\.youku\\.com': 'youku-zy',
            '^(?:http|https)://comic\\.youku\\.com': 'youku-comic',
            '^(?:http|https)://v\\.youku\\.com/v_show/id_': 'youku-video',
            '^(?:http|https)://v\\.youku\\.com/v_playlist/': 'youku-video',
            '^(?:http|https)://www\\.youku\\.com/show_page/id_': 'youku-album',
            '^(?:http|https)://www\\.soku\\.com': 'soku'
        },
        subPagePattern: {
            '^(?:http|https)://.*?\\.youku.com/search': 'youku-search',
        },
        removeFootElement: function(){
            if(this.tabName.indexOf('youku') >=0){
                $('.s_footer .footerBox form').hide();
                $('.s_footer .links').hide();
                $('.s_footer .service .license').hide();
                $('.s_footer .service .clear').hide();
                $('.s_footer .service .copyright ul').children('li').eq(0).hide();
                $('.s_footer .service').css('padding', 0);
                $('.s_footer .service').css('height', 'auto');
            }else if(this.tabName.indexOf('soku') >=0){
                $('.footer .footerbox').hide();
                $('.footer .copyright a').hide();
                $('.footer .copyright').css('padding', '0 20px');
                $('.footer .copyright').css('text-align', 'left');
            }
        },
        removeHeadElement: function(){
            if(this.tabName.indexOf('youku')>=0){
                if(this.tabName == 'youku-video' || this.tabName == 'youku-album'){
                    $('.s_miniHeader .so .sorank').hide();
                    $('.s_miniHeader .prinav').children('li').eq(3).hide();
                    $('.s_miniHeader .subnav').hide();
                    $('.s_miniHeader .ucenter').hide();
                }else{
                    $('.s_header .headerbox .module ul').children('li').eq(0).hide();
                    $('.s_header .headerbox .module ul').children('li').eq(4).hide();
                    $('.s_header .headerbox .module ul').children('li').eq(6).hide();
                    $('.s_header .headerbox .sub').hide();
                    $('.headerbox .headcon .ucenter').hide();
                    $('.sNav').hide();
                    $('.s_header, .s_miniHeader, .s_footer, .s_miniFooter, .s_body').css('min-width', 0);
                    $('.s_header, .s_miniHeader, .s_footer, .s_miniFooter, .s_body').css('max-width', 760);
                    $('.soextend').hide();
                    $('.s_header .conbox').css('height', 60);
                }
                $('#headSearchForm').unbind('submit');
                $('#headSearchForm').attr('onsubmit', "");
                $('#headSearchForm .sokutool button').hide();
                $('#headSearchForm .sokutool').append('<button type="submit"><em>搜索</em></button>');
            }else if(this.tabName.indexOf('soku')>=0){
                $('.foryouku .header .sooption').remove();
                $('.foryouku .header .sotool .sotxt').css('padding-left', 5);
                $('.header .subnav').hide();
                $('.typechk').hide();
                $('.header .sotool .soswitch').hide();
            }
        },
        removeMainElement: function(){
            if(this.tabName.indexOf('youku')>=0){
                if(this.tabName == 'youku-tv'){
                    $('.s_body .topRow').hide();
                    $('.mainCol').children('div').eq(0).hide();
                    $('.mainCol').children('span').eq(0).hide();
                    $('.mainCol').children('span').eq(1).hide();
                    $('.mainCol').children('div').hide();
                    $('.mainCol [class*=mBox]').show();
                    $('.mainCol .extend').hide();
                    $('.mBox .body').css('border-right', '1px solid #E5E5E5');
                    $('.mBox .body').css('border-bottom', '1px solid #E5E5E5');
                    $('.sPOP').hide();
                    $('.sPOP').remove();
                    function cleanAd2(){
                        $('.mod').remove();
                        $('[id^=ab]').remove();
                        $('#right_manguo').remove();
                        $('#ad_scroll').remove();
                        $('.sideCol [id^=m]').eq(1).remove();
                        if( window.location.href == "http://tv.youku.com/us"){
                            $('.sideCol').hide();
                        }
                        wanDouJiaExt.changeLinkTarget();
                    }
                    setInterval(cleanAd2,500);
                    $('.mod').remove();
                    $('[id^=ab]').remove();
                    $('#right_manguo').remove();
                    $('#ad_scroll').remove();
                    $('.sideCol [id^=m]').eq(1).remove();
                    $('.sideCol>div.mBox').hide();
                    $('.sideCol').css('float', 'left');
                    $('.sideCol').css('margin-left',5);
                    $('.sideCol').css('width', 110);
                    $('.showCatalog_S').css('width',90);
                    $('.showCatalog_S .catalogs').css('width', 90);
                    $('.showCatalog_S .catalog li').css('width', 'auto');
                    $('.goldenshow').css('width', 'auto');
                    $('.goldenshow .showbox').css('height', 'auto');
                }else if (this.tabName == 'youku-movie'){
                    $('.s_body .topRow').hide();
                    $('.mainCol .extend').hide();
                    $('.sideCol .extend').hide();
                    $('.overChangeBox').hide();
                    $('.sPOP').hide();
                    $('.sPOP').remove();
                    function cleanAd(){
                        $('.mod').hide();
                        $('[id^=ab]').hide();
                        $('#right_manguo').hide();
                        $('#ad_scroll').hide();
                        $('.sideCol [id^=m]').eq(1).hide();
                    }
                    $('.sideCol .mBox').hide();
                    $('.sideCol .mBox').eq(0).show();
                    $('.mainCol').children('div').eq(0).hide();
                    $('.mainCol').children('div').eq(1).hide();
                    $('.mainCol').children('div').eq(4).hide();
                    setInterval(cleanAd,500);
                    $('.topicrecommend').hide();
                    $('.mBox .body').css('border-right', '1px solid #E5E5E5');
                    $('.mBox .body').css('border-bottom', '1px solid #E5E5E5');
                    $('.sideCol').css('float', 'left');
                    $('.sideCol').css('margin-left',5);
                    $('.sideCol').css('width', 110);
                    $('.showCatalog_S').css('width',90);
                    $('.showCatalog_S .catalogs').css('width', 90);
                    $('.showCatalog_S .catalog li').css('width', 'auto');
                    $('.goldenshow').css('width', 'auto');
                    $('.showCatalog_S .catalogs .showpaid').hide();
                    $('.right .mBox .head, .sideCol .mBox .head').css('position', 'relative');
                    $('.right .mBox .head, .sideCol .mBox .head').css('z-index', 999999999);
                    $('.jser_star').hide();
                }else if(this.tabName == 'youku-zy'){
                    $('.s_body .topRow').hide();
                    $('.mainCol .extend').hide();
                    $('.sideCol .extend').hide();
                    $('.sPOP').hide();
                    $('.sPOP').remove();
                    $('.best_box').hide();
                    function cleanAd(){
                        $('.mod').hide();
                        $('[id^=ab]').hide();
                        $('#right_manguo').hide();
                        $('#ad_scroll').hide();
                        $('.sideCol [id^=m]').eq(1).hide();
                    }
                    $('.sideCol .mBox').hide();
                    $('.sideCol .mBox').eq(0).show();
                    $('.mainCol').children('div').eq(3).hide();
                    setInterval(cleanAd,500);
                    $('.mBox .body').css('border-right', '1px solid #E5E5E5');
                    $('.mBox .body').css('border-bottom', '1px solid #E5E5E5');
                    $('.sideCol').css('float', 'left');
                    $('.sideCol').css('margin-left',5);
                    $('.sideCol').css('width', 110);
                    $('.showCatalog_S').css('width',90);
                    $('.showCatalog_S .catalogs').css('width', 90);
                    $('.showCatalog_S .catalog li').css('width', 'auto');
                    $('.goldenshow').css('width', 'auto');
                    $('.showCatalog_S .catalogs .showpaid').hide();
                    $('.mainCol').children('div').eq($('.mainCol').children('div').length-1).hide();
                    $('.goldenshow .item').css('height', 'auto');
                    $('.goldenshow .items').css('height', 'auto');

                }else if(this.tabName == 'youku-comic'){
                    $('.s_body .topRow').hide();
                    $('.mainCol .extend').hide();
                    $('.sideCol .extend').hide();
                    $('.sPOP').hide();
                    $('.sPOP').remove();
                    function cleanAd(){
                        $('.mod').hide();
                        $('[id^=ab]').hide();
                        $('#right_manguo').hide();
                        $('#ad_scroll').hide();
                        $('.sideCol [id^=m]').eq(1).hide();
                    }
                    $('.sideCol .mBox').hide();
                    $('.sideCol .mBox').eq(0).show();
                    setInterval(cleanAd,500);
                    $('.mBox .body').css('border-right', '1px solid #E5E5E5');
                    $('.mBox .body').css('border-bottom', '1px solid #E5E5E5');
                    $('.sideCol').css('float', 'left');
                    $('.sideCol').css('margin-left',5);
                    $('.sideCol').css('width', 110);
                    $('.showCatalog_S').css('width',90);
                    $('.showCatalog_S .catalogs').css('width', 90);
                    $('.showCatalog_S .catalog li').css('width', 'auto');
                }else if(this.tabName == 'youku-search'){
                    function check_width(){
                        $('.s_header, .s_miniHeader, .s_footer, .s_miniFooter, .s_body').css('min-width',0);
                        $('.s_header, .s_miniHeader, .s_footer, .s_miniFooter, .s_body').css('max-width',760);
                        $('.s_main').css('width', 'auto');
                        $('.collgrid6t .items').css('width', 'auto');
                        $('.collgrid6t .items .clear').remove();
                        $('.collgrid6t .items ul').css('height', 180);
                        $('.sPOP').remove();
                        wanDouJiaExt.addDownLoadButton();
                    }
                    setInterval(check_width, 500);
                    $('.p .p_actor').css('height', 22);
                    $('.p .p_actor').css('overflow', 'hidden');
                    $('.sPOP').remove();
                }else if(this.tabName == 'youku-video'){
                    function cleanVideo(){
                        $('.pdright').hide();
                        $('.viewContent').css('width', 'auto');
                        $('.pack_number').css('width', 'auto');
                        $('[id^=ab]').hide();
                        $('#ad_scroll').hide();
                    }
                    setInterval(cleanVideo, 500);
                    $('#fn_share').hide();
                    $('#fn_favo').hide();
                    $('.commentArea').hide();
                    $('#vphotofficial').hide();
                    $('.infoArea').hide();
                    $('#vprelationfolder_wrap').hide();
                    $('#vprelationvideo_wrap').hide();
                    $('#vphotvideo').hide();
                    $('#vprelationofficial').hide();
                    $('.playArea').css('width', 730);
                    $('#vpofficialinfo_wrap').hide();
                    $('.right>div.nBox').hide();
                    $('#vpofficialranking').hide();
                    $('#vpcommendvideos').hide();
                    $('.s_main').css('width', 730);
                    $('.left').css('float', 'right');
                    $('.left').css('width', 730);
                    $('.right').css('width', 730);
                    $('.listArea .viewContent').css('width', 'auto');
                    $('.listArea .pack_number').css('width', 'auto');
                    $('.listArea .pack_list').css('width', 'auto');
                    $('.listArea .pack_list').css('float', 'none');
                    $('.listArea .pack_list li').css('float', 'none');
                    $('.listArea .pack_list li').css('width', 'auto');
                    $('.listArea .pack_list li .show_time').css('right', 0);
                    $('.box .head .extend').hide();
                    $('#panel_stat').remove();
                    $('.right .tab_aver .tabs ul').children('li').eq(1).hide();
                    $('#fn_favodownload .fn_disabled span').text('暂时不支持下载');
                }else if(this.tabName == 'youku-album'){
                    $('.right').css('display', 'none');
                    $('.col2_21 .left').css('width', 730);
                    $('.show_state').hide();
                    $('.offsee').hide();
                    $('#fn_share').hide();
                    $('.com_share').hide();
                    $('.nBox').hide();
                    function cleanTit(){
                        $('.showbannerad').hide();
                        $('.showbanner').hide();
                        $('.showbase').hide();
                        $('.items .v_title').css('height', 22);
                        $('.items .v_title').css('line-height', '22px');
                        $('.items .v_title').css('overflow', 'hidden');
                        $('.items .p_title').css('height', 22);
                        $('.items .p_title').css('line-height', '22px');
                        $('.items .p_title').css('overflow', 'hidden');
                        wanDouJiaExt.addDownLoadButton();
                    }
                    setInterval(cleanTit,500);
                }
            }else if(this.tabName == 'soku'){
                function cleanAd(){
                    $('[id^=ab]').hide();
                    $('.feedwin').hide();
                    $('.v_user').hide();
                    $('.v_title').css('height', 22);
                    $('.v_title').css('line-height', '22px');
                    $('.v_title').css('overflow', 'hidden');
                    wanDouJiaExt.addDownLoadButton();
                }
                setInterval(cleanAd,500);
                $('.layout_16 .maincol').css('float', 'left');
                $('.layout_16 .maincol').css('width', 690);
                $('.result .collgrid4w .items').css('width', 'auto');
                $('.result .collgrid4w .items .clear').remove();
                $('.result .collgrid4w .v').css('margin-right', 34);
                $('.result .collgrid4w .v').css('height', 185);
                $('.layout_16 .maincol').css('width', 620);
                $('.viewby').hide();
                $('.relkeys').hide();
                $('.direct .F').hide();
            }
        },
        removeElement: function(){
            $('body').css('width',760);
            $('body').css('margin','0 auto');
            $('body').css('overflow-x','hidden');
            this.removeHeadElement();
            this.removeMainElement();
            this.removeFootElement();
        },
        changeLinkTarget: function(){
            if( this.tabName.indexOf('soku')>=0){
                $('.header .logo a').attr('href','#');
            }
            if(this.tabName.indexOf('youku') >=0 || this.tabName.indexOf('soku')>=0){
                $('a').each(function(){
                    $(this).attr('target', '_self');
                });
                $('.p_actor a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('.p_actor a').css('color', '#909090');
                $('.crumbs a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('.crumbs a').css('color', '#909090');
                $('.showInfo .baseinfo a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('.showInfo .baseinfo a').css('color', '#909090');
                $('.mBox .head .title, .mBox .head .title a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('#award a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('#award a').css('color', '#909090');
                $('.p .p_stat a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('.p .p_stat a').css('color', '#909090');
                $('form').each(function(){
                    $(this).attr('target', '_self');
                });
                $('.direct .params li a').each(function(){
                    $(this).attr('href', 'javascript:');
                });
                $('.direct .params li a').css('color', '#909090');
                $('.showInfo .baseinfo .row2, .showInfo .basedata .row2 a').each(function(){
                    $(this).css('color', '#909090');
                    $(this).attr('href','javascript:');
                });
                $('.showInfo .basenotice a').each(function(){
                    $(this).css('color', '#909090');
                    $(this).attr('href','javascript:');
                    $(this).unbind('click');
                });
                $('#comment_wrap a').each(function(){
                    $(this).css('color', '#909090');
                    $(this).attr('href','javascript:');
                    $(this).unbind('click');
                });
            }          
        },
        removeDamnAds: function(){
            //去除恼人的广告
            $('a').each(function(){
                try{
                    if( $(this).attr('filtered') != 1 ){
                        var href = $(this).attr('href');
                        var background = $(this).css('background');
                        var p_div = $(this).parent().children('div').eq(0);
                        if( typeof href != 'undefined' && (href.indexOf('hz.youku.com') >=0 || href.indexOf('qqycar') >= 0) ){
                            $(this).hide();
                            if(typeof p_div != 'undefined' && p_div.text().indexOf('合作伙伴')>=0){
                                p_div.hide();
                            }
                        }else if(typeof background != 'undefined' && background.indexOf('res.mfs.ykimg.com')>=0){
                            $(this).hide()
                            if(typeof p_div != 'undefined' && p_div.text().indexOf('合作伙伴')>=0){
                                p_div.hide();
                            } 
                        }
                        $(this).attr('filtered', 1);
                    }
                }catch(e){}
            });
        },
        addDownLoadButton: function(){
            if(this.tabName.indexOf('youku')>=0||this.tabName.indexOf('soku')>=0){
                $('.items .p').each(function(){
                    try{
                    if($(this).children('li').eq(0).children('a').eq(0).attr('setted') != 1 ){
                        if($(this).children('li').eq(6).attr('class') == 'p_ischarge'){
                            $(this).append('<li class="p_rating" style="text-align:center;height:18px;"> </li>');
                        }
                        var href = $(this).children('li').eq(0).children('a').eq(0).attr('href');
                        if(typeof href != 'undefined' && (href.indexOf('youku') >= 0 || href.indexOf('tudou')>=0)){
                            var title = '';
                            $(this).children('li').each(function(){
                                if($(this).attr('class') == 'p_title'){
                                    title = $(this).children('a').eq(0).html();
                                }
                            });
                            var down_url = href + "#name=" + title + "&content-type=video/mp4";
                            $(this).append('<li class="p_title" style="text-align:center"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+title+'.mp4">\u4e0b\u8f7d</a></li>');
                        }
                        $(this).children('li').eq(0).children('a').eq(0).attr('setted', 1);
                    }
                    }catch(e){}
                });
                $('.items .v').each(function(){
                    try{
                    if($(this).children('li').eq(0).children('a').eq(0).attr('setted') != 1 ){
                        var href = $(this).children('li').eq(0).children('a').eq(0).attr('href');
                        if(typeof href != 'undefined' && (href.indexOf('youku') >= 0 || href.indexOf('tudou')>=0)){
                            var title = '';
                            $(this).children('li').each(function(){
                                if($(this).attr('class') == 'v_title'){
                                    title = $(this).children('a').eq(0).attr('title');
                                }
                            });
                            down_url = href + "#name=" + title + "&content-type=video/mp4";
                            $(this).append('<li style="text-align:center;height:30px;"><a class="btn-min" style="color:black;" href="'+down_url+'" download="'+title+'.mp4">\u4e0b\u8f7d</a></li>');
                        }
                        $(this).children('li').eq(0).children('a').eq(0).attr('setted', 1);
                    }
                    }catch(e){}
                });
                if(this.tabName == 'youku-video'){
                    $('#fn_download').hide();
                    var p = $('.base').first();
                    down_url = window.location.href;
                    title = $.trim($('.title').text());
                    down_url = down_url + "#name=" + title + "&content-type=video/mp4";
                    p.after('<p style="margin-bottom: 20px;text-align: right;"><a class="btn-min" style="color:black;width:80px;height:26px;text-align:center;display:block;" href="'+down_url+'" download="'+title+'.mp4">\u4e0b\u8f7d</a></p>');
                }
            }
        }        
    };
    if(window.location.href=="http://www.youku.com/"){
        window.location.href="http://tv.youku.com/";
    }
    wanDouJiaExt.init();
    var filterAd = setInterval(wanDouJiaExt.removeDamnAds, 1000);
})(jQuery);
