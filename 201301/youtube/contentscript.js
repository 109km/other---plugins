(function($){
    var wanDouJiaExt = {
        init: function(){
            var url = location.href;
            if ( url.indexOf('watch?v=') >= 0 ){
                wanDouJiaExt.modifyDetailPage();
            }

        },
        modifyDetailPage:function(){
            var url = location.href;
            var data = wanDouJiaExt.request_url(url),
                vid = data['v'];


            var fmt_str = new Array();
            fmt_str[0]  = '(FLV, 320 x 240, Mono 22KHz MP3)'; // delete ?
            fmt_str[5]  = '(FLV, 400 x 240, Mono 44KHz MP3)';
            fmt_str[6]  = '(FLV, 480 x 360, Mono 44KHz MP3)'; // delete ?
            fmt_str[34] = '(FLV, 640 x 360, Stereo 44KHz AAC)';
            fmt_str[35] = '(FLV, 854 x 480, Stereo 44KHz AAC)';

            fmt_str[13] = '(3GP, 176 x 144, Stereo 8KHz)';    // delete ?
            fmt_str[17] = '(3GP, 176 x 144, Stereo 44KHz AAC)';
            fmt_str[36] = 'small';

            fmt_str[18] = 'large';
            fmt_str[22] = '(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)';
            fmt_str[37] = '(MP4(H.264), 1920 x 1080, Stereo 44KHz AAC)';
            fmt_str[38] = '(MP4(H.264), 4096 x 3072, Stereo 44KHz AAC)';
            fmt_str[83] = '(MP4(H.264), 854 x 240, Stereo 44KHz AAC)';
            fmt_str[82] = 'large';
            fmt_str[85] = '(MP4(H.264), 1920 x 520, Stereo 44KHz AAC)';
            fmt_str[84] = '(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)';

            fmt_str[43] = '(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)';
            fmt_str[44] = '(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)';
            fmt_str[45] = '(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)';
            fmt_str[100] = '(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)';
            fmt_str[101] = '(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)';
            fmt_str[46] = '(WebM(VP8), 1920 x 540, Stereo 44KHz Vorbis)';
            fmt_str[102] = '(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)';


            function getYouTubeUrl(rdata){
                var rdataArray = rdata.split('&');
                var succ = 0;
                for(var i = 0; i < rdataArray.length; i++){
                    var r0 = rdataArray[i].substr(0, 26);
                    if(r0 == 'url_encoded_fmt_stream_map'){
                        var r1 = unescape(rdataArray[i].substr(27));
                        var temp1 = r1.split(',');
                        var fmt = new Array;
                        var fmt_url = new Array;
                        var fmt_sig = new Array;
                        for(var j = 0; j < temp1.length; j++){
                            /*
                             temp1[j] = temp1[j].substr(4);
                             var temp2 = temp1[j].split('&itag=');
                             fmt.push(parseInt(temp2[1], 10));
                             fmt_url.push(temp2[0]);
                             */
                            var temp2 = temp1[j].split('&');
                            for(var jj = 0; jj < temp2.length; jj++){
                                var temp_itag = -1;
                                var temp_type = '';
                                if(temp2[jj].substr(0, 5) == 'itag='){
                                    temp_itag = parseInt(temp2[jj].substr(5), 10);
                                    fmt.push(temp_itag);
                                }else if(temp2[jj].substr(0, 4) == 'url='){
                                    fmt_url.push(temp2[jj].substr(4));
                                }else if(temp2[jj].substr(0, 4) == 'sig='){
                                    fmt_sig.push(temp2[jj].substr(4));
                                }else if(temp2[jj].substr(0, 5) == 'type='){
                                    temp_type = '(' + unescape(temp2[jj].substr(5)) + ')';
                                }

                                if(fmt_str[temp_itag] == 'undefined'){
                                    fmt_str[temp_itag] = temp_type;
                                }
                            }
                        }

                        var dllinks = [];
                        for(var k in fmt){
                            if(fmt[k] == 43 || fmt[k] == 44 || fmt[k] == 45 || fmt[k] == 46 || fmt[k] == 100 || fmt[k] == 101 || fmt[k] == 102){
                                //watch url
                                //url = unescape(fmt_url[k]) + "&signature=" + fmt_sig[k];
                            }else{
                                dllinks[fmt_str[fmt[k]]]= unescape(fmt_url[k]) + "&signature=" + fmt_sig[k];
                            }
                        }
                        return dllinks;
                    }
                }
            }

            function urldecode(str){
                return decodeURIComponent(str.replace(/\+/g, '%20'));
            }

            var movie_player = $("#movie_player"),
                movie_src = movie_player.attr("src"),
                flashvars = movie_player.attr("flashvars");

            //var movie_object = '<object type="application/x-shockwave-flash" data="'+movie_src+'"><param name="movie" value="'+movie_src+'"></object>'
            movie_player.attr("wmode","Opaque");

            $.ajax({
                url:"http://www.youtube.com/get_video_info?video_id=" + vid,
                success:function(rdata){
                    var url = getYouTubeUrl(rdata),
                        name = document.title,
                        html = "";
                    var large_url = url['large']+ "#name=" + name + "&content-type=video";
                    var small_url = url['small']+ "#name=" + name + "&content-type=video";
                    html += '<div class="download_zone"><h1>Download to phone</h1>' +
                        '<p><a href="'+large_url+'" download="" style="margin-right:20px;" class="btn-green btn-large client2-btn"><b>Large</b></a><a href="'+small_url+'" download="" class="btn-green btn-large client2-btn"><b>Small</b></a></p>';

                    html = '<div class="download_list">' + html + '</div>';
                    $('#watch7-action-buttons').after(html);
                }
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
        }
    };
    wanDouJiaExt.init();


})(jQuery);