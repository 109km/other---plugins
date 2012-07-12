chrome.webRequest.onBeforeRequest.addListener(function(details){
    return {cancel: details.url.indexOf("http://static.qyer.com/js/common/slides.jquery.js")!= -1};
},{urls:["<all_urls>"],types:["script"]},["blocking"]);