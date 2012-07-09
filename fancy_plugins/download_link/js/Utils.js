function _b( v ){
	if( typeof v == "boolean" ){
		return v;
	}
	
	if( v == "true" ){
		return true;
	}

	return false;
}

function _isb( v ){
	if( typeof v == "boolean" ){
		return true;
	}
	
	if( v == "true" || v == "false" ){
		return true;
	}

	return false;
}

function _r( v ){
	
	if( _isb( v ) ){
		return _b(v);
	}
	return v;
	
}

(function(){
	
	var Utils = function(){
		
	}
	
	Utils.prototype = {
		
		_isFirstRun: false,
		_isVersionChanged: false,
		
		
		
		extractExtension: function( path ){
			try{
				var tmp = path.split("?");
				tmp = tmp[0].split( "." );
				var ext = tmp[tmp.length-1].toLowerCase();		
				return ext;	
			}
			catch(ex){
				return null;
			}	
		},
		
		getActiveTab: function( callback ){
			chrome.tabs.query( {
				active: true,
				currentWindow: true
			}, function( tabs ){
				if( tabs.length == 0 ){
					callback( null );
				}
				else{
					callback( tabs[0] );
				}
			} );
		},
		
		decodeHtmlEntities: function( text ){
			var tmp = document.createElement("div");
			tmp.innerHTML = text;
			return tmp.textContent;
		},
		
		copyToClipboard: function( text ){
			var bg = chrome.extension.getBackgroundPage();
			
			var clipboardholder = bg.document.getElementById("clipboardholder");			
			clipboardholder.value = text;			
			clipboardholder.select();			
			bg.document.execCommand("Copy");
		},
		
		getOffset: function( obj ) {
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
		},
		
		downloadFromUrl: function( url, callback ){
			this.downloadFromUrlsList( [url], callback );
		},		
		
		downloadFromUrlsList: function( listUrls, callback ){
			
			var that = this;
			
			that.Async.arrayProcess( listUrls, function( url, arrayProcessCallback ){
				
				var xhr = new XMLHttpRequest();
				
		        xhr.open('GET', url);
		        xhr.setRequestHeader('Cache-Control', 'no-cache');
		        xhr.onload = function( ){
					
					if( xhr.status != 200 ){
						arrayProcessCallback();
					}
					else{
						callback( xhr.responseText );
					}
					
				}
				
				xhr.onerror = function(){
					arrayProcessCallback();
				}
				
		        xhr.send(null);
				
			}, function(){
				callback( null );
			} );
			

			
		},
		
		bytesToMb: function( bytes ){
			return Math.round( 100 * bytes / 1024 / 1024 ) / 100;
		},
		
		getSizeByUrl: function( url, callback ){
			var ajax = new XMLHttpRequest();
			ajax.open('HEAD', url);
			ajax.setRequestHeader('Cache-Control', 'no-cache');
			ajax.url = url;
					
			ajax.onreadystatechange = function(){
				if( this.readyState == 3 ){
					var size = this.getResponseHeader("Content-Length");
					if (this.status == 200) {
						if( size ){
							callback( size );		
							this.abort();
						}
					}				
				}
				
				if (this.readyState == 4) {
					if (this.status == 200) {
						var size = null;
						try{
							size = this.getResponseHeader("Content-Length");
						}
						catch(ex){}
	
						callback( size );					
					}
					else{
						callback( null );
					}
				}
				
			}		
			
			ajax.send( null );
		},
		
		Async: {
			
			chain: function( callbacksChain ){
				
				var dataObject = {};
				
				var f = function(){
					if( callbacksChain.length > 0 ){
						var nextCallback = callbacksChain.shift();						
						nextCallback( f, dataObject );
					}					
				}
				
				f();
				
			},
			
			arrayProcess: function( dataArray, callback, finishCallback ){
				
				var f = function( i ){
					
					if( i >= dataArray.length ){
						finishCallback();
					}
					else{
						callback( dataArray[i], function(){
							f(i + 1);
						} );
					}
					
				}	
				
				f(0);			
				
			}
			
		},
		
		isFirstRun: function(){
						
			if( this._isFirstRun ){
				return this._isFirstRun;
			}
			
			if( _b( fvdSingleDownloader.Prefs.get( "is_first_run" ) ) ){
				this._isFirstRun = true;
				return true;
			}
			
			return false;
			
		},
		
		isVersionChanged: function(){
			
			if( this._isVersionChanged ){
				return this._isVersionChanged;
			}
			
			var app = chrome.app.getDetails();
			
			if( fvdSingleDownloader.Prefs.get( "last_run_version" ) != app.version ){
				this._isVersionChanged = true;
				fvdSingleDownloader.Prefs.set( "last_run_version", app.version );
			}
			
			return this._isVersionChanged;
			
		}	
		
	}
	
	this.Utils = new Utils();
	
}).apply( fvdSingleDownloader );
