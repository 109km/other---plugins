(function(){
	
	var Youtube = function(){		
	
		const TITLE_MAX_LENGTH  = 96;
	
		var mediaDetectCallbacks = [];
	
		function parseYoutubeEmbed( content, callback ){			

            var jsr = content.match(/<embed[^>]+flashvars="([^\"]+?)"/i);
            
            var formats = {};
            var foundFormats = false;
            
            if (jsr != null) {
                var data = jsr[1].split('&amp;');
                for (var i = 0, j = data.length; i < j; i++) {
                    if (data[i].indexOf('fmt_url_map') == 0) {
                        info = (decodeURIComponent(data[i].substr(data[i].indexOf('fmt_url_map') + 12)));
                        
                        var map = info.split(',');
                        map.forEach(function(el, i, a){
                            var mk = el.split('|');
                            if (mk.length == 2) {
                                formats[mk[0]] = mk[1];
                            }
                        });
                        
                        foundFormats = true;
                        
                        break;
                    }
                }
                
                if (!foundFormats) {
                    // try extract url_encoded_fmt_stream_map
                    for (var i = 0, j = data.length; i < j; i++) {
                        if (data[i].indexOf('url_encoded_fmt_stream_map') == 0) {
                            info = (decodeURIComponent(data[i].substr(data[i].indexOf('url_encoded_fmt_stream_map') + "url_encoded_fmt_stream_map".length + 1)));
                            
                            var map = info.split(",");
                            for (var ii = 0; ii != map.length; ii++) {
                                var m = map[ii].match(/itag=([0-9]+)/i);
                                if (!m) {
                                    continue;
                                }
                                var tag = m[1];
                                m = map[ii].match(/url=([^&]+)/i);
                                if (!m) {
                                    continue;
                                }
                                var url = m[1];
                                
                                formats[tag] = decodeURIComponent(url);
                            }
                            
                            foundFormats = true;
                            
                            break;
                        }
                    }
                }
            }
			
            if(!foundFormats){
				var tmp = content.match( /"url_encoded_fmt_stream_map"\s*:\s*"(.+?)"/i );
				if( tmp ){
					//var map = decodeURIComponent( tmp[1] );
					tmp[1] = tmp[1].replace(/\\u0026/g, "&");
					
					var map = tmp[1].split(",");
									
                    for (var ii = 0; ii != map.length; ii++) {
                        var m = map[ii].match(/itag=([0-9]+)/i);
                        if (!m) {
                            continue;
                        }
                        var tag = m[1];
                        m = map[ii].match(/url=([^&]+)/i);
                        if (!m) {
                            continue;
                        }
                        var url = m[1];  
						url = decodeURIComponent(url);						
						
                        formats[tag] = url;
						
						/*
                        m = map[ii].match(/quality=([^&]+)/i);
                        if (m) {
							console.log( tag, m[1], url );
                        }
                        */
						
                    }
                    
                    foundFormats = true;
				}
			}
            
            if (foundFormats) {
                var ytf = {
                
                    37: {
                        title: 'Full HD',
                        frm: 'mp4',
						size: "1080p",
						orderField: 2
                    },
                    22: {
                        title: 'HD',
                        frm: 'mp4',
						size: "720p",
						orderField: 2						
                    },
                    35: {
                        title: 'High',
                        frm: 'flv',
						size: "360p"
                    },
                    34: {
                        title: 'Low',
                        frm: 'flv',
						size: "270p"
                    },
                    18: {
                        title: 'SD',
                        frm: 'mp4',
						size: "270p",
						orderField: 2						
                    },
                    6: {
                        title: 'Low',
                        frm: 'flv',
						size: "180p"
                    },
                    5: {
                        title: 'Low',
                        frm: 'flv',
						size: "180p"
                    },
                    17: {
                        title: 'Mobile',
                        frm: '3gp'
                    },
                    13: {
                        title: 'Mobile',
                        frm: '3gp'
                    },
                    43: {
                        title: "Low",
                        frm: 'webm',
						size: "270p"
                    },
                    44: {
                        title: "High",
                        frm: 'webm',
						size: "360p"
                    },
                    45: {
                        title: "HD",
                        frm: 'webm',
						size: "720p"
                    },
                    46: {
                        title: "Full HD",
                        frm: 'webm',
						size: "1080p"
                    },
                };
                
                var title = content.match(/<meta\sname=\"title\" content=\"([^\"]+)\">/i);
                if (title != null) {
					title = title[1];
					
					title = fvdSingleDownloader.Utils.decodeHtmlEntities( title );
					
                    if (title.length > TITLE_MAX_LENGTH) 
                        title = title.substr(0, TITLE_MAX_LENGTH) + '...';
                }
                
                var items = {};
                //var media = {};
                var mediaFound = false;
                
                var parsedMediaList = [];
                
                for (var i in ytf) {
                    if (!(i in formats)) {
                        continue;
                    }
                    
                    var u = formats[i];
                    
                    if ((i in ytf)) {
                        var ft = ((title != null) ? title + ' (' + ytf[i].title + ')' : null);
                    }
                    
                    var ext = ((i in ytf) ? ytf[i].frm.toLowerCase() : 'flv');
					
                    var media = {
                        displayName: ft + "." + ext,
                        url: u,
                        quality: ((i in ytf) ? (ytf[i].title) : ''),
                        ext: ext,
                        downloadName: ft + "." + ext,
						size: ((i in ytf) ? (ytf[i].size) : ''),
						orderField: ytf[i].orderField ? ytf[i].orderField : 0
                        //yt_format: i,
						//playable: (i in ytf) ? self.isPlayable((ytf[i].frm)) : false,
                    };
                    
                    parsedMediaList.push(media);
                    
                    mediaFound = true;
                }
				
				callback( parsedMediaList );
              	
                
            }
  		
			
		}
		
			
		function getContentFromYoutubePage( videoId, callback ){
			
			// send request to youtube
			
			var url = "http://www.youtube.com/watch?v="+videoId+"&additional=noparsemeplease";
			
			var ajax = new XMLHttpRequest();
			ajax.open('GET', url, true);
			ajax.youtube_id = videoId;
			ajax.setRequestHeader('Cache-Control', 'no-cache');
			
			ajax.onload = function(){
				var content = this.responseText;

				parseYoutubeEmbed( content, function( media ){
					if( media ){
						media.forEach(function( item ){
							item.groupId = videoId;
						});
					}
					
					callback( media );
				} );
			}
			
			ajax.onerror = function(){
				callback( null );
			}
			
			ajax.send( null );
		
		}
		
		
		function checkYoutubePage( data, callback ){
			
			var url = data.url;
			
			var matches = url.match(/https?:\/\/(?:www\.)?youtube\.com\/watch.*[\?|&]v=([^\?&]+)/i);
									
			if( !matches ){        
			 	callback( null ); 
				return;
			}
			
			getContentFromYoutubePage( matches[1], callback );   			
			
		}
		
		function checkYoutubeChannel( data, callback ){
	        var url = data.url
					        
	       	matches = url.match(/https?:\/\/(?:www\.)?youtube\.com\/user\/.+?[\?&]v=([^&]+)/i);		
						
			if( matches ){  						  
				getContentFromYoutubePage( matches[1], callback );   				
				return;	
			}
			
			matches = url.match(/https?:\/\/(?:www\.)?youtube\.com\/user\/([^\/\?&]+)/i);	
						
			if( !matches ){
				callback(null);
				return;
			}
			
			fvdSingleDownloader.Utils.downloadFromUrl( "http://www.youtube.com/user/" + matches[1], function( contents ){

				if( !contents ){
					return;
				}
		
				contents = contents.replace( "\\/", "/" );
							
				matches = contents.match( /data-swf-config\s*=\s*"(.+?)"/i );
				if( matches ){				 	
					
					var conf = matches[1];
					
					matches = conf.match( /\\\/vi\\\/(.+?)\\\//i ); 	
						
					if( matches ){															
						getContentFromYoutubePage( matches[1], callback );							
					}
						
				}
				
			} );
		}
		
		function checkYoutubeEmbeds( data, callback ){
			
			var url = data.url;
			
			if( url.toLowerCase().indexOf( "youtube.com" ) == -1 ){
				callback(null);
				return;
			}
					
			var matches = url.match(/:\/\/(?:www\.)?youtube(?:\.googleapis)?\.com\/v\/([^\?&]+)/i);
				
			if( !matches ){				
				matches = url.match( /:\/\/(?:www\.)?youtube\.com\/embed\/([^\?&]+)/ );				
			}	
					
			if( !matches ){
				callback( null );
				return;
			}	


			getContentFromYoutubePage( matches[1], callback );					
			
		}
		
		function storeMedia( media, data ){
			
			media.forEach(function( item ){
				item.tabId = data.tabId;
				item.priority = 1;
				item.source = "Youtube";
			});
			
			mediaDetectCallbacks.forEach( function( callback ){
				callback( media );
			} );
			
			fvdSingleDownloader.ContentScriptController.processMessage( data.tabId, {
				action: "insertYTBUtton",
				media: media
			} );		
			
		}
		
		this.getContentFromYoutubePage = function( videoId, callback ){
			getContentFromYoutubePage( videoId, callback );
		}
		
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 ){
					mediaDetectCallbacks.push( callback );
				}
			}
		}
		
		this.isEqualItems = function( item1, item2 ){
			
			if( item1.type == item2.type && item1.displayName == item2.displayName ){
				return true;
			}
			
			return false;
			
		}
		
		if( !fvdSingleDownloader.noYoutube ){
			
			chrome.webRequest.onResponseStarted.addListener(function(data){
	                
	       		
				fvdSingleDownloader.Utils.Async.chain([
					
					function( chainCallback ){
						
						checkYoutubePage( data, function( mediaToSave ){
							if( mediaToSave ){
								storeMedia( mediaToSave, data );
							}
							else{
								chainCallback();	
							}						
						} );
						
					},
					
					function( chainCallback ){
						
						checkYoutubeChannel( data, function( mediaToSave ){
							if( mediaToSave ){
								storeMedia( mediaToSave, data );
							}
							else{
								chainCallback();	
							}						
						} );
						
					},
				
				function( chainCallback ){
					
					checkYoutubeEmbeds( data, function( mediaToSave ){
						if( mediaToSave ){
							storeMedia( mediaToSave, data );
						}
						else{
							chainCallback();	
						}						
					} );
					
				},
				
				function(){
					
				}				
				
			]);
			
       
        }, {
            urls: ["<all_urls>"],
			types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "other"]
        }, ["responseHeaders"]);
			
			
		}
				
	}
	
	this.Youtube = new Youtube();
	
}).apply( fvdSingleDownloader.Media );
