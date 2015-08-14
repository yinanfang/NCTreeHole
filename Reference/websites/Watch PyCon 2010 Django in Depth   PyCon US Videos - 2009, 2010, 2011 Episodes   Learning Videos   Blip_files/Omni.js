/* omniture glue
 *
 * The omniture API is kind of a big hairy mess.
 *
 * site sections: home, categories, shows, episodes, search, myblip
 * page names: [site section]|[descriptive name] (e.g., categores|comedy; shows|hipsterhood)
 * nav elements: [placement]:[link text] (nav elements are static non-promo links; ex: "top nav:animation")
 * content links: [placement name]:[link name] (non-static links: hero:1, popular:capes the sieres!- trailer)
 *
 *
 * SiteCatalyst has a global variable as a single point of entry. It works in a very intuitive way (lol).
 *
 * s.linkTrackVars - a comma separated list of values that are to be sent along.
 * s.tl - function(delay, [link type], [link name])
 * 		delay : delay in ms; use 500ms for page load triggering events, use "true" for all others (wtfmate)
 * 		link type : d|e|o; d - download; e = exit; o = other.
 * 		link name : varies. no solid documentation on it yet.
 *
 * so, linkTrackVars is the list of variables that we'll be setting on s itself, so if
 * 	s.linkTrackVars === 'list1,eVar1,events'
 * then the following must be set on s before calling s.tl:
 * 	s.list1="comedy"
 * 	s.eVar1="idiocracy"
 * 	s.events="event11"
 *
 *
 *
 *  */


(function(window) {
	var evar = {
		PAGE_NAME : "eVar1", // [site section]|[descriptive name]
		SITE_SECTION : "eVar2",
		NAVIGATION_ELEMENT_NAME : "eVar5",
		CONTENT_LINK_NAME : "eVar6",
		SEARCH_TERM : "eVar7",
		SEARCH_TYPE : "eVar8",
		SERIES_NAME : "eVar11",
		SERIES_PRODUCER : "eVar12",
		EPISODE_NAME : "eVar13",
		EPISODE_NUMBER : "eVar14",
		DATE_PUBLISHED : "eVar16",
		LENGTH : "eVar18",
		DOMAIN : "eVar19",
		WEIGHTING : "eVar20",
		RATING : "eVar21",
		QUALITY : "eVar22",
		POST_ID : "eVar23",
		FACEBOOK_CONNECT_LOCATION : "eVar25",
		FACEBOOK_CONNECT_STATUS : "eVar26",
		SHARE_TYPE : "eVar27"
	},
	lists = {
		CATEGORY : "list1",
		KEYWORDS : "list2"
	},
	event = {
		PAGE_VIEW : "event1",
		NAV_ELEMENT_CLICK : "event5",
		CONTENT_LINK_CLICK : "event6",
		SEARCH :  "event7",
		SEARCH_RESULT_CLICK : "event8",
		FOLLOW : "event9",
		LOVE : "event10",
		VIDEO_START :  "event11",
		VIDEO_25_COMPLETE : "event12",
		VIDEO_50_COMPLETE : "event13",
		VIDEO_75_COMPLETE : "event14",
		VIDEO_COMPLETE : "event15",
		FACEBOOK_CONNECT_START : "event25",
		FACEBOOK_CONNECT_COMPLETE : "event26",
		SHARE :  "event27"
	};

	window.O = {
		EVAR : evar,
		LISTS : lists,
		EVENT : event,
		CACHE : {},
		getPageName : function() {
			var section = O.getSiteSection(), name;
			switch(section) {
				case 'home' : name = 'homepage'; break;
				case 'categories' : name = O.getCategoryName(); break;
				case 'shows' : name = O.getShowName(); break;
				case 'episodes' : name = O.getEpisodeName(); break;
				case 'blip player' : name = O.getPlayerType(); break;
			}
			return name ? [section,name].join('|') : section;
		},
		getCategoryName : function() {
			return $('#PageInfo').data('channel-name').toLowerCase();
		},
		getShowName : function() {
			return $('#PageInfo').data('show-name').toLowerCase();
		},
		getEpisodeName : function() {
			return $('#PageInfo').data('episode-title').toLowerCase();
		},
		getPlayerType : function() {
			if(document.getElementById('megaplaya')) {
				return 'xplayer';
			}
			else {
				return 'default player';
			}
		},
		getSiteSection : function() {
			if(document.getElementById('megaplaya')) {
				return 'blip player';
			}
			if(!document.getElementById('Content')) return '';
			switch(document.getElementById('Content').className.toLowerCase()) {
				case 'home' : return 'home';
				case 'channel' : return 'categories';
				case 'show' : return 'shows';
				case 'episode' : return 'episodes';
				case 'episodelite' : return 'episodes';
				case 'search' : return 'search';
				case 'myblip' : return 'myblip';
				default : return ''; // ??
			}
		},
		getSubscriberStatus : function() {
			var sCookie = O.getCookie('v_session');
			return (sCookie && sCookie !== 'LOGGEDOUT') ? 'connected' : 'not connected';
		},
		getEpisodeContext : function(link) {
			return O.getAttributeContext(link, 'episode-title').toLowerCase().replace(':','');
		},
		getSeriesContext : function(link) {
		    	return O.getAttributeContext(link, 'series-title').toLowerCase().replace(':','');
		},
		getChannelsContext : function(link) {
			return O.getAttributeContext(link, 'channels-list').toLowerCase().replace(':','');
		},
		getPlacementContext : function(link) {
			return O.getAttributeContext(link, 'placement').toLowerCase(); // 'cause the blippicks placement has a colon in it for, e.g., blip picks:comedy:0.
		},
		getPositionContext : function(link) {
			return O.getAttributeContext(link, 'position').toLowerCase().replace(':','');
		},
		getContentLinkText : function(link) {
			return O.getAttributeContext(link, 'link-text').toLowerCase().replace(':','');
		},
		getAttributeContext : function(link, attribute) {
			var ctx = link.data(attribute) ?
				link.data(attribute) :
				link.parents('[data-'+attribute+']').data(attribute);
			return typeof ctx !== "undefined" ? ctx.toString().toLowerCase().replace('"','_').replace("'",'_') : "";
		},
		makeList : function(list) {
			function lowercase (s) { return s.toLowerCase(); };
			if(list.constructor === Array.prototype.constructor) {
				return list.map(lowercase).join(':');
			}
			else {
				return Array.prototype.map.call(arguments, lowercase).join(':');
			}
		},
		getCookie : function(c_name) {
			var c_start = document.cookie.indexOf(c_name + "="), c_end;
			if (c_start !== -1) {
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end === -1) {
					c_end=document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start,c_end));
			}
			return null;
		},
		trigger : function(event, eventData, linkName, delay) {
			// build the manifest string & set the variables
			var manifest = ['events'];

			for(var data in eventData) {
				manifest.push(data);
				window.s[data] = eventData[data];
			}
			manifest = manifest.join(',');

			window.s.linkTrackVars = manifest;
			window.s.linkTrackEvents = event;
			window.s.events = event;

			// send it along
			s.tl(delay ? 500 : true, 'o', linkName);
		}
	};
})(window);