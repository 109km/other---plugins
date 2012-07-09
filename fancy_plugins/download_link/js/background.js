// developed by Moiseev Vladimir (cdb@linkycat.com, icq: 625986105)
// revised by Denis CaliberoV


window.addEventListener( "load", function(){
	
	fvdSingleDownloader.Media.init();
	fvdSingleDownloader.MainButton.refreshMainButtonStatus();
	
	if( fvdSingleDownloader.Utils.isVersionChanged() && !fvdSingleDownloader.noYoutube && !fvdSingleDownloader.noWelcome ){
		chrome.tabs.create({
			url: "http://flashvideodownloader.org/fvd-suite/page/welcome-chrome-downloader",
			active: true
		});
	}
	
	if( fvdSingleDownloader.Prefs.get( "install_time" ) == 0 ){
		fvdSingleDownloader.Prefs.set( "install_time", new Date().getTime() )
	}
	
}, false );


/*
var toolbar = null;
var toolbar_version = 1;
var cache_ttl = 60000;
var youtube_cache_ttl = 300000;
var displaySpeedDialHintAfter = 3600 * 24 * 5 * 1000; // five days
var displaySpeedDialHintEvery = 3600 * 24 * 1 * 1000; // one day

//var displaySpeedDialHintAfter = 0; // five days
//var displaySpeedDialHintEvery = 0; // one day

function FVD_Single()
{
	var self = this;
	this.cache = new SimplyCache(cache_ttl);
	this.youtube_cache = new SimplyCache(youtube_cache_ttl);
	this.detector = new FVD_site_detector();


	this.set_main_button_status = function(can)
	{
		var img = chrome.extension.getURL('images/' + (can ? 'fvd.single.can_download.png' : 'fvd.single.cant_download.png'));
		chrome.browserAction.setIcon({path: img});
	}

	this.check_main_button_status = function(url, tab_id)
	{
		if (url.match(/^https?:\/\//i) != null)
		{
			var supported = this.cache.get_info(url);
			if (supported == null)
			{
				supported = this.detector.is_supported(url);
				this.cache.put_info(url, supported);

				// check for embed media
				if (!supported) chrome.tabs.executeScript(tab_id, {file: 'js/hooks/exec_search_media.js', allFrames: false});
			}
			this.set_main_button_status(supported);
		} else
		{
			this.set_main_button_status(false);
		}
	};

	this.update_main_button_status = function()
	{
		chrome.windows.getCurrent(function(window)
		{
			chrome.tabs.getSelected(window.id, function(tab)
			{
				self.check_main_button_status.call(self, tab.url, tab.id);
			});
		});
	};

	this.tab_updated = function(tabId, changeInfo, tab)
	{
		if (('status' in changeInfo) && (changeInfo.status == 'loading'))
		{
			if ('url' in tab) self.check_main_button_status.call(self, tab.url, tab.id);
		}
	};

	this.tab_selected = function(tabId, selectInfo)
	{
		chrome.tabs.getSelected(selectInfo.windowId, function(tab)
		{
			if ('url' in tab) self.check_main_button_status.call(self, tab.url, tab.id);
		});
	};

	this.request_recived = function(request, sender, sendResponse)
	{
		if ('command' in request)
		{
			switch (request['command'])
			{
				case 'has_media':
				{
					if ((sender.tab != null) && ('result' in request))
					{
						self.cache.put_info(sender.tab.url, request['result']);
						self.update_main_button_status.call(self);
					}
					break;
				}

				default:
				{
					break;
				}
			}
		}
	};


	chrome.tabs.onUpdated.addListener(this.tab_updated);
	chrome.tabs.onSelectionChanged.addListener(this.tab_selected);
	chrome.extension.onRequest.addListener(this.request_recived);
	this.update_main_button_status();
}

function processSpeedDialHint(){
	
	var now = new Date().getTime();	
		
	if( localStorage["dont_display_fvdsd_hint"] == "true" ){
		return;
	}
	
	if( !localStorage["fvdsdLastHintDisplayTime"] ){
	
		localStorage["fvdsdLastHintDisplayTime"] = now + displaySpeedDialHintAfter;
	}
	else{
		
		// need display fvdsd hint
		chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab ){
			
			if( localStorage["dont_display_fvdsd_hint"] == "true" ){
				return;
			}
			
			if( tab.status == "complete" ){
				now = new Date().getTime();					
					
				if (now - localStorage["fvdsdLastHintDisplayTime"] >= displaySpeedDialHintEvery) {										
					
					// display hint now
					localStorage["fvdsdLastHintDisplayTime"] = now;
					
					var port = chrome.tabs.connect(tab.id, {
						name: "fvdsd_hint"
					});
					
					port.postMessage( {
						"action": "displayHint"
					} );
					
				}
			}	
			
		});			
		
		
	}
	
}

function init()
{
	// load settings
	var ajax = new XMLHttpRequest();
	ajax.open('GET', chrome.extension.getURL('manifest.json'), true);
	ajax.onreadystatechange = function()
	{
		try
		{
			if (this.readyState == 4)
			{
				var manifest = JSON.parse(this.responseText);
				if ('version' in manifest) toolbar_version = manifest.version;
				toolbar = new FVD_Single();
			}
		} catch (e){}
	};
	ajax.send(null);
	
	//processSpeedDialHint();
}
*/
