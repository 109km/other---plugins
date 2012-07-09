(function(){
	
	var MediaStorage = function(){
		
		var self = this;
		
		const AD_UPDATE_URLS = ["https://s3.amazonaws.com/fvd-suite/ad_signs.txt", "http://flashvideodownloader.org/fvd-suite/sites/ads.txt"];
		const DOWNLOAD_AD_SIGNS_INTERVAL = 1000 * 3600 * 24 * 3; // every 3 days
		const DOWNLOAD_AD_SIGNS_CHECK_INTERVAL = 1000 * 60 * 5; // every 5 minutes
		
		// data stores by tab id		
		var data = {};
		var adSigns = [];
		
		function itemAlreadyExists( tabId, item ){
			
			var exists = false;
			
			if( data[tabId] ){
				
				for( var i = 0; i != data[tabId].length; i++ ){
					var existsItem = data[tabId][i];
					
					if( existsItem.source == item.source ){
						
						if(fvdSingleDownloader.Media[item.source].isEqualItems( item, existsItem )){
							exists = true;
							break;
						}
						
					}
	
				}

			}
			
			
			return exists;
			
		}
		
		function getMaxPriorityForTab( tabId ){
			var max = 0;
			data[tabId].forEach(function( item ){
				if( item.priority > max ){
					max = item.priority;
				}
			});
			
			return max;			
		}
		
		function getDataByPriority( tabId, priority ){
			var result = [];
			data[tabId].forEach( function( item ){
				if( item.priority == priority ){
					result.push( item );
				}
			} );
			
			return result;
		}
		
		function refreshAdList(  ){
			
			var adSignsString = "";
			
			fvdSingleDownloader.Utils.Async.chain([
				function( chainCallback ){
					
					if( fvdSingleDownloader.Prefs.get( "snif_ad_signs" ) ){	
						adSignsString = fvdSingleDownloader.Prefs.get( "snif_ad_signs" );
						chainCallback();
					}
					else{
						var localAdFilePath = chrome.extension.getURL( "data/ad_signs.txt" );
						fvdSingleDownloader.Utils.downloadFromUrl( localAdFilePath, function( contents ){
							
							adSignsString = contents;
							chainCallback();
							
						} );													
					}
										
				},
				
				function(){
						
					adSigns = adSignsString.split( "\n" );					
											
				}
			]);	
			
		}
		
		function downloadAdList( callback ){
			
			fvdSingleDownloader.Utils.downloadFromUrlsList(AD_UPDATE_URLS, function( text ){
				
				fvdSingleDownloader.Prefs.set( "snif_ad_signs", text );
				
				if( callback ){
					callback();			
				}
				
			});			
			
		}
		
		function isAdUrl( url ){
			
			url = url.toLowerCase();
			
			for( var i = 0; i != adSigns.length; i++ ){
				
				if( url.indexOf( adSigns[i] ) != -1 ){
					return true;
				}
				
			}
			
			return false;
			
		}
		
		this.hasDataForTab = function( tabId ){						
			if( data[tabId] ){				
				return true;
			}
			return false;
		}
		
		this.getDataForTab = function( tabId ){
			if( !self.hasDataForTab( tabId ) ){
				return null;
			}
			
			var maxPriority = getMaxPriorityForTab( tabId );
			
			var data = getDataByPriority( tabId, maxPriority );
			
			data.sort( function( item1, item2 ){
				if( item1.groupId > item2.groupId ){
					return 1;
				}
				if( item1.groupId < item2.groupId ){
					return -1;
				}			
				
				var v1 = item1.orderField ? item1.orderField : 0;
				var v2 = item2.orderField ? item2.orderField : 0;				
				
				if( v1 > v2 ){
					return -1;
				}
				else if( v1 < v2 ){
					return 1;
				}
				else{
					return 0;
				}
				
			} );
			
			return data;
		}
		
		this.setDataForTab = function( tabId, tabData ){
			data[tabId] = tabData;
		}
		
		this.addItemForTab = function( tabId, item ){
			
			if( isAdUrl( item.url ) ){
				return;
			}
			
			if( itemAlreadyExists( tabId, item ) ){
				return;
			}
			
			if( !self.hasDataForTab( tabId ) ){
				data[tabId] = [];
			}
			data[tabId].push( item );
			
		}
		
		this.removeTabData = function( tabId ){
			delete data[tabId];
		}
		
		
		window.addEventListener( "load", function(){
			
			if( fvdSingleDownloader.Prefs.get( "last_ad_signs_download_time" ) == "" ){
				fvdSingleDownloader.Prefs.set( "last_ad_signs_download_time", new Date().getTime() );
			}			
			
			refreshAdList();
			
			// download ad signs interval
			setInterval( function(){
				
				if( new Date().getTime() - parseInt(  fvdSingleDownloader.Prefs.get( "last_ad_signs_download_time" ) ) > DOWNLOAD_AD_SIGNS_INTERVAL ){
					console.log( "Download ad list" );
					downloadAdList( function(){
						console.log( "Downloaded ad list" );						
						fvdSingleDownloader.Prefs.set( "last_ad_signs_download_time", new Date().getTime() )						
						refreshAdList();
					} );
				}
				
			}, DOWNLOAD_AD_SIGNS_CHECK_INTERVAL );
			
		}, false );
		
	}
	
	this.Storage = new MediaStorage();
	
}).apply( fvdSingleDownloader.Media );
