console.log("Background is running.");

// 存储视频信息
var videos = {};


var o = {
    "content_type":"",
    "content_length":"",
    "video_url":"",
    "name":"",
    "page_url":""
}

/*
if( localStorage.length > 0 ){
    for( var i=0; i < localStorage.length ; i++ ){
        var key = localStorage.key(i);
        videos[key] = localStorage.getItem(key);
    }
}
*/

// 视频信息
var
    // 视频计数
    i = 0,

    // 所加载页面是否为视频详情页
    is_video_page = false;

// 监测从content script传递来的信息
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        videos[i] = {};
        videos[i]["name"] = request.name;
        videos[i]["page_url"] = request.page_url;
        is_video_page = true;
        sendResponse("ok");
    }
);


// detect received objects
chrome.webRequest.onResponseStarted.addListener(
    function(details){
        //筛选符合条件的details
        if( details.type == "object" && details.frameId == "0" && is_video_page){
            var
                // 返回的header信息
                headers = details.responseHeaders,

                // 是否为视频
                is_video = false,

                // 是否可加入videos
                can_be_pushed = false,

                // 文件类型
                content_type,

                // 文件大小
                content_length;

            // 根据返回header信息筛选合格视频
            for(var x in headers){

                // 判断是否为视频
                if( headers[x].name == "Content-Type" && headers[x].value.indexOf("video") >= 0 ){
                    is_video = true;
                    content_type = headers[x].value;
                }

                // 根据视频大小判断是否为广告 (可能会失效)
                if( headers[x].name == "Content-Length" && headers[x].value >1000000){
                    can_be_pushed = true;
                    content_length = headers[x].value;
                }

            }

            //  将视频信息加入视频存储对象
            if( is_video && can_be_pushed ){

                videos[i]["content_type"] = content_type;
                videos[i]["content_length"] = content_length;
                videos[i]["video_url"] = details.url.split("?")[0];

                // 为下一个视频做好准备
                i++;

                console.log(videos,i);
            }
        }
    },
    {urls:["<all_urls>"]},
    ["responseHeaders"]
);


