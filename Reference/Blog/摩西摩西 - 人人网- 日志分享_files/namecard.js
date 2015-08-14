object.define("xn/namecard","events, net",function(_1,_2){
var _3=_1("events");
var _4=_1("net");
var _5={__getXY:function(_6){
var x=0,y=0;
while(_6.offsetParent){
x+=_6.offsetLeft;
y+=_6.offsetTop;
_6=_6.offsetParent;
}
return {x:x,y:y};
},__getScrollTop:function(){
if(document.documentElement&&document.documentElement.scrollTop){
return document.documentElement.scrollTop;
}else{
return document.body.scrollTop;
}
},__getScrollLeft:function(){
if(document.documentElement&&document.documentElement.scrollLeft){
return document.documentElement.scrollLeft;
}else{
return document.body.scrollLeft;
}
},__getViewportWH:function(){
var _7,_8;
if(typeof window.innerWidth!="undefined"){
_7=window.innerWidth;
viewportheight=window.innerHeight;
}else{
if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){
_7=document.documentElement.clientWidth;
viewportheight=document.documentElement.clientHeight;
}else{
_7=document.getElementsByTagName("body")[0].clientWidth;
viewportheight=document.getElementsByTagName("body")[0].clientHeight;
}
}
return {viewportwidth:_7,viewportheight:viewportheight};
}};
var TI={overTimer:500,outTimer:500,overInterval:null,outInterval:null,clearTimerInterval:function(_9){
if(_9){
clearTimeout(_9);
_9=null;
}
}};
_2.Namecard=function(_a){
this.ncAttr="namecard";
this.preAjaxLoaded=null;
this.additionalY=_a;
this.preScrollY=0;
this.init();
};
_2.Namecard.prototype={init:function(){
this.createNamecardWrapper();
this.triggerNamecardEvent();
this.addIFrameMouseEvent();
},createNamecardWrapper:function(){
var _b=document.createElement("iframe");
_b.setAttribute("src","http://www."+XN.env.domain+"/getoutnc");
_b.setAttribute("id","framenamecard");
_b.setAttribute("scrolling","no");
_b.setAttribute("width",318);
_b.setAttribute("height",164);
_b.frameBorder="no";
_b.allowTransparency=true;
_b.style.display="none";
_b.style.position="absolute";
_b.style.zIndex=9999;
document.body.appendChild(_b);
this.ncWrapper=_b;
},triggerNamecardEvent:function(){
var _c=this;
document.delegate("*["+this.ncAttr+"]","mouseover",function(e){
var _d=XN.event.element(e);
if(!_d.getAttribute("namecard")){
if(_d.tagName.toLowerCase()=="img"){
var _e=_d;
}
_d=XN.element.parent(_d,"[namecard]");
}
var _f=intUid=_d.getAttribute("namecard");
var _10=explanation=null;
if(_d.href&&(_d.href.indexOf("zhan.renren.com")!=-1||_d.href.indexOf("xiaozu.renren.com")!=-1||_d.href.indexOf("places.renren.com")!=-1||_d.href.indexOf("app.renren.com")!=-1||_d.href.indexOf("qun.renren.com")!=-1||_d.href.indexOf("page.renren.com")!=-1||(/^6/.test(_f)&&_f.length===9))){
return;
}
_d.title="";
if(_e){
_e.title=_e.alt="";
}
_c.isSocialGraph=false;
var pre="SgCardFriend";
if(_d.getAttribute("recommend")&&_d.getAttribute("data-type")){
_f="recommendFriend_"+_f;
_10=_d.getAttribute("data-type");
explanation=_d.getAttribute("explanation");
_c.isSocialGraph=true;
pre="SgCardRcd";
}
_c.hoverLogParam=[pre+"_hover",XN.user.id,intUid,(_10?_10:"NULL")].join("|");
if(XN.element.hasClassName(_d,"avatar")&&XN.element.hasClassName(_d.parentNode,"a-reply")){
_c.trigger=_d;
}else{
_c.trigger=_e?_e:_d;
}
if(XN.element.hasClassName(_c.trigger.parentNode,"status-down")){
return;
}
_c.overCard(_f,_c.trigger,_10,explanation);
},_3.HOLD);
document.delegate("*["+this.ncAttr+"]","mouseout",function(e){
_c.outCard();
},_3.HOLD);
},overCard:function(id,_11,_12,_13){
var _14=this;
TI.clearTimerInterval(TI.outInterval);
TI.overInterval=setTimeout(function(){
if(!_14.isNeedAjaxReq(_11)){
_14.logCard(_14.hoverLogParam);
_14.addLogEvent();
_14.loadCardContent(id,_11,_12,_13);
_14.positionCard(_11);
}
},TI.overTimer);
if(_11.tagName.toLowerCase()=="img"){
_11=XN.element.parent(_11,"a");
if(_11){
if(_11.getAttribute("data-fromrcd")){
window.globalNamecard.delRcd=XN.element.parent(_11,"li");
}else{
window.globalNamecard.delRcd=null;
}
}
}
},outCard:function(){
var _15=this;
TI.clearTimerInterval(TI.overInterval);
TI.outInterval=setTimeout(function(){
_15.hideCard();
},TI.outTimer);
},addIFrameMouseEvent:function(){
var _16=this;
XN.event.addEvent(this.ncWrapper,"mouseover",function(){
TI.clearTimerInterval(TI.outInterval);
},_3.HOLD);
XN.event.addEvent(this.ncWrapper,"mouseout",function(){
TI.outInterval=setTimeout(function(){
_16.hideCard();
},TI.outTimer);
},_3.HOLD);
},addLogEvent:function(){
if(this.isInited){
return;
}
var _17=XN.element.$(this.getNcIdContainer("namecard"));
if(!_17){
return;
}
this.isInited=true;
var _18=this;
var _19=function(_1a,pid){
var _1b=_18.ajaxJson;
var pre="SgCardFriend",_1c="NULL";
if(_18.isSocialGraph){
pre="SgCardRcd";
_1c=_1b.type;
}
return [pre+_1a,_1b.userId,pid||_1b.ownerId,_1c].join("|");
};
_17.delegate("a.add-friend","click",function(){
_18.logCard(_19("_addFriend"));
});
_17.delegate("a.owner-name","click",function(){
_18.logCard(_19("_nameToPrf"));
});
_17.delegate("img","click",function(_1d){
var pid=this.getAttribute("pid");
_18.logCard(_19("_imgToPrf",pid));
});
_17.delegate("a.have-talk","click",function(){
_18.logCard(_19("_privateChat"));
});
},loadCardContent:function(_1e,_1f,_20,_21){
var _22=this.getNcIdContainer("namecard");
var _23=this;
this.addLoading();
var url="http://www."+XN.env.domain+"/newnamecard?uid="+_1e+(_20?"&data-type="+_20:"")+(_21?"&explanNumber="+_21:"");
new XN.net.xmlhttp({url:url,method:"get",useCache:true,onSuccess:function(r){
var _24;
try{
_24=XN.json.parse(r.responseText);
}
catch(e){
_23.deleteAjaxCache(url);
_24=null;
}
if(_24===null){
_23.hideCard();
return;
}
_24=_23.dealData(_24);
var _25=156;
var _26=316;
var _27=" newcard ";
if(_24.cover&&XN.string.trim(_24.cover)!=""){
_25=216;
_27+=" timeline-bg ";
}
_22.style.height=_25+"px";
_22.style.width=_26+"px";
_23.ncWrapper.removeAttribute("height");
_23.ncWrapper.setAttribute("height",_25+8);
if(_24.isFriend){
_27+=" friend ";
}
_22.innerHTML=_23.createCardHtml(_24,_1f);
_23.ajaxJson=_24;
_23.preAjaxLoaded=_1f;
Sizzle("a",_23.getIFrameDocument())[0].href+="&ref="+window.location.host;
_23.positionCard(_1f,_25+8);
_22.className+=_27;
_22.className=_22.className;
},onError:function(){
_23.hideCard();
_23.deleteAjaxCache(url);
}});
},deleteAjaxCache:function(url){
var _28=XN.net.cache._cacheData;
XN.Array.each(_28,function(i,v){
if(v.key===url){
_28.splice(i,1);
return false;
}
});
},dealData:function(_29){
var _2a=this;
if(_29.isFriend&&_29.photoList&&_29.photoList.length>0){
if(_29.photoList.length>3){
_29.photoList.length=3;
}
XN.Array.each(_29.photoList,function(i,v){
_2a.dealStr(v,"description","descriptionAll",4);
});
}
_2a.dealStr(_29,"name","nameAll",8);
_2a.dealStr(_29,"region",null,10);
_29.relationAll="";
_29.recommendFriend=!!_29.recommendList;
if(!_29.isFriend||_29.recommendFriend){
_2a.dealStr(_29,"relation","relationAll",16);
}
_29.isMine=XN.user.id==_29.ownerId;
_29.poprecomend=this.isSocialGraph;
_29.popcommon=!_29.isMine&&!this.isSocialGraph&&!_29.isFriend&&_29.count>5;
_29.unpop=_29.isFriend||(!this.isSocialGraph&&_29.count<=5);
if(/.*\d{1,3}%.*/.test(_29.relationAll)){
_29.unpop=true;
_29.poprecomend=false;
}
return _29;
},dealStr:function(obj,_2b,_2c,_2d){
if(obj[_2b]&&obj[_2b].length>_2d){
if(_2c){
obj[_2c]=obj[_2b];
}
obj[_2b]=obj[_2b].substring(0,_2d)+"…";
}
},createCardHtml:function(_2e,_2f){
var _30=_2e.cover;
var _31=this;
if(_30&&XN.string.trim(_30)!=""){
_2e.cover=this.getSuotu(_30,"/p/m2w316hq85lt_");
}else{
_2e.cover=false;
}
if(_2e.photoList){
XN.Array.each(_2e.photoList,function(i,v){
_2e.photoList[i].url=_31.getSuotu(v.url,"/p/m3w60h45q85lt_");
});
}
var _32=["<em></em>","{{#cover}}","<a href=\"http://www.renren.com/profile.do?id={{ownerId}}\" target=\"_blank\" class=\"cover\" style=\"background:url('{{cover}}') center center no-repeat;\"></a>","{{#notIE6}}","<a href=\"http://www.renren.com/profile.do?id={{ownerId}}\" target=\"_blank\" class=\"cover-bg\" style=\"background:url('http://s.xnimg.cn/modules/namecard/res/bg.png') left bottom repeat-x;\"></a>","{{/notIE6}}","{{/cover}}","<div class=\"nc-avatar\">","    <a target=\"_blank\" id=\"avatar_link\" href=\"http://www.renren.com/profile.do?id={{ownerId}}\">","        <img onload=\"centerAvatar(this);\" src=\"{{head}}\" />","    </a>","</div>","<div class=\"nc-content clearfix\">","    <h1>","        <a target=\"_blank\" title=\"{{nameAll}}\" class=\"owner-name\" href=\"http://www.renren.com/profile.do?id={{ownerId}}\">{{name}}</a>","        {{#vipIcon}}","        <a target=\"_blank\" href=\"http://i.renren.com/icon\">","            <img src=\"{{vipIcon}}\" alt=\"vip\" />","        </a>","        {{/vipIcon}}","        <span clsss=\"region\">{{region}}</span>","    </h1>"," \t{{#isFriend}}","        {{#poprecomend}}","        <a href=\"#nogo\" title=\"{{relationAll}}\" onclick=\"top.shareSameOriginFrineds('{{relation}}', {{ownerId}}, '{{type}}');\">{{relation}}</a>","        {{/poprecomend}}","\t{{/isFriend}}","    {{^isFriend}}","    <p>","        {{#poprecomend}}","        <a href=\"#nogo\" title=\"{{relationAll}}\" onclick=\"top.shareSameOriginFrineds('{{relationAll}}', {{ownerId}}, '{{type}}');\">{{relation}}</a>","        {{/poprecomend}}","        {{#popcommon}}","        <a href=\"#nogo\" title=\"{{relationAll}}\" onclick=\"top.showShareFriends({{ownerId}});\">{{relation}}</a>","        {{/popcommon}}","        {{#unpop}}","        <span title=\"{{relationAll}}\">{{relation}}</span>","        {{/unpop}}","    </p>","    {{/isFriend}}","\t\t{{#recommendFriend}}"," \t\t\t<p><a href=\"#nogo\" title=\"你可能对这些人也感兴趣\" onclick=\"top.shareSameOriginFrineds('你可能对这些人也感兴趣', {{ownerId}}, '{{type}}');\">你可能对这些人也感兴趣</a></p>","\t\t{{/recommendFriend}}","    <div class=\"item-list\">","        {{#isFriend}}","            {{#photoList}}","            <a class=\"friend-image\" target=\"_blank\" href=\"http://photo.renren.com/photo/{{ownerId}}/latest/photo-{{id}}?psource=29\">","                <img title=\"{{descriptionAll}}\" alt=\"{{descriptionAll}}\" width=\"60\" height=\"45\" src=\"http://a.xnimg.cn/a.gif\" style=\"background:url({{url}}) center center no-repeat;\" />","                <span class=\"description\">{{description}}</span>","            </a>","            {{/photoList}}","        {{/isFriend}}","        {{^isFriend}}","            {{#relationInfo}}","            <a target=\"_blank\" href=\"http://www.renren.com/profile.do?id={{id}}\">","                <img title=\"{{name}}\" alt=\"{{name}}\" width=\"30\" height=\"30\" src=\"{{head}}\" pid=\"{{id}}\" />","            </a>","            {{/relationInfo}}","        {{/isFriend}}","\t\t{{#recommendFriend}}","        \t{{#recommendList}}","            \t<a target=\"_blank\" href=\"http://www.renren.com/profile.do?id={{id}}\">","                <img title=\"{{username}}\" alt=\"{{username}}\" width=\"30\" height=\"30\" src=\"{{tinyurl}}\"  pid=\"{{id}}\"/>","           \t </a>","        \t {{/recommendList}}","\t\t{{/recommendFriend}}","        <div class=\"clear\"></div>","    </div>","</div>","<div class=\"nc-bar clearfix\">","    {{^isMine}}","        {{^isFriend}}","        <a onclick=\"top.showRequestFriendDialog('{{ownerId}}','{{name}}','{{tinyHead}}', '', '', function(){top.globalNamecard.addFriendCallback();});top.globalNamecard.addFriendCallback(true);\" class=\"nc-btn add-friend\" href=\"#nogo\">加为好友</a>","        {{/isFriend}}","        {{#isOnLine}}","            <a class=\"nc-btn leaveMsg have-talk\" href=\"javascript:;\" onclick=\"top.talkto('{{ownerId}}');\">私聊</a>","        {{/isOnLine}}","        {{^isOnLine}}","            <a class=\"nc-btn sendMsg have-talk\" href=\"javascript:;\" onclick=\"top.talkto('{{ownerId}}');\">发私信</a>","        {{/isOnLine}}","    {{/isMine}}","    {{#isMine}}","        <a class=\"nc-btn gotoProfile\" target=\"_blank\" href=\"http://www.renren.com/profile.do?id={{ownerId}}\">个人主页</a>","    {{/isMine}}","</div>"].join("");
return Mustache.to_html(_32,_2e);
},getSuotu:function(url,_33){
var _34=url.split("/"),_35=_34.pop(),_36=_34.join("/");
url=_36+_33+_35;
return url;
},addLoading:function(){
this.getNcIdContainer("namecard").innerHTML="<em></em><img class=\"loading-indicator\" src=\"http://a.xnimg.cn/n/core/res/loading.gif\" />";
},positionCard:function(_37,_38){
var _39=318,_3a=_38||164,_3b=25;
var _3c=_5.__getXY(_37);
var _3d=_3c.x;
var _3e=_3c.y;
var _3f=_37.offsetWidth;
var _40=_37.offsetHeight;
if(_3f>300){
_3f=15;
_40=17;
}
var _41=_5.__getScrollTop();
var _42=_5.__getScrollLeft();
var _43=_5.__getViewportWH().viewportwidth;
var _44=_5.__getViewportWH().viewportheight;
var _45=30;
var _46=0;
var _47=_3e-_41;
var _48=_44-_47-_40-_45;
var _49=_3d-_42;
var _4a=_43-_49-_3f;
var _4b=this.getNcIdContainer("namecard");
if(_48>_3a&&_4a>_39){
_4b.className="nc-bl";
var _4c=_3f*0.5-_3b;
this.ncWrapper.style.left=_3d+_4c+"px";
this.ncWrapper.style.top=this.preScrollY=this.additionalY+_3e+_40+_46+"px";
}else{
if(_48>_3a&&_49>_39){
_4b.className="nc-br";
var _4c=_3f*0.5+_3b;
this.ncWrapper.style.left=_3d-_39+_4c+"px";
this.ncWrapper.style.top=this.preScrollY=this.additionalY+_3e+_40+_46+"px";
}else{
if(_47>_3a&&_4a>_39){
_4b.className="nc-tl";
var _4c=_3f*0.5-_3b;
this.ncWrapper.style.left=_3d+_4c+"px";
this.ncWrapper.style.top=this.preScrollY=this.additionalY+_3e-_3a-_46+"px";
}else{
if(_47>_3a&&_49>_39){
_4b.className="nc-tr";
var _4c=_3f*0.5+_3b;
this.ncWrapper.style.left=_3d-_39+_4c+"px";
this.ncWrapper.style.top=this.preScrollY=this.additionalY+_3e-_3a-_46+"px";
}else{
_4b.className="nc-bl";
var _4c=_3f*0.5-_3b;
this.ncWrapper.style.left=_3d+_4c+"px";
this.ncWrapper.style.top=this.preScrollY=this.additionalY+_3e+_40+_46+"px";
}
}
}
}
this.ncWrapper.style.display="block";
},hideCard:function(){
this.ncWrapper.style.display="none";
if(this.getNcIdContainer("namecard")){
this.getNcIdContainer("namecard").innerHTML="";
}
},isNeedAjaxReq:function(_4d){
return (this.preAjaxLoaded==_4d&&this.ncWrapper.style.display=="block");
},centerAvatar:function(_4e){
var _4f=this,_50;
XN.event.addEvent(_4e,"load",function(){
if(_4e.width>=_4e.height){
_4e.width=100*_4e.width/_4e.height;
_4e.height=100;
_50=(_4e.width-100)*0.5;
_4e.style.left=-_50+"px";
}else{
_4e.height=100*_4e.height/_4e.width;
_4e.width=100;
_50=(_4e.height-100)*0.5;
_4e.style.top=-_50+"px";
}
});
},getIFrameDocument:function(){
return this.ncWrapper.contentDocument||this.ncWrapper.contentWindow.document;
},getNcIdContainer:function(id){
return this.getIFrameDocument().getElementById(id);
},setAdditionalY:function(y){
this.additionalY=y;
if(y>0){
this.ncWrapper.style.top=parseInt(this.preScrollY)+y+"px";
}
},logCard:function(_51){
var url="http://rcd.renren.com/ajaxHomeReconnectStat?param=";
url=url+(_51?_51:"");
_4.ping(url);
},logPhoto:function(url){
if(url){
_4.ping(url);
}
}};
});

