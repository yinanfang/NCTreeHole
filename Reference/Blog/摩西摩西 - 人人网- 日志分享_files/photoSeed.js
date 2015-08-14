var flashVeision="";
if(XN.user.id%10===6){
flashVeision="8.2.swf";
}else{
if(XN.user.id%10===7){
flashVeision="8.3.swf";
}else{
flashVeision="8.1.swf";
}
}
XN.photoSeedHandler({"exec":[],"preLoad":[{"src":"http://s.xnimg.cn/n/apps/photo/modules/flashUploaderAndSend/pic_uploader_v"+flashVeision,"path":function(){
var _1=new Date().getHours().toString(),_2=["11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
for(var i=0,_3=_2.length;i<_3;i++){
if(_1==_2[i]){
return true;
}
}
return false;
}}],"version":["http://s.xnimg.cn/a55192/n/apps/photo/friendphoto.js","http://s.xnimg.cn/a55189/n/apps/photo/flashUploaderWithSend.js","http://s.xnimg.cn/a54901/n/apps/photo/modules/flashUploaderAndSend/flash-upload-all-min.css","http://s.xnimg.cn/a53271/n/apps/photo/modules/flashUploaderAndSend/flashUploaderConfig.js","http://s.xnimg.cn/a55189/n/apps/photo/modules/photo-view/photo-view-all-min.css","http://s.xnimg.cn/a55189/n/apps/photo/photoViewerSparta.js","http://s.xnimg.cn/a54117/n/apps/photo/toolbar.js","http://s.xnimg.cn/a54679/csspro/module/replies.css","http://s.xnimg.cn/a54685/n/apps/photo/commentManage.js","http://s.xnimg.cn/a43634/n/apps/photo/modules/libs/tagPhoto-div.js","http://s.xnimg.cn/a55189/n/apps/photo/modules/flashUploaderAndSend/flashUploaderControler.js","http://s.xnimg.cn/a53271/n/apps/photo/modules/footprint/js/zujiFeed.js","http://s.xnimg.cn/a52664/n/apps/photo/modules/footprint/css/zujiFeed-all-min.css"]});
object.define("xn/upload/seed/uploader","dom, events, ua, net",function(_4,_5){
var _6=_4("dom");
var _7=_4("events");
var ua=_4("ua").ua;
var _8=_4("net");
var _9="http://s.xnimg.cn/n/apps/photo/modules/flashUploaderAndSend/flash-upload-all-min.css";
var _a="http://s.xnimg.cn/n/apps/photo/flashUploaderWithSend.js";
function _b(){
if(ua.ie){
var _c;
try{
_c=new ActiveXObject("rralbum.Uploader.4");
return true;
}
catch(e){
try{
_c=new ActiveXObject("xnalbum.Uploader.4");
return true;
}
catch(e){
return false;
}
}
}else{
if(navigator.mimeTypes&&navigator.mimeTypes["application/x-renren-nprralbum"]){
return true;
}else{
return false;
}
}
};
function _d(_e,_f){
return new RegExp("(^|\\s+)"+_f+"(\\s+|$)").test(_e.className);
};
function _10(_11){
var _12=false,_13=false,_14=false,_15=0;
if(_d(_11,"fromNewSend")){
_12=true;
}
if(_d(_11,"fromZuji")){
_13=true;
}
if(_b()){
_14=true;
}
if(_d(_11,"fromAlbum")){
var _16=_11.href;
if(_16.indexOf("id=")>=0){
_16=_16.substring(_16.indexOf("id=")+3);
_16=_16.substring(0,_16.indexOf("&"));
if(parseInt(_16)){
_15=parseInt(_16);
}
}
}
XN.loadFiles([_9],function(){
XN.loadFiles([_a],function(){
XN.flashUpload.initFlash({fromExistAlbum:_15,fromSend:_12,fromZuji:_13,jisu:_14});
});
});
};
function _17(e){
var _18=e.target,_19=false;
if(!_18){
return;
}else{
if(_d(_18,"flashUploader")){
_19=true;
}else{
if(_18.parentNode&&_d(_18.parentNode,"flashUploader")){
_19=true;
_18=_18.parentNode;
}
}
}
if(_19){
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
_10(_18);
log(_18);
}
};
function log(el){
var _1a=XN.USER.id,url="http://photo.renren.com/photo/log/{ownerId}/uploadPhoto?psource={psource}",_1b=0;
if(XN.pageId=="home"){
_1b=1;
}else{
if(XN.pageId=="profile"){
_1b=2;
}
}
if(_d(el,"log-albumlist")){
_1b="14";
}
if(_d(el,"log-taglist")){
_1b="5";
}
if(_d(el,"log-photolist")){
_1b="3";
}
url=url.replace("{ownerId}",_1a).replace("{psource}",_1b);
_8.ping(url);
};
_6.ready(function(){
_6.wrap(document).addEvent("click",_17,_7.HOLD);
});
});
object.execute("xn/upload/seed/uploader");
(function(){
if(XN.browser.IE6){
return;
}
function _1c(){
if(location.href.indexOf("http://photo")===0){
return true;
}else{
if(XN.pageId=="home"){
return true;
}else{
return false;
}
}
};
if(!_1c()){
return;
}
XN.namespace("XN.photo.viewer");
XN.photo.template={theatreStyleTpl:"position:absolute;top:<%=top%>px;left:0px;padding-top:8px;                            background:rgba(0, 0, 0, 0.9);                            width:100%;height:<%=height%>px;z-index:5000;overflow-y:scroll;overflow-x:hidden",previewTpl:" <div id=\"stagePreview\" style=\"background-color:transparent;margin:0 auto;border:none;width:<%=stageWidth%>px;height:auto\">                        <div style=\"margin:5px\" class=\"clearfix\">                            <div style=\"width:<%=photoWidth%>px;overflow:hidden;float:left;\">                                <div style=\"height:<%=photoHeight%>px;background-color:#F7F7F7;\"/>                                    <div style=\"line-height:<%=photoLineHeight%>px;height:100%;width:100%;text-align:center;z-index:1;white-space:nowrap\">                                        <img id=\"stagePre\" src=\"<%=largeUrl%>\" style=\"vertical-align:middle;display:inline-block;height:auto;width:auto;max-height:100%;max-width:100%\"/>                                        <% if(!XN.Browser.IE && XN.pageId === \"profile\"){ %>                                            <span style=\"display:inline-block\"></span>                                        <% } %>                                    </div>                                </div>                            </div>                            <div style=\"float:right;width:260px;background-color:white;height:<%=photoHeight%>px;\">                            </div>                        </div>                    </div>                        <a id=\"theatreCloseBtnPreview\" href=\"javascript:;\" alt=\"关闭\"  title=\"<%=closeTip%>\" style=\"left:<%=closeLeft%>px;top:<%=closeTop%>px;background:#333 url(http://a.xnimg.cn/n/apps/photo/modules/photo-view/cssimg/close.png) no-repeat 14px 14px; width:40px;height:40px;position:fixed;text-indent:-9999px\">关闭</a>",ieSpecialStyleTpl:"background-color:rgb(0,0,0);filter:alpha(opacity=90);position:absolute;top:<%=top%>px;left:0px;width:100%;height:100%;z-index:4000;"};
XN.photo.jqtmpl=function(str,_1d){
var _1e={};
var _1f=function(str,_20){
var fn=!/\W/.test(str)?_1e[str]=_1e[str]||XN.photo.jqtmpl(document.getElementById(str).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};"+"with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return _20?fn(_20):fn;
};
return _1f(str,_1d);
};
$photo=XN.photo;
$extend($photo.viewer,{isLayOutLoad:false,layout:{sidebarWidth:240,otherWidth:30,maxContainerWidth:720,minContainerWidth:480,blankArea:130,bottomHeight:95,maxContainerHeight:540,minContainerHeight:360,topBlankArea:13,closeBtnWidth:40,closeBtnTop:23},open:function(_21,_22,_23,_24){
var _25,_26=this.layout,_27=this;
var _28=this.openTheatre();
this.myPosTop=XN.event.scrollTop();
this.isHistory=_24;
if(!$photo.scrollWidth){
var _29=function(){
var _2a=0,_2b=0,_2c=document.createElement("div");
_2c.style.cssText="position:absolute; top:-1000px; width:100%; height:100px; overflow:hidden;";
_2a=document.body.appendChild(_2c).clientWidth;
_2c.style.cssText="overflow-y:scroll";
_2b=_2c.clientWidth;
document.body.removeChild(_2c);
if(_2b==0){
_2b=_2a-17;
}
return _2a-_2b;
};
$photo.scrollWidth=_29();
}
this.computeLayout();
_25={stageWidth:_26.stageWidth,largeUrl:_23,photoWidth:_26.containerWidth,photoHeight:_26.containerHeight,photoLineHeight:_26.containerHeight-5,closeTop:_26.closeBtnTop,closeLeft:_26.closeBtnLeft,closeTip:_26.closeBtnTip};
var _2d=function(){
$extend(_25,{photoId:_22,ownerId:_21});
_27.threadLoad(_28,_25);
};
this.openPreview(_28,_25,_23,_2d);
},close:function(){
if($photo.photoViewer){
$photo.photoViewer.destroy();
}
this.closeTheatre();
XN.event.delEvent(document,"click",$photo.viewer.quitEvent);
XN.event.delEvent(document,"keydown",$photo.viewer.quitEvent);
},openTheatre:function(){
var _2e=XN.event.scrollTop(),_2f=$("theatre"),_30=XN.event.winHeight(),_31=$("ieSpecialDiv");
if(!_2f){
_2f=$(document.createElement("div"));
_2f.id="theatre";
_2f.className="theatre";
_2f.style.cssText=this.tplRender(XN.photo.template.theatreStyleTpl,{top:_2e,height:_30});
document.body.appendChild(_2f);
}else{
_2f.style.top=_2e+"px";
_2f.style.height=_30+"px";
_2f.style.display="";
}
if(XN.browser.IE){
if(!_31){
_31=document.createElement("div");
_31.id="ieSpecialDiv";
_31.style.cssText=this.tplRender(XN.photo.template.ieSpecialStyleTpl,{top:_2e});
document.body.appendChild(_31);
}else{
_31.style.top=_2e+"px";
_31.style.height=_30+"px";
_31.style.display="";
}
document.documentElement.style.overflow="hidden";
}else{
XN.element.setStyle(document.body,"overflow:hidden;");
}
return _2f;
},closeTheatre:function(){
var _32=$("theatre"),_33=$("ieSpecialDiv");
if(_32){
_32.style.display="none";
_32.innerHTML="";
}
if(XN.browser.IE){
if(_33){
_33.style.display="none";
}
document.documentElement.style.overflow="";
}else{
document.body.style.overflow="visible";
}
},openPreview:function(_34,_35,_36,_37){
_34.innerHTML=this.tplRender($photo.template.previewTpl,_35);
var img=$("stagePre");
if(img.complete){
_37();
return true;
}
var _38=setTimeout(function(){
img.onload=XN.Func.empty;
img.onerror=XN.Func.empty;
_37();
},2000);
img.onload=function(){
clearTimeout(_38);
_37();
};
img.onerror=function(){
clearTimeout(_38);
_37();
};
},tplRender:function(tpl,_39){
return $photo.jqtmpl(tpl,_39);
},threadLoad:function(_3a,_3b){
var _3c=this;
if(!_3c.isLayOutLoad){
XN.loadFiles(["http://s.xnimg.cn/n/apps/photo/photoViewerSparta.js","http://s.xnimg.cn/n/apps/photo/modules/photo-view/photo-view-all-min.css"],function(){
_3c.getTheateData(_3a,_3b);
_3c.isLayOutLoad=true;
});
}else{
_3c.getTheateData(_3a,_3b);
}
},getCloseBtnLayout:function(){
var _3d=XN.event.winWidth(),_3e=XN.browser.IE?document.documentElement.style.overflow:document.body.style.overflow,_3f=_3e=="hidden"?_3d-$photo.scrollWidth:_3d,_40="点击两边的空白处也可以关闭",_41="关闭",_42=this.layout.stageWidth,_43=this.layout.closeBtnWidth,_44=_42+_43;
this.layout.closeBtnLeft=_3d<_44?(_3f-_43):(_3f-_42)/2+_42-5;
if(XN.browser.IE&&!XN.browser.IE6&&!XN.browser.IE8){
this.layout.closeBtnLeft+=2;
}
this.layout.closeBtnTip=_3d<_44?_41:_40;
},computeLayout:function(){
var _45=this.layout,_46=_45.sidebarWidth+_45.otherWidth,_47=_45.maxContainerWidth+_46,_48=_45.minContainerWidth+_46,_49=_45.bottomHeight+_45.maxContainerHeight,_4a=_45.bottomHeight+_45.minContainerHeight,_4b=XN.browser.IE?document.documentElement.style.overflow:document.body.style.overflow,_4c=_4b=="hidden"?XN.event.winWidth()-$photo.scrollWidth:XN.event.winWidth(),_4d=XN.event.winHeight();
if(_4c>=_47+_45.blankArea){
_45.stageWidth=_47;
_45.containerWidth=_45.maxContainerWidth;
}else{
if(_4c<=_48+_45.blankArea){
_45.stageWidth=_48;
_45.containerWidth=_45.minContainerWidth;
}else{
_45.stageWidth=_4c-_45.blankArea;
_45.containerWidth=_45.stageWidth-_46;
}
}
if(_4d<=_4a+_45.topBlankArea){
_45.containerHeight=_45.minContainerHeight;
}else{
_45.containerHeight=_4d-_45.topBlankArea-_45.bottomHeight;
}
this.getCloseBtnLayout();
},quitEvent:function(e){
var e=e||window.event,el=e.srcElement||e.target;
if(XN.browser.Gecko){
if(el.nodeName.toLowerCase()!="body"&&el.nodeName.toLowerCase()!="html"&&e.type=="keydown"&&(e.keyCode==38||e.keyCode==40||e.keyCode==33||e.keyCode==34)){
XN.event.stop(e);
}
}
if((e.type=="click"&&el.getAttribute("id")=="theatreCloseBtn"||el.getAttribute("id")=="theatre")||(e.type=="keydown"&&e.keyCode==27)){
if(!XN.bSRecommendAlbums){
if($photo.viewer.showQuitInfo){
$photo.viewer.showQuitInfo();
}else{
$photo.viewer.close();
}
}
}
}});
XN.dom.ready(function(){
function _4e(e){
var e=window.event||e;
el=XN.event.element(e);
if(XN.Browser.Gecko&&e.button!=0){
return true;
}
if(el.getAttribute("data-photo")){
var _4f=XN.JSON.parse(el.getAttribute("data-photo")),_50=_4f.owner,_51=_4f.id,_52=_4f.large,_53=_4f.psource;
param=_4f.param||"?";
_54(_53);
XN.event.stop(e);
XN.event.addEvent(document,"click",XN.photo.viewer.quitEvent);
XN.event.addEvent(document,"keydown",XN.photo.viewer.quitEvent);
$photo.param=param;
$photo.viewer.open(_50,_51,_52);
}else{
return true;
}
};
if(document.addEventListener){
document.addEventListener("click",_4e,false);
}else{
if(document.attachEvent){
document.attachEvent("onclick",_4e);
}
}
});
function _54(_55){
$photo.lastHash=window.location.hash;
$photo.psource=_55||_56;
};
function _57(_58,_59,_5a){
if(XN.browser.IE6){
return true;
}
XN.event.addEvent(document,"click",XN.photo.viewer.quitEvent);
XN.event.addEvent(document,"keydown",XN.photo.viewer.quitEvent);
$photo.viewer.open(_58,_59,_5a,true);
};
function _5b(){
if(_5c()){
$photo.viewer.close();
}
};
function _5c(){
var _5d=$("theatre"),_5e=_5d&&_5d.style.display;
return _5d&&(_5e==""||_5e=="block");
};
function _5f(_60,_61,_62){
if(_5c()){
XN.photo.photoViewer.showPhoto(_61);
}else{
setTimeout(function(){
_57(_60,_61,_62);
},500);
}
};
$photo.param="?";
XN.dom.ready(function(){
var _63=window.location.hash,_64=false;
function _65(e){
var e=window.event||e;
if(e.state){
var _66=e.state.photoOwner,_67=e.state.photoId,_68="http://"+e.state.large;
if(!!!_66){
_5b();
return true;
}
_5f(_66,_67,_68);
}else{
var _69=window.location.hash,_6a=/#photoOwner=(\d+)\?photoId=(\d+)\?large=(.)/,_6b=_69.match(_6a);
if(!_64){
_64=true;
if(_63!=_69){
return;
}
}
if(_6a.test(_69)&&_6b.length==4){
var _66=_6b[1],_67=_6b[2],_68="http://"+_69.split("?")[2].split("=")[1];
_5f(_66,_67,_68);
}else{
_5b();
}
}
};
var _6c=null;
object.use("events, dom",function(_6d,dom){
_6c=_6d.HOLD;
dom.wrap(window).addEvent("popstate",_65,_6c);
});
});
var _56=0;
XN.dom.ready(function(){
if(XN.pageId=="home"){
_56="1";
}else{
if(XN.pageId=="profile"){
_56="2";
}else{
if(location.href.indexOf("http://photo")===0){
_56="3";
}
}
}
});
})();
(function(){
XN.dom.ready(function(){
if(XN.pageId!="home"){
return;
}
var _6e=false;
function _6f(){
if(_6e){
return;
}
var _70="http://s.xnimg.cn/n/apps/photo/friendphoto.js";
XN.loadFile(_70,function(){
_6e=true;
});
};
var _71=$(Sizzle(".ready-to-fix")[0]);
if(_71&&_71.hasClassName("already-fixed")){
_6f();
return;
}
setTimeout(_6f,2000);
var _72=null;
object.use("events, dom",function(_73,dom){
HOLD=_73.HOLD;
XN.event.addEvent(window,"sidebar2Fixed",function(){
_6f();
},HOLD);
});
});
})();

