(function(){
var _1=[/^http:\/\/www\.56\.com/,/^http:\/\/player\.56\.com/,/^http:\/\/cache\.tv\.qq.com\/qqplayerout\.swf/,/^http:\/\/static\.video\.qq\.com/,/^http:\/\/play\.v\.qq\.com/,/^http:\/\/tv\.mofile\.com/,/^http:\/\/img\.openv\.tv\/openvcom\/swf\/player\.swf/,/^http:\/\/img\.openv\.tv\/hd\/swf\/hd_player/,/^http:\/\/player\.ku6\.com\/refer\//,/^http:\/\/vhead\.blog\.sina\.com\.cn\/player\/outer_player\.swf/,/^http:\/\/you\.video\.sina\.com\.cn\/api\/sinawebApi\/outplay\.php/,/^http:\/\/www.tudou\.com\/v/,/^http:\/\/www.tudou\.com\/l/,/^http:\/\/www\.youtube\.com/,/^http:\/\/www\.vimeo\.com/,/^http:\/\/vimeo\.com/,/^http:\/\/6\.cn/,/^http:\/\/v\.blog\.sohu\.com/,/^http:\/\/share\.vrs\.sohu\.com/,/^http:\/\/www\.ouou\.com\/play\/mediaplayer\.swf/,/^http:\/\/static\.youku\.com/,/^http:\/\/video\.xunlei\.com/,/^http:\/\/player\.youku\.com\//,/^http:\/\/client\.joy\.cn\/flvplayer/,/^http:\/\/.*\.renren\.com\/flvplayer\.swf/,/^http:\/\/fmn\.xnimg\.cn\/fmn043\/attachment\/20091228\/2010\/a_044f0004f2842d13\.swf/,/^http:\/\/tv\.hunantv\.com\/player\/refhunantv\.swf/,/^http:\/\/xiyou\.cntv\.cn\/player\/OTvideoplayer\.swf/,/^http:\/\/player\.xiyou\.cntv\.cn\/[0-9a-z\-.]+\.swf/,/^http:\/\/box\.baidu\.com\/widget\/flash/,/^http:\/\/image2\.mop\.com\/2009\/meniu\/Flvplayer\.swf/,/^http:\/\/static1\.pplive\.cn\/public\/player\/pptv_\d+\.swf/,/^http:\/\/player\.pplive\.cn/,/^http:\/\/player\.pptv\.com/,/^http:\/\/player\.video\.qiyi\.com/,/^http:\/\/www\.yinyuetai\.com\/video\/swf/,/^http:\/\/www\.yinyuetai\.com\/playlist\/swf/,/^http:\/\/player\.yinyuetai\.com\/video\/swf/,/^http:\/\/player\.yinyuetai\.com\/playlist\/swf/,/^http:\/\/union\.bokecc\.com\/flash\/pocle\/player\.swf/,/^http:\/\/www\.vodone\.com\/player\/cmsVodone\/fp.swf/,/^http:\/\/www\.v1\.cn\/player\//,/^http:\/\/v\.ifeng\.com\/include\/exterior\.swf/,/^http:\/\/www\.umiwi\.com\/video/,/^http:\/\/static\.slidesharecdn\.com\/swf\/ssplayer2\.swf/,/^http:\/\/www\.haru2010\.com\//,/^http:\/\/video\.pomoho\.com\/swf\//,/^http:\/\/resources\.pomoho\.com\/swf\//,/^http:\/\/www\.hualu5\.com\/swf\/svp.swf/,/^http:\/\/www\.kankanews\.com\/object\/VodPlayer\.swf/,/^http:\/\/www\.kankanews\.com\/object\/kankanewsplayer[\d.]+\.swf/,/^http:\/\/burl\.cc/,/^http:\/\/boosj\.com/,/^http:\/\/static\.boosj\.com\/v\/swf/,/^http:\/\/player\.pps\.tv/,/^http:\/\/a\.xnimg\.cn\/yximg\/minisite\/common\/swf\/player\.swf/,/^http:\/\/www\.docin\.com\/DocinViewer/,/^http:\/\/js\.tv189\.cn\/player\.swf/,/^http:\/\/img\.v\.huanqiu\.com\/v\/website\.swf/,/^http:\/\/www\.m1905\.com\/video\/m\/\d+\/v.swf/,/^http:\/\/share\.uusee\.com\/open\//,/^http:\/\/i7\.imgs\.letv\.com\/player\/swfPlayer\.swf/,/^http:\/\/s\.dopool.com\/player\.swf/,/^http:\/\/s\.dopool.com\/player\.swf/,/^http:\/\/a\.xnimg\.cn\/js\/flash\/video\/player\/pageVideoPlayer\.swf/,/^http:\/\/js\.tv189\.cn\/\d+\/\d+\.swf/,/^http:\/\/js\.tv189\.cn\/200045\/\d+\.swf/,/^http:\/\/s\.v\.ifeng\.com/,/^http:\/\/swf\.ws\.126\.net/,/^http:\/\/s\.dopool\.com\/v\/live330\/\d+_\d+_\d+_\d+\/\d+\/sample/,/^http:\/\/s\.dopool\.com\/player\.swf\/.*/,/^http:\/\/js\.tv189\.cn\/\d+\/\d+\/\d+\.swf/,/^http:\/\/player\.xiyou\.cntv\.cn\/.*\.1\.swf/,/^http:\/\/s\.dopool\.com\/player\.swf\?vid=.*/,/^http:\/\/www\.aipai\.com\/c\d+\/.*\/playerOut\.swf/,/^http:\/\/tv\.renren\.com\/v\/\d+\/\d+\/v\.swf/,/^http:\/\/tv\.renren\.com\/v\/\d+\/\w+\/v\.swf/,/^http:\/\/live\.aipai\.com\/\w+\.html/,/^http:\/\/www\.tangdou\.com\/api\/play\/\w+\/v\.swf/,/^http:\/\/www\.vlook\.(cn|com)\/app\/vplayer\/flv\/qs\/[a-zA-Z0-9|=-]+\/flv\.swf/,/^http:\/\/((www|mo)\.)vlook\.(cn|com)\/app\/vplayer\/flv\/qs\/[a-zA-Z0-9|=-]+\/flv\.swf$/,/^http:\/\/player\.pptv\.com\/v\/\w+\.swf/,/^http:\/\/www\.kuwo\.cn\/player\/player\.swf/,/^http:\/\/www.tudou\.com\/a/,/^http:\/\/vku\.sdo\.com\/swf\/weikuplayer_pr\.swf/,/^http:\/\/v\.cuctv\.com\/.*/,/^http:\/\/www\.cnlive\.com\/share/,/^http:\/\/www\.duobei.com\/player\/\d+\/r\.swf/,/^http:\/\/q\.xlpan\.kanimg\.com\/fileConsume\/staticSwf\/VodPlayer.swf?.*$/];
var _2=[];
_2.push(function(_3){
if(/youku\.com/.test(_3.filename)){
_3.flashVars="isAutoPlay=true";
}
if(/ku6\.com/.test(_3.filename)){
_3.flashVars="auto=1";
}
if(/56\.com/.test(_3.filename)&&$("statFor56")){
_3.flashVars=$("statFor56").value;
}
});
function checkSafty(_4){
var _5=500;
return _4.length<_5&&_4.indexOf("eval")<0&&_4.indexOf(">")<0;
}
XN.template.enhanceFlash=function(o){
return "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+(o.width||320)+"\" height=\""+(o.height||240)+"\">"+"<param name=\"movie\" value=\""+o.filename+"\">"+"<param name=\"quality\" value=\"high\">"+"<param name=\"bgcolor\" value=\"#FFFFFF\">"+"<param name=\"FlashVars\" value=\""+(o.flashVars||"")+"\">"+"<param name=\"auto\" value=\"true\">"+"<param name=\"allowNetworking\" value=\""+(o.allowNetworking||"all")+"\">"+"<param name=\"allowScriptAccess\" value=\""+(o.allowScriptAccess||"sameDomain")+"\">"+"<param name=\"allowFullScreen\" value=\""+(o.allowFullScreen||"true")+"\">"+"<param name=\"wmode\" value=\""+(o.wmode||"transparent")+"\">"+"<embed  type=\"application/x-shockwave-flash\" "+"width=\""+(o.width||"320")+"\" flashvars=\""+o.flashVars+"\" height=\""+(o.height||"240")+"\" allowFullScreen=\"true\" wmode=\""+(o.wmode||"transparent")+"\" allowNetworking=\""+(o.allowNetworking||"all")+"\" allowScriptAccess=\""+(o.allowScriptAccess||"sameDomain")+"\" src=\""+o.filename+"\"></embed>"+"</object>";
};
isSafeVideo=function(_7){
var _8=false;
if(/@/.test(_7)){
return false;
}
if(/[\'\"\(\)]/.test(_7)||/t:/.test(_7)){
return false;
}
XN.array.each(_1,function(i,v){
if(v.test(_7)){
_8=true;
return false;
}
});
return _8;
};
isSafeAudio=function(_b){
if(/[\'\"\(\)]/.test(_b)||/t:/.test(_b)){
return false;
}
_b=_b.split("?")[0];
if(!/\.(wma|wav|mp3|)$/i.test(_b)){
return false;
}
return true;
};
function parseAutoPlay(_c){
_c=_c.replace(/(http:\/\/player\.ku6\.com[^"]*)/,"$1&auto=1");
_c=_c.replace(/(http:\/\/www\.tudou\.com[^"]*)/,"$1&autoPlay=true");
_c=_c.replace(/(src="http:\/\/player\.video\.qiyi\.com[^"]+")/,"$1 flashvars=\"autoplay=1\"");
return _c;
}
playMusicOfContent=function(_d,_e,_f){
_f=_f||"img";
var _10=document.getElementsByTagName("img"),_11=function(ele){
var _13=ele.className.split(/\s+/),_14=_13[1];
ele.id="test123";
XN.loadFile("http://s.xnimg.cn/xnapp/common/js/swfobjectv2.2.js",function(){
swfobject.embedSWF("http://s.xnimg.cn/xnapp/music/flash/miniplayer/smallPlayer_20110819.swf",ele.id,"190","33","10.0.0","expressInstall.swf",{songId:_14},{menu:"false",scale:"noScale",allowFullscreen:"true",allowScriptAccess:"always",wmode:"transparent"},null,function(e){
if(e.success){
window.radioReady=true;
}
});
});
};
for(var i=0;i<_10.length;i++){
var buf=_10[i];
if(buf.className.indexOf("musicbox")>-1){
_11(buf);
return false;
}
}
};
playVideoOfContent=function(_18,_19,_1a,_1b,_1c,_1d,_1e){
_1a=_1a||"img";
_1b=_1b||"alt";
_1d=_1d||500;
_1e=_1e||false;
if(isUndefined(_1c)||(_1c===null)){
_1c=true;
}
var vs=XN.dom.getElementsByClassName(_19,_18,_1a);
XN.array.each(vs,function(i,v){
if(!checkSafty(v.getAttribute(_1b))){
return;
}
var s=v.getAttribute(_1b).split(";");
try{
var tmp=$element("div");
tmp.style.cssText="width:"+_1d+"px; margin:0 auto;";
var _24={"width":_1d,height:parseInt(_1d/parseFloat(s[0]),10),filename:s[1]};
if(!isSafeVideo(s[1])){
tmp.innerHTML="<img src=\"http://a.xnimg.cn/imgpro/editor/video-alert.gif\" />";
}else{
if(_1c&&i===0&&!_1e){
XN.array.each(_2,function(i,v){
v&&v(_24);
});
}else{
_24.flashVars="";
var str="auto_start=off";
if(_24.flashVars){
str+="&"+str;
}
_24.flashVars+=str;
var _28="autoPlay=false&autoplay=false&AutoPlay=false";
_24.filename+=_24.filename.indexOf("?")?("&"+_28):_28;
_24.filename=_24.filename.replace(/autoplay=1/ig,"autoplay=0");
}
var _29=XN.template.enhanceFlash(_24);
tmp.innerHTML=_29;
}
v.parentNode.replaceChild(tmp,v);
}
catch(e){
v.parentNode.replaceChild(document.createTextNode("[\u64ad\u653e\u65f6\u51fa\u9519]"),v);
}
});
};
playAudioOfContent=function(_2a,_2b,_2c,_2d,_2e){
_2c=_2c||"img";
_2d=_2d||"alt";
if(isUndefined(_2e)){
_2e=true;
}
var ass=XN.dom.getElementsByClassName(_2b,_2a,_2c);
XN.array.each(ass,function(i,v){
var tmp=$element("div");
if(!checkSafty(v.getAttribute(_2d))){
return;
}
var s=v.getAttribute(_2d).split(";");
try{
if(!isSafeAudio(s[1])){
v.parentNode.replaceChild(document.createTextNode("[\u65e0\u6cd5\u8bc6\u522b\u7684\u97f3\u9891:"+s[1]+"]"),v);
return;
}
}
catch(e){
v.parentNode.replaceChild(document.createTextNode("[\u64ad\u653e\u97f3\u9891\u65f6\u51fa\u9519]"),v);
return;
}
if(s[0]=="mp3"){
tmp.innerHTML=XN.Template.flashPlayer({filename:s[1],autostart:(i==0?"1":"0")});
}else{
tmp.innerHTML=XN.Template.mediaPlayer({filename:s[1],autostart:(i==0?"1":"0")});
}
v.parentNode.replaceChild(tmp,v);
});
};
play=function(el,t,_36){
if(!isSafeAudio(_36)){
return;
}
el=$(el+"");
if(t=="mp3"){
el.innerHTML=XN.Template.flashPlayer({filename:_36});
}else{
el.innerHTML=XN.Template.mediaPlayer({filename:_36});
}
};
playswf=function(el,_38,_39){
if(!isSafeVideo(_38)){
return;
}
var w,h;
el=$(el+"");
w=el.parentNode.offsetWidth-24;
if(w>500){
w=500;
}
h=parseInt(w/_39,10);
el.innerHTML=XN.Template.flash({width:w,height:h,filename:_38});
el.onclick=null;
};
})();

