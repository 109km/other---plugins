(function(){
	
	var MainButton = function(){
		
		function getActiveTab( callback ){
			fvdSingleDownloader.Utils.getActiveTab( callback );
		}
		
		function setMainButtonStatus(can, tabId){	
			console.log( tabId, can );
							
			var img = chrome.extension.getURL('images/' + (can ? 'fvd.single.can_download.png' : 'fvd.single.cant_download.png'));
			chrome.browserAction.setIcon({
				path: img,
				tabId: tabId
			});
		}
		
		function refreshMainButtonStatus(){
			
			getActiveTab( function( tab ){
				
				if( fvdSingleDownloader.noYoutube ){
					
					if( tab.url.toLowerCase().indexOf( "//youtube.com" ) != -1
						|| tab.url.toLowerCase().indexOf( "//www.youtube.com" ) != -1 ){
						
						chrome.browserAction.setTitle( {
							title: "Due to Google Webstore Policy you're unable to download.",
							tabId: tab.id
						} );
						
					}
					
				}
				
				if( !tab ){
					setMainButtonStatus( false );	
					return;
				}				
								
				if(fvdSingleDownloader.Media.Storage.hasDataForTab( tab.id )){
					
					setMainButtonStatus( true, tab.id );
					
				}
				else{
					
					setMainButtonStatus( false, tab.id );					
					
				}
				
			} );
			
		}
		
		this.refreshMainButtonStatus = function(){
			refreshMainButtonStatus();
		}
		
		chrome.tabs.onUpdated.addListener(function( tabId, info ){
			
			getActiveTab(function( tab ){
				
				if( !info.status ){
					return;
				}
				
				if( tab.id == tabId ){
					refreshMainButtonStatus();	
				}
				
			});
			
					
		
		});		
		
		chrome.tabs.onActivated.addListener(function( info ){
			
			refreshMainButtonStatus();			
		
		});		
		
		fvdSingleDownloader.Media.onMediaForTabUpdate.addListener( function( tabId ){
			
			getActiveTab( function( tab ){

				if( !tab ){
					return;
				}				
				
				if( tabId == tab.id ){
					refreshMainButtonStatus();
				}
				
			} );
			
		} );
			
	}
	
	this.MainButton = new MainButton();
	
}).apply( fvdSingleDownloader );
