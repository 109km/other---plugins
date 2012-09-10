/*
 * plugin for : http://www.yinyuetai.com/360/mobile
*/

(function($){
    var wanDouJiaExt = {
        init: function(){
            wanDouJiaExt.modifyPageSize();
            wanDouJiaExt.modifyDownloadClientBtn();
            wanDouJiaExt.changeDownloadBtn();
        },
        modifyPageSize:function(){
            $('.wrapper').width(760);
        },
        modifyDownloadClientBtn:function(){
            var old_href = $('.download_client').attr('href'),
                 name = wanDouJiaExt.request_url(old_href).name,
                 new_href = old_href + '#name=' + name + "&content-type=application";
            $('.download_client').attr('download',name+'.apk').attr('href',new_href);

        },
        changeDownloadBtn:function(){
            var
                // download buttons of list pages
                download_btns_list = $('.right','.btn_box'),

                // the download button of detail page , only one
                download_btn_detail = $('.btn_down','.mv_title'),

                // modify download link
                modify_attr = function(obj,page){
                    // remove onclick event
                    $(obj).removeAttr('onclick');

                    // add rel attr
                    $(obj).attr('rel','download');

                    // modify href
                    var old_href = $(obj).attr('href'),
                         url_param = wanDouJiaExt.request_url(old_href),
                         new_href;

                    new_href = old_href + '#name=' + url_param.name + '&content-type=' + encodeURIComponent('video/mp4');

                    // list page has images
                    if(page == 'list'){
                        var pic_url = $(obj).parents('li').find('.img img').attr('src');
                        new_href  += '&image=' + encodeURIComponent(pic_url);
                    }

                    $(obj).attr('href',new_href);

                };

            // list page
            download_btns_list.each(function(){
                modify_attr(this,'list');
            });
            
            // detail page
            download_btn_detail.each(function(){
                modify_attr(this,'detail');
            });

        },
        
        // build-in function : get params from a url
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
        }
    };
    
    // init
    wanDouJiaExt.init();

})(jQuery);