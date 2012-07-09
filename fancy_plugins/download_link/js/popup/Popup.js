(function(){
	
	var Popup = function(){
		
		var self = this;
		
		const ALLOWED_EXT_IMAGES = [
			"flv",
			"mp3",
			"mp4",
			"pdf",
			"swf",
			"webm"
		];
		
		const INTERVAL_TO_DISPLAY_WRITE_REVIEW = 15 * 24 * 3600 * 1000; // 15 days
		
		function threadsOfActiveTab( callback ){
			
			fvdSingleDownloader.Utils.getActiveTab( function( tab ){
				
				if( !tab ){
					callback( null );
				}
				else{
					callback( fvdSingleDownloader.Media.Storage.getDataForTab( tab.id ) );
				}
				
			} );
			
		}
		
		function getExtImage( ext ){
			if( ALLOWED_EXT_IMAGES.indexOf(ext) == -1 ){
				return;
			}
			
			ext = ext.toLowerCase();
		
			return "images/formats/"+ext+".png";
		}
		
		function buildThreadItem( media ){
			
			function fbc( className ){
				return item.getElementsByClassName(className)[0];
			}
			
			var item = document.getElementById("download_item_template").cloneNode( true );
			
			item.removeAttribute( "id" );
			
			fbc("download_button").setAttribute( "href", "#" );			
				
			fbc("download_url").textContent = media.displayName;
			
			if( media.downloadSize ){
				fbc("size").textContent = fvdSingleDownloader.Utils.bytesToMb(media.downloadSize) + "MB";
			}
			else{
				fbc("size").setAttribute( "loading", 1 );
				fvdSingleDownloader.Utils.getSizeByUrl( media.url, function( size ){
					
					fbc("size").removeAttribute( "loading" );
					if( size ){
						fbc("size").textContent = fvdSingleDownloader.Utils.bytesToMb( size ) + "MB";
					}
					
				} );				
			}
			
			function onClick( event ){
				fvdSingleDownloader.Media.startDownload( media );
				
				fbc("download_button").setAttribute( "loading", 1 );
				
				setTimeout( function(){
					fbc("download_button").removeAttribute( "loading" );					
				}, 5000 );

				event.stopPropagation();												
			}
					
			item.addEventListener("mouseover", function(){
				
				fvdSingleDownloader.Utils.getActiveTab( function( tab ){
					fvdSingleDownloader.ContentScriptController.processMessage( tab.id, {
						action: "highlightMedia",
						media: media
					} );					
				} );
				
			}, false);					
			
			item.addEventListener("mouseout", function(){
				
				fvdSingleDownloader.Utils.getActiveTab( function( tab ){
					fvdSingleDownloader.ContentScriptController.processMessage( tab.id, {
						action: "unhighlightMedia"
					} );					
				} );
					
				
			}, false);								
									
			fbc("download_button").addEventListener("click", onClick, false)
			
			fbc("copyLink").addEventListener( "click", function( event ){
				
				fvdSingleDownloader.Utils.copyToClipboard( media.url );
				
				event.stopPropagation();
				
			}, false );
			
			console.log(fbc("download_button"));
								
			var topOfImageText = "";
				
			if( media.size ){				
				topOfImageText = media.size;
			}	
									
			if( !topOfImageText && media.quality ){				
				topOfImageText = media.quality;
			}
			
			if( topOfImageText ){
				fbc("media_quality").textContent = topOfImageText;
			}
			
			var extImage = getExtImage( media.ext );
			
			if( extImage ){
				fbc("media_format").getElementsByTagName("img")[0].setAttribute( "src", extImage );
			}
			
			return item;
			
		}
		
		this.init = function(){			
			self.rebuildThreadsList();
									
			if( !_b(fvdSingleDownloader.Prefs.get( "popup.display_slow_download_hint" )) ){
				document.getElementById("slowDownloadHint").setAttribute("hidden", true);
			}			
			
			if( !chrome.webRequest ){
				document.getElementById("updateChromeNotice").removeAttribute("hidden");
				document.getElementById("multiple_download_block_title").setAttribute("hidden", true);
			}
			
			if( fvdSingleDownloader.noYoutube ){
				document.getElementById("help_link_converter").style.display = "none";				
			}
			
			if( !fvdSingleDownloader.noYoutube ){
				document.getElementById("help_link_convert_video").style.display = "none";				
			}
			
			var now = new Date().getTime();
			
			if( now - fvdSingleDownloader.Prefs.get( "install_time" ) < INTERVAL_TO_DISPLAY_WRITE_REVIEW ){
				document.getElementById("help_link_write_review").style.display = "none";	
			}
			
			chrome.extension.onRequest.addListener( function( request ){
				
				if( request.subject == "mediaForTabUpdate" ){
					
					fvdSingleDownloader.Utils.getActiveTab( function( tab ){
						
						if( tab.id == request.data ){
							
							self.rebuildThreadsList();
							
						}
						
					});
					
				}
				
			} );
		}
		
		this.closeSlowDownloadHint = function(){
			fvdSingleDownloader.Prefs.set( "popup.display_slow_download_hint", false );
			document.getElementById("slowDownloadHint").setAttribute("hidden", true);
		}

		this.rebuildThreadsList = function(){
			threadsOfActiveTab( function( threads ){
						
				if( threads ){
					
					var container = document.getElementById("download_item_container");
					while( container.firstChild ){
						container.removeChild( container.firstChild );
					}
					
					var currentGroup = null;
					
					threads.forEach(function( thread ){
						try{
							
							if( currentGroup == null ){
								currentGroup = thread.groupId;
							}
							
							var item = buildThreadItem( thread );	
											
							if( currentGroup != thread.groupId ){
								container.appendChild( document.createElement("hr") );	
								currentGroup = thread.groupId;
							}	
								
							container.appendChild( item );				
						}
						catch( ex ){
							console.log( ex );				
						}


					});
					
				}
				
			} );
		}	
		
	}
	
	this.Popup = new Popup();
	
}).apply( fvdSingleDownloader );
