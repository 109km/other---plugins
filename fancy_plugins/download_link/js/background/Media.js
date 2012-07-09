if (window == chrome.extension.getBackgroundPage()) {

	(function(){
	
		var Media = function(){
		
			var self = this;
			
			var _onMediaForTabUpdateListeners = [];
			
			const DETECT_MODULES = ["Sniffer", "Youtube"];
			
			this.startDownload = function( media ){
				
				fvdSingleDownloader.Utils.Async.chain( [
					function( chainCallback ){
				
						if( fvdSingleDownloader.noYoutube == false ){
							fvdSingleDownloader.FvdSuite.downloadMedia( media, function( result ){
								
								if( !result ){
									chainCallback();
								}
								
							} );						
						}
						else{
							chainCallback();	
						}
						
					},
					function( chainCallback ){
						fvdSingleDownloader.Utils.getActiveTab(function( tab ){
							
							fvdSingleDownloader.ContentScriptController.processMessage( tab.id, {
								action: "startDownload",
								media: media
							} );
					
						});
					}
					
				] );
				
			}
						
			this.init = function(){
												
				function mediaDetectListener(media){
					
					var tabId = null;
					
					fvdSingleDownloader.Utils.Async.chain( [function( chainCallback ){
						
						if( fvdSingleDownloader.noYoutube ){
							var tabId = null;
							if( media.length ){
								tabId = media[0].tabId;
							}
							else{
								tabId = media.tabId;
							}
							
							chrome.tabs.get( tabId, function( tab ){
											
								if( tab.url.toLowerCase().indexOf( "http://youtube.com" ) != -1
									|| tab.url.toLowerCase().indexOf( "http://www.youtube.com" ) != -1 ){
							
								}
								else{
									chainCallback();
								}
								
							} );
							
						}
						else{
							chainCallback();
						}
						
					},
					
					function(){
						
						if( media.length ){							
							
							media.forEach(function( item ){
								tabId = item.tabId;
								self.Storage.addItemForTab(item.tabId, item);							
							});
						}
						else{							
							tabId = media.tabId;
							self.Storage.addItemForTab(media.tabId, media);
						}
				
						chrome.extension.sendRequest( {
							subject: "mediaForTabUpdate",
							data: tabId
						} );
				
						_onMediaForTabUpdateListeners.forEach(function(listener){
							listener(tabId);
						});
						
					}] );
					
					

					
				};
				
				DETECT_MODULES.forEach( function( module ){
					
					if( self[module] ){
						self[module].onMediaDetect.addListener(mediaDetectListener);						
					}
					
				} );
				
				chrome.tabs.onRemoved.addListener( function( tabId ){
					if( fvdSingleDownloader.Media.Storage.hasDataForTab( tabId ) ){
						fvdSingleDownloader.Media.Storage.removeTabData( tabId );
						
						_onMediaForTabUpdateListeners.forEach(function( listener ){
							listener( tabId );
						});
					}
				} );
				
				chrome.tabs.onUpdated.addListener( function( tabId, changeInfo ){
					
					if( changeInfo.url ){
						if( fvdSingleDownloader.Media.Storage.hasDataForTab( tabId ) ){
							fvdSingleDownloader.Media.Storage.removeTabData( tabId );
							
							_onMediaForTabUpdateListeners.forEach(function( listener ){
								listener( tabId );
							});
						}
					}
					
				} );
				
			}
			
			this.onMediaForTabUpdate = {
				addListener: function(callback){
					if (_onMediaForTabUpdateListeners.indexOf(callback) == -1) {
						_onMediaForTabUpdateListeners.push(callback);
					}
				}
			}
			
			
			
		}
		
		this.Media = new Media();
		
	}).apply(fvdSingleDownloader);
	
}
else{
	fvdSingleDownloader.Media = chrome.extension.getBackgroundPage().fvdSingleDownloader.Media;
}
