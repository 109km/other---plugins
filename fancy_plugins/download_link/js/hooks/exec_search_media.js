(function()
{	

	function __has_embed()
	{
		const MEDIA_EXTENSIONS_PPT = 'mpg|mpeg|mp3|mp4|avi|rm|wmv|mov|flv|swf';

		var emb_res = document.evaluate('//embed[@src]', document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (emb_res.singleNodeValue) return true;


		var m_rx = new RegExp('^.*\\.(?:'+ MEDIA_EXTENSIONS_PPT + ')$', 'i');
		var a_itr = document.evaluate('//a[@href]', document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var a_link = a_itr.iterateNext();
		while(a_link != null)
		{
			if (m_rx.test(a_link.getAttribute('href'))) return true;
			a_link = a_itr.iterateNext();
		}

		return false;
	}
	
	function __has_youtube_html5_player(){
		
		var content = document.documentElement.innerHTML;
		
		return /url_encoded_fmt_stream_map"\s*:\s*/i.test(content);
		
	}
	
	try{
		var hm = __has_embed();	
		
		if( !hm ){
			hm = __has_youtube_html5_player();
		}
		
		chrome.extension.sendRequest({command:'has_media', result: hm}, function(response){});	
	}
	catch( ex ){

	}

	
	
})();