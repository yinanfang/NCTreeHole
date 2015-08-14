object.add("xn.pymk","dom, events, net, xn.net",function(_1,_2,_3,_4,xn){
this.getSomeDom=function(_6,_7,_8){
var _9=document.createDocumentFragment();
for(var i=_7;i<_8&&i<_6.length;i++){
var _b=_6[i].cloneNode(true);
_b.setAttribute("data-index",i);
_9.appendChild(_b);
}
return _9;
};
this.getData=function(_c,_d){
return _c.getAttribute("data-"+_d);
};
this.getItem=function(id){
return _2.getElement("#commonFriend_"+id);
};
this.getType=function(id){
var _10=_2.id("type_value_"+id);
if(!_10){
return "";
}else{
return _10.value;
}
};
this.getLog=function(id,_12){
try{
return _2.id("log_"+_12+"_"+id).value;
}
catch(e){
return false;
}
};
this.makeArray=function(_13){
var _14=[],_15=[];
var _16=function(ele){
try{
var _18=_2.getElement("#type_value_"+ele.id.slice(13),ele).value;
if(_18=="RCD_BLOG"||_18=="RCD_VIDEO"){
return true;
}
return false;
}
catch(e){
return false;
}
};
for(var i=0,l=_13.length;i<l;i++){
var ele=_13[i];
if(ele.nodeType!=1){
continue;
}
if(_16(ele)){
_15.push(ele);
}else{
_14.push(ele);
}
}
return {pdata:_14,udata:_15};
};
this.stats={"show":XN.user.isGuide?"RecGuide_show":"RecMixed_show"};
this.PYMK=new Class(function(){
Class.mixin(this,_3.Events);
this.config={loadUrl:"http://rcd."+XN.env.domain+"/cwf_nget_home",delUrl:"http://rcd."+XN.env.domain+"/cwf_nremove_home",amount:3,slideDelay:8,autoSlideDelay:40000,ul:"#commonFriends_home_2",box:"#pymk_home_2",btn1:".pager-back",btn2:".pager-forward",btn1dclass:"pager-back-disable",btn2dclass:"pager-forward-disable",more:".more",guideUrl:"http://rcd."+XN.env.domain+"/cwf_nget_guide"};
this.datas={};
this.data=null;
this.pdata=null;
this.udata=null;
this.req=null;
this.cindex=0;
this.direction="forward";
this._disableForward=true;
this._disableBack=true;
this.slideTimer=null;
this.autoSlideTimer=null;
function cutHTML(res,n){
var sub;
n=n||5;
splited=res.split("</li><li");
if(splited.length<n){
return {html:res,remained:null};
}
res=splited.slice(0,n).join("</li><li")+"</li>";
remained="<li"+splited.slice(n).join("</li><li");
return {html:res,remained:remained};
}
this.fetch=function(_1f){
var _20=document.location.href;
var url=XN.user.isGuide?_1f.config.guideUrl:_1f.config.loadUrl;
if(_20.indexOf("share")>-1||_20.indexOf("photo")>-1||_20.indexOf("status")>-1||_20.indexOf("blog")>-1){
}
_1f.req=new _4.Request({url:url+"?t="+Math.random(),method:"get",onSuccess:function(r){
var res=r.responseText,cut;
if(res.indexOf("##########")!=-1){
var _25=res.split("##########");
cut=cutHTML(_25[0],5);
html=cut.html;
if(_1f._PYMK4box){
_2.getElement(".recommend-friends-list",_1f._PYMK4box).innerHTML=html;
_1f._PYMK4box.style.display="block";
new _1.PYMK4({},cut.remained);
}
res=_25[1];
}
if(_1f._pymk_home_2){
setTimeout(function(){
_1f.datas=_1.makeArray(_2.getDom(res).childNodes);
_1f.pdata=_1f.datas.pdata;
_1f.pdata.cindex=0;
_1f.udata=_1f.datas.udata;
_1f.udata.cindex=0;
if(_1f.pdata.length>0){
_1f.data=_1f.pdata;
}else{
_1f.data=_1f.udata;
}
_1f.dataType="p";
if(_1f.pdata.length<1&&_1f.udata.length<1){
return;
}
_1f.fireEvent("load");
if(_1f.pdata.length>_1f.amount||_1f.udata.length>_1f.amount||(_1f.pdata.length>0&&_1f.udata.length>0)){
_1f.fireEvent("hasmore");
}
},XN.browser.IE?(XN.browser.IE6?3000:1000):100);
}
}});
_1f.req.send();
};
this.changeData=function(_26){
if(_26.dataType=="p"){
_26.dataType="u";
_26.pdata.cindex=_26.cindex;
_26.data=_26.udata;
_26.cindex=_26.udata.cindex;
}else{
_26.dataType="p";
_26.udata.cindex=_26.cindex;
_26.data=_26.pdata;
_26.cindex=_26.pdata.cindex;
}
};
this.setContent=function(_27,_28){
var _29=_1.getSomeDom(_27.data,_27.cindex,_27.cindex+_27.amount);
var _2a=_2.getDom("<div class=\"group\"></div>");
_2a.childNodes[0].appendChild(_29);
if(_27.direction=="forward"){
_27.ul.appendChild(_2a);
}
if(_27.direction=="back"){
_27.ul.insertBefore(_2a,_27.ul.firstChild);
}
if(_28){
_27.logShow();
return;
}
_27.slide();
};
this.logShow=function(_2b){
var ids=[];
var _2d=[];
var lis=_2.getElements("li",_2b.ul);
for(var i=0,len=lis.length;i<len;i++){
var id=lis[i].getAttribute("id").split("_")[1];
ids.push(id);
_2d.push(_1.getType(id));
var _32=_1.getLog(id,"show");
}
_1.logRcd({action:_32||_1.stats["show"],guest_id:ids.join("|"),type:_2d.join("|")});
};
this.forward=function(_33,_34){
if(_33._disableActions){
return;
}
if(_33._disableForward){
return;
}
_33.direction="forward";
_33.checkBeforeForward();
_33.setContent(_34);
_33.checkAfterForward();
if(_33.canBack()){
_33.enableBack();
}
_33.fireEvent("forward");
_1.logRcd({action:XN.user.isGuide?"RecGuide_forward":"RecMixed_forward",guest_id:"",type:""});
};
this.back=function(_35){
if(_35._disableActions){
return;
}
if(_35._disableBack){
return;
}
_35.direction="back";
_35.checkBeforeBack();
_35.setContent();
_35.checkAfterBack();
_35.fireEvent("back");
_1.logRcd({action:XN.user.isGuide?"RecGuide_back":"RecMixed_back",guest_id:"",type:""});
};
this.checkBeforeForward=function(_36){
if(_36._forwardWillChangeData){
_36.changeData();
_36._forwardWillChangeData=false;
_36._backWillChangeData=true;
}else{
_36.cindex+=_36.amount;
_36._backWillChangeData=false;
}
};
this.checkAfterForward=function(_37){
if(!_37.canForward()){
_37.changeData();
if(_37.canForward()||(_37.dataType=="u"&&_37.data.length>0)){
_37._forwardWillChangeData=true;
_37.changeData();
}else{
_37._forwardWillChangeData=false;
_37.changeData();
_37.disableForward();
}
}
};
this.checkBeforeBack=function(_38){
if(_38._backWillChangeData){
_38.changeData();
_38._backWillChangeData=false;
_38._forwardWillChangeData=true;
}else{
_38.cindex-=_38.amount;
_38._forwardWillChangeData=false;
}
if(_38.canForward()){
_38.enableForward();
}
_38.changeData();
if(_38.dataType=="u"&&_38.data.length>0){
_38.enableForward();
}
_38.changeData();
};
this.checkAfterBack=function(_39){
if(_39.cindex<=0){
_39.changeData();
if(_39.cindex>0){
_39._backWillChangeData=true;
_39.changeData();
}else{
_39._backWillChangeData=false;
_39.changeData();
_39.disableBack();
}
}
};
this.enableForward=function(_3a){
if(!_3a._disableForward){
return;
}
_3a.btn2.removeClass(_3a.btn2dclass);
_3a._disableForward=false;
};
this.enableBack=function(_3b){
if(!_3b._disableBack){
return;
}
_3b.btn1.removeClass(_3b.btn1dclass);
_3b._disableBack=false;
};
this.disableForward=function(_3c){
_3c.btn2.addClass(_3c.btn2dclass);
_3c.direction="back";
_3c._disableForward=true;
};
this.disableBack=function(_3d){
_3d.btn1.addClass(_3d.btn1dclass);
_3d.direction="forward";
_3d._disableBack=true;
};
this.canForward=function(_3e){
return !(_3e.cindex>=_3e.data.length-_3e.amount);
};
this.canBack=function(_3f){
if(_3f.cindex>0||(_3f.dataType=="u"&&_3f.pdata.length>0)){
return true;
}
return false;
};
this.hasRemovedAll=function(_40){
return (_40.pdata.length<1&&_40.udata.length<1);
};
this.reallyCanForward=function(_41){
if(_41.canForward()){
return true;
}
if(_41.dataType=="u"&&!_41.canForward()){
return false;
}
_41.changeData();
if(_41.canForward()||(_41.dataType=="u"&&_41.data.length>0)){
_41.changeData();
return true;
}
_41.changeData();
return false;
};
this.slide=function(_42){
_42._disableActions=true;
var _43,_44,_45,_46=_42.ul.parentNode;
if(_42.direction=="forward"){
_43=function(){
return _46.scrollLeft>=240;
};
_44=_2.getElement(".group",_42.ul);
_45=function(){
_46.scrollLeft+=3;
};
}
if(_42.direction=="back"){
_46.scrollLeft=240;
_43=function(){
return _46.scrollLeft<=0;
};
_44=_2.getElements(".group",_42.ul)[1];
_45=function(){
_46.scrollLeft-=3;
};
}
_42.slideTimer=setInterval(function(){
if(_43()){
clearInterval(_42.slideTimer);
_42.ul.removeChild(_44);
_46.scrollLeft=0;
_42._disableActions=false;
_42.logShow();
return;
}
_45();
},_42.slideDelay);
};
this.autoSlide=function(_47){
if(_47._disableForward&&_47._disableBack&&_47.autoSlideTimer){
clearInterval(_47.autoSlideTimer);
return;
}
_47.autoSlideTimer=setInterval(function(){
if(_47.direction=="forward"){
_47.forward();
}
if(_47.direction=="back"){
_47.back();
}
},_47.autoSlideDelay);
};
this.pauseAutoSlide=function(_48){
if(_48.autoSlideTimer){
clearInterval(_48.autoSlideTimer);
}
};
this.remove=function(_49,id){
var _4b=_1.getItem(id);
var _4c=_2.getElement(".shut-new",_4b);
var tip=document.createElement("span");
tip.innerHTML="<span class=\"remove-tip\">\u64cd\u4f5c\u6210\u529f</span>";
_49._disableActions=true;
_49.fireEvent("remove",id);
_4c.style.cssText="top:-9999px;right:-9999px";
_4b.appendChild(tip);
setTimeout(function(){
_49.syncData(_4b);
_49.checkAfterForward();
_4b.dispose();
_49._disableActions=false;
_49.patch();
},1000);
var _4e=new _4.Request({url:_49.delUrl+"?t="+Math.random(),method:"post",data:"type="+_1.getType(id)+"&guest="+id,onSuccess:function(r){
}});
_4e.send();
};
this.removeFromAdd=function(_50,id){
if(document.getElementById("log_addFriendEnd_"+id)){
_1.logRcd({action:document.getElementById("log_addFriendEnd_"+id).value,guest_id:id,type:document.getElementById("type_value_"+id).value});
}
_50.remove(id);
};
this.syncData=function(_52,_53){
_52.data.splice(_1.getData(_53,"index"),1);
};
this.updataIndex=function(_54){
var lis=_2.getElements("li",_54.ul);
for(var i=0;i<lis.length;i++){
lis[i].setAttribute("data-index",_54.cindex+i);
}
};
this.patch=function(_57){
if(_57.hasRemovedAll()){
_57.box.hide();
return;
}
var _58=_57.data[_57.cindex+_57.amount-1];
if(!_58){
if(_57.isBlank()){
_2.getElement(".group",_57.ul).style.cssText="width: 240px;height: 168px;";
var _59=_57.dataType;
if(!_57.reallyCanForward()){
_57.back();
}else{
_57.forward();
}
if(_57.dataType!=_59&&_59=="p"){
_57.pdata.cindex-=_57.amount;
}
return;
}
}else{
_2.getElement(".group",_57.ul).appendChild(_58);
var id=_58.getAttribute("id").split("_")[1];
var _5b=_1.getLog(id,"show");
var _5c=XN.user.isGuide?"RecGuide_show":"RecMixed_show";
_1.logRcd({action:_5b||_5c,guest_id:id,type:_1.getType(id)});
}
_57.updataIndex();
};
this.isBlank=function(_5d){
return !_2.getElement("li",_5d.ul);
};
this.showCmt=function(_5e,id){
var msg=_2.getElement("#commonFriend_"+id+" p.description");
if(_2.id("reconnect_"+id).style.display=="none"){
_2.id("reconnect_"+id).style.display="block";
msg.innerHTML="\u4e00\u58f0\u95ee\u5019\uff0c\u4e00\u751f\u670b\u53cb";
_2.getElement("#reconnect_"+id+" textarea").focus();
}else{
_2.id("reconnect_"+id).style.display="none";
msg.innerHTML="\u6709\u6bb5\u65f6\u95f4\u6ca1\u8054\u7cfb\u4e86";
}
};
this.gossip=function(_61,id){
var _63=_2.getElement("#reconnect_"+id+" textarea").value;
var _64=_2.id("whisper_"+id).checked?"1":"0";
var _65=new _4.Request({url:"http://gossip.renren.com/gossip.do",method:"post",data:"body="+_63+"&cc="+id+"&id="+id+"&only_to_me="+_64+"&ref="+window.location.href,onSuccess:function(r){
var j=JSON.parse(r.responseText);
if(parseInt(j.code)!=0){
if(j.msg){
XN.Do.showError(j.msg);
}
return;
}
_2.id("reconnect_"+id).innerHTML="<div style=\"height:79px;line-height:79px;text-align:center;\"><img style=\"vertical-align:middle;\" src=\"http://a.xnimg.cn/imgpro/icons/yes.png\" /> \u7559\u8a00\u6210\u529f</div>";
_61.remove(id);
}});
_65.send();
var _68=_1.getLog(id,"leaveMsgSct");
if(_64=="1"){
_1.logRcd({action:_68||"frtPage_recommend_R_leaveMsgSct",guest_id:id,type:_1.getType(id)});
}
};
this.showProfile=function(_69,id){
if(_2.id("more-mayknow-"+id).style.display=="none"){
_2.id("more-mayknow-"+id).style.display="block";
}else{
_2.id("more-mayknow-"+id).style.display="none";
}
if(_2.id("more-person-data-"+id).innerHTML!=""){
return;
}
var _6b=new _4.Request({url:"http://friend."+XN.env.domain+"/homeReconnectShowInfo?guest="+id,method:"get",onSuccess:function(_6c){
var r=JSON.parse(JSON.parse(_6c.responseText).code);
var p=["<p",((r.gender)?"":" style=\"display: none;\""),"><span class=\"profile-label\">\u6027\u522b\uff1a</span>",r.gender,"</p>","<p",((r.homeProvince)?"":" style=\"display: none;\""),"><span class=\"profile-label\">\u5bb6\u4e61\uff1a</span>",r.homeProvince,"&nbsp;",r.homeCity,"</p>","<p",((r.prefix)?"":" style=\"display: none;\""),"><span class=\"profile-label\">",r.prefix,"\uff1a</span>",r.postfix,"</p>",].join("");
_2.id("more-person-data-"+id).innerHTML=p;
}});
_6b.send();
};
this.showPageProfile=function(_6f,id){
if(_2.id("more-mayknow-"+id).style.display=="none"){
_2.id("more-mayknow-"+id).style.display="block";
}else{
_2.id("more-mayknow-"+id).style.display="none";
}
};
this.requestPageFriend=function(_71,id,cb,_74){
var _75="";
if(_74){
_75=_74;
}
new _4.Request({url:"http://page.renren.com/makefans"+_75,method:"post",data:"pid="+id,onSuccess:function(r){
var _77=JSON.parse(r.responseText);
var c=_77.code;
if(c==0||c==2){
XN.Do.showMessage("<span style=\"color:#333\">\u64cd\u4f5c\u6210\u529f\uff01</span>");
cb(id);
}else{
if(c==3){
}else{
if(c==11){
XN.Do.confirm({title:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",message:"<p><img id=\"pwIcodeImg\" src=\"http://icode.renren.com/getcode.do?t=pagewhite&rnd="+Math.random()+"\"/> <a href=\"#nogo\" onclick=\"refreshCodeInRequestPageFriend();return false;\">\u6362\u4e00\u4e2a</a></p><p style=\"margin-top:10px;color:#333;\">\u9a8c\u8bc1\u7801\uff1a<input type=\"text\" class=\"input-text\" id=\"pwIcode\"/></p>",callback:function(r){
if(!r){
return;
}
var _7a=encodeURIComponent($("pwIcode").value);
_71.requestPageFriend(id,cb,"?Icode="+_7a);
},width:250});
}else{
if(c==12){
XN.Do.confirm({title:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",message:"<p><img id=\"pwIcodeImg\" src=\"http://icode.renren.com/getcode.do?t=pagewhite&rnd="+Math.random()+"\"/> <a href=\"#nogo\" onclick=\"refreshCodeInRequestPageFriend();return false;\">\u6362\u4e00\u4e2a</a></p><p style=\"margin-top:10px;color:#333;\">\u9a8c\u8bc1\u7801\uff1a<input type=\"text\" class=\"input-text\" id=\"pwIcode\"/><p style=\"color:red\">\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</p></p>",callback:function(r){
if(!r){
return;
}
var _7c=encodeURIComponent($("pwIcode").value);
_71.requestPageFriend(id,cb,"?Icode="+_7c);
},width:250});
}else{
XN.Do.showMessage("<span style=\"color:#333;\">"+(_77.msg||"\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01")+"</span>");
if(c==6){
cb(id);
}
}
}
}
}
}}).send();
};
this.followSite=function(_7d,id,url,_80){
var _81=url+"/follow?from=rcd";
new _4.Request({url:_81,method:"post",onSuccess:function(r){
var j=JSON.parse(r.responseText);
if(j.code==0){
XN.DO.showMessage("\u5df2\u6210\u529f\u5173\u6ce8\u5c0f\u7ad9\u201c"+_80+"\u201d");
_7d.remove(id);
}
},onError:function(r){
XN.DO.showError("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
}}).send();
};
this.joinGroup=function(_85,id,_87,_88){
var _89="http://xiaozu.renren.com/xiaozu/"+id+"/add";
new _4.Request({url:_89,method:"post",onSuccess:function(r){
var j=JSON.parse(r.responseText);
if(j.code==0){
XN.DO.showMessage("\u5df2\u6210\u529f\u52a0\u5165\u4eba\u4eba\u5c0f\u7ec4\u201c"+_87+"\u201d,<a href=\""+_88+"\" target=\"_blank\"> \u53bb\u770b\u770b>> </a>");
_85.remove(id);
}else{
XN.DO.showError(j.msg);
}
},onError:function(r){
XN.DO.showError("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
}}).send();
};
this.joinHipster=function(_8d,id,_8f){
var _90="http://j.renren.com/actions/follow",_91="http://j.renren.com/u/"+id,_92="\u5df2\u6210\u529f\u5173\u6ce8\u8fbe\u4eba\u201c"+_8f+"\u201d\uff0c<a href=\""+_91+"\" target=\"_blank\">\u53bbTA\u7684\u4e3b\u9875\u770b\u770b>></a>";
new _4.Request({url:_90,method:"post",data:"type=0&id="+id,onSuccess:function(r){
var j=JSON.parse(r.responseText);
if(j.code==0){
XN.DO.showMessage(_92,"\u63d0\u793a",4);
_8d.remove(id);
}else{
XN.DO.showError(j.msg);
}
},onError:function(r){
XN.DO.showError("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5");
}}).send();
};
this.hidePanels=function(_96){
var _97=_2.getElements(".comefrom",_96.box);
var _98=_2.getElements(".reconnect-gossip",_96.box);
for(var i=0;i<_97.length;i++){
_97[i].style.display="none";
}
for(var i=0;i<_98.length;i++){
_98[i].style.display="none";
_2.getElement("p.description",_98[i].parentNode).innerHTML="\u6709\u6bb5\u65f6\u95f4\u6ca1\u8054\u7cfb\u4e86";
}
};
this.addLogRcd=function(_9a,_9b){
var e=_9b||window.event;
var _9d=e.toElement||e.target;
var _9e=_9d.getAttribute("logtype");
if(_9e){
var uid=_9d.getAttribute("uid");
_1.logRcd({action:document.getElementById("log_"+_9e+"_"+uid).value,guest_id:document.getElementById("guest_"+uid).value,type:document.getElementById("type_value_"+uid).value});
}
};
this.sendMoreLogRcd=function(_a0){
_1.logRcd({action:XN.user.isGuide?"RecGuide_more":"RecMixed_more",guest_id:"",type:""});
};
this.bindEvent=function(_a1){
_a1.addEvent("load",function(){
_a1.setContent(true);
_a1.box.style.display="block";
});
_a1.addEvent("hasmore",function(){
_a1.enableForward();
});
_a1.addEvent("forward",function(){
_a1.hidePanels();
});
_a1.addEvent("back",function(){
_a1.hidePanels();
});
_a1.box.delegate(".request-follow-site","click",function(){
_a1.followSite(this.getAttribute("data-siteid"),this.getAttribute("data-siteurl"),this.getAttribute("data-sitename"));
});
_a1.box.delegate(".request-join-group","click",function(){
_a1.joinGroup(this.getAttribute("data-id"),this.getAttribute("data-name"),this.getAttribute("data-url"));
});
_a1.box.delegate(".request-join-jd","click",function(){
_a1.joinHipster(this.getAttribute("data-id"),this.getAttribute("data-name"));
});
_a1.box.addEvent("click",function(_a2){
_a1.addLogRcd(_a2);
});
if(_a1.more){
_a1.more.addEvent("click",function(){
_a1.sendMoreLogRcd();
});
}
_a1.btn1.addEvent("click",function(){
_a1.back();
});
_a1.btn2.addEvent("click",function(){
_a1.forward();
});
};
this.custom=function(_a3,_a4){
_a3.loadUrl=_a4.loadUrl||_a3.config.loadUrl;
_a3.delUrl=_a4.delUrl||_a3.config.delUrl;
_a3.amount=_a4.amount||_a3.config.amount;
_a3.slideDelay=_a4.slideDelay||_a3.config.slideDelay;
_a3.autoSlideDelay=_a4.autoSlideDelay||_a3.config.autoSlideDelay;
_a3.ul=_2.getElement(_a4.ul||_a3.config.ul);
_a3.box=_2.getElement(_a4.box||_a3.config.box);
_a3.btn1=_2.getElement(_a4.btn1||_a3.config.btn1,_a3.box);
_a3.btn2=_2.getElement(_a4.btn2||_a3.config.btn2,_a3.box);
_a3.more=_2.getElement(_a4.more||_a3.config.more,_a3.box);
_a3.btn1dclass=_a4.btn1dclass||_a3.config.btn1dclass;
_a3.btn2dclass=_a4.btn2dclass||_a3.config.btn2dclass;
};
this.initialize=function(_a5,_a6){
_a5._PYMK4box=_2.getElement(_a6.recommendFriends)||_2.getElement("#recommendFriends"),_a5._pymk_home_2=_2.getElement(_a6.box);
if(!_a5._PYMK4box&&!_a5._pymk_home_2){
return;
}
if(_a5._PYMK4box&&!_a5._pymk_home_2){
_a5.custom(_a6);
_a5.fetch();
return;
}
_a5.custom(_a6);
_a5.bindEvent();
_a5.fetch();
};
});
this.PYMK4=new Class(function(){
this.config={distance:XN.browser.IE6?256:252,many:4,box:"#recommendFriends",forwardBtnClass:".pager-forward",backBtnClass:".pager-back",userhead:".userhead",username:".username",addFriendBtn:".add-friend",deleteBtnClass:".x-to-hide",scrollElementClass:".recommend-friends-list",forwardBtnDisableClass:"pager-forward-disable",backBtnDisableClass:"pager-back-disable",more:".more"};
this.logAction={show:XN.user.isGuide?"RecGuideFriend_show":"RecFriend_show",remove:XN.user.isGuide?"RecGuideFriend_cancle":"RecFriend_cancle",addFriend:XN.user.isGuide?"RecGuideFriend_addFriend":"RecFriend_addFriend",addFriendEnd:XN.user.isGuide?"RecGuideFriend_addFriendEnd":"RecFriend_addFriendEnd",name:XN.user.isGuide?"RecGuideFriend_nameToPrf":"RecFriend_nameToPrf",head:XN.user.isGuide?"RecGuideFriend_imgToPrf":"RecFriend_imgToPrf",back:XN.user.isGuide?"RecGuideFriend_back":"RecFriend_back",forward:XN.user.isGuide?"RecGuideFriend_forward":"RecFriend_forward",more:XN.user.isGuide?"RecGuideFriend_more":"RecFriend_more"};
this.loadConfig=function(_a7,o){
_a7.distance=o.distance||_a7.config.distance;
_a7.many=o.many||_a7.config.many;
_a7.box=_2.getElement(o.box||_a7.config.box);
_a7.forwardBtn=_2.getElement(o.forwardBtnClass||_a7.config.forwardBtnClass,_a7.box);
_a7.backBtn=_2.getElement(o.backBtnClass||_a7.config.backBtnClass,_a7.box);
_a7.more=_2.getElement(_a7.config.more,_a7.box);
_a7.userheads=o.userhead||_a7.config.userhead;
_a7.usernames=o.username||_a7.config.username;
_a7.deleteBtns=o.deleteBtnClass||_a7.config.deleteBtnClass;
_a7.addFriendBtns=o.addFriendBtn||_a7.config.addFriendBtn;
_a7.scrollElement=_2.getElement(o.scrollElementClass||_a7.config.scrollElementClass,_a7.box);
_a7.forwardBtnDisableClass=o.forwardBtnDisableClass||_a7.config.forwardBtnDisableClass;
_a7.backBtnDisableClass=o.backBtnDisableClass||_a7.config.backBtnDisableClass;
};
this.getSomeInfo=function(_a9){
_a9.lis=_2.getElements("li",_a9.scrollElement);
_a9.listLength=_a9.lis.length;
_a9.pages=Math.ceil(_a9.listLength/_a9.many);
};
this.someThingDefault=function(_aa){
_aa.currPage=1;
_aa.scrollTimer=XN.browser.IE?12:18;
_aa.canForward=false;
_aa.canBack=false;
_aa.timer=null;
_aa.direction="";
_aa.scrolling=false;
_aa.delUrl="http://rcd."+XN.env.domain+"/cwf_nremove_home";
};
this.setPagerDefaultStatus=function(_ab){
if(_ab.listLength>_ab.many){
_ab.forwardBtn.removeClass(_ab.forwardBtnDisableClass);
_ab.canForward=true;
}
};
this.moveTo=function(_ac,_ad){
var _ae=parseInt(_ac.scrollElement.style.left);
_ac.moveTimer(_ae,_ad);
};
this.moveTimer=function(_af,_b0,_b1){
_af.scrolling=false;
var _b2=_b1+_b0;
_b2=_af.direction=="right"?Math.abs(_b2):_b2;
var dr=_b2;
var _b4=_af.direction=="right"?(_b0+dr):(_b0-dr);
_af.scrollElement.style.left=_b4+"px";
};
this.pagerForward=function(_b5){
if(!_b5.canForward||_b5.scrolling){
return;
}
_b5.direction="left";
_b5.scrolling=true;
_b5.moveTo(_b5.currPage++*_b5.distance);
_b5.setPagerBtnStatus();
_b5.sendOnShowLog();
_1.logRcd({action:_b5.logAction.forward,guest_id:"",type:""});
};
this.pagerBack=function(_b6){
if(!_b6.canBack||_b6.scrolling){
return;
}
_b6.direction="right";
_b6.scrolling=true;
_b6.moveTo((--_b6.currPage-1)*_b6.distance);
_b6.setPagerBtnStatus();
_b6.sendOnShowLog();
_1.logRcd({action:_b6.logAction.back,guest_id:"",type:""});
};
this.pagerMore=function(_b7){
_1.logRcd({action:_b7.logAction.more,guest_id:"",type:""});
};
this.setPagerBtnStatus=function(_b8){
if(_b8.currPage==1){
_b8.backBtn.addClass(_b8.backBtnDisableClass);
_b8.canBack=false;
}else{
_b8.canBack=true;
_b8.backBtn.removeClass(_b8.backBtnDisableClass);
}
if(_b8.currPage==_b8.pages){
_b8.forwardBtn.addClass(_b8.forwardBtnDisableClass);
_b8.canForward=false;
}else{
_b8.canForward=true;
_b8.forwardBtn.removeClass(_b8.forwardBtnDisableClass);
}
};
this.loadExtraItems=function(_b9){
if(!_b9._remained4){
return;
}
_b9.scrollElement.appendChild(_2.getDom(_b9._remained4));
_b9._remained4=null;
_b9.canForward=true;
_b9.lis=_2.getElements("li",_b9.scrollElement);
_b9.listLength=_b9.lis.length;
_b9.pages=Math.ceil(_b9.listLength/_b9.many);
};
this.bindEvent=function(_ba){
_ba.backBtn.addEvent("click",function(){
_ba.pagerBack();
});
_ba.forwardBtn.addEvent("click",function(){
_ba.loadExtraItems();
_ba.pagerForward();
});
if(_ba.more){
_ba.more.addEvent("click",function(){
_ba.pagerMore();
});
}
if(!_ba.box){
return;
}
_ba.box.delegate(_ba.addFriendBtns,"click",function(e){
var id=this.getAttribute("data-id"),_bd=this.getAttribute("data-type"),url=this.getAttribute("data-url"),_bf=this.getAttribute("data-name");
_ba.sendAddFriendLog(id,_bd);
var ele=this.parentNode.parentNode;
var _c1=_1.getLog(id,"addFriendEnd");
function removeFromAdd(){
_ba.removeFriend(ele);
var _c2={action:_c1||_ba.logAction.addFriendEnd,guest_id:id,type:_bd};
if(window.addFriendPreGroup){
$extend(_c2,{pregroup:window.addFriendPreGroup});
}
_1.logRcd(_c2);
}
showRequestFriendDialog(id,_bf,url,"","gt_home_guide4_2",removeFromAdd);
});
_ba.box.delegate(_ba.userheads,"click",function(){
var _c3=this.parentNode;
var id=_c3.getAttribute("id").split("_")[1],_c5=_c3.getAttribute("data-type");
_ba.sendToPrfLog(id,_c5,"head");
});
_ba.box.delegate(_ba.usernames,"click",function(){
var id=this.getAttribute("data-id"),_c7=this.getAttribute("data-type");
_ba.sendToPrfLog(id,_c7,"name");
});
_ba.box.delegate(_ba.deleteBtns,"click",function(){
var x=this,_c9=this.parentNode;
_ba.removeFriend(_c9,x);
_ba.sendRemoveLog(_c9);
});
};
this.friendsOnShow=function(_ca){
return _ca.lis.slice((_ca.currPage-1)*_ca.many,_ca.currPage*_ca.many);
};
this.sendOnShowLog=function(_cb){
var ids=[],_cd=[],_ce=_cb.friendsOnShow();
for(var i=0,l=_ce.length;i<l;i++){
ids.push(_ce[i].getAttribute("id").split("_")[1]);
_cd.push(_ce[i].getAttribute("data-type"));
var _d1=_1.getLog(_ce[i].getAttribute("id").split("_")[1],"show");
}
_1.logRcd({action:_d1||_cb.logAction.show,guest_id:ids.join("|"),type:_cd.join("|")});
};
this.removeFriend=function(_d2,ele){
var id=ele.getAttribute("id").split("_")[1],_d5=ele.getAttribute("data-type");
var tip=document.createElement("span");
tip.innerHTML="<span class=\"remove-tip\">\u64cd\u4f5c\u6210\u529f</span>";
var _d7=new _4.Request({url:_d2.delUrl,method:"post",data:"type="+_d5+"&guest="+id,onSuccess:function(r){
ele.appendChild(tip);
setTimeout(function(){
_d2.loadExtraItems();
_d2.scrollElement.removeChild(ele);
_d2.sendFillLog();
_d2.reset();
},1000);
}});
_d7.send();
};
this.sendRemoveLog=function(_d9,ele){
var rid=ele.getAttribute("id").split("_")[1],_dc=ele.getAttribute("data-type");
var _dd=_1.getLog(rid,"remove");
_1.logRcd({action:_dd||_d9.logAction.remove,guest_id:rid,type:_dc});
};
this.sendFillLog=function(_de){
if(_de.currPage==_de.pages){
return;
}
var _df=_de.lis[_de.currPage*_de.many];
var id=_df.getAttribute("id").split("_")[1],_e1=_df.getAttribute("data-type");
var _e2=_1.getLog(id,"show");
_1.logRcd({action:_e2||_de.logAction.show,guest_id:id,type:_e1});
};
this.sendAddFriendLog=function(_e3,id,_e5){
logType=_1.getLog(id,"addFriend");
_1.logRcd({action:logType||_e3.logAction.addFriend,guest_id:id,type:_e5});
};
this.sendToPrfLog=function(_e6,id,_e8,ac){
var t=_e6.logAction.name;
logType=_1.getLog(id,"name");
if(ac=="head"){
t=_e6.logAction.head;
logType=_1.getLog(id,"head");
}
_1.logRcd({action:logType||t,guest_id:id,type:_e8});
};
this.reset=function(_eb){
_eb.lis=_2.getElements("li",_eb.scrollElement);
_eb.listLength=_eb.lis.length;
_eb.pages=Math.ceil(_eb.listLength/_eb.many);
if(_eb.pages!=0){
if(_eb.currPage==_eb.pages){
_eb.forwardBtn.addClass(_eb.forwardBtnDisableClass);
_eb.canForward=false;
}
if(_eb.currPage>_eb.pages){
_eb.pagerBack();
}
}else{
_eb.box.hide();
}
};
this.initialize=function(_ec,_ed,_ee){
if(_ee){
_ec._remained4=_ee;
}
_ec.loadConfig(_ed);
_ec.getSomeInfo();
_ec.someThingDefault();
_ec.setPagerDefaultStatus();
_ec.bindEvent();
_ec.sendOnShowLog();
};
});
this.logRcd=function(_ef){
var _f0=[];
_f0.push(_ef.action);
_f0.push(XN.user.id);
if(_ef.guest_id){
_f0.push(_ef.guest_id);
}
if(_ef.recommend_id){
_f0.push(_ef.recommend_id);
}
if(_ef.all_id){
_f0.push(_ef.all_id);
}
if(_ef.type){
_f0.push(_ef.type);
}
if(_ef.pregroup){
_f0.push(_ef.pregroup);
}
new Image().src="http://rcd."+XN.env.domain+"/ajaxHomeReconnectStat?param="+_f0.join("|")+"&t="+(new Date().getTime());
};
this.refreshCodeInRequestPageFriend=function(){
_2.id("pwIcodeImg").src="http://icode.renren.com/getcode.do?t=pagewhite&rnd="+Math.random();
};
});
object.define("xn/attachceil","dom, ua, events",function(_f1,_f2){
var dom=_f1("dom"),ua=_f1("ua"),_f5=_f1("events"),sc="scrollTop",_f7=ua.ua.webkit?"body":"documentElement",cls="already-fixed";
_f2.AttachCeilWrapper=new Class(function(){
this.listen=staticmethod(function(_f9){
var ele=dom.getElements(_f9);
if(ele.length>0){
ele.forEach(function(v){
new _f2.AttachCeilWrapper(v);
});
}
});
this.initialize=function(_fc,_fd){
_fc.container=_fd;
_fc.stump=document.createElement("div");
_fc.container.parentNode.insertBefore(_fc.stump,_fc.container);
_fc.__backupPosition=XN.element.getStyle(_fc.container,"position");
_fc.__backupTop=0;
_fc.finalTop=null;
_fc.fix=parseInt(_fd.getAttribute("data-fix"));
_fc.noFixParent=_fc.container.hasClass("attachceilwrap-nofix");
if(XN.fedstatsFlag_v5_home||ua.ua.ie==6){
_fc.fix=5;
}
_fc.fixed=false;
_fc.footer=dom.id("footer");
_fc.refix();
_fc.bindEvents();
_fc.modulesLoaded=false;
_fc.doNotCalculateTimer=setTimeout(function(){
_fc.modulesLoaded=true;
},15000);
};
this.fixParent=function(_fe){
if(_fe.parentSeted){
return;
}
_fe.parentSeted=true;
if(_fe.container.style.position!="absolute"&&_fe.container.style.position!="fixed"){
_fe.container.parentNode.style.height=_fe.container.parentNode.offsetHeight+"px";
}else{
_fe.container.parentNode.style.height=(_fe.container.parentNode.offsetHeight+_fe.container.offsetHeight)+"px";
}
};
this.refix=function(_ff){
_ff.container.removeClass(cls);
if(ua.ua.ie){
document[_f7][sc]++;
document[_f7][sc]--;
}
};
this.bindEvents=function(self){
self.bindLayoutEvent();
self.bindScrollEvent();
};
this.bindLayoutEvent=function(self){
dom.wrap(window).addEvent("changeLayout",function(){
self.refix();
});
};
this.bindScrollEvent=function(self){
dom.wrap(window).addEvent("scroll",function(){
var ft=self.getRealTop(self.footer),rTop;
if(self.modulesLoaded){
rTop=self.finalTop||self.getRealTop(self.container);
}else{
rTop=self.getRealTop(self.container);
}
if(!self.noFixParent){
self.fixParent();
}
if(document[_f7][sc]+self.fix>=rTop){
if(self.fixed){
if(ua.ua.ie==6){
if(document[_f7][sc]+255>ft){
self.container.style.top=(document[_f7][sc]+self.fix)+"px";
}
}
}else{
self.finalTop=rTop;
self.addFixedStyle();
}
}else{
if(self.fixed){
self.finalTop=null;
self.removeFixedStyle();
}
}
},true);
};
this.getRealTop=function(self,_106){
return XN.element.realTop(self.stump);
};
this.addFixedStyle=function(self){
self.fixed=true;
self.container.addClass(cls);
XN.element.setStyle(self.container,"position:fixed; _position:absolute; _zoom:1;");
if(ua.ua.ie!=6){
XN.element.setStyle(self.container,"top:"+self.fix+"px;");
}
};
this.removeFixedStyle=function(self){
self.fixed=false;
self.container.removeClass(cls);
XN.element.setStyle(self.container,"position:"+self.__backupPosition+";top:"+self.__backupTop+";");
};
});
});
object.use("xn/attachceil, dom",function(_109,dom){
var _10b=_109.AttachCeilWrapper,_10c=".attachceilwrap";
dom.ready(function(){
_10b.listen(_10c);
if(window.asyncHTMLManager){
window.asyncHTMLManager.addEvent("load",function(){
_10b.listen(_10c);
});
}
});
});
(function(){
function forwardChain(obj){
if(!obj){
return;
}
this.params={};
$extend(this.params,obj);
if(!this.params.elm||!this.params.box||!this.params.btn||!this.params.cover){
return;
}
var This=this;
this.chain=Sizzle(".share-chain-forward",this.params.elm)[0];
this.cliped=false;
this.chainInit=function(){
var txt=this.chain.innerHTML;
txt=txt.replace(/<a[^>]+>[^<]*(<img[^>]+>)*<\/a>/ig,function(c){
return "</span>"+c+"<span>";
});
txt=txt.substring(7)+"</span>";
this.chain.innerHTML=txt;
this.chainClip();
};
this.chainClip=function(){
var elms=this.chain.children,len=0,max=180,This=this;
this.leftChain=document.createDocumentFragment();
this.rightChain=document.createDocumentFragment();
this.originChain=document.createDocumentFragment();
XN.Array.each(elms,function(i,v){
if(v.innerHTML.match(/<img[^>]+>/g)){
len+=v.innerHTML.replace(/<img[^>]+>/g,"").length+v.innerHTML.match(/<img[^>]+>/g).length;
}else{
if(v.tagName.toLowerCase()==="img"){
len++;
}else{
len+=v.innerHTML.length;
}
}
var _116=v.cloneNode(true),_117=_116.cloneNode(true);
if(len<=max){
This.leftChain.appendChild(_116);
}else{
if(!This.cliped){
This.cliped=true;
if(v.tagName.toLowerCase()!="a"&&v.innerHTML.replace(/<img[^>]+>/g,"")!=""){
var str=v.innerHTML.replace(/<img[^>]+>/g,""),_119=max-len+str.length,cr=document.createElement("span");
cr.innerHTML=str.substring(0,_119)+"...";
This.leftChain.appendChild(cr);
}else{
This.leftChain.appendChild(_116);
}
}else{
This.rightChain.appendChild(_116);
}
}
This.originChain.appendChild(_117);
});
this.chain.innerHTML="";
this.chain.appendChild(this.leftChain);
};
this.showMore=function(){
if(Sizzle(".share-chain-cover",this.chain).length>0){
Sizzle(".share-chain-cover",this.chain)[0].hide();
}
this.chain.innerHTML="";
this.chain.appendChild(this.originChain);
};
this.hideMore=function(){
var _11b=this.params.cover.cloneNode(true);
this.chain.appendChild(_11b);
};
this.chainInit();
if(this.cliped){
this.hideMore();
}else{
this.showMore();
}
document.body.delegate(".share-chain-cover","click",function(){
This.showMore();
});
this.params.box.style.position="relative";
this.params.box.style.left="0";
}
XN.dom.ready(function(){
var _11c=new forwardChain({box:$("shareChainBox"),elm:$("shareChainMain"),btn:$("shareChainBtn"),cover:Sizzle(".share-chain-cover")[0]});
});
})();
XN.dom.ready(function(){
function shareGallery(_11d){
var _11e=Sizzle(".trigger a",_11d.parentNode),_11f=0,dist=240,_121,_122,ind=0,_124=false,_122;
if(!_11d||_11e.length==0){
return;
}
_11d.style.left=0;
_121=new XN.effect.Motion("swing",500);
_121.onTweening=function(){
var p=this.equation(_11f,end);
_11d.style.left=p+"px";
};
_121.onComplete=function(){
_124=false;
_11f=-1*ind*dist;
$(_11e).forEach(function(v,i){
if(i!=ind){
$(v).delClass("active");
}else{
$(v).addClass("active");
}
});
initMotion();
};
_121.onStart=function(){
_124=true;
};
$(_11e).forEach(function(v,i){
$(v).addEvent("click",function(){
if(!_124&&i!=ind){
end=-1*i*dist;
ind=i;
clearTimeout(_122);
_121.start();
}
});
});
function initMotion(){
_122=setTimeout(function(){
if(!_124){
ind=(ind+1)%_11e.length;
end=-1*ind*dist;
_121.start();
}
},10000);
}
initMotion();
}
var _12a=Sizzle(".share-gallery");
if(_12a.length>0){
XN.array.each(_12a,function(i,v){
shareGallery(v);
});
}
(function(){
if($("shareId")){
var _12d="comment"+$("shareId").value;
object.use("dom",function(dom){
dom.wrap($(_12d));
});
}
})();
(function(){
var _12f=Sizzle(".combox_share .show-more a")[0];
if(!_12f){
return;
}
$(_12f).addEvent("click",function(e){
XN.event.stop(e);
XN.app.share.CommentManger.tabView.setCurrentTab("allCmts");
if($("allCmts").parent(".attachceilwrap").hasClassName("already-fixed")){
setTimeout(function(){
window.scrollTo(0,$("cmtsListCon").realTop()-35);
},100);
}
});
$("allCmts").addEvent("click",function(){
if($(this).parent(".attachceilwrap").hasClassName("already-fixed")){
setTimeout(function(){
window.scrollTo(0,$("cmtsListCon").realTop()-35);
},100);
}
});
$("friendCmts").addEvent("click",function(){
if($(this).parent(".attachceilwrap").hasClassName("already-fixed")){
setTimeout(function(){
window.scrollTo(0,$("cmtsListCon").realTop()-35);
},100);
}
});
})();
});
function detailLog(uid,_132,from,type){
var reg=/^\d+$/,url;
if(!reg.test(uid+_132+from+type)){
return;
}
url="http://share.renren.com/log/shareClickLog?resource_user_id="+uid+"&ugc_id="+_132+"&shfrom="+from+"&business_type="+type;
XN.net.sendStats(url);
}
XN.dom.ready(function(){
var _137=$("commentDrawer");
if(!_137){
return;
}
var hots=Sizzle(".statuscmtitem-hot"),_139=$("commentDrawer2"),_13a=Sizzle(".statuscmtitem",$("allCmts_comment_list")),_13b=Sizzle(".statuscmtitem-small",$("allCmtsList"))[0],_13c=false,_13d=$("shareId")?$("shareId").value:null,_13e=$("shareOwner")?$("shareOwner").value:null,_13f=$("shareType")?$("shareType").value:null,from=["01030326200","01030326000"];
function initDrawer(){
if(hots.length>0&&$(hots[0]).hasClassName("statuscmtitem-hot-2")){
from[0]="01030326100";
XN.array.each(_13a,function(i,v){
if(i!==0){
v.style.display="none";
}
});
_13c=true;
if(_13b){
$(_13b).hide();
}
$("allCmtsList").show();
$("showMoreAllCmtBox").show();
}
}
function toggleDrawer(open){
if(!!open){
if(_13c){
XN.array.each(_13a,function(i,v){
v.style.display="block";
});
if(_13b){
$(_13b).show();
}
$("showMoreAllCmtBox").hide();
}
$("allCmtsList").show();
$("btnCmtDrawer").delClass("drawer-closed");
$("btnCmtDrawer").addClass("drawer-opened");
$("btnCmtDrawer").innerHTML="\u6536\u8d77";
}else{
$("allCmtsList").hide();
$("btnCmtDrawer").addClass("drawer-closed");
$("btnCmtDrawer").delClass("drawer-opened");
$("btnCmtDrawer").innerHTML="\u5c55\u5f00";
}
}
initDrawer();
$("showMoreAllCmt").addEvent("click",function(){
toggleDrawer(true);
});
_137.addEvent("click",function(){
if($("btnCmtDrawer").hasClassName("drawer-closed")){
detailLog(_13e,_13d,from,_13f);
toggleDrawer(true);
}else{
toggleDrawer(false);
if(_137.hasClassName("already-fixed")){
var top=_139.realTop()-35;
window.scrollTo(0,top);
}
}
});
var _147=$("ilike");
window.addEvent("scroll",function(){
if(_139.hasClassName("already-fixed")){
_137.style.top=0;
if(XN.browser.IE6&&_147){
_147.style.top=(document.documentElement.scrollTop+35)+"px";
}
}else{
if(_137.hasClassName("already-fixed")){
if(!XN.browser.IE6){
_137.style.top="20px";
}else{
_137.style.top=document.documentElement.scrollTop+"px";
}
}
}
});
});

