(function()
{
	/*
	 * popup disabled
	 
	chrome.extension.onConnect.addListener(function( port ){
		
		window._fvdsdHintPort = port;
		
		switch( port.name ){
			case "fvdsd_hint":
				port.onMessage.addListener( function( message ){
					
					switch( message.action ){
						case "displayHint":
							
							var frameId = "fvdSingle_fvdsdHint";
						
							if( !document.getElementById(frameId) ){								
								var iframe = document.createElement( "iframe" );
								iframe.setAttribute( "id", frameId );
								var iframeContentUrl = chrome.extension.getURL( "additional/fvdsd_hint.html" );
								iframe.setAttribute( "src", iframeContentUrl );
								
								document.addEventListener("click", function(){
									iframe.style.display = "none";
								}, false);
								
								document.body.appendChild( iframe );								
							}
							
						break;
					}
					
				} );
			break;
		}
		
	});
	*/

	function fvd_getHTMLElementPos(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}
			while(obj = obj.offsetParent);
		}
		
		
		return {
			"left": curleft,
			"top": curtop
		};
	};

	var old_hilite = null;
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
	{
		if ('command' in request)
		{
			switch (request['command'])
			{
				case 'hilite_media':
				{
					if ((old_hilite != null) && old_hilite.hasAttribute('fvd_old_border'))
					{
						old_hilite.style.border = old_hilite.getAttribute('fvd_old_border');
						old_hilite.removeAttribute('fvd_old_border');
						old_hilite = null;
					}

					if ('xpath' in request)
					{
						var el = (document.evaluate(request['xpath'], document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
						if (el != null)
						{
							if (el.nodeName.toLowerCase() == 'embed')
							{
								var d = (document.evaluate('./ancestor::object', el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
								if (d != null) el = d;
							}
														
							var border = document.getElementById( "__fvd_embed_border" );
							borderWidth = 5;
							if( !border ){
								border = document.createElement( "div" );
								border.id = "__fvd_embed_border";
								border.style.position = "absolute";
								border.style.borderRadius = "10px";
								border.style.border = borderWidth+"px solid rgba(255,0,0, 0.5)";
								border.style.zIndex = 1000000;
								document.body.appendChild( border );
							}
							
							var w = el.offsetWidth;
							var h = el.offsetHeight;
							
							if( el.getAttribute("height") && el.getAttribute("height") > h ){
								h = el.getAttribute("height");
							}
							
							var pos = fvd_getHTMLElementPos( el );
							
							border.style.width = w+"px";
							border.style.height = h+"px";
							border.style.top = pos.top - borderWidth + "px";
							border.style.left = pos.left - borderWidth + "px";
							
							border.style.display = "block";
							
						}
					}
					break;
				}

				case 'unhilite_media':
				{
					var border = document.getElementById( "__fvd_embed_border" );
					if( border ){
						border.style.display = "none";
					}
					/*
					if ((old_hilite != null) && old_hilite.hasAttribute('fvd_old_border'))
					{
						old_hilite.parentNode.style.boxShadow = old_hilite.getAttribute('fvd_old_border');
						old_hilite.removeAttribute('fvd_old_border');
						old_hilite = null;
					}
					*/
					break;
				}
			}
		}
	});
})();