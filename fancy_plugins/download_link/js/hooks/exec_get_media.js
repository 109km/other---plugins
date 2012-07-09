(function()
{
	function get_media()
	{
		const MEDIA_EXTENSIONS_PPT = 'mpg|mpeg|mp3|mp4|avi|rm|wmv|mov|flv|swf';
		const EMBED_URLS_RX = [
				{
					tst: '\\.youtube\\.com',
					rx : 'youtube\\.com/v/(.{11})',
					rep : 'http://www.youtube.com/watch?v=$1'
				},

				{
					tst: '\\.youtube-nocookie\\.com',
					rx : 'youtube-nocookie\\.com/v/(.{11})',
					rep : 'http://www.youtube.com/watch?v=$1'
				},

				{
					tst: '\\.santabanta\\.com',
					rx : 'video_id=([\\d]+)',
					rep : 'http://www.santabanta.com/video.asp?video=$1',
					attr: 'flashvars'
				},

				{
					tst: 'video\\.google\\.com',
					rx : 'docid=([0-9\-]+)',
					rep : 'http://video.google.com/videoplay?docid=$1'
				},

				{
					tst: 'mediaservices\\.myspace\\.com',
					rx : 'embed.aspx/m=([\\d]+)',
					rep : 'http://vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid=$1'
				},

				{
					tst: '\\.collegehumor\\.com',
					rx : 'clip_id=([\\d]+)',
					rep : 'http://www.collegehumor.com/video:$1'
				},

				{
					tst: '\\.metacafe\\.com',
					rx : 'fplayer/([\\d]+)/(.*)\\.swf',
					rep : 'http://www.metacafe.com/watch/$1/$2/'
				},

				{
					tst: '\\.dailymotion\\.com',
					rx : 'swf/([^&]+)',
					rep : 'http://www.dailymotion.com/video/$1'
				},

				{
					tst: '\\.dada\\.net',
					rx : 'mediaID=([\\d]+)',
					rep : 'http://ru.dada.net/video/$1/',
					attr: 'flashvars'
				},

				{
					tst: '\\.redtube\\.com',
					rx : '\\?id=([\\d]+)',
					rep : 'http://www.redtube.com/$1'
				}
		];


		var self = this;
		this.media = {};

		this._getAllMediaFromPage = function(){
			
			var emb_res = document.evaluate('//embed[@src]', document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var i = emb_res.iterateNext();

			while (i != null)
			{
				var url = this.embed_to_url(i);
				var xpath = this.get_xpath(i);
				var direct = true;

				if ((i.src.indexOf('.ytimg.com/yt/swf/') != -1) || (i.src.indexOf('ytimg.com/yt/swfbin/') != -1))
				{
					url = document.location.href;
					direct = false;
        
				} else if ((i.src.indexOf('www.youtube.com/v/') != -1) || (i.src.indexOf('www.youtube-nocookie.com/v/') != -1))
				{
					direct = false;
				}

				this.media[url] = {xpath: xpath, url: url, direct:direct};
				i = emb_res.iterateNext();
			}
			
			if( document.location.host.toLowerCase().indexOf("youtube.com") != -1 ){
				this._mediaFromYoutubeHTML5();
			}
			


			var m_rx = new RegExp('^.*\\.(?:'+ MEDIA_EXTENSIONS_PPT + ')$', 'i');
			var a_res = document.evaluate('//a[@href]', document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			i = a_res.iterateNext();

			while(i != null)
			{
				var url = i.href;
				var xpath = this.get_xpath(i);

				if (m_rx.test(url)) this.media[url] = {xpath: xpath, url: url, direct:true};
				i = a_res.iterateNext();
			}

			return this.media;
			
		}

		this._mediaFromYoutubeHTML5 = function(){
			var content = document.documentElement.innerHTML;

			
			var tmp = content.match( /"url_encoded_fmt_stream_map"\s*:\s*"(.+?)"/i );
			if( tmp ){

				var xpath = null;
				try{
					var playerElem = document.getElementsByClassName( "player-container" )[0];	
					xpath = this.get_xpath(playerElem);		
				}
				catch( ex ){
					
				}
				
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
					
					this.media[document.location.href] = {xpath: xpath, url: document.location.href, direct:false};
                }
                
                foundFormats = true;
			}			
			
		}
		
		this.build_list = function()
		{
			
			this._getAllMediaFromPage();
						
			return this.media;			
			
		}

		this.embed_to_url = function(embed)
		{
			var src = embed.src;
			for (var i = 0, j = EMBED_URLS_RX.length; i < j; i++)
			{
				var rx = new RegExp(EMBED_URLS_RX[i].tst, 'i');
				if (rx.test(src))
				{
					var txt = src;
					if ('attr' in EMBED_URLS_RX[i]) txt = embed.getAttribute(EMBED_URLS_RX[i].attr);
					var rxe = new RegExp(EMBED_URLS_RX[i].rx, 'i');
					var matches = rxe.exec(txt);
					if (matches != null)
					{
						var url = EMBED_URLS_RX[i].rep;
						for (k = 1, l = matches.length; k < l; k++)
						{
							url = url.replace('$' + k, matches[k]);
						}       
						return url;
					}
				}
			}

			return src;
		};

		this.get_xpath = function(node)
		{
			var result = '';
			if (node.parentNode != null) result += this.get_xpath(node.parentNode);

			switch (node.nodeType)
			{
				case Node.ELEMENT_NODE:
				{
					result+= '/' + node.nodeName.toLowerCase();
					break;
				}

				case Node.TEXT_NODE:
				{
					result+= '/text()';
					break;
				}
			}
	
			if (node.parentNode != null)
			{
				var ni = this.node_index(node);
				if (ni) result+= '[' + ni + ']';
			}
			return result;
		};

		this.node_index = function(node)
		{
			if (node.parentNode != null)
			{
				var ct = 0;
				for (var i = node.parentNode.firstChild; i != null; i = i.nextSibling)
				{
					if ((node.nodeType == i.nodeType) && ((i.nodeType == Node.TEXT_NODE) || (i.nodeName == node.nodeName)))
					{
						ct++;
						if (node == i)
						{
							if (((i.nextSibling != null) && (ct == 1)) || (ct > 1)) return ct;
						}
					}
				}
			}
			return '';
		}
	}

	var ml = (new get_media()).build_list();
	chrome.extension.sendRequest({command:'get_media', result: ml, url: document.location.href}, function(response){});
})();