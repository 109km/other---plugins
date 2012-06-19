document.onclick = function(e) {
  var tagName = e.target.nodeName.toLowerCase();
  var element_node = e.target;
  while (tagName != 'a' && element_node) {
    element_node = element_node.parentNode;
	tagName = element_node.nodeName.toLowerCase();
  }
  
  if (tagName != 'a') return;
  if (tagName == 'a' && 
    element_node.parentNode.className.indexOf('song') > -1) {
    var data = element_node.parentNode.parentNode.querySelector('.data').innerHTML;
    /* TagName might be either td or span */
    var m = get_m(data);
    var musics = [];
    musics.push(m);
	if (m.url != '') {
	  window.externalCall('portal','-musicurlarray',JSON.stringify(musics));
	}
    //alert(m.url + m.title + m.artist + m.format);
    return false;
  }
  /*if (tagName == 'div' && e.target.className.indexOf('mod_tabs_hd') > -1) {
    window.setTimeout(update_a, 100);
  }*/
}

window.setInterval(update_a, 500);

function update_a() {
  	var anchors = document.getElementsByTagName("a");
	for (var i = 0; i < anchors.length; i++) {
	  var anchor = anchors[i];
	  if (anchor.parentNode.className.indexOf('song') > -1 && anchor.className.indexOf('downloadable') == -1) {
		var data = anchor.parentNode.parentNode.querySelector('.data').innerHTML;
		var m = get_m(data);
		
		anchor.title = '格式: ' + m.format;
		if (m.url == '') {
		  anchor.className = anchor.className + ' plain';
		} else {
		  anchor.className = anchor.className + ' downloadable';
		}
		anchor.onclick = function() { return false;}
	  }
	}
}

function get_m(data) {
  var m = {};
  var array = data.split('@@')
  if (array.length == 8) { //
    var url = array[6]
  } else if (array.length > 8) {
    var misc = array[8].split(';');
    var url = misc[0].slice(2);
  }
  m.url = url;
  m.title = array[1];
  m.artist = array[3];
  m.format = url.substring(url.lastIndexOf('.') + 1);
  m.from = 'soso';
  m.cookie = document.cookie;
  return m;
}