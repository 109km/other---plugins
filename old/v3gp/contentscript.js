/*
 * plugin for : http://360-v3.v3gp.com
*/

(function($){
    var wanDouJiaExt = {
        init: function(){
            this.changeDownloadBtn();
            this.changeTitle();
            this.removeTarget();
        },
        changeDownloadBtn:function(){
            
            $("a img").each(function(){
                // find the download buttons
                if( $(this).attr("src").indexOf("down.png") > 0){
                    var
                         // the original href
                         original_href = $(this).parent().attr("href"),
                    
                        // get info from original href
                         info = original_href.slice(original_href.indexOf("(")+1,original_href.indexOf(";")),
                         data = info.split("','"),

                        // property rid : used for setting cookie
                         rid = $.trim(data[0].slice(1,data[0].length)),

                        // aid & jtitle used for download link
                         aid = $.trim(data[1]),
                         jtitle = $.trim(data[2].slice(0,data[2].length-2)),

                        // the new href
                         new_href = 'http://d1.v3gp.com:86/360down.php?aid=' + aid + '&name=' + jtitle + '&360ext=mp3#name='
                             + encodeURIComponent(jtitle) + '&content-type=' + encodeURIComponent('audio/mp3');

                    $(this).parent().attr("href",new_href).attr("rel","download");

                    // Downloading operations need checking cookie
                    $(this).parent().click(function(e){
                        document.cookie = 'm_'+rid + '=ok' + ';expires=30;path=/;domain=v3gp.com;';
                    });
                }
            });
            
        },
        changeTitle:function(){
            document.title = "豌豆荚 - 铃声下载";
        },
        removeTarget:function(){
            $('a','body').removeAttr('target');
        }
    };
    // init
    wanDouJiaExt.init();
})(jQuery);