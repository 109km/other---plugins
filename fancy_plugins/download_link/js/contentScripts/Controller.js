(function(){
	
	var ContentScriptController = function(){
		
		this.processMessage = function( tabId, message ){
			
			var file = "/js/contentScripts/contentScript.js";//chrome.extension.getURL("/js/contentScripts/contentScript.js");
			
			console.log( "execture script", file, tabId );
			
			chrome.tabs.executeScript( tabId, {
				file: file
			}, function(){
				
				console.log( "Script exectured!", file );
				
				var port = chrome.tabs.connect( tabId );
				
				port.postMessage( message );
				
				port.onMessage.addListener(function( message ){
					
					switch( message.action ){
						case "getYTMEdia":
						
							fvdSingleDownloader.Media.Youtube.getContentFromYoutubePage( message.ytId, function( media ){
								
								port.postMessage( {
									action: "answer",
									media: media,
									requestId: message.requestId
								} );
								
							} );
							
							
						break;
						
						case "download":
						
							fvdSingleDownloader.Media.startDownload( message.media );
						
						break;
					}
					
				});
				
			});
		}
		
	}
	
	this.ContentScriptController = new ContentScriptController();
	
}).apply( fvdSingleDownloader );
