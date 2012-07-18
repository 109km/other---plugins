/**
 * content script
 * filter module of the rank page & add a download link for each book.
 * users can click on the download link and save the book as a txt file format.
 */
var jq = jQuery.noConflict();

(function ($) {
   
    var wanDouJiaExt = {
        tabName: null,
        tempLongString: null,
        tempFileName:null,
        init: function () {
        
            this.tabName = this.getTabName();
            if (this.tabName != null) {
                var sub = this.getSubTabName();
                if (sub != null) {
                    this.tabName = sub;
                }
                this.removeElement();
                this.changeLinkTarget();
//                this.addDownLoadButton();
            }
        },
        getTabName: function () {
            for (var pattern in this.pagePattern) {
                if (window.location.href.match(new RegExp(pattern, 'i'))) {
                    return this.pagePattern[pattern];
                }
            }
            return null;
        },
        getSubTabName: function () {
            for (var pattern in this.subPagePattern) {
                if (window.location.href.match(new RegExp(pattern, 'i'))) {
                    return this.subPagePattern[pattern];
                }
            }
            return null;
        },
        pagePattern: {
            '^(?:http|https)://rank\\.a8\\.com/.*$': 'a8-rank',
            '^(?:http|https)://www\\.a8\\.com/search/.*$': 'a8-search',
            '^(?:http|https)://so\\.a8\\.com/.*$': 'a8-search',
            '^(?:http|https)://music\\.a8\\.com/.*$': 'a8-music',
            '^(?:http|https)://[a-zA-Z0-9]*\\.space\\.a8\\.com/.*$': 'a8-space',
        },
        subPagePattern: {
            '^(?:http|https)://music\\.a8\\.com/song/.*$': 'a8-music-detail',
        },
        removeElement: function () {
            $('body').css('width', 780);
            $('body').css('margin', '0 auto');
            $('body').css('overflow-x', 'hidden');
            
            if (this.tabName.indexOf('a8') >= 0) {
                
                this.removeA8Element();
            }
         
        },
       
 
        removeA8Element: function () {
            $('div.container').css('width', 760);
            $('div.main_oper').css('width', 759);
            $('div.main_oper').css('height', 45);
            $('#menu_sec').css('width', 759);
            $('#menu_sec').css('background-position', ' -50px 0px');
            $('#sec_quick').hide();
            $('#footer').hide();
            $('ul.sub_nav_02').hide();
            $('ul.sub_nav_04').hide();
			
            $('a.xin').hide();
            $('a.jia').hide();
            $('a.down').hide();
			$('#search_option_selected a').hide();
			$('#search_option_selected').css('width',20);
			
			
			
            var objs = document.querySelectorAll("#nav_sec>li");
            if (objs) {

                for (var i = 0; i < objs.length; i++) {
                    if (objs[i].innerHTML.indexOf("首页") > -1) {
                        set_nodisplay(objs[i]);
                        set_nodisplay(objs[i + 1]);
                    }
                    if (objs[i].innerHTML.indexOf("新闻") > -1) {
                        set_nodisplay(objs[i]);
                        set_nodisplay(objs[i + 1]);
                    }
                    if (objs[i].innerHTML.indexOf("音乐人") > -1) {
                        set_nodisplay(objs[i]);
                        set_nodisplay(objs[i + 1]);
                    }
                    if (objs[i].innerHTML.indexOf("图库") > -1) {
                        set_nodisplay(objs[i]);
                        set_nodisplay(objs[i + 1]);
                    }
                    if (objs[i].innerHTML.indexOf("我的A8") > -1) {
                        set_nodisplay(objs[i]);
                        set_nodisplay(objs[i + 1]);
                    }
                }
            }
			$('a').each(function (i) 
			{
				if($(this).attr('href'))
				{
					if($(this).attr('href').indexOf('a8.com/ting/') > -1)
					{
						$(this).attr('href', 'javascript:void();');
					}
				}
			})

            if (this.tabName == 'a8-rank') {

                $('div.rank_right').css('width', 545);
                $('ul.rank_list_730').css('width', 530);
                $('ul.rank_list_730 li.ttl').css('width', 530);
                $('ul.rank_list_730 li.title').css('width', 530);
                $('ul.rank_list_730 li .num').css('width', 40);
                $('ul.rank_list_730 li .num').css('height', 20);
                $('ul.rank_list_730 li .songInfo').css('width', 230);
                $('ul.rank_list_730 li .suport').css('width', 40);
                $('ul.rank_list_730 li .singer a').attr('href', 'javascript:void();');
                $('div.partner').hide();
                $('div.friendlink').hide();
                $('div.rankSideNav').css('height', 1184);
                $('ul.rank_list_730 li div.pic').hide();
                $('ul.rank_list_730 li a.xin').hide();
                $('ul.rank_list_730 li a.jia').hide();
                $('ul.rank_list_730 li a.down').hide();
                $('ul.rank_list_730 li.hottop').attr('class', '');

				$('div.oper.a_oper a.xin').hide();
				$('div.oper.a_oper a.jia').hide();
                $('div.check').hide();
                $('li.bnb').hide();
				
				$('ul.rank_list_m').css('padding',0);
				$('ul.rank_list_m li').css('margin-left',0);
				$('ul.rank_list_m li').css('width',270);
				$('ul.rank_list_m li div.songInfo').css('width',210);
				$('ul.rank_list_m li div.oper.a_oper').css('width',30);
				$('div.fr.com_button.mlTens').hide();
				
				$('ul.rank_list_m li div.songInfo span.fc_999 a').attr('href', 'javascript:void();');
            }
            else if (this.tabName == 'a8-music') {
                $('div.mv_tryLsn').css('width', 759);
                $('div.mv_tryLsn').css('height', 285);
                $('div.mv_tryLsn div.mv_flash').css('width', 507);
                $('div.mv_tryLsn div.mv_flash').css('height', 285);
                $('div.mv_tryLsn div.mv_play').css('width', 250);
                $('div.mv_tryLsn div.mv_play').css('height', 285);
                $('div.mv_showPic').css('width', 507);
                $('div.mv_showPic').css('height', 285);
                $('div.mv_showPic_tab').css('height', 43);
                $('div.mv_showPic_tab').css('width', 507);
                $('div.mv_play a img').css('width', 250);
                $('div.mv_play a img').css('height', 285);
                $('#con_tophome_1 a img').css('width', 507);
                $('#con_tophome_2 a img').css('width', 507);
                $('#con_tophome_3 a img').css('width', 507);
                $('#con_tophome_4 a img').css('width', 507);

                $('div.com_wrap').css('width', 759);
                $('div.textpage_left').css('width', 500);
                $('div.textpage_right').css('width', 251);
                $('div.mv_tryCon').css('width', 480);
                $('div.mv_tryCon').css('padding', '10px 10px 10px 10px');
                $('dl.mp_album').css('width', 150);
                $('dl.mp_album').css('height', 210);
                $('dl.mp_album').css('margin-left', 5);
                $('dl.mp_album').css('margin-right', 5);
                $('dl.mp_album dt').css('width', 140);
                $('dl.mp_album dt').css('height', 140);
                $('dl.mp_album dt img').css('width', 140);
                $('dl.mp_album dt img').css('height', 140);
                $('dl.mini_album').css('width', 150);
                $('dl.mini_album').css('height', 150);
                $('dl.mini_album').css('float', 'left');
                $('dl.mini_album').css('margin-left', 5);
                $('dl.mini_album').css('margin-right', 5);
                $('dl.mini_album dt').css('width', 140);
                $('dl.mini_album dt').css('height', 92);
                $('dl.mini_album dt img').css('width', 140);
                $('dl.mini_album dt img').css('height', 92);
                $('dl.mini_album dd.title').css('width', 120);
                $('dl.mini_album dd.futtl').css('width', 140);
                $('div.single100_rank2').css('width', 250);
                $('div.single100_rank2 .ttl2').css('width', 250);
                $('.rank_list').css('width', 250);
                $('.rank_list li').css('width', 240);
                $('.rank_list li').css('padding', '0 5px');
                $('.rank_list li .songinfo').css('width', 160);
                $('.rank_list li.hottop').css('width', 240);
                $('.rank_list li.hottop').css('padding', '0 5px');
                $('.rank_list li.hottop  .text').css('width', 170);
                $('.rank_list li.hottop  .text').css('padding-left', 5);
                $('.rank_list_inner').css('width', 170);
                $('.hot100_rank2').css('width', 250);
                $('.hot100_rank2 .ttl2').css('width', 250);
                $('.mv_rithotCon').css('width', 250);
                $('.mv_rithot').css('width', 240);
                $('.mv_rithot').css('height', 60);
                $('.mv_rithot').css('padding', '5px 5px');
                $('.mv_rithot .hotnum').css('margin-left', '0px');
                $('.mv_rithot .mvhotpic').css('margin-left', '5px');
                $('.mv_rithot .mvhottext').css('padding-top', '3px');
                $('.mv_rithot .mvhottext').css('width', 120);
                $('.a_oper_mh a.jia').hide();
                $('.a_oper a.jia').hide();
                $('div.ttl2 div.more_hei').hide();
                //music/mv

                $('.picturePage').css('width', 757);
                $('.MV_List').css('width', 727);
                $('.MV_List').css('padding', '15px 15px');
                $('.MV_List ul').css('width', 727);

                $('.album_List').css('width', 767);
                $('dl.im_album').css('margin-left', 7);

                $('.pb_banner').hide();
                $('#a8_share').hide();
                $('div.pb_oper a.pb_sc').hide();
                $('div.pb_oper a.pb_sc').hide();
                $('div.pb_login').hide();
                $('a.pb_tj').hide();
                $('a.pb_pl').hide();
                $('a.jia').hide();
                $('a.xin').hide();
                $('div.pic a').attr('href', 'javascript:void();');
                $('ul.rank_list li.btn').hide();
				
				$('div.more_hei a').each(function (i) 
				{
					if($(this).attr('href'))
					{
						if($(this).attr('href').indexOf('a8.com/album/') > -1)
						{
							$(this).parent().hide();
						}
					}
				})
                
                $('dd.futtl a').each(function(){ $(this).attr('href','javascript:void()')});
                $('div.text').each(function(){ $(this).children('div.rank_list_inner').eq(1).children('a').attr('href','javascript:void()'); });
               
                $('div.songinfo a:gt(1)').each(function(){$(this).attr('href','javascript:void()')});
            }
            else if (this.tabName == 'a8-search') {
                $('.webSh_change').css('width', 759);
                $('.webSh_Cgcon').css('width', 759);
                $('.webSh_listCon').css('width', 759);
                $('.webSh_list').css('width', 750);
                $('.webSh_list').css('padding', 5);
                $('.webSh_list li').css('width', 750);
                $('.webSh_list li.th').css('width', 745);
                $('.webSh_list li.th .type').css('width', 40);
                $('.web_searchbox').css('width', 759);
                $('div.textpage_menu').hide();
                $('div.textpage_menu').hide();
                $('div.webSh_tabbar').hide();
                $('div.web_optionsList').css('display', 'none');
                $('ul.webSh_list li span.updatetime').hide();
                $('div.textpage_logo a').attr('href', 'javascript:void();');
                $('ul.webSh_list li span.single_opertxt').each(function (i) {
                    if (this.innerHTML.indexOf("收藏") > -1) {
                        $(this).remove();
                    }
                    if (this.innerHTML.indexOf("喜欢") > -1) {
                        $(this).remove();
                    }
                })
                var objs = document.querySelectorAll("ul.webSh_list li span a.jia");
                if (objs) {
                    for (var i = 0; i < objs.length; i++) {
                        set_nodisplay(objs[i].parentNode);
                    }
                }
                var objs = document.querySelectorAll("ul.webSh_list li span a.xin");
                if (objs) {
                    for (var i = 0; i < objs.length; i++) {
                        set_nodisplay(objs[i].parentNode);
                    }
                }



            }
            else if (this.tabName == 'a8-music-detail') {
				
                $('#breadcrumb_nav').css('width', 760);
                $('div.sitepoint').css('width', 460);
                $('div.com_wrap').css('width', 760);
                $('div.player_block').css('width', 760);
                $('div.player_block').css('height', 200);
                $('div.player_block').css('background', 'none');
                $('div.player_block').css('border', '1px #CCC solid');
                $('div.player_block').css('background-color', '#DDDDDD');
                $('div.pybk_left').css('width', 450);
                $('div.pybk_left').css('height', 200);
                $('div.pybk_right').css('width', 300);
                $('div.pybk_right').css('height', 200);
                $('div.play_title').css('width', 400);
                $('div.textpage_left').css('width', 760);
                $('div.song_listBox').css('width', 760);
                $('ul.lt_music_list').css('width', 760);
                $('ul.lt_music_list li').css('width', 730);
                $('ul.lt_music_list li .song').css('width', 370);
                $('ul.lt_music_list li .a_oper a.jia').hide();
                $('ul.lt_music_list li .a_oper a.xin').hide();
                $('ul.lt_music').css('width', 760);
                $('ul.lt_music li').css('width', 350);
                $('ul.lt_music li .song').css('width', 245);
                $('ul.lt_music li .a_oper a.jia').hide();
                $('ul.lt_music li .a_oper a.xin').hide();
                $('div.textpage_menu').hide();
                $('#sec_quick').hide();
                $('#ads_banner').hide();
                $('div.textpage_logo a').attr('href', 'javascript:void();');
                $('#breadcrumb_nav a').attr('href', 'javascript:void();');
                $('div.song_infoPicBox a').attr('href', 'javascript:void();');

                $('div.rowsline div.com_button').hide();
                $('div.play_gz').hide();

                $('div.textpage_right').hide();

                $('div.leave_msg').hide();
                $('#leave_msg').hide();
                $('div.text_wrap').hide();
                $('#comment_zone').hide();

                $('div.play_xihuan').hide();
                $('div.play_a_bar').hide();
                $('div.play_share').hide();

                $('#footer').hide();

                //music-song
                $('.picturePage').css('width', 759);
                $('dl.im_album').hide();
                $('.single_Mlist li.th .listenNum').css('width', 120);
                $('.single_Mlist li .listenNum').css('width', 120);
                $('.single_Mlist li .listenNum .per_single').hide();
                $('.single_MlistCon').css('width', 759);
                $('.single_Mlist').css('width', 739);
                $('.single_Mlist li.th').css('width', 736);
                $('.single_Mlist li.th .single_name').css('width', 380);
                $('.single_Mlist li .single_name').css('width', 380);

                $('.single_Mlist li span.single_oper a.xin').parent().hide();
                $('.single_Mlist li span.single_oper a.jia').parent().hide();
                $('.single_Mlist li.th span.single_opertxt').each(function (i) {
                    if (this.innerHTML.indexOf("收藏") > -1) {
                        $(this).remove();
                    }
                    if (this.innerHTML.indexOf("喜欢") > -1) {
                        $(this).remove();
                    }
                })

                $('div.check').hide();
                $('span.check').hide();
                $('li.bnb').hide();
                $('dl.play_rit a').attr('href', 'javascript:void();');
                $('.single_Mlist li .single_name a').each(function (i) { if(i>0){$(this).attr('href', 'javascript:void();');}})
				 
				
				
            }
            else if (this.tabName == 'a8-space-musicbox') {

                $('div.address').css('width', 759);
                $('div.width_970 div.area').css('width', 778);

                $('div.width_600.left').css('width', 780);
                $('div.width_600.left .area').css('width', 778);
                $('div.width_600.left .title').css('width', 778);
                $('dl.dl_zj_termin.clearfix.left').css('width', 778);
                $('dl.dl_zj_termin.clearfix.left').css('border-right', 'none');
                $('div.textpage_logo a').attr('href', 'javascript:void();');
                $('ul.ul_mymusic_out').css('width', 770);
                $('ul.ul_mymusic_out li.No2').css('width', 400);
                $('#inc_login').hide();
                $('div.con_topmenu ul.topmenu').hide();
                $('div.banner').hide();
                $('.menu').hide();
                $('ul.right.ul_wytj').hide();
                $('div.right.width_360').hide();
                $('#userleave').hide();
                $('div.con-footer').hide();
                $('div.address a').attr('href', 'javascript:void();');
                $('dl.dl_zj_termin.clearfix.left dd p a').attr('href', 'javascript:void();');
                $('dl.dl_zj_termin.clearfix.left dd p input.btn').hide();
                $('#isFrame').hide();
                $('ul.ul_mymusic_out li.No1').hide();
                $('ul.ul_playgo').hide();
                $('dt a').attr('href', 'javascript:void();');
            }
            else if (this.tabName == 'a8-space-mv') {
                $('div.address').css('width', 759);
                $('div.width_700.left').css('width', 780);
                $('div.width_700.left .area').css('width', 778);
                $('dl.dl_blogzrxx').css('width', 778);
                $('#video_content').css('width', 778);
                $('#inc_login').hide();
                $('div.con_topmenu ul.topmenu').hide();
                $('div.banner').hide();
                $('.menu').hide();
                $('div.right.width_260').hide();
                $('#userleave').hide();
                $('div.con-footer').hide();
                $('div.address a').attr('href', 'javascript:void();');
                $('div.textpage_logo a').attr('href', 'javascript:void();');
				$('div.address span.right').hide();
            }

        },

        changeLinkTarget: function () {
            //所有的链接都在tab内完成,不触发创建新窗口的操作,防止弹出其他浏览器页面,而其他浏览器的页面将会变成没有被过滤的完整页面
            
            if(this.tabName!="sina-index" && this.tabName!="sina-book-catalog"&&this.tabName!="sogou-music"  && this.tabName.indexOf('xs8') < 0 ){
            $('a').each(function () {
                $(this).attr('target', '_self');
            });
            $('form').each(function () {
                $(this).attr('target', '_self');
            });
            }
            

        },
       
       handleAjaxData: function (){
            //萬惡的百度廣告
		    $("[id^=baidu_]").remove();

			if (this.tabName == 'a8-music-detail') {
     
				$('div.com_title.fc_333').hide();
				$('#leave_msg').hide();
				$('#leave_msg .leave_msg').hide();
     
			}
            else if(this.tabName=="yinyuetai"){
            $('li[name=artist] a').hide();
            $('li[name=user] a').hide();
			$('li[name=article] a').hide();
            
            }
           
        },
        addDownLoadButton: function () {
   
			if(this.tabName=="a8-music-detail"){
                    
            var musicSrc="";
            var musicTitle=$('div.play_title span').eq(0).html(); 
            var musicArtist=$('div.play_title span').eq(1).html();   
            $("<br><div><h6  style='text-align:center'><a class='btn-min' style='vertical-align:middle !important' href='javascript:void()'>\u4e0b\u8f7d</a></h6></div>").insertBefore('div.pybk_left div.hr_20:first');
            $('div.pybk_left a.btn-min').css('color','#666');
            $('div.pybk_left').find("[class='btn-min']").eq(0).click(function () {

            musicSrc=$('div.play_flash script').html();
            var match=musicSrc.match(/songurl: "(.*)"/i); 
            if(match)(musicSrc=match[1]);
            musicSrc=wanDouJiaExt.utf8_decode(musicSrc);
//            alert(musicSrc);
            console.log(musicSrc);
            var m = {};
            m.url = musicSrc;
            m.title = musicTitle;
            m.artist = musicArtist;
            m.format = 'mp3';
            var musics = [];
            musics.push(m);
            if (m.url != '') {
            window.externalCall('portal','-musicurlarray',JSON.stringify(musics));
            }
            });
          
            }
        },
        utf8_decode:function (input) {   
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; 
            var output = "";   
            var chr1, chr2, chr3;   
            var enc1, enc2, enc3, enc4;   
            var i = 0;   
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");   
            while (i < input.length) {   
                enc1 = _keyStr.indexOf(input.charAt(i++));   
                enc2 = _keyStr.indexOf(input.charAt(i++));   
                enc3 = _keyStr.indexOf(input.charAt(i++));   
                enc4 = _keyStr.indexOf(input.charAt(i++));   
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
            output = wanDouJiaExt._utf8_decode(output);   
            return output;   
        } ,
        _utf8_decode: function (utftext) {   
            var string = "";   
            var i = 0;   
            var c = c1 = c2 = 0;   
            while ( i < utftext.length ) {   
                c = utftext.charCodeAt(i);   
                if (c < 128) {   
                    string += String.fromCharCode(c);   
                    i++;   
                } else if((c > 191) && (c < 224)) {   
                    c2 = utftext.charCodeAt(i+1);   
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));   
                    i += 2;   
                } else {   
                    c2 = utftext.charCodeAt(i+1);   
                    c3 = utftext.charCodeAt(i+2);   
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));   
                    i += 3;   
                }   
            }   
            return string;   
        }  
        
    };

    if (window.location.href == "http://www.xs8.cn/") {
        window.location.href = "http://www.xs8.cn/top/";
    }
	if(window.location.href=="http://www.a8.com/"){
        window.location.href="http://music.a8.com/";
    }
	if(window.location.href=="http://ww.3gsc.com.cn/"){
        window.location.href="http://ww.3gsc.com.cn/billboard";
    }

    wanDouJiaExt.init();

    function checkWD() {
        if (typeof window.externalCall == 'undefined') {
            return false;
        } else {
            return true;
        }
    }
    function addInterval() {
        if (checkWD()) {
           clearInterval(sh);
            wanDouJiaExt.addDownLoadButton();
        }
    }
    //如果該obj存在.設置其為不可見
    function set_nodisplay(obj) {
        if (obj) {
            obj.style.display = "none";
        }
    }

    var sh = setInterval(addInterval, 500);

    function fTest(){
        if (checkWD()) {
            wanDouJiaExt.handleAjaxData();
        }
    }

    setInterval(fTest,500);

})(jQuery);
