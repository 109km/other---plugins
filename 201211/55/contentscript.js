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
            setTimeout(function(){
                $("a img").each(function(){
                    // find the download buttons
                    if( $(this).attr("src").indexOf("down.png") > 0){
                        var
                             tag_a = $(this).parent(),
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
                             new_href;

                        $.ajax({
                            url: "http://360-v3.v3gp.com/play.php?file="+aid,
                            success:function(data){
                                var data = $.parseXML(data);
                                var url = $('track',data).attr('url');
                                new_href = url + "#name=" + encodeURIComponent(jtitle) + '&content-type=' + encodeURIComponent('audio/mp3');
                                tag_a.removeAttr("href").attr("rel","download").attr('href',new_href);
                            }
                        });
                    }
                });
            },500);



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