(function(){
	
	function _( msg ){
		return chrome.i18n.getMessage(msg);
	}
	
	VKUtils = {
		imageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoZJREFUeNpsk0trE1EUx899zEyatk6xImotaLUgFXGnIijddS/FhVsxwb1fQFz5GfwIElwX68JFN6JQi0VbU/rQJmmbTmIm874Pz0zoZHwcuDB35v5/95z/OUMuPnsNJyGVOn9j6vTynctnphKp5Ml7Til0o9haWmu86IfJS0ZzCXApVb4JhaJzF+zJx/dnbT9K8vclg8HusQfv1xujThyDydgQAEDyDcVnL5LiR9cHP84TAMug0HRDkBoUIaQoAc4owdR1tkm/RZhRL5TgJwUAKvuRApWdIdlBgmVRRhCQFkQ0CKUyciQUOIGAqAAwOIVeJDOATvV4KTfYSQkAaRapWsrMB+iEAmJRAAgExAKU1kDxZm7wogdI1SkEUyIKTZa6F0gEiCEAs+wjVEodpmlnGhhYgR7Q51gXwRYmJZNPlEcsuxskkBS6w6iCSFGwx0oLwg1QQjgjdFxI+ZZj3J6+NL1gWhYorEFZBmx4KX/YqoHBDKZmZubPCjVP0ZN26zA8ODhc4b4fPNpvtl7N3rz+wBotQ5IkxS79ESZlMMIZNLZ2Oq3WURVLf8PRUafXdp7Uv3xV1+7dWixP2iAT8Y84bR/lHPbXN529b/WKkqpGEZYNJePc+dVqVzdWPtZEHIE1bgErGcBGBouXTTDHTGhubjnbn9aqGsXpHGRa++7DwRRSEgRdd7l35Fw5NWnPGei2iiLQ2A2CM/Jzve5sfVitKCFrFEvJhglXDhhAaBD0vXfu4fHVssnmCM699DxobG47O5+/V7VCMf4HBEgO4H/XyhhzXMet1Fc39PS5iUXXjzv7zU5Fq2HaxeD/c5sy6nh+/HR3ry1ipZawqTWSTav+5+xvAQYADRQ40Hwcd4cAAAAASUVORK5CYII=",
		
	    qsToObject: function(str) {
	        var obj = {};
	        str.split('&').forEach(function(param) {
	            var parts = param.split('=');
	            var key = decodeURIComponent(parts[0] || '');
	            if (!key)
	                return;
	
	            var value = decodeURIComponent(parts[1] || '');
	            if (/^[+-]?[0-9]+$/.test(value))              
	                value = parseInt(value, 10);
	            else if (/^[+-]?[0-9]+\.[0-9]*$/.test(value)) 
	                value = parseFloat(value);
	
	            obj[key] = value;
	        });
	
	        return obj;
	    }
	};	
	

	
	var VkVideoData = function(vars) {
	    this.vars = vars;
	    this.maxSize = 0;
	    this.isVK = false;
	    this.host = '';
		this.resolutions = [360, 480, 720];
	
	    this.getTitle = function()
	    {
	        return decodeURIComponent(this.vars.md_title || '').replace(/\+/g, ' ');
	    },
	
	    this.getLinks = function()
	    {
	        var links = { 240: this._getFLV() };
	        var self = this;
	        this.resolutions.forEach(function(size) {
	            var uri = self._getHD(size);
	            if (uri){
	            	links[size] = uri;					
				}
	        });
	
	        return links;
	    },
	
	
		this.build = function()
	    {
	        var vars = this.vars;
	        var toInt = function(i) {
				return parseInt(i, 10) || 0;
			};
	
	        this.host = vars.host || 'vkontakte.ru';
	
	        vars.vkid = toInt(vars.vkid);
	        vars.uid  = toInt(vars.uid);
	
	        var maxResolutionId = toInt(vars.hd);
	        var maxSize = this._maxSizeFromId(maxResolutionId);
	
	        vars.no_flv = toInt(vars.no_flv) != 0;
	        this.isVK = toInt(vars.is_vk) != 0;
	
	        vars.hd360_link = vars.hd_link || null;
	
	        this.resolutions.forEach(function(size) {
	            var link = vars['hd' + size + '_link'];
	            if (link && maxSize < size)
	                maxSize = size;
	        });
	
	        this.maxSize = maxSize;
	    }
		
	    this._maxSizeFromId = function(id)
	    {
	        if (id == 0)
	            return 240;
	
	        return this.resolutions[id - 1];
	    },
	    this._getFLV = function()
	    {
	        var vars = this.vars;
	
	        if (vars.no_flv)
	            return this._getHD(240);
	
	        if (vars.sd_link)
	            return vars.sd_link;
	
	        if (vars.uid <= 0)
	            return 'http://' + this.host + '/assets/videos/' + vars.vtag + '' + vars.vkid + '.vk.flv';
	
	        return this._getHost() + 'u' + this._getUid(vars.uid) + '/video/' + vars.vtag + '.flv';
	    },
	    this._getHD = function(size)
	    {
	        var vars = this.vars;
	
	        if (size > 240) {
	            var link = vars['hd' + size + '_link'];
	            if (link)
	                return link;
	        }
	
	        if (vars.uid <= 0 || size > this.maxSize)
	            return null;
	
	        return this._getHost() + 'u' + this._getUid(vars.uid) + '/video/' + vars.vtag + '.' + size + '.mp4';
	    },
	    this._getHost = function()
	    {
	        var host = this.host;
	        if (host.substr(0, 4) == 'http')
	            return host;
	
	        return 'http://cs' + host + (this.isVK ? '.vk.com/' : '.vkontakte.ru/');
	    },
	    this._getUid = function(uid)
	    {
	        uid = '' + uid;
	        while (uid.length < 5)
	            uid = '0' + uid;
	
	        return uid;
	    }
	
	    this.build();
	
	    return {
	        links: this.getLinks(),
	        title: this.getTitle()
	    };
	};
	
	
	function VKAudio(){
		this.audioClasses = ["audio"];
		this.injectedSign = "fvd-vk-audio-injected";
			
		this._getURI = function( button ){	    	
			var hidden = button.getElementsByTagName( "input" )[0];
			
			if( !hidden ){
				return null;
			}
			
			var tmp = hidden.value.split( "," );
			
			if( tmp.length < 2 ){
				return null;
			}
			
			return tmp[0];			
		}	
		
		this._getTitle = function( item ){
			
			var wrap = item.getElementsByClassName( "audio_title_wrap" )[0];
			
			if( wrap ){
				var title = wrap.textContent;				
				return title.trim().replace( /\([^\)]+?\)$/, "" ).trim();
			}
			else{
				wrap = item.getElementsByClassName( "title_wrap" )[0];
				if( wrap ){
					var title = wrap.textContent;			
					return title.trim();					
				}
			}
			
			return null;	

		}
			
		this._createLink = function( uri, title ){
			var a = document.createElement( "a" );
			a.setAttribute( "href", uri );			
			
			a.setAttribute( "download", title ? title + ".mp3" : "" );
			
			var img = document.createElement("img");
            img.setAttribute("src", VKUtils.imageSrc);
			
			
			
			a.appendChild( img );
			
			return a;
		}	
					
		this.apply = function(){			
			var items = [];
			for( var i = 0; i != this.audioClasses.length; i++ ){
				var elems = document.getElementsByClassName( this.audioClasses[i] );				
				for( var j = 0; j != elems.length; j++ ){
					if( elems[j].hasAttribute( this.injectedSign ) ){
						continue;
					}
					items.push( elems[j] );
				}				
			}
			
			for( var i = 0; i != items.length; i++ ){
				var item = items[i];
				
				item.setAttribute( this.injectedSign, true );
				
				var button = item.getElementsByTagName('td')[0];
				if( !button ){
					continue;
				}
				var uri = this._getURI( button );
								
				if( !uri ){
					continue;
				}				

				var downloadLink = this._createLink( uri, this._getTitle(item));

				item.className += " fvd-vk-audio";
				
				button.appendChild( downloadLink );
			}
			
		}
	}
	
	function VKVideo(){
		this.injectedSign = "fvd-vk-injected";

		this._getPlayer = function(){
		    var player = document.getElementById('video_player');
			
			if( !player ){
				return null;
			}
			if( player.tagName == "IFRAME" ){
				return null;
			}
				
		    return player;
		},
		
		this._createLink = function( url, text ){
	        var link = document.createElement('a');
	        link.setAttribute('href', url);
	        link.setAttribute('class', 'fvd-vk-video-link');
			
			var img = document.createElement( "img" );
			img.setAttribute( "src", VKUtils.imageSrc );
			
			var span = document.createElement( "span" );						
	        span.textContent = text;
			
			link.appendChild( img );
			link.appendChild( span );
			
			return link;
		}
		
		this.apply = function(){
			var actions = document.getElementById('mv_actions');
			if( !actions ){
				throw "Fail get mv_actions";
			}
			if( actions.hasAttribute( this.injectedSign ) ){
				throw "Already injected";
			}
			
			
			var player = this._getPlayer();
			
			if( !player ){
				throw "Fail get player";
			}
			
			
			
			var flashvars = player.getAttribute('flashvars');
			
			if( !flashvars ){
				throw "Fail get flashvars";
			}
			
			flashvars = VKUtils.qsToObject( flashvars );
			
			if( !flashvars ){
				throw "Cannot convert flashvars to object"
			}
			
			var data = new VkVideoData( flashvars );
			
			if( !data.links ){
				throw "Links not found";
			}
			if( !data.title ){
				throw "Title not found";
			}
			
		
			
			for( var resolution in data.links ){
				var link = data.links[resolution];
				
				var text = "";
				if( resolution == 240 ){
					text = _("vk_download_video");	
				}
				else{
					text = _("vk_download_video_hd") + " ("+resolution+")";	
				}
				
				var linkElement = this._createLink( link, text );
				actions.appendChild( linkElement );
			}
			
			actions.setAttribute(this.injectedSign, true);
		}
	}
	
	setInterval( function(){
		try{
			(new VKVideo()).apply();
		}
		catch( ex ){

		}	
		
		try{
			(new VKAudio()).apply();
		}
		catch( ex ){
			
		}
	}, 1000 );
	





})();
