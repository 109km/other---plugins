(function(){
	var mediaid = 0;
	var pager = null;
	var mediaData = null;
	var mediaPlayData = null;
	var playMode = window.playMode || false;
	var pageSize = playMode ? 30 : 20;
	var playHashID = '';

	F.client.web.next = function(desc, pid, hashid, cid){
		var param = {desc : desc, pid : pid, hashid : cid};
		T.observer.send('webplay.next', {param : param});
	}
	function getFsp(mid){
		mediaid = mid;
		F.get("http://jsonfe.funshion.com/media/?cli=apad&ver=0.0.0.0&mid="+mid, doFsp);
	}
	 
	function doFsp(resp){
		if(!resp) return;
		var json = null;
		try{ json = T.json.parse(resp); }catch(e){};
		if(json == null || !json["return"]){
			T.get('t_v_info') && (T.get('t_v_info').innerHTML = "<div class='sys-error'>服务异常，请稍后重试！</div>");
			T.hide('dtlpl');
			T.hide('player');
			printHeader();
			return;
		}
		if(json["return"] != "succ" || !json.data){
			T.get('t_v_info') && (T.get('t_v_info').innerHTML = "<div class='sys-error'>出错了，该影片已下片</div>");
			T.hide('dtlpl');
			T.hide('player');
			printHeader();
			return;
		}
		doFspCallBack(json.data);
	}
	
	function printHeader(type){
		var map = {movie : 1, tv : 2, variety : 3, cartoon : 4};
		if(!type || !map[type]) type = 'movie';
		F.http.loadJs("http://v.zsall.mobilem.360.cn/thirdnav/index/cid/"+ map[type] +"/");
	}

	function doFspCallBack(data){
		mediaData = data;
		if(mediaData.name){ document.title = mediaData.name+'-在线观看-高清下载-'+(({tv : "电视剧", movie : "电影", cartoon : "卡通", variety : "综艺"})[mediaData.mtype] || "电影")+'-风行';};
		switch(mediaData.mtype){
			case "movie" : 
				mediaPlayData = [mediaData.pinfos];
				playMovie(mediaData);
				T.hide('dtlpl');
			break;

			case 'variety':
				mediaPlayData = mediaData.pinfos.fsps;
				playTv(mediaData)
			break;

			default :
				T.removeClass('t_v_list', 'zylist');
				mediaPlayData = mediaData.pinfos.content[mediaData.pinfos.sort[0]].fsps;
				playTv(mediaData)
			break;
		}
		printHeader(mediaData.mtype);
	}
	
	function play(mid, hashid){
		if(!mid || !hashid) return;
		if(!T.get('html-video-player-layout')){
			return;
		}
		T.show('player');
		T.swf.create({
			id : mid,
			url : 'http://static.funshion.com/main/new/swf/wwwAppPlayer.swf?v1',
			width : '100%',
			height : '100%',
			allowScriptAccess : 'always',
			wmode : 'transparent',
			allowfullscreen : 'true',
			errorMessage : "<div class='play-error'>抱歉，您需要安装Adobe Flash Player！<a target='_blank' href='"+((document.location.protocol == "https:") ? "https://" : "http://")+"get.adobe.com/cn/flashplayer/'>点击下载</a></div>",
			vars : 'type=movie&start=1&itemid='+mid+'&data='+hashid+'&startAd=1&poster=&forceDown=0&tipDown=0&stopUrl='
		}, 'html-video-player-layout');
	}
	
	function playMovie(data){
		if(!data.pinfos) return;
		play(data.mid, data.pinfos['hashid']);
		playInfo(data);
	}

	function downSoft(event){
		var hashid = String(this.getAttribute('rel'));
		var url = "http://jobsfe.funshion.com/query/v1/mp4/"+hashid+".json";
		F.jsonp(url, function(json){
			if(json && json.playlist && T.isArray(json.playlist) && json.playlist.length){
				var url = json.playlist[0]['urls'][0];
				var name = mediaData.name;
				T.array.each(mediaPlayData, function(a,b){
					if(a.hashid == hashid){
						name = a.medianame == a.taskname ? a.medianame : a.medianame + a.taskname;
						return false;
					}
				});
				var map = {
					'movie' : 'SP_DY',
					'tv' : 'SP_DS',
					'variety' : 'SP_ZY',
					'cartoon' : 'SP_DM'
				};
				window._gaq && _gaq.push(['_trackEvent','media','down', mediaData.mtype || 'movie']);
				window.location.href = url +( url.indexOf('?') > -1 ? '&' : '?' )+ "name="+encodeURIComponent(name)+"&360ext=mp4&vsrc="+encodeURIComponent('风行')+"&category=" + map[mediaData.mtype || 'movie'];
			}else{
				alert('温馨提示：您播放的影片不存在或者该影片已经下线，请您观看风行网为您提供的其他精彩影片！');
			}
		});
		//T.event.stop(T.event.get(event));
	}
		
	function updateFsp(page){
		var start = (page - 1) * pageSize, tpl = '';
		var lists = [];
		T.each(mediaPlayData.slice(start, start + pageSize), function(a,b){
			var r = a.taskname.match(/\[(.*?)\]/i);
			if(r != null && mediaData.mtype == 'variety') a.tasknameShort = r[1];
			else a.tasknameShort = a.taskname;
			a.taksnameWord = a.taskname.replace(/\[(.*?)\]/i, "");
			if(!a.picurl) a.picurl = 'http://img.funshion.com/img/app/no.jpg';
			lists.push(a);
		});
		if(playMode == false){
			tpl = '<LOOP .><li><a class="pic" href="/app/qihu_play/?mid='+mediaid+'&hashid=${hashid}"><img src="${picurl}"><i>${tasknameShort}</i><em></em></a>' + ( mediaData.mtype == 'variety' ? '<p><a href="/app/qihu_play/?mid='+mediaid+'&hashid=${hashid}">${taksnameWord}</a></p>' : '')+'<a class="dbtn normal" rel="${hashid}">下载</a></li></LOOP>';
		}else{
			tpl = '<ol><LOOP .><li rel="${hashid}"><a class="ep" href="/app/qihu_play/?mid='+mediaid+'&hashid=${hashid}">${tasknameShort}</a></li></LOOP></ol>';
		}
		T.g("t_v_list").innerHTML = F.tpl.parse(tpl, lists);
		
		T.each(T.query('#t_v_list li'), function(a,b){
			if(String(a.getAttribute('rel')) == playHashID){
				T.addClass(a, 'current');
				return false;
			}
		});
		T.each(T.query('#t_v_list a.dbtn'), function(a,b){
			T.on(a, 'click', downSoft);
		});

		if(!playHashID) return;
	}

	function playTv(data){
		if(!data.pinfos) return;
		var len = mediaPlayData.length;
		pager = new F.tool.pager({
			currentPage : 1,
			currentPage : 1,
			pageSize : pageSize,
			total : len,
			renderTo : 't_v_pages',
			update : function(){
				updateFsp(this.options.currentPage);
			}
		});
		playInfo(data);
		updateFsp(pager.options.currentPage);
	}
	
	function playInfo(data){
		var ele = T.get('dbtn_big');
		if(ele && data.mtype && data.mtype == "movie"){ ele.style.display = 'inline-block'; };
		if(T.get('t_v_poster')){
			T.get('t_v_poster').innerHTML = '<img src="'+data.picture+'" width="160" height="210" id="fun_thumb"><i><em class="fl">高清</em></i>';
			T.get('t_v_name').innerHTML = data.name;
			var info = [];
			if(T.isArray(data.lactor) && data.lactor.length){
				info.push('<li class="line">演员：<span>');
				T.each(data.lactor, function(a){
					info.push(a + ' ');
				});
				info.push('</span></li>');
			}
			if(T.isArray(data.director) && data.director.length){
				info.push('<li class="line">导演：<span>');
				T.each(data.director, function(a){
					info.push(a + ' ');
				});
				info.push('</span></li>');
			}else if(T.isArray(data.compere) && data.compere.length){
				info.push('<li class="line">主持：<span>');
				T.each(data.compere, function(a){
					info.push(a + ' ');
				});
				info.push('</span></li>');
			}
			if(data.rinfo){
				info.push('<li class="line">年代：'+data.rinfo+' </li>');
			}
			if(T.isArray(data.cates) && data.cates.length){
				info.push('<li class="line">类型：'+data.cates.join('/')+' </li>');
			}
			if(data.plots){
				info.push('<li class="intr" id="t_v_desc_less"><i>简介：</i>');
				info.push('<p>'+(T.string.getByteLength(data.plots) > 170 ? T.string.subByte(data.plots, 250) + '...<a href="#nogo" onclick="T.hide(\'t_v_desc_less\');T.show(\'t_v_desc_more\');return false;">显示详情>></a>' : data.plots) +'</p>');
				info.push('</li>');
				info.push('<li class="intr" id="t_v_desc_more" style="display:none"><i>简介：</i>');
				info.push('<p class="ll">'+data.plots+'<a href="#nogo" class="l" onclick="T.show(\'t_v_desc_less\');T.hide(\'t_v_desc_more\');return false;">&lt;&lt;&nbsp;收起</a>'+'</p>');
				info.push('</li>');
			}
			T.get('t_v_desc').innerHTML = info.join('');
			if(ele && T.isArray(mediaPlayData) && mediaPlayData.length) ele.setAttribute('rel', mediaPlayData[0].hashid);
		}else if(T.get('t_v_subject')){
			var item = null, index = 0, hashid = T.url.getQueryValue("hashid"), subject = '<strong><a href="/app/qihu_media?mid='+mediaid+'">'+mediaData.name+'</a></strong>';
			T.array.each(mediaPlayData, function(c,d){
				if(c.hashid == hashid){
					index = d;
					item = c;
					return false;
				}
			});
			if(item){
				playHashID = item.hashid;
				subject = subject + '<em>'+item.taskname+'</em>';
				play(mediaid, item.hashid);
				if(pager && Math.ceil((index+1) / pager.options.pageSize) > 1) pager.gopage(Math.ceil((index+1) / pager.options.pageSize));
				if(ele) ele.setAttribute('rel', item.hashid);
			}
			T.get('t_v_subject').innerHTML = subject;
			T.get('back_to_list').href = "/app/qihu_media?mid="+mediaid;
		}
		if(ele) T.on(ele, 'click', downSoft);
	}
	
	T.observer.add('webplay.next', function(e){
		if(e && e.param && e.param.hashid){
			var playfsps = T.g("playfsps");
			if(!playfsps) return;
			var playfspa = playfsps.getElementsByTagName("a");
			T.each(playfspa, function(a){
				var hashid = a.getAttribute("hashid");
				if(hashid && hashid == e.param.hashid){
					T.each(playfspa, function(b){ T.removeClass(b, 'on');});
					T.addClass(a, 'on');
				}
			});
		}
	});
	
	getFsp(T.url.getQueryValue("mid"));	
})();