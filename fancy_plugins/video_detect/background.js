console.log("Background is running.");

var videos = {};
/*
if( localStorage.length > 0 ){
    for( var i=0; i < localStorage.length ; i++ ){
        var key = localStorage.key(i);
        videos[key] = localStorage.getItem(key);
    }
}
*/

// 加入此视频的
var i = 0,
    is_video_page = false;

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        videos[i] = {};
        videos[i]["name"] = request.name;
        videos[i]["page_url"] = request.page_url;
        sendResponse(videos);
        is_video_page = true;
    }
);


// detect received objects
chrome.webRequest.onResponseStarted.addListener(
    function(details){
        //筛选符合条件的details
        if( details.type == "object" && details.frameId == "0" && is_video_page){
            var headers = details.responseHeaders,
                is_video = false,
                can_be_pushed = false,
                content_type,
                content_length;
            for(var x in headers){
                if( headers[x].name == "Content-Type" && headers[x].value.indexOf("video") >= 0 ){
                    is_video = true;
                    content_type = headers[x].value;
                }
                if( headers[x].name == "Content-Length" && headers[x].value >1000000){
                    can_be_pushed = true;
                    content_length = headers[x].value;
                }
            }

            if( is_video && can_be_pushed ){

                videos[i]["content_type"] = content_type;
                videos[i]["content_length"] = content_length;
                videos[i]["video_url"] = details.url.split("?")[0];
                i++;
                console.log(videos,i);
            }
        }
    },
    {urls:["<all_urls>"]},
    ["responseHeaders"]
);


var o = {
    "content_type":"",
    "content_length":"",
    "video_url":"",
    "name":"",
    "page_url":""
}
