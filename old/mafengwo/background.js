console.log("Background is running.");

var videos = [];

// detect received objects
chrome.webRequest.onResponseStarted.addListener(
    function(details){
        console.log(details);
    },
    {urls:["<all_urls>"]},
    ["responseHeaders"]
);
