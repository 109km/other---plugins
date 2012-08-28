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
            '^(?:http|https)://360mobile\\.qidian\\.com/moblie/homepage' : 'qidian-home',
            '^(?:http|https)://360mobile\\.qidian\\.com/moblie[/]?$' : 'qidian-home',
            '^(?:http|https)://360mobile\\.qidian\\.com/moblie/TopList' : 'qidian-top',
            '^(?:http|https)://360mobile\\.qidian\\.com/moblie/CategoryPage' : 'qidian-category',
            '^(?:http|https)://360mobile\\.qidian\\.com/moblie/ShowBook' : 'qidian-book',
            '^(?:http|https)://360mobile\\.qidian\\.com/moblie/BookStore' : 'qidian-store'
        },
        subPagePattern: {
        },
        removeFootElement: function(){
           
        },
        removeHeadElement: function(){
            $('.header .ggbox').hide();
            
        },
        removeMainElement: function(){
            $('.page_width').css('width', 760);
            $('.header .nav .sub .right').hide();
            $('.rollbox .list').css('margin-left', 10);
            $('.big_cont').css('width', 565);
            $('.booklist ul li').css('width', 95);
            $('.home_page .contbox .booklist').css('padding-left', 40);
            $('.fenlei_page .first_show .txtbox').css('width', 350);
            $('.wx_page .rdts .txtbox').css('width', 360);
            $('.btn_down_client').hide();
            $('.fenlei_page .books .list .box .txtbox').css('width', 120);
            $('.bookstore').css('width', 'auto');
            $('.bookstore .list .down_client').hide();
            $('.rank_box .rank_list').css('margin', '10px 0px');
            $('.download_page .bookshow .txtbox').css('width', 400);
            $('.ggbox190X135').hide();
            $('.bangdan1 .contbox .list ul li .no').css('width', 15);
        },
        removeElement: function(){
            $('body').css('width',760);
            $('body').css('margin','0 auto');
            $('body').css('overflow-x','hidden');
            if(this.tabName.indexOf('qidian') >= 0){
                this.removeHeadElement();
                this.removeMainElement();
                this.removeFootElement();
            }
        },
        changeLinkTarget: function(){
            if(this.tabName.indexOf('qidian') >= 0){
                //所有的链接都在tab内完成,不触发创建新窗口的操作,防止弹出其他浏览器页面,而其他浏览器的页面将会变成没有被过滤的完整页面
                $('a').each(function(){
                    $(this).attr('target', '_self');
                });
                $('form').each(function(){
                    $(this).attr('target', '_self');
                });
                $('.download_page .bookshow .txtbox .infobox a').each(function(){
                    $(this).css('color', '#333');
                    $(this).attr('href', 'javascript:');
                });
            }           
        },
        addDownLoadButton: function(){
            //首页书籍列表
            $('.booklist ul li').each(function(){
                var href = $(this).children('a').eq(0).attr('href');
                var title = $(this).children('a').eq(0).text();
                title = title.replace(/[\ ]/g, '');
                var bookNo = href.replace(/ShowBook\.aspx\?bookid=/ig, '');
                var click = $(this).children('span').eq(0).children('table').eq(0).children('tbody').eq(0).children('tr').eq(0).children('td').eq(0).children('input').eq(1);
                click.hide();//隐藏input标签，替换成a标签
                var next = $(this).children('span').eq(0).children('table').eq(0).children('tbody').eq(0).children('tr').eq(0).children('td').eq(0).children('input').eq(0);
                $('<a rel="download" href="http://download.qidian.com/pda/'+bookNo+'.txt#name='+encodeURIComponent(title)+'&content-type=text/plain" class="btn2" style="display: block;width: 78px;height: 25px;color: black;line-height: 25px;cursor: pointer;">\u70b9\u51fb\u4e0b\u8f7d</a>').insertAfter(next);
            });            
            $('.rollbox li').each(function(){
                var href = $(this).children('a').eq(0).attr('href');
                var title = $(this).children('a').eq(0).text();
                title = title.replace(/[\ ]/g, '');
                var bookNo = href.replace(/ShowBook\.aspx\?bookid=/ig, '');
                var click = $(this).children('span').eq(0).children('table').eq(0).children('tbody').eq(0).children('tr').eq(0).children('td').eq(0).children('input').eq(1);
                click.hide();//隐藏input标签，替换成a标签
                var next = $(this).children('span').eq(0).children('table').eq(0).children('tbody').eq(0).children('tr').eq(0).children('td').eq(0).children('input').eq(0);
                $('<a rel="download"  href="http://download.qidian.com/pda/'+bookNo+'.txt#name='+encodeURIComponent(title)+'&content-type=text/plain" class="btn2" style="display: block;width: 78px;height: 25px;color: black;line-height: 25px;cursor: pointer;">\u70b9\u51fb\u4e0b\u8f7d</a>').insertAfter(next);
            });
            //分类列表页书籍列表
            $('.btn_down_book').each(function(){
                var href = $(this).attr('href');
                var bookNo = href.match(/[\d]+/);
                var title = href.match(/name=([^&]+)&/);
                title = title[1];
                title = title.replace(/[\ ]/g, '');
                $(this).unbind('click');
                $(this).attr('href',  'http://download.qidian.com/pda/'+bookNo+'.txt#name='+encodeURIComponent(title)+'&content-type=text/plain');
                $(this).attr('rel', 'download');
            });
            $('.fenlei_page .books .download').each(function(){
                var href = $(this).attr('href');
                var bookNo = href.match(/[\d]+/);
                var title = href.match(/name=([^&]+)&/);
                title = title[1];
                title = title.replace(/[\ ]/g, '');
                $(this).unbind('click');
                $(this).addClass('btn-mini');
                $(this).attr('href', 'http://download.qidian.com/pda/'+bookNo+'.txt#name='+encodeURIComponent(title)+'&content-type=text/plain');
                $(this).attr('rel', 'download');
            });
            $('.fenlei_page .tjbox .box .opt a').each(function(){
                var href = $(this).attr('href');
                var bookNo = href.match(/[\d]+/);
                var title = href.match(/name=([^&]+)&/);
                title = title[1];
                title = title.replace(/[\ ]/g, '');
                $(this).unbind('click');
                $(this).addClass('btn-mini');
                $(this).attr('href', 'http://download.qidian.com/pda/'+bookNo+'.txt#name='+encodeURIComponent(title)+'&content-type=text/plain');
                $(this).attr('rel', 'download');
            });
            //书库下载按钮
            $('.bookstore .list .down_book').each(function(){
                var href = $(this).attr('href');
                var bookNo = href.match(/[\d]+/);
                var title = href.match(/name=([^&]+)&/);
                title = title[1];
                title = title.replace(/[\ ]/g, '');
                $(this).unbind('click');
                $(this).addClass('btn-mini');
                $(this).attr('href', 'http://download.qidian.com/pda/'+bookNo+'.txt#name='+encodeURIComponent(title)+'&content-type=text/plain');
                $(this).attr('rel', 'download');
            });

            //排行榜添加下载按钮
            /*
            $('.bangdan1 .contbox .list ul li').each(function(){
                var href = $(this).children('span').eq(1).children('a').eq(0).attr('href');
                var bookNo = href.match(/[\d]+/);
                var title =  $(this).children('span').eq(1).children('a').eq(0).html();
                title = title.replace(/[\ ]/g, '');
                var file_name = title + ".txt";
                $('<span class="name" style="width:50px;"><a download="'+file_name+'" href="http://download.qidian.com/pda/'+bookNo+'.txt#name='+title+'&content-type=text/plain">\u4e0b\u8f7d</a></span>').insertAfter($(this).children('span').eq(0));
            });
            */

            $(".rank_list ul li").each(function(){
                var self = $(this),
                    name = self.find(".name").text(),
                    old_href = self.find(".author a").attr("href");

                var file_name = name + ".txt",
                    new_href = old_href + "#name=" + name + "&content-type=book";

                self.find(".author a").attr("href",new_href).attr("download",file_name);

            });
        }        
    };
    if(window.location.href=="http://www.qidian.com/"){
        window.location.href="http://360mobile.qidian.com/moblie/";
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
        if(true||checkWD){
            clearInterval(sh);
            wanDouJiaExt.addDownLoadButton();
        }
    }
    var sh = setInterval(addInterval, 500);
})(jQuery);
