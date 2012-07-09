console.log("Background is running.");

var videos = [];

// detect received objects
chrome.webRequest.onResponseStarted.addListener(
    function(details){
        if( details.type == "object" && details.frameId == "0" ){
            var headers = details.responseHeaders;
            for(var i in headers){
                if(headers[i].name == "Content-Type" && headers[i].value.indexOf("video") >= 0 ){
                    console.log(details);
                }
            }
        }
    },
    {urls:["<all_urls>"]},
    ["responseHeaders"]
);
