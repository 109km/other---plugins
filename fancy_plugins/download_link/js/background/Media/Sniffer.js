(function(){

    var MediaSniffer = function(){
    
        const VIDEO_EXTENSIONS = ["flv", "ram", "mpg", "mpeg", "avi", "rm", "wmv", "mov", "asf", "mp3", "rbs", "movie", "divx", "mp4", "ogg", "mpeg4", "m4v"];
        
        const AUDIO_EXTENSIONS = ["mp3"];
        
        const GAME_EXTENSION = ["swf"];
        
        const IGNORE_EXTENSIONS = ["jpg", "jpeg", "gif", "png", "bmp", "tiff"];
        
        const CONTENT_TYPE_RE = /^(video|audio)/i;
        
        const TRIGGER_VIDEO_SIZE = 1048576;
        const MIN_FILESIZE_TO_CHECK = 100 * 1024;
        
		const VIDEO2EXT = {		
			'mpeg' : 'mp4',
			'm4v': 'mp4',
			'3gpp' : '3gp',
			'flv' : 'flv',
			'quicktime' : 'mov',
			'msvideo' : 'avi',
			'ms-wmv' : 'wmv',
			'ms-asf' : 'asf'
		};
		
		const AUDIO2EXT = {		
			'realaudio' : 'ra',
			'pn-realaudio' : 'rm',
			'midi' : 'mid',
			'mpeg' : 'mp3',
			'mpeg3' : 'mp3',
			'wav' : 'wav',
			'aiff' : 'aif'
		};
		
		const TRANSLATE_EXT = {
			"m4v" : "mp4"
		};
			
        var self = this;
        
        var mediaDetectCallbacks = [];
		
		function isAllowedExt( extension ){
            if (VIDEO_EXTENSIONS.indexOf(extension) != -1) {
                return true;
            }
            
            if (AUDIO_EXTENSIONS.indexOf(extension) != -1) {
                return true;
            }
            
            if (GAME_EXTENSION.indexOf(extension) != -1) {
                return true;
            }
			
			return true;
		}
		
		function prepareMedia( media ){

			var ext = null;
			
			var disposName = dispositionName( media );
			
			if( disposName ){
				ext = fvdSingleDownloader.Utils.extractExtension( disposName );
			}
			
			if( !ext ){
				ext = getExtByContentType( getHeaderValue( "content-type", media ) );
			}
			
			if( !ext ){
				ext = fvdSingleDownloader.Utils.extractExtension( media.url );
			}
			
			ext = ext.toLowerCase();
			
			if(TRANSLATE_EXT[ext]){
				ext = TRANSLATE_EXT[ext];
			}
			
			
			var size = getHeaderValue( "Content-Length", media );
			
			var fileName = getFileName( media );		
			
			var orderField = 0;
			
			if( VIDEO_EXTENSIONS.indexOf( ext ) != -1 ){
				orderField = 1;
			}
			else if( AUDIO_EXTENSIONS.indexOf( ext ) != -1 ){
				orderField = 1;
			}
			
			return {				
				url: media.url,
				tabId: media.tabId,
				ext: ext,
				displayName: fileName ? fileName : media.url,
				downloadName: fileName ? fileName : "media." + ext,
				priority: 0,
				source: "Sniffer",
				groupId: 0,
				downloadSize: size,
				orderField: orderField,
				headers: getHeadersAll( media )
			};
			
		}
		
		function getFileName( data ){
			// check disposition name

			var dn = dispositionName( data );
			if( dn ){
				return dn;
			}
			
			var url = data.url;
			var tmp = url.split( "?" );
			url = tmp[0];
			tmp = url.split( "/" );
			tmp = tmp[ tmp.length - 1 ];
			
			if( tmp.indexOf( "." ) != -1 ){
				var replaceExt = getExtByContentType( getHeaderValue( "content-type", data ) );
				if( replaceExt ){
					tmp = tmp.split( "." );
					tmp.pop();
					tmp.push( replaceExt );
					tmp = tmp.join(".");
				}
				return decodeURIComponent(tmp);
			}
			
			return  null;		
		};
		
		function getExtByContentType( contentType ){
			if( !contentType ){
				return null;
			}
			var tmp = contentType.split("/");
			
			if( tmp.length == 2 ){
				switch( tmp[0] ){
					case "audio":
						if( AUDIO2EXT[tmp[1]] ){
							return AUDIO2EXT[tmp[1]];
						}
					break;
					case "video":
						if( VIDEO2EXT[tmp[1]] ){
							return VIDEO2EXT[tmp[1]];
						}						
					break;					
				}
			}			
			
			return null;
		}
		
		function getHeadersAll( data ){
			var result = [];
            for (var i = 0; i != data.responseHeaders.length; i++) {
            	result.push( data.responseHeaders[i].name + ": " + data.responseHeaders[i].value );
            }
			return result;
		}
		
        function getHeaderValue(name, data){
            name = name.toLowerCase();
            for (var i = 0; i != data.responseHeaders.length; i++) {
                if (data.responseHeaders[i].name.toLowerCase() == name) {
                    return data.responseHeaders[i].value;
                }
            }
            return null;
        }
        
        function dispositionName(data){
            try {
                var cd = getHeaderValue('Content-Disposition', data);
                var at = cd.match(/^(inline|attachment);/i);
                
                if ((at != null) && (at[1].toLowerCase() == 'attachment')) {
                    cd = cd.substr(at[0].length);
                    if (cd.charAt(cd.length - 1) != ';') 
                        cd += ';';
                    
                    var fnm = cd.match(/filename="(.*?)"\s*?(?:;|$)/i);
                    if (fnm == null) 
                        fnm = cd.match(/filename=(.*?)\s*?(?:;|$)/i);
                    if (fnm != null) 
                        return fnm[1];
                }
                
            } 
            catch (e) {
            }
			
            return null;
        }
		
        function isMedia(data){
            
			if( !data.tabId ){
				return false;
			}
			
            var size = getHeaderValue("content-length", data);
            
            if (!size) {
                return false;
            }
            
            if (size < MIN_FILESIZE_TO_CHECK) {
                return false;
            }
            
            var extension = fvdSingleDownloader.Utils.extractExtension(data.url);
            
            if (extension && IGNORE_EXTENSIONS.indexOf(extension) != -1) {
                return false;
            }
            
            var contentType = getHeaderValue("content-type", data);
            if (contentType) {
                var tmp = contentType.split("/")
                if (CONTENT_TYPE_RE.test(extension)) {
                    return true;
                }
            }
            
			if( isAllowedExt( extension ) ){
				return true;
			}
			
			var disposName = dispositionName( data );
			
			if( disposName ){
				var disposExt = fvdSingleDownloader.Utils.extractExtension( disposName );
				if( isAllowedExt( disposExt ) ){
					return true;
				}
			}
			
			if( size >= TRIGGER_VIDEO_SIZE ){
				return true;
			}
            
            return false;
            
        }
        
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 ){
					mediaDetectCallbacks.push( callback );
				}
			}
		}
		
		this.isEqualItems = function( item1, item2 ){
			
			return item1.url == item2.url;
			
		}
		
        chrome.webRequest.onResponseStarted.addListener(function(data){
        
		
        	if( isMedia( data ) ){				
				
				if( fvdSingleDownloader.noYoutube ){
					if( data.url.indexOf("://s.ytimg.com") != -1 || data.url.indexOf("://o-o.preferred.") != -1 || data.url.indexOf("youtube.com") != -1 ){
						return;
					}					
				}
				
				// calling callbacks
				mediaDetectCallbacks.forEach(function( callback ){
					callback( prepareMedia( data ) );
				});				
			}
            
            /*
             if( data.url.indexOf( ".flv" ) != -1 ){
             console.log( data );
             }
             */
        }, {
            urls: ["<all_urls>"],
            types: ["object", "other"]
        }, ["responseHeaders"]);
        
    }
    
    this.Sniffer = new MediaSniffer();
    
}).apply(fvdSingleDownloader.Media);
