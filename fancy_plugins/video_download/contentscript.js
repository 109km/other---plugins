var rpHTML5VideoExtStateEnum = {"Idling":0, "Pending":1, "Scanning":2};
var rpHTML5VideoExtState = rpHTML5VideoExtStateEnum.Pending;

function getVideoSrcFromChildren(video)
{
    var videoSrc = "";
    var children = video.childNodes;

    if (children.length)
    {
        for (var i = 0; i < children.length; i++) 
        {                
            var child = children[i];

            // Look for the first child Source element 
            // with valid src attribute
            if (child.nodeType == 1 &&
                child.src != "")
            {                   
                videoSrc = child.src;
                break;
            }
        }
    }

    return videoSrc;
}

function isVideoAttributeChanged(plugin, video)
{
    if (plugin.width != video.clientWidth       ||
        plugin.height != video.clientHeight     ||
        plugin.offsetLeft != video.offsetLeft   ||
        plugin.offsetTop != video.offsetTop)
    {
        return true;
    }

    var pluginSrc = plugin.getAttribute("src");
    var videoSrc = video.currentSrc;
            
    if (pluginSrc != videoSrc)
    {
        return true;
    }
    
    return false;
}

function initRPHTML5VideoPlugin(plugin, index, video)
{
    plugin.id = "RPHTML5Video_Plugin_" + index;
    plugin.type = "application/x-rp-html5videoshim-plugin";
    plugin.width = video.clientWidth;
    plugin.height = video.clientHeight;
    plugin.offsetLeft = video.offsetLeft;
    plugin.offsetTop = video.offsetTop;
    
    var pluginSrc = "";
    
    if (video.currentSrc != "")
    {
        pluginSrc = video.currentSrc;
    }

    if (pluginSrc != "")
    {
        plugin.setAttribute("src", pluginSrc);    
    }
}

function scanHTML5Videos() {
    rpHTML5VideoExtState = rpHTML5VideoExtStateEnum.Scanning;
    var HTML5Videos = document.getElementsByTagName("video");
    var numOfVideos = HTML5Videos.length;
    for (var i = 0; i < numOfVideos; i++) {
        var video = HTML5Videos[i];

        var prevSibling = video.previousSibling;
        if (prevSibling)
        {
            if (prevSibling.nodeType == 1 && 
                prevSibling.id == "RPHTML5Video")
            {
                var children = prevSibling.childNodes;
                if (children.length)
                {
                    var firstChild = children[0];
                    
                    if (isVideoAttributeChanged(firstChild, video))
                    {
		        // Update parent <div> 
			prevSibling.style.width = video.clientWidth + "px";
        		prevSibling.style.height = video.clientHeight + "px";
                        initRPHTML5VideoPlugin(firstChild, i, video);
                    }
                }
                continue;
            }
        }
        var _div = document.createElement('div');
        _div.setAttribute("id", "RPHTML5Video");
        _div.setAttribute("style", "position: absolute; z-index: -1");
	_div.style.width = video.clientWidth + "px";
        _div.style.height = video.clientHeight + "px";

        var _rpHTML5VideoPlugin = document.createElement('object')        
        initRPHTML5VideoPlugin(_rpHTML5VideoPlugin, i, video);                
         
        _div.appendChild(_rpHTML5VideoPlugin);

        video.parentNode.insertBefore(_div, video);
    }
    rpHTML5VideoExtState = rpHTML5VideoExtStateEnum.Idling;
}

function onDOMModified()
{
    if (rpHTML5VideoExtStateEnum.Idling == rpHTML5VideoExtState)
    {
        rpHTML5VideoExtState = rpHTML5VideoExtStateEnum.Pending;
        setTimeout("scanHTML5Videos()", 2000);
    }
}

document.body.addEventListener("DOMSubtreeModified", onDOMModified, false);
setTimeout("scanHTML5Videos()", 1000);
