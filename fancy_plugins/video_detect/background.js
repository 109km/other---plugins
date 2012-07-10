console.log("Background is running.");

var videos = {};
if(localStorage.length > 0){
    for( var i=0; i < localStorage.length ; i++ ){
        var key = localStorage.key(i);
        videos[key] = localStorage.getItem(key);
    }
}


// detect received objects

chrome.webRequest.onResponseStarted.addListener(
    function(details){
        //筛选符合条件的details
        if( details.type == "object" && details.frameId == "0" ){
            var headers = details.responseHeaders;
            for(var x in headers){
                if( headers[x].name == "Content-Type" && headers[x].value.indexOf("video") >= 0 && headers[x].length > 0){
                   var key = "key_" + details.requestId;
                    videos[key] = details.url;
                    localStorage.setItem(key,details.url);
                    console.log(details);
                }
            }
        }
    },
    {urls:["<all_urls>"]},
    ["responseHeaders"]
);

