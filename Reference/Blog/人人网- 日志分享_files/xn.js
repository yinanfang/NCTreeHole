XN.namespace("app.share");
XN.namespace("config.share");
XN.config.share.enableSyncComment=false;
function updateOuterShareTip(){
function copyShareUrl(){
if(window.clipboardData.setData("Text",$("shareLinkVal").value)){
$("copyTip").innerHTML="(\u94fe\u63a5\u5df2\u590d\u5236)";
}else{
$("shareLinkVal").select();
$("copyTip").innerHTML="(\u8bf7\u624b\u52a8\u590d\u5236)";
}
}
var _1=$("copyTip");
if(!_1||!$("shareLinkVal")){
return;
}
if(window.clipboardData){
$("shareLinkVal").style.width="210px";
_1.innerHTML="<a href=\"javascript:;\" style=\"margin-left:5px;\">\u590d\u5236</a>";
_1.getElementsByTagName("a")[0].onclick=copyShareUrl;
}else{
_1.innerHTML="(Ctrl+C\u6216\u53f3\u952e\u590d\u5236)";
}
_1.show();
}
XN.app.share.action=function(_2){
this.config={reqeustURI:"http://share."+XN.env.domain+"/share/submit.do",commentLength:300};
$extend(this.config,_2);
};
XN.app.share.action.prototype={getConfig:function(_3){
return this.config[_3];
},add:function(p){
var _5=this.getConfig("commentLength");
if(p.body.length>_5){
this.fireEvent("checkError","\u8bc4\u8bba\u5b57\u6570\u4e0d\u80fd\u8d85\u8fc7"+_5);
return;
}
this.request(p);
},send:function(p){
var _7=this.getConfig("commentLength");
if(p.ids.length===0){
this.fireEvent("checkError","\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u597d\u53cb");
return;
}
if(p.body.length>_7){
this.fireEvent("checkError","\u8bc4\u8bba\u5b57\u6570\u4e0d\u80fd\u8d85\u8fc7"+_7);
return;
}
this.request(p);
},_addParamInEditor:function(){
if($("isfromshare")){
return;
}
var _8;
if(XN.browser.IE){
_8=$element("<input name=\"isfromshare\" />");
}else{
_8=$element("input");
_8.name="isfromshare";
}
_8.id="isfromshare";
_8.type="hidden";
_8.value="1";
$("cmtbody").parentNode.insertBefore(_8,$("cmtbody"));
},commentBlog:function(p){
if(window.addNewCommentEntry&&$("cmtbody")){
$("cmtbody").value=p.body;
this._addParamInEditor();
$("isfromshare").value="1";
if($("feedComment")){
$("feedComment").checked=false;
}
if($("cmttoid")){
$("cmttoid").value="";
}
if($("whisper1")){
$("whisper1").value="0";
}
addNewCommentEntry();
$("isfromshare").value="0";
return;
}
var _a=this;
var _b=XN.string.getQuery("id",p.link);
var _c=XN.string.getQuery("owner",p.link);
new XN.net.xmlhttp({url:"http://blog."+XN.env.domain+"/PostComment.do",data:"id="+_b+"&owner="+_c+"&body="+encodeURIComponent(p.body)+"&to=0&only_to_me=0&isfromshare=1",onSuccess:function(r){
_a.fireEvent("commentBlogSuccess",r.responseText);
},onError:function(){
_a.fireEvent("commentBlogError");
}});
},commentPhoto:function(p){
if($("cmtbody")&&window.XN&&XN.page.albumPhoto){
$("cmtbody").value=p.body;
this._addParamInEditor();
$("isfromshare").value="1";
XN.PAGE.albumPhoto.commentEditorSave();
$("isfromshare").value="0";
return;
}
var _f=XN.string.getQuery("id",p.link);
var _10=XN.string.getQuery("owner",p.link);
new XN.net.xmlhttp({url:"http://photo."+XN.env.domain+"/ajaxcommentphoto2.do",data:"id="+_f+"&owner="+_10+"&body="+encodeURIComponent(p.body)+"&isfromshare=1",onSuccess:function(r){
This.fireEvent("commentPhotoSuccess",r.responseText);
},onError:function(){
This.fireEvent("commentPhotoError");
}});
},request:function(p){
var _13=this;
this.fireEvent("beforePost");
var tsc=p.tsc;
delete p.tsc;
XN.log("\u6b64\u6b21\u5206\u4eab\u6536\u96c6\u7684\u53c2\u6570\u5982\u4e0b:");
XN.log(p);
new XN.net.xmlhttp({url:this.getConfig("reqeustURI"),data:"tsc="+tsc+"&post="+encodeURIComponent(XN.json.build(p)),onComplete:function(){
_13.fireEvent("postComplete");
},onSuccess:function(r){
try{
var rs=XN.json.parse(r.responseText);
}
catch(e){
_13.fireEvent("postError");
}
if(rs.status===0){
_13.fireEvent("postSuccess",rs.msg,rs);
XN.app.share.fireEvent("postSuccess",p,rs);
if(new RegExp("(page|org)."+XN.env.domain_reg+"(/\\d+)?/note").test((p.link||p.form.link))){
new XN.net.xmlhttp({url:"http://"+location.host+"/note/addShareCount",method:"post",data:"id="+(p.noteId||p.form.noteId)+"&pid="+(p.fromno||p.form.formno)});
}
if(!XN.config.share.enableSyncComment){
return;
}
if(!p.body||XN.string.isBlank(p.body)){
return;
}
if(!p.sendcomment){
return;
}
if(p.pic&&p.pic!==""){
_13.commentPhoto(p);
}else{
if(new RegExp("blog."+XN.env.domain_reg).test(p.link)){
_13.commentBlog(p);
}
}
}else{
_13.fireEvent("postError",rs.msg);
}
},onError:function(){
_13.fireEvent("postError");
}});
}};
XN.event.enableCustomEvent(XN.app.share);
XN.event.enableCustomEvent(XN.app.share.action.prototype);
function checkShareAuth(el){
if(!XN.config.share.enableSyncComment){
return;
}
if(!XN.app.share.pop.sysMode){
return;
}
if(String(el.value)!="99"){
$("pop_share_syscomment").hide();
$("pop_share_sendcomment").disabled=true;
}else{
$("pop_share_syscomment").show();
$("pop_share_sendcomment").disabled=false;
}
}
(function(){
var _18;
XN.form=XN.FORM;
var _19=null;
var _1a=true;
var XHR=function(obj){
var _1d=false,_1e=$extend({},obj),_1f=null;
if(obj.waitTime&&obj.onTimeout){
_1d=true;
_1e.onSuccess=function(r){
window.clearTimeout(_1f._timeoutTimer);
obj.onSuccess(r);
};
}
_1f=new XN.net.xmlhttp(_1e);
if(_1d){
_1f._timeoutTimer=setTimeout(function(){
obj.onTimeout.call(_1f);
try{
_1f.abort();
}
catch(e){
XN.log(e);
}
},obj.waitTime);
}
};
XN.app.share.pop=function(url,_22,_23){
var _24=XN.APP.share.onlyShowSendContent||false;
var _25,_26,_27;
var _28={};
$extend(_28,_22);
var _29={add:false,send:false,fav:false};
if(!_22.tabDefault){
_22.tabDefault="add";
}
if(_24){
_22.tabDefault="send";
}
switch(_22.tabDefault){
case "send":
_29.send=true;
break;
case "fav":
_29.fav=true;
break;
case "add":
_29.add=true;
break;
default:
return false;
}
var _2a=_22.sysn===true?_22.sysn:false;
_26="\u7ad9\u5185\u4fe1\u7ed9\u597d\u53cb";
_27="\u53d1\u4fe1\u7ed9";
if(_24){
_25="\u7ad9\u5185\u4fe1\u7ed9\u597d\u53cb";
}else{
_25="\u5206\u4eab";
}
if(!_19&&!_1a){
new XN.NET.xmlhttp({url:"http://page."+XN.env.domain+"/myPages",method:"get",onSuccess:function(r){
try{
var rsp=XN.JSON.parse(r.responseText);
if(rsp.pages&&rsp.pages.length>0){
_19=rsp.pages;
}
XN.app.share.pop(url,_22);
}
catch(e){
}
},onComplete:function(){
_1a=true;
}});
return false;
}
var _2d=_22.tabDefault;
if(!_18){
_18=new XN.ui.multiFriendSelector({url:"http://sg.renren.com/s/f",maxNum:10});
_18.addEvent("overMaxNum",function(n){
XN.DO.showError("\u4e00\u6b21\u6700\u591a\u53ea\u80fd\u5206\u4eab\u7ed9"+n+"\u4f4d\u597d\u53cb^_^");
});
}
if(_22.tid){
_22="tid="+_22.tid+"&tribeId="+_22.tribeId;
}else{
_22="post="+encodeURIComponent(XN.json.build(_22));
}
var _2f="";
if(_19){
for(var i=0;i<_19.length;i++){
_2f+="<option value=\""+_19[i].id+"\">"+_19[i].name+"</option>";
}
}
var _31="<div id=\"popShareContainer\" style=\"display:none;\"><div class=\"share_header\">"+"\t\t<div class=\"tabs clearfix\">"+"\t\t\t\t<ul class=\"toggle_tabs clearfix\">"+"\t\t\t\t\t<li class=\"first\">"+"\t\t\t\t\t\t<a id=\"shareSendTab\" onfocus=\"this.blur()\" href=\"javascript:void(0)\">"+_26+"</a>"+"\t\t\t\t\t</li>";
if(_19){
_31+="<li class=\"middle\">"+"\t\t\t\t\t\t<a id=\"sharePageTab\" onfocus=\"this.blur()\" href=\"javascript:void(0)\">\u5206\u4eab\u5230\u516c\u5171\u4e3b\u9875</a>"+"\t\t\t\t\t</li>";
}
if(!_24){
_31+="<li class=\"middle\">"+"\t<a id=\"shareAddTab\" onfocus=\"this.blur()\" href=\"javascript:void(0)\">\u53d1\u9001\u5230\u65b0\u9c9c\u4e8b</a>"+"</li>";
}
if(!_24){
_31+="<li class=\"last\">"+"   <a id=\"shareFavTab\" onfocus=\"this.blur()\" href=\"javascript:void(0)\">\u81ea\u5df1\u6536\u85cf</a>"+"</li>";
}
_31+="\t\t\t\t</ul>"+"\t\t\t</div>"+"\t\t</div>"+"\t\t<div id=\"shareSendContent\" class=\"share_send\">"+"\t\t\t<div class=\"share_fields\">"+"\t\t\t\t<dl class=\"composer_fields clearfix\">"+"\t\t\t\t\t<dt id=\"dt_to_field\">"+"\t\t\t\t\t\t<label for=\"to_field\">"+_27+": </label>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_to_field\">"+"\t\t\t\t\t\t<div id=\"shareSelectFriends\" class=\"composer\"></div>"+"\t\t\t\t\t</dd>"+"\t\t\t\t\t<dt id=\"dt_subject_field\">"+"\t\t\t\t\t\t<label for=\"subject_field\">\u6807\u9898: </label>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_subject_field\">"+"\t\t\t\t\t\t<input id=\"popShareSubjectInput\" value=\"\" class=\"inputtext\" type=\"text\">"+"\t\t\t\t\t</dd>"+"\t\t\t\t\t<dt id=\"dt_message_field\">"+"                       <img src=\""+XN.env.CDNstaticRoot+"a.gif\" class=\"shareSend_HeadImg\"/>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_message_field\">"+"\t\t\t\t\t\t<textarea name=\"send_message\" id=\"popShareSendMessage\"></textarea>"+"\t\t\t\t\t</dd>"+"\t\t\t\t</dl>"+"\t\t\t</div>"+"\t\t</div>";
if(_19){
_31+="\t\t<div id=\"sharePageContent\" class=\"share_send\" style=\"display:block;\">"+"\t\t\t<div class=\"share_fields\">"+"\t\t\t\t<dl class=\"composer_fields clearfix\">"+"\t\t\t\t\t<dt id=\"dt_to_field\">"+"\t\t\t\t\t\t<label for=\"to_field\">\u5206\u4eab\u7ed9: </label>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_to_field\">"+"\t\t\t\t\t\t<select id=\"pagePid\" name=\"pid\" class=\"select float-left\">"+_2f+"</select>"+"\t\t\t\t\t</dd>"+"\t\t\t\t\t<dt id=\"dt_subject_field\" style=\"display:none;\">"+"\t\t\t\t\t\t<label for=\"subject_field\">\u6807\u9898: </label>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_subject_field\" style=\"display:none;\">"+"\t\t\t\t\t\t<input id=\"popShareSubjectInputForPage\" value=\"\" class=\"inputtext\" type=\"text\">"+"\t\t\t\t\t</dd>"+"\t\t\t\t\t<dt id=\"dt_message_field\">"+"                       <img src=\""+XN.env.CDNstaticRoot+"a.gif\"  class=\"shareSend_HeadImg\"/>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_message_field\">"+"\t\t\t\t\t\t<textarea name=\"send_message\" id=\"popShareSendMessageForPage\"></textarea>"+"\t\t\t\t\t</dd>"+"\t\t\t\t</dl>"+"\t\t\t</div>"+"\t\t</div>";
}
if(!_24){
_31+="\t\t<div id=\"shareAddContent\" class=\"share_post\">"+"\t\t\t<div class=\"share_fields\">"+"\t\t\t\t<dl class=\"composer_fields clearfix\">"+"\t\t\t\t\t<dt id=\"dt_message_field\">"+"                       <img src=\""+XN.env.CDNstaticRoot+"a.gif\"  class=\"shareSend_HeadImg\"/>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_message_field\">"+"\t\t\t\t\t\t<textarea name=\"message\" id=\"sharer_popup_message\"></textarea>"+"\t\t\t\t\t</dd>";
if(_2a){
_31+="           <dt>&nbsp;</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_privacy_field\">"+"                       <span id=\"pop_share_syscomment\" class=\"float-right\">"+"                       <label id=\"pop_share_sclabel\" style=\"font-weight:normal\" >"+"                           <input  type=\"checkbox\" checked=\"true\" id=\"pop_share_sendcomment\" name=\"sendcomment\" />"+"                           \u540c\u65f6\u8bc4\u8bba\u5230\u539f\u5185\u5bb9"+"                       </label>"+"                       </span>"+"\t\t\t\t\t</dd>";
}
_31+="\t\t\t\t</dl>"+"\t\t\t</div>"+"\t\t</div>";
_31+="    <div id=\"shareFavContent\" class=\"share_post\">"+"       <div class=\"share_fields\">"+"\t\t\t\t<dl class=\"composer_fields clearfix\">"+"\t\t\t\t\t<dt id=\"dt_message_field\">"+"                       <img src=\""+XN.env.CDNstaticRoot+"a.gif\"  class=\"shareSend_HeadImg\"/>"+"\t\t\t\t\t</dt>"+"\t\t\t\t\t<dd class=\"field\" id=\"dd_message_field\">"+"\t\t\t\t\t\t<textarea name=\"message\" id=\"sharer_fav_message\"></textarea>"+"\t\t\t\t\t</dd>"+"\t\t\t\t</dl>"+"       </div>"+"    </div>";
}
_31+="\t <div id=\"shareAjaxResult\"></div>"+"</div>"+"<div class=\"loading\" id=\"popShareLoading\"><p>\u8f7d\u5165\u4e2d...</p></div>";
var _32=XN.DO.confirm({title:_25,message:_31,callBack:function(r){
if(r){
this.preventHide();
getData();
}else{
if(_24){
XN.APP.share.onlyShowSendContent=false;
}
XN.dom.enable();
this.remove();
}
},submit:"\u5206\u4eab",params:{addIframe:true},width:465,Y:XN.event.scrollTop()+100});
_32.setIndex(600);
_32.body.addClass("share_popup");
_32.header.hide();
_32.footer.hide();
$("shareSelectFriends").setContent(_18);
_18.reset();
XN.form.help($("popShareSendMessage")).setDefaultValue("\u6211\u5206\u4eab\u7684\u7406\u7531\u662f...");
XN.form.help($("sharer_popup_message")).setDefaultValue("\u6211\u5206\u4eab\u7684\u7406\u7531\u662f...");
XN.form.help($("sharer_fav_message")).setDefaultValue("\u6211\u6536\u85cf\u7684\u539f\u56e0\u662f...");
object.use("xn.mention",function(xn){
xn.mention.Mention.init([{obj:$("sharer_popup_message"),ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
});
this.fireEvent("dialogPop",_32);
function loadSuccess(r){
var _36=r.responseText;
if(XN.string.isBlank(_36)){
if(r.status==0||r.status==302){
$("popShareLoading").innerHTML="<center>\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff0c\u8bf7\u767b\u5f55\u540e\u64cd\u4f5c</center>";
setTimeout(function(){
_32.hide();
},1500);
return false;
}
}else{
try{
var j=XN.json.parse(_36);
if(j.code){
XN.DO.showError(j.msg);
}
_32.hide();
return false;
}
catch(e){
XN.log(e);
}
}
$("shareAjaxResult").innerHTML=_36;
$("popShareSubjectInput").value=$("popShareTitle").value;
try{
var _38=XN.dom.getElementsByClassName("shareSend_HeadImg",$("popShareContainer"),"img");
var _39=$("popShareParams").currenUserTinyurl.value;
XN.array.each(_38,function(i,v){
v.src=_39;
});
}
catch(e){
XN.log(e);
}
$("popShareContainer").show();
$("popShareLoading").hide();
_32.header.show();
_32.footer.show();
var _3c=$("popShareParams").link.value;
XN.app.share.pop.sysMode=false;
if(XN.config.share.enableSyncComment){
if(new RegExp("^http://blog."+XN.env.domain_reg).test(_3c)){
$("pop_share_syscomment").show();
$("pop_share_sclabel").innerHTML="\u8bc4\u8bba\u540c\u6b65\u53d1\u9001\u5230\u65e5\u5fd7";
XN.app.share.pop.sysMode=true;
}else{
if(new RegExp("^http://photo."+XN.env.domain_reg).test(_3c)){
$("pop_share_syscomment").show();
$("pop_share_sclabel").innerHTML="\u8bc4\u8bba\u540c\u6b65\u53d1\u9001\u5230\u7167\u7247";
XN.app.share.pop.sysMode=true;
}else{
XN.app.share.pop.sysMode=false;
}
}
}
$("sharer_popup_message").focus();
_32.refresh();
updateOuterShareTip();
return true;
}
function loadError(){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u5931\u8d25,\u8bf7\u7a0d\u5019\u91cd\u8bd5");
}
var _3d=new XN.ui.tabView({selectedClass:"selected"}).addTab({label:"shareSendTab",content:"shareSendContent",active:_29.send,onActive:function(){
$("shareSendContent").show();
_2d="send";
var _3e=$("shareSelectFriends").getElementsByTagName("input");
XN.array.each(_3e,function(i,v){
if(v.id.indexOf("mfs_")!=-1){
v.focus();
}
});
}});
if(_19){
_3d.addTab({label:"sharePageTab",content:"sharePageContent",onActive:function(){
$("sharePageContent").show();
_2d="page";
}});
}
if(!_24){
_3d.addTab({label:"shareAddTab",content:"shareAddContent",active:_29.add,onActive:function(){
_2d="add";
$("sharer_popup_message").focus();
}});
_3d.addTab({label:"shareFavTab",content:"shareFavContent",active:_29.fav,onActive:function(){
_2d="fav";
$("sharer_fav_message").focus();
_32.getButton("\u5206\u4eab").setText("\u6536\u85cf");
},onInactive:function(){
_32.getButton("\u6536\u85cf").setText("\u5206\u4eab");
}});
}
if(_24){
$("shareSendContent").style.display="block";
}
XHR({url:url,data:_22,onSuccess:loadSuccess,onError:loadError,waitTime:10000,onTimeout:function(){
$("popShareLoading").innerHTML="<p>\u83b7\u53d6\u5206\u4eab\u6570\u636e\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5</p>";
setTimeout(function(){
_32.hide();
},1500);
}});
var rq=new XN.app.share.action(_23||{});
rq.addEvent("checkError",function(msg){
XN.DO.showError(msg);
});
var _43=null,_44=this;
rq.addEvent("beforePost",function(){
_43=XN.DO.confirm({msg:"<div id=\"share_msg_dialog\" class=\"share-success clearfix large\">\u6b63\u5728\u53d1\u9001\u8bf7\u6c42...</div><div id=\"pop_share_ads\"></div>",width:460,params:{showCloseButton:true}});
_43.footer.hide();
});
rq.addEvent("postSuccess",function(r,_46){
var _47,_48={a:"\u5206\u4eab\u6210\u529f",b:"\u4f60\u8fd8\u53ef\u4ee5<a href=\"javascript:void(0)\" onclick=\"pop_share_sendDefault()\">\u53d1\u9001\u7ed9\u90e8\u5206\u597d\u53cb</a>",c:"\u89c2\u770b\u66f4\u591a\u7cbe\u5f69\u5206\u4eab\uff0c<a target=\"_blank\" href=\"http://share."+XN.env.domain+"\">\u8bf7\u70b9\u51fb\u8fd9\u91cc\uff01</a>"};
if(_2d==="send"){
_48.b="\u5bf9\u65b9\u4f1a\u901a\u8fc7\u7ad9\u5185\u4fe1\u6536\u5230\u6b64\u5206\u4eab\u5185\u5bb9\u3002";
}else{
if(_2d==="fav"){
_48.a="\u6536\u85cf\u6210\u529f\uff01";
_48.b="\u6b64\u5185\u5bb9\u5df2\u6dfb\u52a0\u5230\u4f60\u7684\u6536\u85cf\u4e2d\uff0c\u5e76\u4e14\u4ec5\u4f60\u81ea\u5df1\u53ef\u89c1\u3002";
}
}
var _49=_46.adObjArry||[{url:"http://samsungdrama.renren.com/",img:"http://a.xnimg.cn/imgpro/share/samsung/ad.jpg"},{url:"http://caihongtang.renren.com/",img:"http://a.xnimg.cn/imgpro/share/caihongtang/b1101.jpg"}];
var _4a=_49[Math.floor(_49.length*Math.random())];
_47=" <div class=\"share-success-tip\">"+"\t<p><img src=\"http://a.xnimg.cn/imgpro/share/share-success.gif\"/></p>"+"\t<p>"+_48.a+"</p>"+"</div>"+"<div class=\"share-success-more\">"+"<div id=\"share_success_link\"></div>"+"\t<p>"+_48.b+"</p>"+"\t<p>"+_48.c+"</p>"+"<p>"+"   <a href=\""+_4a.url+"\" target=\"_blank\" >"+"       <img height=\"80\" width=\"280\" src=\""+_4a.img+"\" />"+"   </a>"+"</p>"+"</div>";
$("share_msg_dialog").setContent(_47);
if(_2d=="add"){
var url=(_46.type==1?"http://blog.":"http://share.")+XN.env.domain+"/share/"+_46.userid+"/"+_46.shareid;
var _4c="<p class=\"gray\">\u590d\u5236\u5206\u4eab\u94fe\u63a5,\u901a\u8fc7QQ\u6216\u8005MSN\u53d1\u9001\u7ed9\u4f60\u7684\u597d\u53cb.</p>"+"<p><input type=\"text\" class=\"text-box\" style=\"width:210px;height:20px\" value=\""+url+"\" id=\"share_success_val\" />"+"<input type=\"button\" class=\"input-submit\" value=\"\u590d\u5236\" id=\"share_success_btn\" class=\"share_success_btn\" /></p>";
$("share_success_link").setContent(_4c);
XN.app.share.copyExtralLink.init("share_success_btn",$("share_success_val").value);
}
_44.fireEvent("postSuccessDialogPop",_43);
window.closeShareSucTimer=setTimeout(function(){
XN.dom.enable();
try{
XN.app.share.copyExtralLink.clip.hide();
_43.remove();
}
catch(e){
_43.remove();
XN.log(e);
}
},5000);
});
rq.addEvent("postError",function(r){
XN.DO.showError(r||"\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");
_43.hide();
});
function getRealVal(id){
var _v=$(id).value;
return _v.replace("\u6211\u5206\u4eab\u7684\u7406\u7531\u662f...","").replace("\u6211\u6536\u85cf\u7684\u539f\u56e0\u662f...","");
}
function getData(){
var _50={},str;
if(_2d=="add"){
_50=XN.form.serialize("popShareParams","hash");
if($("pop_share_sendcomment")&&!$("pop_share_sendcomment").disabled){
_50["sendcomment"]=$("pop_share_sendcomment").checked;
}
_50["tsc"]=$("tsc_popShare").value;
_50["action"]="add";
_50["auth"]=99;
_50["body"]=getRealVal("sharer_popup_message");
if($("summary")){
_50["summary"]=$("summary").innerHTML;
}
_50["noteId"]=$("noteId")?$("noteId").value:0;
if(location.href.indexOf("http://page."+XN.env.domain+"")==0){
_50.pageId=_50.fromno||($("fromno")&&$("fromno").value);
}
rq.add(_50);
}else{
if(_2d=="send"){
if(_24){
XN.APP.share.onlyShowSendContent=false;
}
_50["tsc"]=$("tsc_popShare").value;
_50["action"]="sharetofriend";
_50["ids"]=_18.getIds();
_50["form"]=XN.form.serialize("popShareParams","hash");
if($("summary")){
_50["form"]["summary"]=$("summary").innerHTML;
}
_50["body"]=getRealVal("popShareSendMessage");
_50["subject"]=$("popShareSubjectInput").value;
_50["noteId"]=$("noteId")?$("noteId").value:0;
rq.send(_50);
}else{
if(_2d=="page"){
_50=XN.form.serialize("popShareParams","hash");
_50["sendcomment"]=false;
_50["tsc"]=$("tsc_popShare").value;
_50["action"]="add";
_50["auth"]="99";
_50["body"]=getRealVal("popShareSendMessageForPage");
if($("summary")){
_50["summary"]=$("summary").innerHTML;
}
_50["pageId"]=$("pagePid").value;
_50["noteId"]=$("noteId")?$("noteId").value:0;
rq.add(_50);
}else{
if(_2d==="fav"){
_50=XN.form.serialize("popShareParams","hash");
_50["sendcomment"]=false;
_50["tsc"]=$("tsc_popShare").value;
_50["action"]="add";
_50["auth"]=-1;
_50["body"]=getRealVal("sharer_fav_message");
if($("summary")){
_50["summary"]=$("summary").innerHTML;
}
_50["noteId"]=$("noteId")?$("noteId").value:0;
if(location.href.indexOf("http://page."+XN.env.domain+"")==0){
_50.pageId=_50.fromno||($("fromno")&&$("fromno").value);
}
rq.add(_50);
}
}
}
}
}
pop_share_sendDefault=function(){
if(window.closeShareSucTimer){
clearTimeout(window.closeShareSucTimer);
}
$extend(_28,{tabDefault:"send"});
XN.app.share.pop(url,_28);
};
};
XN.app.share.showDialog=XN.app.share.pop;
XN.app.share.del=function(id,_53,_54,pid){
XN.DO.confirm({msg:"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6b64\u5206\u4eab\u5417",callBack:function(r){
if(r){
var url="http://share."+XN.env.domain+"/share/EditShare.do";
var _58="action=del&sid="+id;
if(pid){
_58+="&pid="+pid;
}
if(_53!=""){
_58+="&type="+_53;
}
if(pid&&location.href.indexOf("http://page."+XN.env.domain)==0){
url="http://page."+XN.env.domain+"/share/del";
_58="id="+id+"&pid="+pid;
}
if(pid&&location.href.indexOf("http://org."+XN.env.domain)==0){
url="http://org."+XN.env.domain+"/share/del";
_58="id="+id+"&pid="+pid;
}
new XN.NET.xmlhttp({url:url,data:_58,onSuccess:function(){
$("share_"+id).remove();
var _59=XN.dom.getElementsByClassName("share-itembox","shareList","div");
if(_59&&_59.length==0){
window.location.reload();
}
},onError:function(){
alert("\u5220\u9664\u9519\u8bef");
}});
}
}});
};
})();
function pop_share_new(url,_5b){
XN.APP.share.showDialog(url,_5b);
}
function create_share_div(id,_5d,_5e,ref){
var url="http://share."+XN.env.domain+"/share/ajax.do",_61={};
if(ref){
_61.reqeustURI="http://share."+XN.env.domain+"/share/submit.do?ref="+ref;
}
XN.APP.share.showDialog(url,{id:id,owner:_5d,host:_5e},_61);
}
function create_share_zhan(id,_63){
var url="http://share."+XN.env.domain+"/share/popup/zhan",_65={};
_65.reqeustURI="http://share."+XN.env.domain+"/share/postshare";
XN.APP.share.showDialog(url,{id:id,owner:_63,type:140},_65);
}
function create_share_feed(id,_67,_68){
var _69,_6a;
if(_68=="pageThread"||_68=="pageBlog"||_68=="pageAlbum"){
if(!(XN.user&&!XN.string.isBlank(XN.user.id))){
XN.DO.showError("\u8bf7\u5148\u767b\u5f55\uff01");
return;
}
}
_69=function(_6b){
switch(_6b){
case "blog":
return "http://blog."+XN.env.domain+"/blog/"+_67+"/"+id+"/homeShare";
case "album":
return "http://photo."+XN.env.domain+"/photo/"+_67+"/album-"+id+"/share";
case "photo":
return "http://photo."+XN.env.domain+"/photo/"+_67+"/photo-"+id+"/share";
case "forum":
return "http://xiaozu."+XN.env.domain+"/xiaozu/"+id+"/js";
case "thread":
return "http://xiaozu."+XN.env.domain+"/xiaozu/"+id+"/thread/"+_67+"/share";
case "clike":
return "http://app."+XN.env.domain+"/like/likeInfo?feed_id="+id;
case "pageThread":
return "http://page."+XN.env.domain+"/"+id+"/group/"+_67+"/getShareData";
case "pageBlog":
return "http://page."+XN.env.domain+"/"+_67+"/note/"+id+"/share";
case "pageAlbum":
return "http://page."+XN.env.domain+"/"+_67+"/album/"+id+"/share";
case "video":
return "http://video."+XN.env.domain+"/ajax/getVideoInfo?ownerId="+_67+"&videoId="+id;
}
};
var _6c=function(_6d){
switch(_6d){
case "blog":
return "\u65e5\u5fd7";
case "album":
return "\u76f8\u518c";
case "photo":
return "\u7167\u7247";
case "forum":
return "\u5c0f\u7ec4";
case "thread":
return "\u5e16\u5b50";
case "pageThread":
return "\u8bdd\u9898";
case "pageBlog":
return "\u65e5\u5fd7";
case "pageAlbum":
return "\u76f8\u518c";
case "video":
return "\u89c6\u9891";
}
};
var _6e=function(p,s){
new XN.net.xmlhttp({url:"http://blog."+XN.env.domain+"/share/incShareCount.do",data:"link="+encodeURIComponent((p.link||p.form.link))});
};
if(_68=="blog"&&!XN.app.share.hasBlogListener){
XN.app.share.hasBlogListener=true;
XN.app.share.addEvent("postSuccess",_6e);
}
new XN.net.xmlhttp({url:_69(_68),method:"GET",onSuccess:function(r){
if(!XN.string.isJSON(r.responseText)){
if(r.responseText.indexOf("isProtected")!==-1){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u7684"+_6c(_68)+"\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
if(r.responseText.indexOf("error")!==-1){
XN.DO.showMessage(_6c(_68)+"\u5df2\u7ecf\u88ab\u5220\u9664 :(");
}
return;
}
try{
var _72=XN.json.parse(r.responseText);
if(_72.isProtected){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u7684"+_6c(_68)+"\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
return;
}
if(_72.albumid){
_72.albumid=new Number(_72.albumid).toString();
}
var url="http://share."+XN.env.domain+"/share/popup.do";
pop_share_new(url,_72);
}
catch(e){
XN.log(e.description);
}
},onError:function(r){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u9519\u8bef!");
}});
}
function create_share2friend_div(id,_76,_77){
var url="http://share."+XN.env.domain+"/share/ajax.do";
XN.APP.share.onlyShowSendContent=true;
pop_share_new(url,{id:id,owner:_76,host:_77});
}
function create_share_div_send(id,_7a,_7b){
var url="http://share."+XN.env.domain+"/share/ajax.do";
pop_share_new(url,{id:id,owner:_7a,host:_7b,tabDefault:"send",sysn:true});
}
function create_share_nosysn_send(id,_7e,_7f){
var url="http://share."+XN.env.domain+"/share/ajax.do";
pop_share_new(url,{id:id,owner:_7e,host:_7f,tabDefault:"send",sysn:false});
}
function create_share_nosysn(id,_82,_83){
var url="http://share."+XN.env.domain+"/share/ajax.do";
pop_share_new(url,{id:id,owner:_82,host:_83,sysn:false});
}
function create_share_sysn(id,_86,_87){
var url="http://share."+XN.env.domain+"/share/ajax.do";
pop_share_new(url,{id:id,owner:_86,host:_87,sysn:true});
}
function create_share_jebe(_89,_8a){
var url="http://share."+XN.env.domain+"/share/ajax.do";
XN.app.share.showDialog(url,_89,{reqeustURI:_8a});
}
function create_thread_share_div(tid,_8d){
var url="/getshare.do";
url="http://share."+XN.env.domain+""+url;
pop_share_new(url,{tid:tid,tribeId:_8d});
}
function create_share_edm(id,_90,_91){
var url="http://edm."+XN.env.domain+"/feedshare.do?id="+id;
new XN.net.xmlhttp({url:url,method:"GET",onSuccess:function(r){
if(!XN.string.isJSON(r.responseText)){
XN.DO.showMessage("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef");
return;
}
try{
var _94=XN.json.parse(r.responseText);
var url="http://share."+XN.env.domain+"/share/popup.do";
pop_share_new(url,_94);
}
catch(e){
XN.log(e.description);
}
},onError:function(r){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u9519\u8bef!");
}});
}
function create_share_popup(_97){
var url="http://share."+XN.env.domain+"/share/ajax.do";
pop_share_new(url,_97);
}
function getShowTipText(val){
switch(val){
case "1":
return "\u65e5\u5fd7";
case "2":
return "\u76f8\u7247";
case "8":
return "\u76f8\u518c";
}
return "\u5185\u5bb9";
}
function pop_share(){
if($("isProtected")&&$("isProtected").value=="true"){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u7684"+getShowTipText($("type").value)+"\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
return false;
}
var _9a={};
try{
_9a=XN.FORM.serialize("popShareParams","hash");
}
catch(e){
_9a.link=$("link").value;
_9a.type=$("type").value;
_9a.title=$("title").value;
_9a.pic=$("pic").value;
_9a.fromno=$("fromno").value;
_9a.fromname=$("fromname").value;
_9a.fromuniv=$("fromuniv").value;
_9a.albumid=$("albumid").value;
_9a.largeurl=$("largeurl").value;
if($("mainurl")){
_9a.mainurl=$("mainurl").value;
}
}
_9a.summary=$("summary").innerHTML;
var url="http://share."+XN.env.domain+"/share/popup.do";
pop_share_new(url,_9a);
}
function pop_share_for_list(_9c){
if($("isProtected")){
var _9d=$("popShareParams_"+_9c).getElementsByTagName("input");
var i=0;
while(i<_9d.length){
if(_9d[i].getAttribute("id")=="isProtected"){
if(_9d[i].value=="true"){
var _9f;
for(var j=0;j<_9d.length;j++){
if(_9d[j].getAttribute("name")=="type"){
_9f=_9d[j].value;
}
}
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u7684"+getShowTipText(_9f)+"\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
return false;
}
break;
}
i++;
}
}
var _a1=XN.FORM.serialize("popShareParams_"+_9c,"hash");
_a1.summary=$("summary_"+_9c).innerHTML;
_a1.sysn=false;
var url="http://share."+XN.env.domain+"/share/popup.do";
pop_share_new(url,_a1);
var _a3=function(p,s){
new XN.net.xmlhttp({url:"http://blog."+XN.env.domain+"/share/incShareCount.do",data:"link="+encodeURIComponent((p.link||p.form.link))});
};
if(_a1.type=="1"&&!XN.app.share.hasBlogListener){
XN.app.share.hasBlogListener=true;
XN.app.share.addEvent("postSuccess",_a3);
}
}
function delete_share(id,_a7,_a8,pid){
XN.APP.share.del(id,_a7,_a8,pid);
}
function pop_share_msg(){
var url="http://share."+XN.env.domain+"/share/popup.do";
var _ab=XN.form.serialize($("popShareParams"),"hash");
pop_share_new(url,_ab);
}
XN.app.share.copyExtralLink={};
$extend(XN.app.share.copyExtralLink,{init:function(_ac,val){
this.btnId=_ac;
this.copyVal=val;
this.createClient();
},createClient:function(){
var _ae=this;
if(XN.BROWSER.IE){
XN.event.addEvent(_ae.btnId,"click",function(){
if(_ae.clip){
_ae.clip.reposition(_ae.btnId);
return;
}
});
}
if(typeof ZeroClipboard!="undefined"){
this.createClip();
return;
}
XN.loadFile(XN.env.staticRoot+"jspro/album/ZeroClipboard.js",function(){
ZeroClipboard.setMoviePath(XN.env.CDNstaticRoot+"swf/album/ZeroClipboard.swf");
_ae.createClip();
});
},createClip:function(){
if(this.clip){
this.clip.reposition(this.btnId);
this.clip.show();
this.clip.setText(this.copyVal);
return false;
}
var _af=this;
var _b0=new ZeroClipboard.Client();
_b0.setHandCursor(true);
_b0.addEventListener("complete",function(_b1,_b2){
XN.DO.showMessage("\u5df2\u7ecf\u590d\u5236\u5230\u526a\u8d34\u677f");
_b1.hide();
});
_b0.setText(this.copyVal);
_b0.glue(this.btnId);
_b0.div.style.zIndex=999999999;
this.clip=_b0;
}});
object.define("object/mvc","dom, events",function(_b3,_b4){
var dom=_b3("dom"),_b6=_b3("events");
_b4.Controller=new Class(function(){
Class.mixin(this,_b6.Events);
this.option=property(function(_b7){
return _b7.__option;
},function(_b8,_b9){
_b8.__option=_b9;
});
this.atts=property(function(_ba){
return _ba.__atts;
},function(_bb,_bc){
_bb.__atts=_bc;
});
this._initEl=function(_bd){
var _be=_bd.get("option");
_bd.el=_be.el?(typeof _be.el=="string"?dom.getElement(_be.el):_be.el):dom.wrap(document.createElement("div"));
if(_be.className){
_bd.el.addClass(_be.className);
}
};
this._initInstanceFuncs=function(_bf){
var _c0=_bf.get("option");
for(key in _c0){
if(typeof _c0[key]=="function"){
_bf[key]=_c0[key];
}
}
};
this._initAtts=function(_c1){
var _c2=_c1.get("atts");
if(_c2){
_c2.forEach(function(att){
_c1[att.key]=att.value;
});
}
};
this._initElements=function(_c4){
var _c5=_c4.get("option");
_c4._elementsSeletor=_c5.elementsSelector;
_c4._refreshElements();
};
this._initEvents=function(_c6){
var _c7=_c6.get("option");
_c6._events=_c7.events;
_c6._delegateEvents();
};
this._refreshElements=function(_c8){
var key,_ca,_cb,_cc;
_cb=_c8._elementsSeletor;
if(!_cb){
return;
}
_c8._elements=_c8._elements||{};
_cc=[];
for(key in _cb){
_ca=_cb[key];
_cc.push(_c8._elements[_ca]=_c8.el.getElements(key));
}
return _cc;
};
this._delegateEvents=function(_cd){
var _ce=_cd._events,_cf;
if(!_ce){
return;
}
_ce.forEach(function(_d0){
if(!_d0[0]||!_d0[1]||!_d0[2]){
return;
}
_cf=_d0[2];
if(typeof _cf=="function"){
_cf=_d0[2].bind(_cd);
}else{
if(_cd[_cf]){
_cf=_cd[_cf].bind(_cd);
}else{
_cf=null;
throw new Error("method "+_cf+" no exsit");
}
}
if(!_d0[0]){
_cf&&_cd.el.addEvent(_d0[1],_cf);
}else{
_cf&&_cd.el.delegate(_d0[0],_d0[1],_cf);
}
_d0[2]=_cf;
});
};
this._undelegateEvents=function(_d1){
var _d2=_d1._events,_d3;
if(!_d2){
return;
}
_d2.forEach(function(_d4){
_d3=_d4[2];
if(!_d4[0]){
_d3&&_d1.el.removeEvent(_d4[1],_d3);
}else{
_d3&&_d1.el.undelegate(_d4[0],_d4[1],_d3);
}
});
};
this._initModels=function(_d5){
var _d6=_d5.get("option");
_d5._modelsContent=_d6.models;
if(_d5.__modelsContent){
return;
}
var _d7=_d5._modelsContent,_d8,_d9,_da;
_d5._models=_d5._models||{};
_d7.forEach(function(_db){
_d8=_db[0],_d9=_db[1],_da=_db[2];
if(!_d8||!_d8.id){
return;
}
if(typeof _da=="function"){
_da=_da.bind(_d5);
}else{
if(_da&&_d5[_da]){
_da=_d5[_da].bind(_d5);
}else{
if(_da){
throw new Error("no method for method event: "+_d9);
}
}
}
_d8.addEvent(_d9,_da);
_d5._models[_d8.id]=_d8;
});
};
this.initialize=function(_dc,_dd){
var el,key;
_dc.set("option",_dd);
_dc.set("atts",_dd.atts);
_dc._initEl();
_dc._initInstanceFuncs();
_dc._initAtts();
_dc._initElements();
_dc._initEvents();
_dc._initModels();
_dc._setEngine(_dd.engine||"Mustache");
if(_dc.init){
_dc.init();
}
};
this.destory=function(_e0){
_e0._undelegateEvents();
};
this._setEngine=function(_e1,_e2){
switch(_e2){
case "Mustache":
_e1._engine=window.Mustache;
_e1.render=function(el,tpl,_e5){
dom.wrap(el);
el.setHTML(_e1._engine.to_html(tpl,_e5));
};
break;
}
if(!_e1._engine){
throw new Error("no tpl engine can use"+_e2);
}
};
});
_b4.Model=new Class(function(){
Class.mixin(this,_b6.Events);
this.TOTALCOUNT=0;
this.MODELS={};
this.PREFIX="objectmodel_";
this.getModel=classmethod(function(cls,id){
if(cls.get("MODELS")[id]){
return cls.get("MODELS")[id];
}
return null;
});
this.addModel=classmethod(function(cls,_e9){
var _ea=cls.get("MODELS");
if(!_ea[_e9.id]){
_ea[_e9.id]=_e9;
cls.set("TOTALCOUNT",(cls.get("TOTALCOUNT")+1));
}
});
this.delModel=classmethod(function(cls,_ec){
var _ed=cls.get("MODELS");
if(_ed[_ec]){
delete _ed[_ec];
cls.set("TOTALCOUNT",(cls.get("TOTALCOUNT")-1));
}
});
this._generateId=classmethod(function(cls){
var _ef=cls.get("PREFIX"),_f0=cls.get("TOTALCOUNT");
return _ef+_f0.toString();
});
this.option=property(function(_f1){
return _f1.__option;
},function(_f2,_f3){
_f2.__option=_f3;
_f2.name=_f3.name;
});
this._reset=function(_f4){
var cls=_b4.Model,_f6=_f4.get("option"),id=cls._generateId();
_f4.id=id;
_f4.name=_f6.name||_f4.id;
_f4.recordsCount=0;
_f4.records=[];
};
this._circulate=function(_f8,_f9){
_f9.forEach(function(_fa){
_f8.createRecord(_fa);
});
_f8.fireEvent("loaded records",{"records":_f8.records});
};
this.initialize=function(_fb,_fc){
var cls=_b4.Model;
_fb.set("option",_fc);
_fb._reset();
if(_fc.autoLoad){
_fb.load(_fc);
}
cls.addModel(_fb);
};
this.load=function(_fe,_ff){
var cb,rc,_102,_103;
cb=function(_104){
if(_104){
_fe._circulate(_104);
}
};
_ff=_ff||_fe.get("option"),_103=_ff.items;
if(!_ff.append){
_fe.removeAllRecords();
}
if(_103){
_fe._circulate(_103);
return;
}
if(_ff.requestController&&_ff.requestController.getData){
rc=_ff.requestController;
_102=_ff.customConfig||{};
_102.cb=cb;
rc.getData(_102);
}
};
this.filter=function(self,fn){
var _107=[],_108=self.records;
_108.forEach(function(_109,i){
if(fn(_109,i)){
_107.push(_109);
}
});
return _107;
};
this.propSelector=function(self,prop,_10d,blur){
var fn=function(_110){
if(blur){
return (_110[prop]!==undefined&&_110[prop].indexOf(_10d)!=-1);
}else{
return (_110[prop]!==undefined&&_110[prop]==_10d);
}
};
return self.filter(fn);
};
this.propMap=function(self,prop){
var _113=[],_114=self.records;
_114.forEach(function(_115){
if(_115[prop]){
_113.push(_115[prop]);
}
});
return _113;
};
this.createRecord=function(self,data){
var newR={},id=self.recordsCount,_11a=self.get("option");
object.extend(newR,data);
newR._id=id;
if(_11a.customHandleData){
_11a.customHandleData(newR);
}
self.records.push(newR);
self.recordsCount++;
self.fireEvent("created record",{"record":newR});
self.fireEvent("updated records",{"records":self.records});
return newR;
};
this.removeRecord=function(self,_11c){
var _11d=self.propSelector("_id",_11c)[0],_11e;
if(_11d){
_11e=self.records.indexOf(_11d);
self.records.splice(_11e,1);
self.fireEvent("remove record",{"record":_11d});
return _11d;
}
};
this.removeAllRecords=function(self){
self.records=[];
self.fireEvent("removeall records");
};
this.destory=function(self){
self.removeAllRecords();
self.get("delModel")(self.id);
};
});
});
XN.namespace("app.share");
function show_or_hide(_121,_122,_123){
if(_121=="show"){
$("share_comment_"+_122).style.display="block";
}else{
if(_121=="hide"){
$("share_comment_"+_122).style.display="none";
$("share_footer_"+_122).style.display="block";
$("share_"+_122).scrollIntoView();
}
}
}
function share_hide_comments(_124,_125){
ge("share_comment_"+_124).style.display="none";
show_or_hide("hide",_124,_125);
}
function share_show_comments(_126,_127,_128){
var _129=$("boxcont_"+_126);
var post={share_id:_126,share_owner:_127};
new XN.net.xmlhttp({url:"http://share."+XN.env.domain+"/share/showcomment.do",data:"post="+XN.json.build(post),onSuccess:function(r){
_129.innerHTML=r.responseText;
object.use("xn.mention",function(_12c,xn){
xn.mention.Mention.init([{obj:$("comment"+_126),ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
});
$("comment"+_126).focus();
},onError:function(){
alert("\u52a0\u8f7d\u56de\u590d\u5931\u8d25");
}});
show_or_hide("show",_126,_127);
}
function share_reply_comment(_12e,id,name,cid){
var form=$("comment_form_"+_12e);
form.repetNo.value=id;
if(cid){
form.replyToCommentId.value=cid;
}
if(!window._replyTextFix){
window._replyTextFix={};
}
var _133=form.comment.value;
if(!!_replyTextFix[_12e]){
_133=_133.replace(_replyTextFix[_12e].preText,"");
}
_replyTextFix[_12e]={preText:"\u56de\u590d"+name+":"};
form.comment.value=_replyTextFix[_12e].preText+_133;
new XN.FORM.inputHelper(form.comment).focus();
}
function share_add_comment_submit(_134,from){
var form=$("comment_form_"+_134);
var _137=form.comment.value;
if(XN.STRING.isBlank(_137)){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
return false;
}
if(_137.length>500){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc7500\u5b57");
return false;
}
var _138=$("ajax_msgerror");
if(_138){
_138.parentNode.removeChild(_138);
}
form.submit_comment.disabled=true;
var d=XN.form.serialize($("comment_form_"+_134),"hash");
new XN.net.xmlhttp({url:"http://share."+XN.env.domain+"/share/addcomment.do",data:XN.form.serialize("comment_form_"+_134),onSuccess:function(r){
var text=r.responseText;
if(!text.match(/<.+?>/g)||text.match(/<.+?>/g).length===0){
if(text=="needVerfy"){
try{
if(!$("shareVerifyPic_"+_134)){
var img=new Image();
img.className="validate-num";
img.id="shareVerifyPic_"+_134;
img.onclick="this.src+=Math.random();return false";
img.src="http://icode."+XN.env.domain+"/getcode.do?t=shareInfoCode"+_134+"&r="+Math.random();
$("shareVerify_"+_134).appendChild(img);
}
$("shareVerify_"+_134).show();
}
catch(e){
XN.log(e.description);
}
XN.DO.alert("\u60a8\u7684\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u9a8c\u8bc1\u7801");
}else{
if(!text.length==0){
XN.DO.alert(text);
}
}
}else{
var rps=XN.dom.getElementsByClassName("replies",$("commContainer_"+_134));
var _13e=$(rps[rps.length-1]);
_13e.show();
_13e.appendHTML(text);
if(!text.match("ajax_msgerror")){
form.comment.value="";
}
try{
if($("sysnblog")){
$("sysnblog").checked=true;
$("sysnblog").disabled=false;
}
}
catch(e){
}
}
try{
if($("shareVerifyPic_"+_134)){
$("shareVerifyPic_"+_134).src+=Math.random();
$("shareInfoCode"+_134).value="";
$("shareInfoCode"+_134).blur();
}
}
catch(e){
XN.log(e.description);
}
try{
if(!!$("doShare"+_134)&&$("doShare"+_134).checked){
shareThat(d);
}
if(!!$("doShare")&&$("doShare").checked){
shareThat(d,from);
}
if(!!$("doShare")){
$("doShare").checked=false;
$("doShare").disabled=false;
}
if(!!$("doShare"+_134)){
$("doShare"+_134).checked=false;
$("doShare"+_134).disabled=false;
}
}
catch(e){
XN.log(e.description);
}
form.submit_comment.disabled=false;
form.repetNo.value=0;
form.replyToCommentId.value=0;
},onError:function(){
alert("\u56de\u590d\u5931\u8d25");
form.submit_comment.disabled=false;
}});
}
function shareThat(d,from){
var _141=d.shareId;
var _142=d.shareOwner;
var from=from||"0101090901";
var post={"action":"add","auth":99,"body":encodeURIComponent(XN.string.ltrim(d.comment.replace(/[\r\n]/g," ")).replace(/"/g,"&quot;"))};
new XN.NET.xmlhttp({url:"http://share.renren.com/share/submit.do",data:"shareId="+_141+"&shareUserId="+_142+"&post="+XN.json.build(post)+"&from="+from,onSuccess:function(r){
var res=XN.json.parse(r.responseText);
if(res.status==1){
XN.DO.showError("\u5206\u4eab\u5931\u8d25\uff1a"+res.msg);
}
},onError:function(){
XN.DO.showError("\u5206\u4eab\u5931\u8d25\uff01");
}});
}
function share_delete_comment(obj,_147,_148,_149){
var _14a="\u786e\u5b9a\u8981\u5220\u9664\u5417?";
if(XN.page&&XN.page.data&&(XN.page.data.type==1||XN.page.data.type==3)&&XN.page.data.isAdmin){
_14a+="<label style=\"display:block;margin-top:5px;\"><input id=\"banReply\" type=\"checkbox\" value=\"1\"> \u540c\u65f6\u5c06\u8be5\u7528\u6237\u52a0\u5165\u9ed1\u540d\u5355</label>";
}
XN.DO.confirm({title:"\u5220\u9664\u8be5\u8bc4\u8bba",msg:_14a,callBack:function(r){
if(r){
try{
var _14c=Sizzle("#comment_"+_149+" > a.avatar")[0].getAttribute("href");
_14c=_14c.match(/\bid=(\d+)\b/)[1];
var ban=jQuery("#banReply").is(":checked")?1:0;
if(ban){
jQuery.post("http://page.renren.com/ajaxBanFans",{pid:XN.page.data.id,ban:ban,createId:_14c});
}
}
catch(e){
XN.log(e);
}
var post={share_id:_147,share_owner:_148,comment_id:_149};
var _14f=$("comment_"+_149);
_14f.setContent(new XN.NET.xmlhttp({url:"http://share."+XN.env.domain+"/share/deletecomment.do",data:"post="+encodeURIComponent(XN.JSON.build(post)),onSuccess:function(){
_14f.parentNode.removeChild(_14f);
try{
var _150=XN.dom.getElementsByClassName("replies");
var _151=_150[_150.length-1].getElementsByTagName("dd").length;
if(_151==0){
XN.element.hide(_150[_150.length-1]);
}
}
catch(e){
XN.log(e);
}
},onError:function(){
alert("\u5220\u9664\u9519\u8bef");
}}));
}
}});
}
function share_show_add_comment(obj,_153){
var node=obj.parentNode;
remove_node(node);
var _155=$("add_comment_input"+_153);
show(_155);
var _156=$("add_comment_button"+_153);
_156.disabled=false;
var _157="comment"+_153;
$(_157).focus();
return false;
}
function shareonkeydown(e){
var k=(e.which)?e.which:window.event.keyCode;
if(k==13){
sharelink1();
return;
}
}
function sharelink1(){
var _15a=$("sharelink").weblink.value;
var _15b=/\s/ig;
_15a=_15a.replace(_15b,"");
if((_15a=="")||(_15a=="http://")||(_15a=="\u5728\u8fd9\u91cc\u8f93\u5165\u4f60\u8981\u5206\u4eab\u7684\u7ad9\u5916\u94fe\u63a5\u3001\u89c6\u9891\u3001\u97f3\u9891\u7684\u5730\u5740")){
alert("\u8bf7\u8f93\u5165\u4e00\u4e2a\u7f51\u5740");
return false;
}
if(_15a.substr(0,7)!="http://"&&_15a.substr(0,6)!="ftp://"&&_15a.substr(0,8)!="https://"){
_15a="http://"+_15a;
$("isUrl").value=_15a;
}
if(new RegExp("^http://([A-Za-z0-9.]*)"+XN.env.domain_reg,"i").test(_15a)){
alert("\u7ad9\u5185\u5185\u5bb9\u53ef\u4ee5\u76f4\u63a5\u5206\u4eab\uff0c\u6b64\u5904\u8bf7\u5206\u4eab\u7ad9\u5916\u5185\u5bb9");
return false;
}
var _15c=$("share-pre");
_15c.style.display="none";
document.sharelink.submit();
var _15d=$("share-pre-hidden");
_15d.style.display="block";
_15d.src="http://s.xnimg.cn/img/upload_progress.gif";
}
XN.dom.ready(function(){
var _15e=$("friendsPanel");
if(_15e){
var s=new XN.ui.friendSelectorWithMenu({autoSelectFirst:true});
_15e.setContent(s);
s.menu.setWidth(s.input.offsetWidth);
s.addEvent("select",function(p){
if(location.href.indexOf("http://blog."+XN.env.domain+"")!=-1){
location.href="http://blog."+XN.env.domain+"/friendsBlog.do?friend="+p.id;
}else{
if(location.href.indexOf("http://share."+XN.env.domain+"")!=-1){
location.href="http://share."+XN.env.domain+"/share/ShareList.do?select=1&id="+p.id;
}
}
});
new XN.FORM.inputHelper(s.input).setDefaultValue("\u8f93\u5165\u597d\u53cb\u59d3\u540d...");
}
});
$extend(XN.app.share,{shareSubmit:function(){
var _161=XN.DOM.getElementsByClassName("vote-item","input");
var _162;
for(var i=0;i<_161.length;i++){
if(_161[i].value.length>20){
XN.DO.alert("\u6bcf\u4e2a\u6295\u7968\u9009\u9879\u4e0d\u80fd\u8d85\u8fc720\u4e2a\u5b57");
return false;
}
}
var sbtn=XN.DOM.getElementsByClassName("input-button",$("shareForm"))[0];
sbtn.disabled=true;
var _165=XN.form.serialize($("shareForm"));
var _166="/share/ajaxSaveShare.do";
var xhr=new XN.net.xmlhttp({url:_166,data:_165,onSuccess:function(r){
if(r.responseText.indexOf("<title>\u6821\u5185 \u4eba\u4eba\u7f51 - \u62b1\u6b49\uff0c\u51fa\u9519\u4e86\u3002</title>")!=-1){
XN.DO.alert("\u670d\u52a1\u5668\u51fa\u9519,\u8bf7\u7a0d\u5019\u91cd\u8bd5");
return;
}
var _169=XN.JSON.parse(r.responseText);
if(_169.code!=0){
sbtn.disabled=false;
if(_169.code==-7){
XN.DO.confirm({msg:_169.msg,title:"\u63d0\u793a",callBack:function(r){
location.href="http://share."+XN.env.domain;
}});
return false;
}
XN.DO.alert(_169.msg);
}else{
location.href=_169.msg;
}
},onError:function(){
XN.DO.alert("\u670d\u52a1\u5668\u51fa\u9519,\u8bf7\u7a0d\u5019\u91cd\u8bd5");
sbtn.disabled=false;
}});
return false;
},checkForm:function(){
var _16b=XN.DOM.getElementsByClassName("vote-item","input");
if(_16b.length==0){
return;
}
for(var i=0;i<_16b.length;i++){
(function(){
var m;
XN.event.addEvent(_16b[i],"focus",function(e){
m=new checkMaxLength(XN.event.element(e||window.event));
m.startCheck();
});
XN.event.addEvent(_16b[i],"blur",function(e){
if(m){
m.stopCheck();
}
});
})();
}
},updateVoteUI:function(_170){
var _171=XN.DOM.getElementsByClassName("pitem",$("share-vote-info"),"div");
$("totalVoteCount").innerHTML=parseInt($("totalVoteCount").innerHTML,10)+1;
var _172=_170.options;
for(var i=0;i<_171.length;i++){
(function(_174){
var id=_171[_174].id.replace("item_","");
$("bar_"+id).style.width=parseInt(_172[_174].percent*160/100,10)+"px";
$("itemCount_"+id).innerHTML=_172[_174].count;
$("itemPercent_"+id).innerHTML="("+_172[_174].percent+"%)";
})(i);
}
},toggleVoteItems:function(){
if(!!!$("summary-wrap")){
return;
}
var _176=$("summary-wrap").getElementsByTagName("a")[0];
if($("vote-item-list")){
XN.EVENT.addEvent(_176,"click",function(e){
XN.EVENT.element(e||window.event).toggleClass("itemsClose");
$("vote-item-list").toggleClass("hide");
});
}
},itemToggle:function(){
var _178=XN.DOM.getElementsByClassName("pitem",$("share-vote-info"),"div");
if(_178.length==0){
return;
}
var _179="/share/ajaxVoteShare.do";
for(var i=0;i<_178.length;i++){
_178[i].onmousemove=(function(i){
return function(){
var tip=XN.DOM.getElementsByClassName("voteTip",this)[0];
this.style.background="#c9dcec";
tip.style.visibility="visible";
};
})(i);
_178[i].onmouseout=(function(i){
return function(){
var tip=XN.DOM.getElementsByClassName("voteTip",this)[0];
this.style.background="#FFFFFF";
tip.style.visibility="hidden";
};
})(i);
_178[i].onclick=(function(i){
return function(){
var _180=XN.array.toQueryString({optionId:this.id.replace("item_",""),shareId:$("shareSourceId").value,shareOwner:$("shareSourceOwner").value,tsc:$("shareTsc").value});
var xhr=new XN.net.xmlhttp({url:_179,data:_180,onSuccess:function(r){
var _183=XN.json.parse(r.responseText);
if(_183.code!=0){
XN.DO.showMessage(_183.msg,"\u53cb\u60c5\u63d0\u9192");
}else{
XN.app.share.updateVoteUI(_183);
if(parseInt($("shareSourceOwner").value,10)!=XN.cookie.get("id")){
XN.app.share.shareAfterVote();
}
}
},onError:function(r){
XN.DO.alert("\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
}});
};
})(i);
}
},shareAfterVote:function(){
var c=XN.DO.confirm({title:"\u5206\u4eab\u7ed9\u597d\u53cb",message:"\u5185\u5bb9\u5f88\u7cbe\u5f69\uff0c\u5206\u4eab\u7ed9\u597d\u53cb\uff1f",callBack:function(r){
if(r){
var xhr=new XN.net.xmlhttp({url:"/share/ajaxSaveVoteShare.do",data:XN.array.toQueryString({shareId:$("shareSourceId").value,shareUserId:$("shareSourceOwner").value,tsc:$("shareTsc").value}),onSuccess:function(r){
var _189=XN.json.parse(r.responseText);
if(_189.code!=0){
XN.DO.showMessage(_189.msg,"\u5206\u4eab\u63d0\u793a");
}else{
XN.DO.showMessage("\u5206\u4eab\u6210\u529f\uff01");
}
},onError:function(){
XN.DO.alert("\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
}});
}
}});
}});
function checkMaxLength(el){
var s=this;
this.max=30;
this.checkFun=function(){
var _18c=XN.DOM.getElementsByClassName("share-check-msg",el.parentNode,"span");
if(el.value.length>=20){
el.value=el.value.substr(0,20);
if(_18c.length==0){
var _18d=document.createElement("span");
_18d.className="share-check-msg";
_18d.style.cssText="position:relative;right:0px;text-align:right;display:block;top:-7px;";
_18d.innerHTML="\u6700\u591a\u53ea\u80fd\u8f93\u516520\u4e2a\u5b57";
el.parentNode.appendChild(_18d);
XN.event.addEvent(el,"keydown",function(e){
XN.event.element(e||window.event).value=XN.event.element(e||window.event).value.substr(0,20);
});
}else{
_18c[0].style.display="block";
}
}else{
if(_18c.length!=0){
_18c[0].style.display="none";
}
}
};
this.startCheck=function(){
this._timer=setInterval(this.checkFun,200);
};
this.stopCheck=function(){
clearInterval(this._timer);
this._timer=null;
};
}
XN.app.share.hotShareRoll=function(){
var _18f,_190=4000;
var _191=1;
var _192=$("previewImg");
var _193=$("previewLink");
var _194=$("share_hot_video_list").getElementsByTagName("a");
var _195=$("share_hot_video_from");
var _196=$("share_hot_video_count");
var _197=$("share_hot_video_quote");
var _198=$("share_hot_video_btn");
var _199=null;
var show=function(el){
if(!$(el)||!$("share_list_change")){
clearTimeout(_18f);
return false;
}
_19c(el);
var sd=el.getAttribute("data-share");
document.getElementById("share_list_change").setAttribute("data-share",sd);
var lidx=_191?_191-1:_194.length-1;
if(/current/.test(_194[lidx].parentNode.className)){
XN.element.delClass(_194[lidx].parentNode,"current");
}
if(_199){
XN.element.delClass(_199.parentNode,"current");
}
XN.element.addClass(el.parentNode,"current");
};
var _19c=function(el){
var link=el.href;
var _1a1=XN.json.parse(el.getAttribute("vinfo").replace(/[\n\r\t]/g,""));
_192.src=_1a1.img;
_193.href=link;
_193.title=el.title;
_195.setContent("\u6765\u6e90:"+_1a1.from);
_196.setContent("\u5206\u4eab:"+_1a1.count+"\u6b21");
if(XN.string.trim(_1a1.quote).length>0){
_1a1.quote="<img class=\"quote-l\" src=\""+XN.env.CDNstaticRoot+"a.gif\"/>"+_1a1.quote+"<img class=\"quote-r\" src=\""+XN.env.CDNstaticRoot+"a.gif\"/>";
}else{
_1a1.quote="&nbsp;";
}
_197.setContent(_1a1.quote);
if(_198){
_198.onclick=function(){
create_share_div(_1a1.shareInfo[0],_1a1.shareInfo[1],_1a1.shareInfo[2]);
};
}
};
var roll=function(){
_18f=setTimeout(function(){
show(_194[_191]);
_18f=setTimeout(arguments.callee,_190);
_191==_194.length-1?_191=0:_191+=1;
},_190);
};
XN.array.each(_194,function(i,v){
XN.event.addEvent(v.parentNode,"mouseover",function(e){
var el=XN.event.element(e);
if(el.tagName.toLowerCase()==="li"){
el=el.getElementsByTagName("a")[0];
}
var _1a7=el.getAttribute("data-share");
document.getElementById("share_list_change").setAttribute("data-share",_1a7);
clearTimeout(_18f);
var _1a8=_191?_191-1:_194.length-1;
XN.element.delClass(_194[_1a8].parentNode,"current");
_19c(el);
if(_199){
XN.element.delClass(_199.parentNode,"current");
}
XN.element.addClass(el.parentNode,"current");
_199=el;
});
XN.event.addEvent(v.parentNode,"mouseout",function(e){
roll();
});
});
$("previewLink").onmouseover=function(e){
clearTimeout(_18f);
};
$("previewLink").onmouseout=function(e){
roll();
};
roll();
};
XN.DOM.readyDo(function(){
if($("previewImg")&&$("previewLink")){
XN.app.share.hotShareRoll();
}
});
var edmComments={};
edmComments.urls={reply:"http://status."+XN.env.domain+"/feedcommentreply.do",getList:"http://status."+XN.env.domain+"/feedcommentretrieve.do",del:"http://status."+XN.env.domain+"/feedcommentdelete.do"};
edmComments.tplComment=function(_1ac,_1ad){
var _1ae="<div class=\"statuscmtitem clearfix\" id=\"{{commentType}}comment_{{id}}\">                {{#showDelete}}                    <span class=\"float-right\">                        <a class=\"x-to-hide\" onclick=\"share_del_edm_ct({{edmId}}, {{id}});\" href=\"javascript:void(0)\"></a>                    </span>                {{/showDelete}}                <a class=\"minfriendpic\" style=\"background-image: url({{replyer_tinyurl}})\" namecard=\"{{ubname}}\" title=\"{{ubname}}\" href=\"http://www.renren.com/profile.do?id={{ubid}}\"></a>                <p class=\"replybody\">                    <a title=\"{{liveUserTitle}}\" href=\"http://www.renren.com/profile.do?id={{ubid}}\" class=\"{{liveUserClass}}\" namecard=\"{{ubname}}\">{{ubname}}</a>:                    {{#iconUrl}}                        <a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\"{{vipIconUrl}}\"></a>                    {{/iconUrl}}                    <span class=\"replycontent\">{{{replyContent}}}</span>                    <br />                    <span class=\"btn-box\">                        {{#showReply}}                            <a class=\"btn-reply\" onclick=\"share_reply_comment({{edmId}}, {{ubid}}, '{{ubname}}', {{id}}) ;return false\" href=\"#nogo\">\u56de\u590d</a>                        {{/showReply}}                    </span>                    <span class=\"time\">{{replyTime}}</span>                </p>            </div>",html;
_1ad.edmId=_1ac;
_1ad.showReply=(_1ad.ubid!=XN.user.id);
_1ad.showDelete=(_1ad.ubid==XN.user.id);
html=Mustache.to_html(_1ae,_1ad);
return html;
};
edmComments.getComments=function(_1b0,_1b1,_1b2){
if(XN.string.trim($("boxcont_"+_1b2).innerHTML)!==""){
var el=$("share_comment_"+_1b2);
el.getStyle("display")!=="none"?el.hide():el.show();
return;
}
var _1b4={doingId:_1b0,owner:_1b1,source:_1b0,feedId:0,t:5};
var _1b5=function(r){
edmComments.curIsAdmin=XN.json.parse(r.responseText).isAdmin;
var rt=["<div class=\"statuscmtlist\" id=\"commContainer_"+_1b0+"\">"];
var json=XN.json.parse(r.responseText).replyList;
for(var i=0,j=json.length;i<j;i++){
rt.push(edmComments.tplComment(_1b0,json[i]));
}
rt.push("</div>","<div class=\"postcomment\">","    <form onkeydown=\"if(event.keyCode == 13 &amp;&amp; event.ctrlKey){share_rp_edm_ct("+_1b0+");}\" id=\"comment_form_"+_1b0+"\" onsubmit=\"return false;\" method=\"post\">","        <textarea class=\"cmtbody w370\" id=\"comment"+_1b0+"\" name=\"comment\"></textarea>","        <p class=\"postbtn\">","            <input type=\"button\" onclick=\"share_rp_edm_ct("+_1b0+");\" class=\"input-button\" value=\"\u53d1\u8868\u8bc4\u8bba\" name=\"submit_comment\" id=\"submit_comment\">","            <input type=\"button\" onclick=\"$('share_comment_"+_1b2+"').hide();\" class=\"input-button gray\" value=\"\u53d6\u6d88\">","        </p>","        <input type=\"hidden\" id=\"repetNo\" name=\"repetNo\" value=\"0\">","        <input type=\"hidden\" id=\"currentShareOwner_"+_1b0+"\"  value=\""+_1b1+"\">","        <input type=\"hidden\" id=\"shareId_"+_1b0+"\"  value=\""+_1b2+"\">","    </form>","</div>");
$("share_comment_"+_1b2).show();
$("boxcont_"+_1b2).setContent(rt.join(""));
};
var _1bb=function(r){
XN.DO.showMessage("\u56de\u590d\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
};
new XN.net.xmlhttp({url:edmComments.urls["getList"],data:XN.array.toQueryString(_1b4),onSuccess:_1b5,onError:_1bb});
};
edmComments.replyComment=function(_1bd){
var _1be=$("comment_form_"+_1bd).repetNo.value;
var _1bf={doingId:$("shareId_"+_1bd).value,owner:$("currentShareOwner_"+_1bd).value,rplayerId:_1be,replyTo:_1be,source:_1bd,feedId:0,c:$("comment"+_1bd).value,t:5};
var _1c0=function(r){
var cmt=XN.json.parse(r.responseText);
cmt.ubid=cmt.replyerId;
cmt.ubname=cmt.replyerName;
cmt.replyer_tinyurl=cmt.replyerHead;
var _1c3=edmComments.tplComment(_1bd,cmt);
var el=XN.dom.getElementsByClassName("statuscmtlist",$("cmtContainer_"+_1bd),"div")[0];
el.innerHTML+=_1c3;
$("comment"+_1bd).value="";
};
var _1c5=function(r){
XN.DO.showMessage("\u56de\u590d\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
};
if(XN.string.isBlank(_1bf.c)){
XN.DO.alert("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
return false;
}
new XN.net.xmlhttp({url:edmComments.urls["reply"],data:XN.array.toQueryString(_1bf),onSuccess:_1c0,onError:_1c5});
};
edmComments.delComment=function(_1c7,_1c8){
var _1c9={doingId:_1c7,owner:0,replyId:_1c8,feedId:0,source:_1c7,t:5};
var _1ca=function(r){
$("comment_"+_1c8).remove();
};
var _1cc=function(r){
XN.DO.showMessage("\u5220\u9664\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002");
};
var _1ce=function(){
new XN.net.xmlhttp({url:edmComments.urls["del"]+"?"+XN.array.toQueryString(_1c9),method:"GET",onSuccess:_1ca,onError:_1cc});
};
XN.DO.confirm({title:"\u5220\u9664\u8be5\u8bc4\u8bba",msg:"\u786e\u5b9a\u8981\u5220\u9664\u5417?",callBack:function(r){
if(r){
_1ce();
}
}});
};
window.share_del_edm_ct=edmComments.delComment;
window.share_show_edm_comments=edmComments.getComments;
window.share_rp_edm_ct=edmComments.replyComment;
(function(){
var _1d0=function(){
var url=(window.asyncHTMLManager?asyncHTMLManager:window)["location"].href,_1d2=(function(_1d3){
return function(qs){
return XN.string.getQuery(qs,_1d3);
};
})(url),_1d5=_1d2("comment"),_1d6=_1d2("share_id"),_1d7=_1d2("edmId"),_1d8=_1d2("userid"),id=_1d2("id");
if($("isUrl")&&!_1d5&&!(/share_\d+/).test(location.hash)){
setTimeout(function(){
new XN.form.inputHelper($("isUrl")).focus();
},2000);
}
if(!_1d5||!_1d6){
return false;
}
$("share_comment_"+_1d6).scrollIntoView();
if(!_1d7){
share_show_comments(_1d6,_1d8);
}else{
share_show_edm_comments(_1d7,id,_1d6);
}
};
if(window.asyncHTMLManager){
window.asyncHTMLManager.addEvent("load",_1d0);
}else{
XN.dom.ready(_1d0);
}
})();
XN.app.share.CommentManger={};
(function(ns){
ns.init=function(_1db){
this._options={};
$extend(this._options,_1db);
this.initTabs();
this.initProxy();
try{
var _1dc=getActiveILike(),This=this;
_1dc.addEvent("startAdd",function(){
This.tabView.setCurrentTab("friendCmts");
});
_1dc.addEvent("remove",function(){
This.tabView.setCurrentTab("friendCmts");
});
}
catch(e){
XN.log(e);
}
};
ns.initTabs=function(){
var This=this;
this.tabs=[];
this.tabView=new XN.ui.tabView({selectedClass:"select"});
XN.array.each(this.getOptions("tabs"),function(i,v){
var _1e1=(v.content==This.getOptions("activeTab"));
This.tabs.push(v.tab);
This.tabView.addTab({label:v.tab,content:v.content,active:_1e1,onActive:function(){
This.activeTab=v.tab;
This.onTabChange(this);
}});
if(_1e1){
This.activeTab=v.tab;
}
});
};
ns.onTabChange=function(tab){
$(this.getOptions("cmtForm")).reset();
$(this.getOptions("cmtToInput")).value=0;
};
ns.initProxy=function(){
var This=this;
XN.event.addEvent(this.getOptions("cmtsListCon"),"click",function(e){
var el=XN.event.element(e||window.event),cmd=el.getAttribute("cmd");
if(cmd){
cmd=XN.json.parse(cmd);
switch(cmd.t){
case "reply":
This.replyCmt(cmd);
break;
case "del":
This.delCmt(cmd);
break;
}
}
});
};
ns.delCmt=function(obj){
var This=this,p=obj;
var _1ea=function(r){
if(!r){
return false;
}
var post={share_id:p.sid,share_owner:p.oid,comment_id:p.cid};
new XN.NET.xmlhttp({url:"http://share."+XN.env.domain+"/share/deletecomment.do",data:"post="+encodeURIComponent(XN.JSON.build(post)),onSuccess:function(r){
var j=XN.json.parse(r.responseText);
if(j.status!=1){
XN.DO.showError(j.msg);
}else{
if(j.status==1){
XN.array.each(This.tabs,function(i,v){
if($(v+"_comment_"+p.cid)){
$(v+"_comment_"+p.cid).remove();
}
if($(v+"_comment_list").getElementsByTagName("dd").length==0){
$(v+"_comment_list").hide();
}
});
}
}
},onError:function(){
alert("\u5220\u9664\u9519\u8bef");
}});
};
XN.DO.confirm({title:"\u5220\u9664\u8be5\u8bc4\u8bba",msg:"\u786e\u5b9a\u8981\u5220\u9664\u5417?",callBack:_1ea});
};
ns.save=function(){
var form=$(this.getOptions("cmtForm")),_1f2=form.comment.value,This=this,_1f4=this.getOptions("shareId");
if(XN.STRING.isBlank(_1f2)){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
return false;
}
if(_1f2.length>500){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc7500\u5b57");
return false;
}
var _1f5=$("ajax_msgerror");
if(_1f5){
_1f5.parentNode.removeChild(_1f5);
}
form.submit_comment.disabled=true;
var _1f6=XN.form.serialize(form,"hash");
if(This.activeTab=="allCmts"){
_1f6.all=1;
if(form.repetNo.value!=0){
_1f6.preComment=This.toCmtId;
}
}
new XN.net.xmlhttp({url:"http://share."+XN.env.domain+"/share/comment/addterm",data:XN.array.toQueryString(_1f6),onSuccess:function(r){
var text=XN.json.parse(r.responseText);
if(text.code!=0){
if(text.needVerfy==true){
try{
if(!$("shareVerifyPic_"+_1f4)){
var img=new Image();
img.className="validate-num";
img.id="shareVerifyPic_"+_1f4;
img.onclick="this.src+=Math.random();return false";
img.src="http://icode."+XN.env.domain+"/getcode.do?t=shareInfoCode"+_1f4+"&r="+Math.random();
$("shareVerify_"+_1f4).appendChild(img);
}
$("shareVerify_"+_1f4).show();
}
catch(e){
XN.log(e.description);
}
XN.DO.alert("\u60a8\u7684\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u9a8c\u8bc1\u7801");
}else{
XN.DO.showError(text.msg);
}
}else{
if(text.code==0){
var msg=XN.json.parse(text.msg);
if(This.activeTab=="allCmts"&&form.repetNo.value!=0){
$("allCmts_comment_list").appendHTML(This.buildOneCmt(msg));
}else{
XN.array.each(This.tabs,function(i,v){
$(v+"_comment_list").show();
$(v+"_comment_list").appendHTML(This.buildOneCmt(msg,v));
});
}
if(!!$("doShare")&&$("doShare").checked){
This.shareThis(_1f6);
}
}
}
try{
if($("shareVerifyPic_"+_1f4)){
$("shareVerifyPic_"+_1f4).src+=Math.random();
$("shareInfoCode"+_1f4).value="";
$("shareInfoCode"+_1f4).blur();
}
}
catch(e){
XN.log(e.description);
}
form.submit_comment.disabled=false;
form.comment.value="";
if($("sysnblog")){
$("sysnblog").checked=true;
$("sysnblog").disabled=false;
}
if($("doShare")){
$("doShare").checked=false;
$("doShare").disabled=false;
}
form.repetNo.value=0;
form.replyToCommentId.value=0;
},onError:function(){
alert("\u56de\u590d\u5931\u8d25");
form.submit_comment.disabled=false;
}});
};
ns.shareThis=function(p){
var _1fe=p.shareId;
var _1ff=p.shareOwner;
var post={"action":"add","auth":99,"body":encodeURIComponent(XN.string.ltrim(p.comment.replace(/[\r\n]/g," ")).replace(/"/g,"&quot;"))};
new XN.NET.xmlhttp({url:"http://share.renren.com/share/submit.do",data:"shareId="+_1fe+"&shareUserId="+_1ff+"&post="+XN.json.build(post)+"&from=\"0101030901\"",onSuccess:function(r){
},onError:function(){
XN.DO.showError("\u5206\u4eab\u5931\u8d25\uff01");
}});
};
ns.replyCmt=function(obj){
share_reply_comment(obj.sid,obj.oid,obj.oname,obj.id||obj.cid);
this.toCmtId=obj.cid;
};
ns.quickShare=function(){
var This=this,form=$(this.getOptions("cmtForm")),fixX=106,fixY=$(form.comment).realTop()-122;
XN.Do.confirm({title:"\u8bc4\u8bba\u6210\u529f",message:"<center><img src=\"http://a.xnimg.cn/imgpro/icons/yes.png\"/> \u8bc4\u8bba\u6210\u529f\u4e86\uff0c\u5c06\u7cbe\u5f69\u5185\u5bb9\u4e5f\u5206\u4eab\u7ed9\u597d\u53cb\u5427</center>",params:{showCloseButton:true},width:300,X:fixX,Y:fixY,callback:function(r){
if(!r){
return false;
}
var xhr=new XN.net.xmlhttp({url:"http://share."+XN.env.domain+"/share/ajaxSaveVoteShare.do?from=shareaftercomment",data:XN.array.toQueryString({shareId:This.getOptions("shareId"),shareUserId:This.getOptions("shareOwner"),tsc:XN.get_check}),onSuccess:function(r){
var _20a=XN.json.parse(r.responseText),msg;
if(_20a.code!=0){
msg=XN.DO.confirm({title:"\u5206\u4eab\u63d0\u793a",message:_20a.msg,X:fixX,Y:fixY});
}else{
msg=XN.DO.confirm({title:"\u63d0\u793a",message:"\u5206\u4eab\u6210\u529f",X:fixX,Y:fixY});
}
msg.footer.hide();
setTimeout(function(){
msg.hide();
},3000);
},onError:function(){
XN.DO.alert("\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
}});
}});
};
ns.buildOneCmt=function(obj,tab){
var This=this,_20f=This.getOptions("isAdmin")=="true"?true:false,_210=parseInt(XN.cookie.get("id"),10),_211=this.getOptions("shareId"),_212=this.getOptions("shareOwner"),tObj=obj,tstr="";
var _215=tObj.keepUse?" lively-user":"";
var _216=tObj.keepUse?"\u8fde\u7eed\u767b\u5f557\u5929, \u5373\u53ef\u83b7\u5f97\u6a59\u540d\u7279\u6743":tObj.name;
var _217="";
var _218="http://admin.renren.com/admin/newuserreport.do?type=30&owner="+_212+"&contentId="+tObj.id+"&userId="+tObj.author+"&origURL="+encodeURIComponent(document.location.href);
var _219=obj.isVip;
var _21a=obj.vipIconUrl;
if(!tObj.showDelete&&!(This.activeTab=="allCmts")){
_217="<span class=\"float-right\"><a target=\"_blank\" href=\""+_218+"\" class=\"reply-report\" style=\"display: none;\">\u4e3e\u62a5</a></span>";
}
tstr+="<dd id=\""+tab+"_comment_"+tObj.id+"\">"+_217+"     <a class=\"avatar\" namecard=\""+tObj.author+"\" title=\""+tObj.name+"\" href=\"http://www."+XN.env.domain+"/profile.do?id="+tObj.author+"\">"+"            <img height=\"50\" width=\"50\" src=\""+tObj.headUrl+"\" alt=\""+tObj.name+"\" class=\"avatar\"/>"+"     </a>"+"     <div class=\"info\">";
if(tObj.showDelete){
tstr+="            <span class=\"float-right\">"+"                 <a class=\"x-to-hide\" cmd=\"{t:'del',sid:"+_211+",oid:"+_212+",cid:"+tObj.id+"}\" href=\"javascript:void(0)\"></a>"+"            </span>";
}
tstr+="<a namecard=\""+tObj.author+"\" title=\""+_216+"\" href=\"http://www."+XN.env.domain+"/profile.do?id="+tObj.author+"\" class=\""+_215+"\">"+tObj.name+"</a> ";
if(tObj.vipIconUrl){
tstr+="<a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\""+_21a+"\"></a>";
}
tstr+="</div>"+"      <div class=\"reply\">"+"            <p class=\"content\" style=\"display: block\">"+tObj.body+"            </p>";
tstr+="<div class=\"control-box clearfix\">";
tstr+="<span class=\"time\"> "+tObj.time+" </span>";
tstr+="<div class=\"btn-box\">";
if(XN.user&&XN.user.id&&(tObj.liked!==undefined)&&(tObj.likeCount!==undefined)){
var _21b="<a style=\"margin-left: 10px;\" class=\"ilike_comment\" comment-data=\"{'stype':'share','cid':'{{commentId}}', 'rid':'{{resourceId}}', 'uid':'{{userId}}', 'oid':'{{ownerId}}', 'roid':'{{resourceUserId}}', 'name':'{{userName}}', 'url':'{{url}}', 'liked':{{islike}} }\" href=\"javascript:void(0)\">{{comment}}</a>",_21c={commentId:tObj.id,ownerId:tObj.author,resourceId:_211,resourceUserId:_212,userId:XN.user.id,userName:XN.user.name,url:"http://share.renren.com/share/"+_212+"/"+_211,islike:tObj.liked,comment:tObj.liked?((tObj.likeCount===0)?"\u53d6\u6d88":tObj.likeCount+" \u53d6\u6d88"):((tObj.likeCount===0)?"\u559c\u6b22":tObj.likeCount+" \u559c\u6b22")},_21d=Mustache.to_html(_21b,_21c);
tstr+=_21d;
}
if(_210!==tObj.author){
if(This.activeTab!="allCmts"){
tstr+=" &nbsp; <a cmd=\"{t:'reply',sid:"+_211+",oid:"+tObj.author+",oname:'"+tObj.name+"',cid:"+tObj.id+"}\" href=\"javascript:void(0);\">\u56de\u590d</a>";
}
}
tstr+="</div>";
tstr+="</div>";
tstr+="      </div>"+"</dd>";
return tstr;
};
ns.getMoreCmt=function(_21e,_21f){
var url,This=this;
this.share_owner=_21f;
this.share_id=_21e;
var _222=function(){
var _223=$(This.activeTab+"_commContainer_"+_21e).getElementsByTagName("dd")[0];
return _223.id.match(/\d+/)[0];
};
var _224={shareId:_21e,owner:_21f,commentId:_222()};
if(This.activeTab=="allCmts"){
url="http://share."+XN.env.domain+"/share/comment/moreurlcomment";
$extend(_224,{md5:This.getOptions("shareUrlMd5")});
}else{
if(This.activeTab=="friendCmts"){
url="http://share."+XN.env.domain+"/share/getmorecomment.do";
}
}
var _225=function(_226,_227){
var dl=$element("dl");
dl.className="replies";
var tstr=[];
for(var i=0;_226[i];i++){
tstr.push(This.buildOneCmt(_226[i]));
}
dl.innerHTML=tstr.join("");
return dl;
};
$(This.activeTab+"_tempLoading_"+_21e).style.visibility="visible";
var xhr=new XN.net.xmlhttp({url:url,data:XN.array.toQueryString(_224),onSuccess:function(r){
$(This.activeTab+"_tempLoading_"+_21e).style.visibility="hidden";
var j=XN.json.parse(r.responseText);
if(j.code!==0){
XN.DO.showError(j.msg);
return false;
}
if(j.code==0){
if(!j.hasMore){
$(This.activeTab+"_showMore_"+_21e).hide();
}
var _22e=$(This.activeTab+"_commContainer_"+_21e);
var _22f=null;
var els=XN.dom.getElementsByClassName("replies",_22e);
var i=0;
while(els[i]){
if(!els[i].getElementsByTagName("dt").length){
_22f=els[i];
break;
}
i++;
}
_22e.insertBefore(_225(j.comments,_21e),_22f);
}
},onError:function(r){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
}});
};
ns.getOptions=function(key){
return this._options[key];
};
})(XN.app.share.CommentManger);
XN.dom.ready(function(){
var _234={};
object.use("xn.mention",function(_235,xn){
_234=xn.mention.Mention;
});
if(Sizzle(".share-home #miniEditorTextarea")[0]){
_234.init([{obj:Sizzle(".share-home #miniEditorTextarea")[0],ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
}
if(Sizzle(".share-home #cmtbody")[0]&&Sizzle(".share-home #cmtbody").length>0){
_234.init([{obj:Sizzle(".share-home #cmtbody")[0],ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
}
if($("linkcmt")){
_234.init([{obj:$("linkcmt"),ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
}
if(Sizzle(".share-newhome #miniEditorTextarea")[0]){
_234.init([{obj:Sizzle(".share-newhome #miniEditorTextarea")[0],ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
}
},true);
XN.dom.ready(function(){
var dom,_238;
object.use("dom",function(o){
dom=o;
});
_238=dom.getElements("body")[0];
_238.delegate("dl.replies dd","mouseover",function(e){
var _23b=this.getElements(".reply-report")[0];
if(_23b){
_23b.show();
}
});
_238.delegate("dl.replies dd","mouseout",function(e){
var _23d=this.getElements(".reply-report")[0];
if(_23d){
_23d.hide();
}
});
},true);
(function(ns){
var _23f="";
function initR(p){
$extend(this,{wrapHtml:"<div class=\"relative-content\">{{content}}</div>"});
$extend(this,p);
this.getHtml();
}
initR.prototype={getHtml:function(){
var This=this;
new XN.net.xmlhttp({url:This.url,data:XN.array.toQueryString(This.data),onSuccess:function(r){
if(XN.string.trim(r.responseText)==""){
return false;
}
This.htmlTxt=r.responseText;
This.buildHtml();
}});
},buildHtml:function(){
this.htmlContent=this.wrapHtml.replace("{{content}}","<h4>"+this.title+"</h4>"+this.prefix+this.htmlTxt+this.suffix);
this.display();
},display:function(){
var This=this;
setTimeout(function(){
This.con.innerHTML=This.htmlContent;
},50);
}};
ns.initRBlog=function(_244){
$extend(_244,{title:"\u76f8\u5173\u65e5\u5fd7",prefix:"<div class=\"hot-blog-sidebar\"><ul class=\"blog-list clearfix\">",url:"http://rcd.renren.com/cwf_blog",suffix:"</ul></div>"});
return new initR(_244);
};
ns.initRVideo=function(_245){
$extend(_245,{title:"\u76f8\u5173\u89c6\u9891",url:"http://rcd.renren.com/cwf_video",prefix:"<div class=\"shares-list\">",suffix:"</div>"});
return new initR(_245);
};
})(XN.app.share);
var UGC_PING="http://s.xnimg.cn/a30917/performance_v1/script/client/UGC-ping.js";
var sharePopUp=null;
var NetWorkConfirm=function(_246,_247,_248,yes,no,X,Y,w,h){
var _24f={type:"normal",width:400,modal:false,yes:"\u786e\u5b9a",no:"\u53d6\u6d88",callBack:XN.func.empty,focus:null,addIframe:true,closeFire:false};
if(!isString(_246)&&!isNumber(_246)){
extendObject(_24f,_246);
}else{
if(isString(_246)||arguments.length>1){
var ars=arguments;
XN.array.each(["message","title","callBack","yes","no","X","Y","w","h"],function(i,v){
if(ars[i]){
_24f[v]=ars[i];
}
});
}
}
var temp=_24f.params;
delete _24f.params;
_24f=extendObject({},_24f,temp);
_24f.callback=_24f.callback||_24f.callBack;
try{
currentConfirm.remove(_24f.modal===true);
}
catch(e){
}
var _254=(new XN.ui.dialog(_24f)).setType(_24f.type).setTitle(_24f.title||(_24f.type=="error"?"\u9519\u8bef\u63d0\u793a":"\u63d0\u793a")).setBody(_24f.msg||_24f.message||"").setWidth(_24f.width).setHeight(_24f.height).setX(_24f.X).setY(_24f.Y).addButton({text:_24f.submit||_24f.yes,onclick:function(){
_254.setAutoHide(true);
return _24f.callback.call(_254,true);
}}).show();
if(_24f.focus=="submit"){
_24f.focus=_24f.submit;
}
if(_24f.closeFire===true){
_254.addEvent("close",function(){
_24f.callback.call(_254,false);
});
}
_254.getButton(_24f.focus||_24f.submit||_24f.yes).focus();
currentConfirm=_254;
};
window.__getShareName=function(type){
switch(type){
case "blog":
return "\u65e5\u5fd7";
case "album":
return "\u76f8\u518c";
case "photo":
return "\u7167\u7247";
case "forum":
return "\u5c0f\u7ec4";
case "thread":
return "\u5e16\u5b50";
case "pageThread":
return "\u8bdd\u9898";
case "pageBlog":
return "\u65e5\u5fd7";
case "pageAlbum":
return "\u76f8\u518c";
default:
return "";
}
};
window.__shareProtect={t1:function(){
try{
sharePopUp.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
},t2:function(){
try{
sharePopUp.dialog.error("\u5df2\u7ecf\u88ab\u5220\u9664 :(");
}
catch(ex){
XN.DO.showMessage("\u5df2\u7ecf\u88ab\u5220\u9664:(","\u53cb\u60c5\u63d0\u793a");
}
}};
XN.mstpl=function(str,data){
var _258={};
var _259=function(str,data){
var fn=!/\W/.test(str)?_258[str]=_258[str]||this.tmpl(document.getElementById(str).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};"+"with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return data?fn(data):fn;
};
return _259(str,data);
};
XN.copyExtralLink={btnId:"",copyVal:"",init:function(_25d,val){
this.btnId=_25d;
this.copyVal=val;
this.createClient();
},createClient:function(){
var txt=this._link;
var This=this;
if(XN.BROWSER.IE){
XN.event.addEvent(This.btnId,"click",function(){
if(This.clip){
This.clip.reposition(This.btnId);
return;
}
});
}
if(typeof ZeroClipboard!="undefined"){
this.createClip();
return;
}
XN.loadFile(XN.env.staticRoot+"jspro/album/ZeroClipboard.js",function(){
ZeroClipboard.setMoviePath(XN.env.CDNstaticRoot+"swf/album/ZeroClipboard.swf");
This.createClip();
});
},createClip:function(){
if(this.clip){
this.clip.reposition(this.btnId);
this.clip.show();
this.clip.setText(this.copyVal);
return false;
}
var This=this;
var clip=new ZeroClipboard.Client();
clip.setHandCursor(true);
clip.addEventListener("complete",function(_263,text){
XN.DO.showMessage("<p style=\"text-align:center; font-size:14px;padding:10px\">\u5df2\u7ecf\u590d\u5236\u5230\u526a\u8d34\u677f<p>");
_263.hide();
});
clip.setText(this.copyVal);
clip.glue(this.btnId);
this.clip=clip;
}};
var XNShareObject={gFloatTimeOut:"",gCloseShareSucTimer:"",_register:function(o){
if(window.gHasRunedShare){
return false;
}
if(o.autoRegister){
this._registerOldInterface();
}
window.gHasRunedShare=true;
var _266=this,text="";
for(var fn in _266){
if(typeof _266[fn]=="function"&&!/^_(.*)/.test(String(fn))){
XN[fn]=_266[fn];
}else{
if(/^create(.*)/.test(String(fn))&&o.autoRegister){
(_266[fn]).call(this);
}else{
if(/^g(.*)/.test(String(fn))){
window[fn]=_266[fn];
}
}
}
}
if(o.floatMode){
XNShareObject._registerFloatDiv();
}
},_registerOldInterface:function(){
var _269=this.interfaceOld;
for(var fn in _269){
if(typeof _269[fn]=="function"&&/^create(.*)/.test(String(fn))){
(_269[fn]).call(_269);
}
}
},_base:{data:"",liveRegister:function(_26b,_26c,fn,args){
var _26f=this,_ns=XNShareObject._base;
function _bind(e){
var _272=e.srcElement||e.originalTarget;
var _273=_ns._hitSelector(_26b,_272);
if(_273&&_273.data){
fn.call(this,args,_273);
}
}
try{
XN.event.addEvent(document,_26c,_bind,2);
}
catch(ex1){
try{
document.attachEvent("on"+_26c,_bind);
}
catch(ex2){
try{
document.addEventListener(_26c,_bind,false);
}
catch(ex3){
throw new Error("event bind is error!");
}
}
}
},_hitSelector:function(s,t){
return /^#(.*)$/.test(s)?(function(){
return s.replace(/^#/,"")==t.id?(XN.json.parse(t.getData("share"))||{err:-1,e:t}):false;
}()):(/^\.(.*)$/.test(s)?(function(){
var _276=s.replace(/^\./,""),_277="";
try{
_277=t.className.split(/\s+/);
}
catch(e){
}
for(var i=0;i<_277.length;i++){
if(_276==_277[i]){
var sd="";
try{
sd=t.getData("share");
}
catch(e){
try{
t=$(t);
sd=t.getData("share");
}
catch(ex){
sd=false;
}
}
return sd?{data:XN.json.parse(sd),e:t,err:0}:{err:-1,e:t};
}
}
return false;
}()):false);
},hitSelector:function(){
this._hitSelector.apply(this,arguments);
},toPix:function(p){
return parseInt(p,10)+"px";
},toStyleString:function(o){
var _27c=[];
for(var _27d in o){
_27c.push(_27d+":"+o[_27d]);
}
return _27c.join(";");
}},_registerFloatDiv:function(){
var _27e=null,_27f=null,CGI=null,XHR=null,Cfg=null,tpl=null,_284=null,_285=null,_286=null,_287=null,_288=null,_289=null,_28a=null,_28b=null;
_27e={BLOG:"http://blog."+XN.env.domain,SHARE:"http://share."+XN.env.domain,FRIEND:"http://sg."+XN.env.domain+"/s/f",EDM:"http://edm."+XN.env.domain+"/feedshare.do?",PAGE:"http://page."+XN.env.domain,APP:"http://app."+XN.env.domain,VIDEO:"http://video."+XN.env.domain,TV:"http://tv."+XN.env.domain,PHOTO:"http://photo."+XN.env.domain,XIAOZU:"http://xiaozu."+XN.env.domain,MUSIC:"http://music."+XN.env.domain,HUODONG:"http://huodong."+XN.env.domain};
_27f={CHN:{TITLE_1:"\u5206\u4eab",TITLE_2:"\u7ad9\u5185\u4fe1\u7ed9\u597d\u53cb",MSG_1:"\u6211\u5206\u4eab\u7684\u7406\u7531\u662f...",MSG_2:"\u6211\u6536\u85cf\u7684\u539f\u56e0\u662f",ALERT_COMMENT:"\u8bc4\u8bba\u5b57\u6570\u4e0d\u80fd\u8d85\u8fc7500"}};
CGI={SUBMIT:"/share/submit.do",GETSHARE:"/getshare.do",POPUP:"/share/popup.do",AJAX:"/share/ajax.do",ZHAN:"/share/popup/zhan",LINK:"/share/linkparse"};
XHR=function(obj){
var _28d=false,_28e=$extend({},obj),_28f=null;
if(obj.waitTime&&obj.onTimeout){
_28d=true;
_28e.onSuccess=function(r){
window.clearTimeout(_28f._timeoutTimer);
obj.onSuccess(r);
};
}
_28f=new XN.net.xmlhttp(_28e);
if(_28d){
_28f._timeoutTimer=setTimeout(function(){
obj.onTimeout.call(_28f);
try{
_28f.abort();
}
catch(e){
XN.log(e);
}
},obj.waitTime);
}
return _28f;
};
Cfg={url:"",poptype:"",shareType:"",postParam:{},requestParam:{},commentMax:500,groupStack:[],feedCgiUrl:function(o){
var type=o.type,_293=o.owner,id=o.id;
switch(type){
case "blog":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","562","share.blog",1000);
}
catch(ex){
}
});
return _27e.BLOG+"/blog/"+_293+"/"+id+"/homeShare";
case "album":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","564","share.album",1000);
}
catch(ex){
}
});
return _27e.PHOTO+"/photo/"+_293+"/album-"+id+"/share";
case "photo":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","565","share.photo",1000);
}
catch(ex){
}
});
return _27e.PHOTO+"/photo/"+_293+"/photo-"+id+"/share";
case "zujiPlace":
return _27e.PHOTO+"/photo/zuji/"+_293+"/"+o.siteId+"/share?zujiId="+o.mt_zujiId;
case "zujiPhoto":
return _27e.PHOTO+"/photo/zuji/"+_293+"/"+o.siteId+"/share?zujiId="+o.mt_zujiId+"&itemId="+o.itemId;
case "forum":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","566","share.forum",1000);
}
catch(ex){
}
});
return _27e.XIAOZU+"/xiaozu/"+id+"/js";
case "thread":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","567","share.thread",1000);
}
catch(ex){
}
});
return _27e.XIAOZU+"/xiaozu/"+id+"/thread/"+_293+"/share";
case "clike":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","568","share.clike",1000);
}
catch(ex){
}
});
return _27e.APP+"/like/likeInfo?feed_id="+id;
case "pageThread":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","569","share.pageThread",1000);
}
catch(ex){
}
});
return _27e.PAGE+"/"+id+"/group/"+_293+"/getShareData";
case "pageBlog":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","570","share.pageBlog",1000);
}
catch(ex){
}
});
return _27e.PAGE+"/"+_293+"/note/"+id+"/share";
case "pageAlbum":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","571","share.pageAlbum",1000);
}
catch(ex){
}
});
return _27e.PAGE+"/"+_293+"/album/"+id+"/share";
case "video":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","572","share.video",1000);
}
catch(ex){
}
});
return _27e.VIDEO+"/ajax/getVideoInfo?ownerId="+_293+"&videoId="+id;
case "tv":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","573","share.tv",1000);
}
catch(ex){
}
});
return _27e.TV+"/ajax/getVideoInfo?ownerId="+_293+"&videoId="+id;
case "song":
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","574","share.songdu",1000);
}
catch(ex){
}
});
return _27e.MUSIC+"/share/json/song/"+id;
case "gytv":
return "http://www.uume.com/share/"+id+"/renren";
case "huodong":
return _27e.HUODONG+"/event/share/"+id;
case "huodong_pic":
return _27e.HUODONG+"/event/photo/share/"+id;
case "wikicomment":
return "http://wiki.renren.com/ajax/commentshare/commentinfo/"+id;
}
},hideTime:500,tagObject:{add:{defaultInputMsg:_27f.CHN.MSG_1,dialogTitle:_27f.CHN.TITLE_1,vaild:function(o){
if(_285.comment()){
return true;
}
return false;
},getPostData:function(){
if($("pop_share_sendcomment")&&!$("pop_share_sendcomment").disabled){
Cfg.requestParam["sendcomment"]=$("pop_share_sendcomment").checked;
}
Cfg.requestParam["action"]="add";
Cfg.requestParam["auth"]=99;
delete Cfg.requestParam.form;
}},fav:{defaultInputMsg:_27f.CHN.MSG_2,dialogTitle:_27f.CHN.TITLE_1,vaild:function(){
return true;
},getPostData:function(){
Cfg.requestParam["action"]="add";
Cfg.requestParam["auth"]=-1;
delete Cfg.requestParam.form;
}},pageAdd:{defaultInputMsg:_27f.CHN.MSG_1,dialogTitle:_27f.CHN.TITLE_1,vaild:function(o){
if(_285.comment()&&pageUtil.getIds()){
return true;
}
return false;
},getPostData:function(){
if($("pop_share_sendcomment")&&!$("pop_share_sendcomment").disabled){
Cfg.requestParam["sendcomment"]=$("pop_share_sendcomment").checked;
}
Cfg.requestParam["action"]="add";
Cfg.requestParam["auth"]=80;
Cfg.requestParam["pagelist"]=pageUtil.getIds();
delete Cfg.requestParam.form;
}},send:{defaultInputMsg:_27f.CHN.MSG_1,dialogTitle:_27f.CHN.TITLE_2,vaild:function(){
var data=_284.friend.getFriends();
if(_285.comment()&&_285.friend(data)){
return true;
}
return false;
},getPostData:function(){
Cfg.requestParam["action"]="sharetofriend";
Cfg.requestParam["ids"]=_284.friend.data.getIds();
Cfg.requestParam["form"]=XN.form.serialize("popShareParams","hash");
Cfg.requestParam["subject"]=$("popShareSubjectInput").value;
}},qun:{defaultInputMsg:_27f.CHN.MSG_1,dialogTitle:_27f.CHN.TITLE_1,vaild:function(){
var data=_284.qun.data;
if(_285.comment()&&_285.qun(data)){
return true;
}
return false;
},getPostData:function(){
Cfg.requestParam["action"]="sendtoqun";
Cfg.requestParam["ids"]=_284.qun.getQunData();
delete Cfg.requestParam.form;
}}}};
tpl={msg:"<div><center>{{MSG}}</center></div>",ansyc:{add:"",fav:"",send:"",qun:""},beforePost:"<div id=\"share_msg_dialog\" class=\"share-success clearfix large\">\u6b63\u5728\u53d1\u9001\u8bf7\u6c42...</div><div id=\"pop_share_ads\"></div>",loadingHTML:function(){
return "<div class=\"loading\">                            <center>                                <img src=\""+XN.env.CDNstaticRoot+"/imgpro/indicator/blue_large.gif\" />                            </center>                        </div>";
},shareTypeLayer:function(){
return "<a href=\"javascript:;\" class=\"st-now st-item add\">                            <span class=\"st-text\">\u53d1\u65b0\u9c9c\u4e8b</span>                            <span class=\"st-arrow st-down\"></span>                        </a>                        <a href=\"javascript:;\" class=\"st-select st-item fav\">\u4ec5\u81ea\u5df1\u6536\u85cf</a>                        <a href=\"javascript:;\" class=\"st-select2 st-item page\">\u516c\u5171\u4e3b\u9875\u53d1\u5e03</a>";
},shareLink:function(o){
var t="<p class=\"gray\">\u590d\u5236\u5206\u4eab\u94fe\u63a5,\u901a\u8fc7QQ\u6216\u8005MSN\u53d1\u9001\u7ed9\u4f60\u7684\u597d\u53cb.</p>                               <p>                                   <input type=\"text\" class=\"text-box\" style=\"width:210px;height:20px\" value=\"<%=url%>\" id=\"share_success_val\" />                                   <input type=\"button\" class=\"input-submit\" value=\"\u590d\u5236\" id=\"share_success_btn\" class=\"share_success_btn\" />                               </p>";
return XN.mstpl(t,o);
},shareCallback:function(o){
var t=" <div class=\"share-success-tip\">                            <p><img src=\"http://a.xnimg.cn/imgpro/share/share-success.gif\"/></p>                            <p>                                <%if(action==\"fav\"){ %>                                    <%=tips_e%>                                <%} else if(action==\"qun\"){ %>                                                                    <% }else{ %>                                    <%=tips_a%>                                <% } %>                            </p>                          </div>                          <div class=\"share-success-more\">                            <div id=\"share_success_link\"></div>                            <p>                                <%if(action==\"send\"){ %>                                    <%=tips_d%>                                <% } else if(action==\"fav\"){%>                                    <%=tips_f%>                                <% } else if(action==\"qun\"){%>                                    <%=tips_g%>                                <% }else{ %>                                    <%=tips_b%>                                <% } %>                            </p>                            <% if(action==\"qun\"){%>                                <p><%=tips_h%></p>                            <% }else{ %>                                <p><%=tips_c%></p>                            <% } %>                            <%if(adObjArry){ %>                            <p>                                <a href=\"<%=url%>\" target=\"_blank\" >                                    <img height=\"80\" width=\"280\" src=\"<%=img%>\" />                                </a>                            </p>                            <% } %>                          </div>";
return XN.mstpl(t,o);
}};
_284={qun:{data:null,getQunData:function(){
if(!_284.qun.data){
_284.qun.data=[];
}else{
return _284.qun.data;
}
},addQun:function(id){
_284.qun.data.push(id);
},removeQun:function(id){
var len=_284.qun.data.length;
while(len--){
if(_284.qun.data[len]==id){
_284.qun.data.splice(len,1);
break;
}
}
},init:function(){
if(_284.qun.data){
_284.qun.data.length=0;
}
var _2a0=$("sharer_pop_qunlist"),_2a1=this;
XN.event.addEvent(_2a0,"click",function(e){
var el=XN.event.element(e||window.event),tag=el.tagName.toLowerCase(),id=0,_2a6=e.srcElement||e.originalTarget;
if(tag=="a"&&el.getAttribute("cmdtype")=="get-more"){
while(Cfg.groupStack.length>0){
Cfg.groupStack.pop().setStyle("display:block");
}
$(_2a6).setStyle("display:none");
return false;
}
if(tag=="img"){
el=el.parentNode;
}
id=el.getAttribute("cmddata");
if(el.className.indexOf("selected")!==-1){
_284.qun.removeQun(id);
}else{
_2a1.addQun(id);
}
XN.element.toggleClass(el,"selected");
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","574","share.group.select",1000);
}
catch(ex){
}
});
});
this.getQunData();
}},friend:{ids:null,data:null,init:function(){
var _2a7=_284.friend.data=new XN.ui.multiFriendSelector({url:_27e.FRIEND,maxNum:10});
_2a7.addEvent("overMaxNum",function(n){
XN.DO.showError("\u4e00\u6b21\u6700\u591a\u53ea\u80fd\u5206\u4eab\u7ed9"+n+"\u4f4d\u597d\u53cb^_^");
});
$("shareSelectFriends").setContent(_2a7);
_2a7.reset();
},getFriends:function(){
return _284.friend.data.getIds();
}}};
_285={comment:function(){
var _2a9=$("sharer_popup_message").value.split("").length;
if(_2a9>Cfg.commentMax){
XN.DO.showError(_27f.CHN.ALERT_COMMENT);
return false;
}
return true;
},qun:function(d){
if(d.length===0){
XN.DO.showError("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u7fa4");
return false;
}
return true;
},friend:function(d){
if(d.length===0){
XN.DO.showError("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u597d\u53cb");
return false;
}
return true;
}};
_286={defaultMsg:function(){
var _2ac=$("sharer_popup_message"),st=Cfg.shareType;
msg=Cfg.tagObject[st].defaultInputMsg;
if(_2ac.value==""){
}
},requestParam:function(o,_2af){
var _2b0=function(){
var data=XN.form.serialize($("popShareParams"),"hash");
data["forwardComment"]=XN.form.help("sharer_popup_message").getRealValue();
if($("summary")){
data["summary"]=$("summary").innerHTML;
}
data["noteId"]=$("noteId")?$("noteId").value:0;
if(/^(.*?[^:]?)\/\/[^\/]+\:/.test(data.forwardComment.replace(/[\n\r]/g,""))){
data["body"]=/^(.*?[^:]?)\/\/[^\/]+\:/.exec(data.forwardComment.replace(/[\n\r]/g,""))[1];
}else{
data["body"]=data.forwardComment;
}
if(_286.postUrl(Cfg.postParam.stype).fs==1){
data["body"]=data.forwardComment;
}
if(Sizzle("input[type=checkbox]",$("shareAjaxResult")).length>0){
data["sendcomment"]=Sizzle("input[type=checkbox]",$("shareAjaxResult"))[0].checked;
}
if(location.href.indexOf("http://page."+XN.env.domain+"")==0){
data.pageId=data.fromno||($("fromno")&&$("fromno").value);
}
if(typeof Cfg.postParam.from!=="undefined"){
data["from"]=Cfg.postParam.from;
}
if(typeof Cfg.postParam.shfrom!=="undefined"){
data["shfrom"]=Cfg.postParam.shfrom;
}
return data;
};
var d=_2b0();
return $extend(o,d);
},postParam:function(o,_2b4){
if(_2b4){
Cfg.postParam={};
}
for(var key in o){
Cfg.postParam[key]=o[key];
}
return Cfg.postParam;
},cmdType:function(type){
var _set=function(v){
Cfg.postParam.poptype=v;
Cfg.poptype=v;
Cfg.shareType=type;
};
switch(type){
case "add":
_set(1);
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","576","share.click.add",1000);
}
catch(ex){
}
});
break;
case "fav":
_set(1);
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","577","share.click.fav",1000);
}
catch(ex){
}
});
break;
case "pageAdd":
_set(1);
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","577","share.click.pageAdd",1000);
}
catch(ex){
}
});
break;
case "send":
_set(2);
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","578","share.click.send",1000);
}
catch(ex){
}
});
break;
case "qun":
_set(3);
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","579","share.click.qun",1000);
}
catch(ex){
}
});
break;
}
},beforePost:function(type,cb){
switch(type){
case "create_share_video":
_288.getVideoPostData({url:Cfg.feedCgiUrl(Cfg.postParam),callback:function(json){
_286.postParam(json);
cb();
}});
break;
case "create_share_feed":
_288.getFeedPostData({url:Cfg.feedCgiUrl(Cfg.postParam),callback:cb});
break;
case "create_share_edm":
_288.getEdmPostData({id:Cfg.postParam.id,callback:function(json){
_286.postParam(json);
cb();
}});
break;
case "pop_share":
if($("isProtected")&&$("isProtected").value=="true"){
try{
_28a.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
return false;
}
var post={};
try{
post=XN.FORM.serialize("popShareParams","hash");
}
catch(e){
post.link=$("link").value;
post.type=$("type").value;
post.title=$("title").value;
post.pic=$("pic").value;
post.fromno=$("fromno").value;
post.fromname=$("fromname").value;
post.fromuniv=$("fromuniv").value;
post.albumid=$("albumid").value;
post.largeurl=$("largeurl").value;
if($("mainurl")){
post.mainurl=$("mainurl").value;
}
}
post.summary=$("summary").innerHTML;
_286.postParam(post);
cb();
break;
case "pop_share_msg":
var post=XN.form.serialize($("popShareParams"),"hash");
_286.postParam(post);
cb();
break;
case "pop_share_for_list":
var _2be=Cfg.postParam.index;
if($("isProtected")){
var _2bf=$("popShareParams_"+_2be).getElementsByTagName("input");
var i=0;
while(i<_2bf.length){
if(_2bf[i].getAttribute("id")=="isProtected"){
if(_2bf[i].value=="true"){
var _2c1;
for(var j=0;j<_2bf.length;j++){
if(_2bf[j].getAttribute("name")=="type"){
_2c1=_2bf[j].value;
}
}
try{
_28a.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
return false;
}
break;
}
i++;
}
}
var post=XN.FORM.serialize("popShareParams_"+_2be,"hash");
post.summary=$("summary_"+_2be).innerHTML;
post.sysn=false;
_286.postParam(post);
cb();
break;
default:
cb();
break;
}
},postUrl:function(type){
var _2c4=function(url,fs){
Cfg.url={"url":url,"fs":fs};
};
switch(type){
case "pop_share_new":
Cfg.postParam.url==undefined?_2c4(_27e.SHARE+CGI.AJAX):_2c4(Cfg.postParam.url,1);
break;
case "create_share_div":
case "create_share_div_send":
case "create_share_nosysn_send":
case "create_share_nosysn":
case "create_share_sysn":
case "create_share_jebe":
_2c4(_27e.SHARE+CGI.AJAX,0);
break;
case "create_thread_share_div":
_2c4(_27e.SHARE+CGI.GETSHARE,0);
break;
case "create_share_popup":
_2c4(_27e.SHARE+CGI.POPUP,0);
break;
case "create_share_link":
Cfg.postParam.type=6;
case "create_share_feed":
case "create_share_edm":
case "pop_share":
case "pop_share_msg":
case "pop_share_for_list":
_2c4(_27e.SHARE+CGI.POPUP,1);
break;
case "pop_share_link":
_2c4(_27e.SHARE+CGI.LINK,1);
break;
case "create_share_zhan":
_2c4(_27e.SHARE+CGI.ZHAN,0);
break;
default:
throw new Error("share type error");
}
return Cfg.url;
}};
_287={showDialogMsg:function(msg){
var d=_28a.dialog.instance;
d.setBody(tpl.msg.replace("{{MSG}}",msg));
setTimeout(function(){
d.hide();
},1500);
},error:function(msg){
XN.DO.showError(msg||"\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");
try{
_28a.dialog.instance.hide();
}
catch(e){
}
},postSuccess:function(r,_2cb){
var _2cc=this,_2cd=_28a.dialog.instance,_2ce="",_2cf=Cfg.shareType,_2d0={tips_a:"\u5206\u4eab\u6210\u529f",tips_b:"",tips_c:"\u89c2\u770b\u66f4\u591a\u7cbe\u5f69\u5206\u4eab\uff0c<a target=\"_blank\" href=\"http://share."+XN.env.domain+"\">\u8bf7\u70b9\u51fb\u8fd9\u91cc\uff01</a>",tips_d:"\u5bf9\u65b9\u4f1a\u901a\u8fc7\u7ad9\u5185\u4fe1\u6536\u5230\u6b64\u5206\u4eab\u5185\u5bb9",tips_e:"\u6536\u85cf\u6210\u529f\uff01",tips_f:"\u6b64\u5185\u5bb9\u5df2\u6dfb\u52a0\u5230\u4f60\u7684\u6536\u85cf\u4e2d\uff0c\u5e76\u4e14\u4ec5\u4f60\u81ea\u5df1\u53ef\u89c1\u3002",tips_g:"\u5df2\u5206\u4eab\u5230\u6307\u5b9a\u7fa4\uff0c\u4ec5\u7fa4\u6210\u5458\u53ef\u89c1\u3002",tips_h:"\u4f60\u8fd8\u53ef\u4ee5<a href=\"javascript:void(0)\" class=\"share_new\" data-share=\"\">\u5206\u4eab\u7ed9\u597d\u53cb</a>\u3002"};
var _2d1=_2cb.adObjArry,_2d2={};
if(_2d1){
_2d2=_2d1[Math.floor(_2d1.length*Math.random())];
_2d2.adObjArry=true;
}else{
_2d2.adObjArry=false;
}
_2d2.action=Cfg.shareType;
_2cd.setBody(tpl.shareCallback($extend(_2d2,_2d0)));
if(_2cf=="add"){
$("share_success_link").setContent(tpl.shareLink({url:(_2cb.type==1?_27e.BLOG:_27e.SHARE)+"/share/"+_2cb.userid+"/"+_2cb.shareid}));
try{
XN.copyExtralLink.init("share_success_btn",$("share_success_val").value);
}
catch(ex2){
}
}
XN.app.share.fireEvent("postSuccessDialogPop",_2cd);
var _2d3=window.asyncHTMLManager?window.asyncHTMLManager.__timer.setTimeout:setTimeout;
gCloseShareSucTimer=_2d3(function(){
XN.dom.enable();
try{
_2cd.hide();
XN.copyExtralLink.clip&&XN.copyExtralLink.clip.hide();
}
catch(e){
XN.log(e);
}
},5000);
}};
_288={getVideoPostData:function(o){
var url=o.url;
new XN.net.xmlhttp({url:url,method:"GET",onSuccess:function(r){
var _2d7=r.responseText;
o.callback(eval("("+_2d7+")"));
}});
},getEdmPostData:function(o){
var url=_27e.EDM+"id="+o.id;
new XN.net.xmlhttp({url:url,method:"GET",onSuccess:function(r){
if(!XN.string.isJSON(r.responseText)){
XN.DO.showMessage("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef");
return;
}
try{
var json=XN.json.parse(r.responseText);
o.callback(json);
}
catch(e){
XN.log(e.description);
}
},onError:function(r){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u9519\u8bef!");
}});
},getFeedPostData:function(o){
var url=o.url;
if(/uume.com/i.test(url)){
var id=url.match(/uume.com\/share\/(\d+)\//i)[1],_2e0,_2e1,_2e2;
if(typeof window["uumeShareData_"+id]=="undefined"){
_2e0=document.createElement("script");
_2e0.src=url;
document.body.appendChild(_2e0);
}
_2e2=setInterval(function(){
_2e1=window["uumeShareData_"+id];
if(_2e1){
clearInterval(_2e2);
try{
if(_2e1.code!==0&&_2e1.msg){
try{
_28a.dialog.error(_2e1.msg);
}
catch(ex){
XN.DO.showMessage(_2e1.msg,"\u53cb\u60c5\u63d0\u793a");
}
return;
}
if(_2e1.isProtected){
try{
_28a.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
return;
}
if(_2e1.albumid){
_2e1.albumid=new Number(_2e1.albumid).toString();
}
window._share_type=Cfg.postParam.type;
$extend(Cfg.postParam,_2e1);
o.callback&&o.callback();
}
catch(e){
XN.log(e.description);
}
}
},100);
}else{
new XN.net.xmlhttp({url:url,method:"GET",onSuccess:function(r){
if(!XN.string.isJSON(r.responseText)){
if(r.responseText.indexOf("isProtected")!==-1){
try{
_28a.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
}
if(r.responseText.indexOf("error")!==-1){
try{
_28a.dialog.error("\u8be5\u5df2\u7ecf\u88ab\u5220\u9664 :(");
}
catch(ex){
XN.DO.showMessage(getName(type)+"\u5df2\u7ecf\u88ab\u5220\u9664 :(");
}
}
return;
}
try{
var json=XN.json.parse(r.responseText);
if(json.isProtected){
try{
_28a.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
return;
}
if(json.albumid){
json.albumid=new Number(json.albumid).toString();
}
window._share_type=Cfg.postParam.type;
$extend(Cfg.postParam,json);
o.callback&&o.callback();
}
catch(e){
XN.log(e.description);
}
},onError:function(r){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u9519\u8bef!");
}});
}
},doShare:function(_2e6){
if(!Cfg.tagObject[Cfg.shareType].vaild()){
return false;
}
_286.requestParam({},false);
Cfg.tagObject[Cfg.shareType].getPostData();
_286.requestParam(Cfg.requestParam);
if(_286.tags){
Cfg.requestParam.tags=_286.tags.toArray();
}
_28a.dialog.before();
XHR({url:(_27e.SHARE+CGI.SUBMIT),data:"post="+encodeURIComponent(XN.json.build(Cfg.requestParam)),waitTime:5000,onSuccess:function(r){
var data=Cfg.requestParam;
try{
var rs=XN.json.parse(r.responseText);
}
catch(e){
_287.error(r);
}
if(rs.status===0){
_287.postSuccess(rs.msg,rs,Cfg.requestParam);
XN.app.share.fireEvent("postSuccess",data,rs);
if(new RegExp("(page|org)."+XN.env.domain_reg+"(/\\d+)?/note").test((data.link||data.form.link))){
new XN.net.xmlhttp({url:"http://page."+XN.env.domain+"/note/addShareCount",method:"post",data:"id="+(data.noteId||data.form.noteId)+"&pid="+(data.fromno||data.form.formno)});
}
}else{
_287.error(rs.msg);
}
Cfg.postParam.type=window._share_type;
},onTimeout:function(){
_287.error();
},onError:function(){
_287.error();
}});
},getShareInterface:function(){
_28a.dialog.loading();
if(Cfg.shareType=="add"){
Cfg.postParam.popupCategory=0;
}else{
if(Cfg.shareType=="fav"){
Cfg.postParam.popupCategory=1;
}
}
var p=encodeURIComponent(XN.json.build(Cfg.postParam));
_286.beforePost(Cfg.postParam.stype,function(){
XHR({url:_286.postUrl(Cfg.postParam.stype).url,data:"post="+encodeURIComponent(XN.json.build(Cfg.postParam)),waitTime:10000,onSuccess:function(r){
var html=r.responseText;
if(XN.string.isBlank(html)){
_28a.dialog.error("\u8be5\u5206\u4eab\u4e0d\u5b58\u5728\u6216\u8005\u5df2\u88ab\u5220\u9664");
return false;
}else{
try{
var j=XN.json.parse(html);
if(j.code){
if(j.code==400){
_28a.dialog.instance.hide();
NetWorkConfirm(j.msg,"\u63d0\u793a",function(){
},"\u77e5\u9053\u4e86","");
}else{
_28a.dialog.error(j.msg);
}
}else{
if(!j.code&&j.redirect){
_28a.dialog.instance.hide();
XN.DO.confirm({message:"\u60a8\u8fd8\u6ca1\u6709\u7fa4\uff0c\u9700\u8981\u521b\u5efa\u7fa4\u5417\uff1f",callBack:function(r){
if(r){
location.href="http://qun.renren.com/?showcreate=true";
}
}});
}
}
return false;
}
catch(e){
XN.log(e);
}
}
_28a.dialog.complete({html:html});
var _2ef=$("sharer_popup_message");
object.use("xn.mention",function(_2f0,xn){
xn.mention.Mention.init([{obj:$("sharer_popup_message"),ugcId:"",ugcType:"share",ownerId:XN.user.id,whisper:false}]);
});
if($("tag-el")){
$("tag-el").show();
}
object.use("mvc/ui/tags, dom",function(tags,dom){
var _2f4={el:"#tag-el",add:"#tag-add",del:".tag-del",list:"#tag-list",input:"#tag-input",switcher:"#tag-switch",switchOne:".tag-record",errorBox:"#tag-error-box",items:JSON.parse(dom.getElement("#tag-el").getData("tags")).items};
_286.tags=new tags.Tags(_2f4);
});
Cfg.requestParam.sendcomment=false;
if(Sizzle("input[type=checkbox]",$("shareAjaxResult")).length>0){
Sizzle("input[type=checkbox]",$("shareAjaxResult"))[0].checked=true;
}
XN.app.share.fireEvent("getInterface",_286.postUrl(Cfg.postParam.stype));
},onTimeout:function(){
_287.showDialogMsg("\u83b7\u53d6\u5206\u4eab\u6570\u636e\u8d85\u65f6\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
},onError:function(){
_287.showDialogMsg("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
}});
});
}};
pageUtil={tips:{NoResult:"\u60a8\u672a\u7ba1\u7406\u4efb\u4f55\u516c\u5171\u4e3b\u9875",NoSelect:"\u60a8\u672a\u9009\u62e9\u4efb\u4f55\u516c\u5171\u4e3b\u9875"},wrap:null,list:null,get:function(){
if(Sizzle(".page-list-wrap",this.container).length==0){
var tpl="<div class=\"page-list-wrap\" style=\"display: none;\">                                    <div><input type=\"checkbox\" id=\"pageSelectAll\" class=\"page-select-all\" /> <label for=\"pageSelectAll\" style=\"display:inline;\">\u5168\u90e8</label></div>                                    <ul></ul>                                    <p class=\"page-list-tip\" style=\"display: none;\"></p>                                </div>",data,This=this;
new XN.net.xmlhttp({url:"http://share.renren.com/share/popup/pagelist?user="+XN.user.id+"&limit=20",method:"GET",onSuccess:function(d){
var json,data;
try{
json=XN.JSON.parse(d.responseText);
}
catch(e){
This.error("\u670d\u52a1\u5668\u8fd4\u56de\u6570\u636e\u683c\u5f0f\u9519\u8bef");
}
if(json.code!=0&&json.msg){
This.error(json.msg);
return false;
}
data=json.pages;
$("shareAjaxResult").parentNode.appendHTML(tpl);
This.wrap=Sizzle(".page-list-wrap")[0];
This.list=Sizzle("ul",This.wrap)[0];
XN.array.each(data,function(i,v){
$(This.list).appendHTML("<li><label><input type=\"checkbox\" name=\"page-item\" value=\""+v.pageId+"\" /> "+v.pageName+"</label></li>");
});
This.show();
},onError:function(){
This.error("\u670d\u52a1\u5668\u8bf7\u6c42\u5931\u8d25");
},onTimeout:function(){
This.error("\u670d\u52a1\u5668\u8bf7\u6c42\u8d85\u65f6");
}});
}else{
this.show();
}
},show:function(){
if(!!this.wrap){
$(this.wrap).show();
this.bindEvents();
if(XN.browser.IE&&Sizzle(".st-now").length>0){
setTimeout(function(){
Sizzle(".st-now")[0].style.zoom=1;
},0);
}
}
},hide:function(){
if(!!this.wrap){
$(this.wrap).hide();
}
if(Cfg.requestParam["pagelist"]){
delete Cfg.requestParam["pagelist"];
}
},bindEvents:function(){
var _2fc=Sizzle(".page-select-all",this.wrap),_2fd=Sizzle("input",this.list);
$(_2fc).addEvent("click",function(){
if(!!this.checked){
XN.array.each(_2fd,function(i,v){
v.checked=true;
});
}else{
XN.array.each(_2fd,function(i,v){
v.checked=false;
});
}
});
},getIds:function(){
if(!this.list){
return;
}
var ids=[],_303=Sizzle("input",this.list);
XN.array.each(_303,function(i,v){
if(!!v.checked){
ids.push(v.value);
}
});
if(ids.length==0){
this.error(this.tips.NoSelect);
return false;
}
return ids;
},error:function(msg){
if(!msg){
return;
}
XN.Do.alert({msg:msg,type:"error",autoHide:2});
if(msg!==this.tips.NoSelect){
this.hide();
_289.toggle(_289.selectCon2);
}
return false;
}};
_289={CONST:{TITLE_ADD:"\u53d1\u65b0\u9c9c\u4e8b",TITLE_FAV:"\u4ec5\u81ea\u5df1\u6536\u85cf",TITLE_PAGE:"\u516c\u5171\u4e3b\u9875\u53d1\u5e03"},container:null,eventSplitter:/^(\w+)\s*(.*)$/,elements:{".st-now":"nowCon",".st-select":"selectCon",".st-text":"textCon",".st-arrow":"arrowCon",".st-select2":"selectCon2"},events:{"click nowCon":"show","click selectCon":"select","click selectCon2":"select2"},init:function(_307){
if(this.has(_307)){
return;
}
this.createShareInterface(_307);
this.refreshElements();
if($("isPageShare")&&($("isPageShare").value=="true"||$("isPageShare").value==true)){
this.selectCon2.hide();
}
this.delegateEvents();
},eventsFuncBuilder:function(){
var self=this;
self.show=function(e){
var e=e||window.event;
self.selectCon.addClass("st-show");
self.selectCon2.addClass("st-show");
self.arrowCon.delClass("st-down");
self.arrowCon.addClass("st-up");
XN.event.stop(e);
};
self.hide=function(){
self.selectCon.delClass("st-show");
self.selectCon2.delClass("st-show");
self.arrowCon.addClass("st-down");
self.arrowCon.delClass("st-up");
};
self.select=function(e){
var e=e||window.event;
self.hide();
self.toggle(self.selectCon);
if(self.nowCon.hasClassName("page")){
pageUtil.get();
}else{
pageUtil.hide();
}
XN.event.stop(e);
};
self.select2=function(e){
var e=e||window.event;
self.hide();
self.toggle(self.selectCon2);
if(self.nowCon.hasClassName("page")){
pageUtil.get();
}else{
pageUtil.hide();
}
XN.event.stop(e);
};
},delegateEvents:function(){
this.eventsFuncBuilder();
for(var key in this.events){
var _30d=this.events[key],_30e=this[_30d],_30f=key.match(this.eventSplitter),o=this[_30f[2]],_311=_30f[1];
XN.event.addEvent(o,_311,_30e);
}
var self=this;
XN.event.addEvent(document,"click",function(){
self.hide();
});
},toggleClass:function(elm,_314,cls){
XN.Array.each(_314,function(i,v){
if(v==cls){
$(elm).addClass(v);
}else{
$(elm).delClass(v);
}
});
},toggle:function(elm){
var _319=["fav","add","page"];
if(elm.hasClassName("fav")){
this.toggleClass(this.nowCon,_319,"fav");
this.toggleClass(this.selectCon,_319,"add");
this.toggleClass(this.selectCon2,_319,"page");
this.textCon.innerHTML=this.CONST.TITLE_FAV;
this.selectCon.innerHTML=this.CONST.TITLE_ADD;
this.selectCon2.innerHTML=this.CONST.TITLE_PAGE;
_286.cmdType("fav");
if(Sizzle("input[type=checkbox]",$("shareAjaxResult")).length>0){
Sizzle("input[type=checkbox]",$("shareAjaxResult"))[0].checked=true;
}
}else{
if(elm.hasClassName("add")){
this.toggleClass(this.nowCon,_319,"add");
this.toggleClass(this.selectCon,_319,"fav");
this.toggleClass(this.selectCon2,_319,"page");
this.textCon.innerHTML=this.CONST.TITLE_ADD;
this.selectCon.innerHTML=this.CONST.TITLE_FAV;
this.selectCon2.innerHTML=this.CONST.TITLE_PAGE;
_286.cmdType("add");
if(Sizzle("input[type=checkbox]",$("shareAjaxResult")).length>0){
Sizzle("input[type=checkbox]",$("shareAjaxResult"))[0].checked=true;
}
}else{
if(elm.hasClassName("page")){
this.toggleClass(this.nowCon,_319,"page");
this.toggleClass(this.selectCon,_319,"fav");
this.toggleClass(this.selectCon2,_319,"add");
this.textCon.innerHTML=this.CONST.TITLE_PAGE;
this.selectCon.innerHTML=this.CONST.TITLE_FAV;
this.selectCon2.innerHTML=this.CONST.TITLE_ADD;
_286.cmdType("pageAdd");
if(Sizzle("input[type=checkbox]",$("shareAjaxResult")).length>0){
Sizzle("input[type=checkbox]",$("shareAjaxResult"))[0].checked=false;
}
}
}
}
},refreshElements:function(){
for(var key in this.elements){
this[this.elements[key]]=this.getEl(key);
}
},getEl:function(_31b){
return $(Sizzle(_31b,this.container)[0]);
},createShareInterface:function(_31c){
var p=document.createElement("div");
p.className="st-container";
p.innerHTML=tpl.shareTypeLayer();
this.container=p;
_31c.insertBefore(p,_31c.childNodes[0]);
},has:function(_31e){
var _31f=_31e.childNodes,len=_31f.length;
for(var i=0;i<len;i++){
if(_31f[i].hasClassName("st-container")){
return ture;
}
}
return false;
}};
_28a={dialog:{instance:"",error:function(msg){
return _287.showDialogMsg(msg);
},before:function(){
_28a.dialog.instance.setBody(tpl.beforePost);
_28a.dialog.instance.footer.hide();
},loading:function(){
var _323=XN.DO.confirm({message:tpl.loadingHTML(),callBack:function(r){
if(r){
this.preventHide();
_288.doShare(this);
}else{
XN.dom.enable();
this.remove();
}
},submit:Cfg.shareType=="fav"?"\u6536\u85cf":"\u786e\u5b9a",params:{showCloseButton:true},width:475,Y:XN.event.scrollTop()+100});
_28a.dialog.instance=_323;
_323.header.hide();
_323.footer.hide();
},complete:function(o,type){
var _327=_28a.dialog.instance;
html="<div style=\"display:none\" id=\"share_frame_out\">"+o.html+"</div>";
_327.setBody(html);
XN.loadFiles(["http://s.xnimg.cn/csspro/module/minieditor.css","http://s.xnimg.cn/jspro/xn.ui.emoticons.js"],function(){
setTimeout(function(){
new XN.ui.emoticons({input:$("sharer_popup_message"),button:$("emoBtn"),btnAlignType:"4-1",url:"http://status.renren.com/getubblist.do?type=2"});
},0);
});
_327.addEvent("hide",function(){
try{
var _328=$("sharer_popup_message").getAttribute("eicons_obj_id");
$(window.getEmoticonsInstance(_328).emotionsContainer).hide();
}
catch(e){
XN.log(e);
}
});
_327.setTitle(Cfg.tagObject[Cfg.shareType].dialogTitle);
_327.header.show();
_327.footer.show();
_286.defaultMsg();
function countLimit(){
var _329=$("sharer_popup_message").value.split("").length;
$("share_count").innerHTML=_329;
if(_329>500){
$("share_count").style.color="red";
}else{
$("share_count").style.color="";
}
}
setTimeout(function(){
if(!!$("share_count")){
var _32a=$("sharer_popup_message").value.split("").length;
$("share_count").innerHTML=_32a;
XN.event.addEvent("sharer_popup_message","keyup",function(){
countLimit();
});
XN.event.addEvent("sharer_popup_message","focus",function(){
countLimit();
});
}
var _32b=$("share_frame_out"),_32c=$("sharer_popup_message");
_32b.setStyle("display:block");
if(_32c.setSelectionRange){
_32c.focus();
_32c.setSelectionRange(0,0);
}else{
if(_32c.createTextRange){
var _32d=_32c.createTextRange();
_32d.moveStart("character",0);
_32d.moveEnd("character",0);
_32d.collapse(true);
_32d.select();
_32c.focus();
}else{
_32c.focus();
}
}
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","560","share.all.complate",1000);
}
catch(ex){
}
});
},0);
setTimeout(function(){
_289.init(_327.footer);
},0);
}}};
_28b={done:function(){
var d={s:".share_new",e:"click",cb:function(e,d){
_286.postParam(d.data,true);
_286.cmdType("add");
_288.getShareInterface();
XN.loadFiles([UGC_PING],function(){
try{
UGC.Network.ping.clickStream("400","561","share.add.fromclick",1000);
}
catch(ex){
}
});
}};
XNShareObject._commonRegister({selector:d.s,event:d.e,callback:d.cb});
}};
XNShareObject.forceShowFloat=function(el){
};
_28b.done();
},_commonRegister:function(o){
XNShareObject._base.liveRegister.call(this,o.selector,o.event,function(e,d){
o.callback(e,d);
},o.args);
},_innerClosure:function(o){
XNShareObject._commonRegister.call(this,{selector:(o.selector?o.selector:".share_pop"),event:(o.event?o.event:"click"),callback:o.cb,args:o.args});
},interfaceOld:{createShareDiv:function(o){
var _cb=function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:{id:d.id,owner:d.owner,host:d.host},actionParams:{reqeustURI:d.ref?("http://share."+XN.env.domain+"/share/submit.do?ref="+d.ref):""}});
};
XNShareObject._innerClosure({selector:".share_div",cb:_cb,args:arguments});
},createShareZhan:function(){
var _cb=function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/popup/zhan",data:{id:d.id,owner:d.owner,type:140},actionParams:{reqeustURI:"http://share."+XN.env.domain+"/share/postshare"}});
};
XNShareObject._innerClosure({selector:".share_zhan",cb:_cb,args:arguments});
},createShareFriendDiv:function(){
XNShareObject._innerClosure({selector:".share_friend_div",cb:function(o,d){
XN.APP.share.onlyShowSendContent=true;
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:{id:d.id,owner:d.owner,host:d.host}});
},args:arguments});
},createShareDivSend:function(){
XNShareObject._innerClosure({selector:".share_friend_div",cb:function(o,d){
XN.APP.share.onlyShowSendContent=true;
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:{id:d.id,owner:d.owner,host:d.host,tabDefault:"send",sysn:true}});
},args:arguments});
},createShareNosysnSend:function(){
XNShareObject._innerClosure({selector:".share_nosysn_send",cb:function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:{id:d.id,owner:d.owner,host:d.host,tabDefault:"send",sysn:false}});
},args:arguments});
},createShareNosysn:function(){
XNShareObject._innerClosure({selector:".share_nosysn",cb:function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:{id:d.id,owner:d.owner,host:d.host,sysn:false}});
},args:arguments});
},createShareSysn:function(){
XNShareObject._innerClosure({selector:".share_sysn",cb:function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:{id:d.id,owner:d.owner,host:d.host,sysn:true}});
},args:arguments});
},createShareJebe:function(){
XNShareObject._innerClosure({selector:".share_jebe",cb:function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/ajax.do",data:d,actionParams:{reqeustURI:d.saveAction}});
},args:arguments});
},createThreadShareDiv:function(){
XNShareObject._innerClosure({selector:".share_thread_div",cb:function(o,d){
XN.app.share.pop({url:"http://share."+XN.env.domain+"/getshare.do",data:{tid:d.tid,tribeId:d.tribeId}});
},args:arguments});
},createShareEdm:function(){
XNShareObject._innerClosure({selector:".share_edm",cb:function(o,d){
var id=d.id,_34e=d.owner,type=d.type;
new XN.net.xmlhttp({url:"http://edm."+XN.env.domain+"/feedshare.do?id="+id,method:"GET",onSuccess:function(r){
if(!XN.string.isJSON(r.responseText)){
XN.DO.showMessage("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef");
return;
}
try{
XN.app.share.pop({url:"http://share."+XN.env.domain+"/share/popup.do",data:XN.json.parse(r.responseText)});
}
catch(e){
XN.log(e.description);
}
},onError:function(r){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u9519\u8bef!");
}});
},args:arguments});
},createShareFeed:function(){
var _cb=function(o,d){
var _355,data,id=d.id,type=d.type,_359=d.owner;
if(type=="pageThread"||type=="pageBlog"||type=="pageAlbum"){
if(!(XN.user&&!XN.string.isBlank(XN.user.id))){
XN.DO.showError("\u8bf7\u5148\u767b\u5f55\uff01");
return;
}
}
_355=function(type){
switch(type){
case "blog":
return "http://blog."+XN.env.domain+"/blog/"+_359+"/"+id+"/homeShare";
case "album":
return "http://photo."+XN.env.domain+"/photo/"+_359+"/album-"+id+"/share";
case "photo":
return "http://photo."+XN.env.domain+"/photo/"+_359+"/photo-"+id+"/share";
case "forum":
return "http://xiaozu."+XN.env.domain+"/xiaozu/"+id+"/js";
case "thread":
return "http://xiaozu."+XN.env.domain+"/xiaozu/"+id+"/thread/"+_359+"/share";
case "clike":
return "http://app."+XN.env.domain+"/like/likeInfo?feed_id="+id;
case "pageThread":
return "http://page."+XN.env.domain+"/"+id+"/group/"+_359+"/getShareData";
case "pageBlog":
return "http://page."+XN.env.domain+"/"+_359+"/note/"+id+"/share";
case "pageAlbum":
return "http://page."+XN.env.domain+"/"+_359+"/album/"+id+"/share";
case "video":
return "http://video."+XN.env.domain+"/ajax/getVideoInfo?ownerId="+_359+"&videoId="+id;
case "chewen_news":
return "";
break;
}
};
var _35b=function(type){
switch(type){
case "blog":
return "\u65e5\u5fd7";
case "album":
return "\u76f8\u518c";
case "photo":
return "\u7167\u7247";
case "forum":
return "\u5c0f\u7ec4";
case "thread":
return "\u5e16\u5b50";
case "pageThread":
return "\u8bdd\u9898";
case "pageBlog":
return "\u65e5\u5fd7";
case "pageAlbum":
return "\u76f8\u518c";
case "video":
return "\u89c6\u9891";
}
};
var _35d=function(p,s){
new XN.net.xmlhttp({url:"http://blog."+XN.env.domain+"/share/incShareCount.do",data:"link="+encodeURIComponent((p.link||p.form.link))});
};
if(type=="blog"&&!XN.app.share.hasBlogListener){
XN.app.share.hasBlogListener=true;
XN.app.share.addEvent("postSuccess",_35d);
}
new XN.net.xmlhttp({url:_355(type),method:"GET",onSuccess:function(r){
if(!XN.string.isJSON(r.responseText)){
if(r.responseText.indexOf("isProtected")!==-1){
try{
sharePopUp.dialog.error("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)");
}
catch(ex){
XN.DO.showMessage("\u53ea\u6709\u6240\u6709\u4eba\u53ef\u89c1\u624d\u80fd\u88ab\u5206\u4eab :)","\u53cb\u60c5\u63d0\u793a");
}
}
if(r.responseText.indexOf("error")!==-1){
try{
sharePopUp.dialog.error("\u5df2\u7ecf\u88ab\u5220\u9664 :(");
}
catch(ex){
XN.DO.showMessage("\u5df2\u7ecf\u88ab\u5220\u9664:(","\u53cb\u60c5\u63d0\u793a");
}
}
return;
}
try{
var json=XN.json.parse(r.responseText);
if(json.isProtected){
window.__shareProtect.t2();
return;
}
if(json.albumid){
json.albumid=new Number(json.albumid).toString();
}
var url="http://share."+XN.env.domain+"/share/popup.do";
pop_share_new(url,json);
}
catch(e){
XN.log(e.description);
}
},onError:function(r){
XN.DO.showError("\u83b7\u53d6\u5206\u4eab\u9519\u8bef!");
}});
};
XNShareObject._innerClosure({selector:".share_feed",cb:_cb,args:arguments});
}}};
XN.dom.ready(function(){
XNShareObject._register({autoRegister:false,floatMode:true});
});
function school_bbs_share(qId,_365){
new XN.net.xmlhttp({url:"http://school.renren.com/qa/question/share/share?questionId="+qId+"&questionUserId="+_365,method:"get",onSuccess:function(r){
create_share_popup(XN.json.parse(r.responseText));
},onError:function(){
XN.DO.showError("");
}});
}
(function(){
var _367="";
var tmpl="<div style=\"width:450px;height:30px;\" id=\"y_tip_frame\">\t\t\t<div class=\"tip-box\">\t\t\t\t<span class=\"tip-arrow\"></span>\t\t\t\t<a href=\"#\" onclick=\"return false;\" class=\"tip-close\" id=\"y_tip_close\">\u5173\u95ed</a>\t\t\t\t<span>\u5df2\u8bb8\u53ef\u8bc4\u8bba\u540c\u6b65\u5230\u8be5\u89c6\u9891\u6765\u6e90\u7f51\u7ad9\uff01\uff08\u56de\u590d\u597d\u53cb\u7684\u8bc4\u8bba\u9664\u5916\u54e6\uff09\u70b9\u51fb\u53ef\u53d6\u6d88\u8bb8\u53ef</span>\t\t\t</div>\t\t</div>";
function createYellowTips(o){
var _36a=document.createElement("div");
_36a.innerHTML=tmpl;
_36a.style.cssText="position:absolute;top:"+o.top+"px;left:"+o.left+"px";
document.getElementsByTagName("body")[0].appendChild(_36a);
setTimeout(function(){
XN.event.addEvent($("y_tip_close"),"click",function(){
$("y_tip_frame").style.display="none";
var _36b="http://www.connect.renren.com/sync/comment/notifyForComment";
new XN.net.xmlhttp({url:_36b,method:"post",data:"url="+_367,onSuccess:function(r){
}});
return false;
});
},0);
}
function showEnable(){
var el=$("intercommunicate");
el.setAttribute("status","enable");
el.setAttribute("title","\u5df2\u8bb8\u53ef\u8bc4\u8bba\u540c\u6b65\u5230\u8be5\u89c6\u9891\u6765\u6e90\u7f51\u7ad9\uff01\uff08\u56de\u590d\u597d\u53cb\u7684\u8bc4\u8bba\u9664\u5916\u54e6\uff09\u70b9\u51fb\u53d6\u6d88\u8bb8\u53ef\u3002");
el.src="http://a.xnimg.cn/imgpro/share/icon-plht-on.png";
XN.DO.alert({message:"\u5df2\u8bb8\u53ef\u8bc4\u8bba\u540c\u6b65\u5230\u8be5\u89c6\u9891\u6765\u6e90\u7f51\u7ad9\uff01\uff08\u56de\u590d\u597d\u53cb\u7684\u8bc4\u8bba\u9664\u5916\u54e6\uff09\u70b9\u51fb\u53d6\u6d88\u8bb8\u53ef\u3002",modal:true,autoHide:3});
}
function showDisable(){
var el=$("intercommunicate");
el.setAttribute("status","disable");
el.setAttribute("title","\u8ba9\u66f4\u591a\u7684\u4eba\u770b\u5230\u4f60\u7684\u7cbe\u5f69\u8bc4\u8bba\u5427\uff0c\u70b9\u4eae\u540e\u5373\u53ef\u5c06\u8bc4\u8bba\u540c\u6b65\u5230\u8be5\u89c6\u9891\u6765\u6e90\u7f51\u7ad9\uff01");
el.src="http://a.xnimg.cn/imgpro/share/icon-plht-off.png";
XN.DO.alert({message:"\u5df2\u53d6\u6d88\u8bb8\u53ef\u8bc4\u8bba\u540c\u6b65\uff01\u70b9\u51fb\u56fe\u6807\u53ef\u518d\u6b21\u8bbe\u5b9a\u3002",modal:true,autoHide:3});
}
function disableIC(){
new XN.net.xmlhttp({url:"http://www.connect.renren.com/sync/comment/unauthorize",method:"post",data:"url="+_367,onSuccess:function(r){
var r=XN.json.parse(r.responseText);
if(r[0].op){
showDisable();
}
},onError:function(r){
var r=r.responseText;
XN.DO.showError("\u63a5\u53e3\u5c0f\u95ee\u9898\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u6216\u7a0d\u540e\u91cd\u8bd5");
}});
}
function enableIC(){
new XN.net.xmlhttp({url:"http://www.connect.renren.com/sync/comment/authorize",method:"post",data:"url="+_367,onSuccess:function(r){
var r=XN.json.parse(r.responseText);
if(r[0].op){
showEnable();
}
},onError:function(r){
var r=r.responseText;
XN.DO.showError("\u63a5\u53e3\u5c0f\u95ee\u9898\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u6216\u7a0d\u540e\u91cd\u8bd5");
}});
}
XN.dom.ready(function(){
if($("intercommunicate")){
var el=$("intercommunicate");
setTimeout(function(){
if(showInterflowCommentPrompt){
createYellowTips({left:el.realLeft()-45,top:el.realTop()+22});
}
},3000);
_367=XN.app.share.shareVideoUrl;
XN.event.addEvent("intercommunicate","click",function(e){
var el=XN.event.element(e),_376=el.getAttribute("status");
if(_376=="enable"){
disableIC();
}else{
if(_376=="disable"){
enableIC();
}
}
});
}
});
})();
function share_show_more_comments(_377,_378){
var url="http://share."+XN.env.domain+"/share/getmorecomment.do";
var _37a=function(){
var _37b=$("commContainer_"+_377).getElementsByTagName("dd")[0];
return _37b.id.match(/\d+/)[0];
};
var _37c=function(_37d,_37e){
var dl=$element("dl");
dl.className="replies";
var tstr="",tObj;
var _382=parseInt(XN.cookie.get("id"),10);
var _383=false;
if($("isAdmin")){
$("isAdmin").value=="true"?true:false;
}
for(var i=0;_37d[i];i++){
tObj=_37d[i];
var _385=tObj.keepUse?" lively-user":"",_386=tObj.keepUse?"\u8fde\u7eed\u767b\u5f557\u5929, \u5373\u53ef\u83b7\u5f97\u6a59\u540d\u7279\u6743":tObj.name,_387="",_388="http://admin.renren.com/admin/newuserreport.do?type=30&owner="+_378+"&contentId="+tObj.id+"&userId="+tObj.author+"&origURL="+encodeURIComponent(document.location.href),_389=tObj.isVip,_38a=tObj.vipIconUrl,_38b="01",_38c="01",_38d;
if(tObj.vocal_url&&tObj.vocal_length){
var reg=/^回复.+[:：](?!\/)/,_38f=reg.test(tObj.body)?tObj.body.match(reg)[0]:"";
_38d=_38f+"<a class=\"vocal-player vocal-player-tiny\"                 data-vocal=\"{'url': '"+tObj.vocal_url+"', 'time': "+tObj.vocal_length+",'ownerId':"+tObj.replyerId+",'voiceId':"+tObj.commentId+", 'sourceOwner':"+_378+", 'sourceId':"+_37e+", 'ugcType':9}\" href=\"javascript:;\">                    <span class=\"btn\"></span>                    <span class=\"time\"><span class=\"num\">"+tObj.vocal_length+"</span>\u79d2</span>                </a>";
}else{
_38d=tObj.body;
}
if(!tObj.showDelete){
_387="<span class=\"float-right\"><a target=\"_blank\" href=\""+_388+"\" class=\"reply-report\" style=\"display: none;\">\u4e3e\u62a5</a></span>";
}
tstr+="<dd id=\"comment_"+tObj.id+"\">"+_387+"     <a class=\"avatar\" namecard=\""+tObj.author+"\" title=\""+tObj.name+"\" href=\"http://www."+XN.env.domain+"/profile.do?id="+tObj.author+"\">"+"            <img height=\"50\" width=\"50\" src=\""+tObj.headUrl+"\" alt=\""+tObj.name+"\" class=\"avatar\"/>"+"     </a>"+"     <div class=\"info\">";
if(tObj.showDelete){
tstr+="            <span class=\"float-right\">"+"                 <a class=\"x-to-hide\" onclick=\"share_delete_comment(this,"+_37e+","+_378+","+tObj.id+");\" href=\"javascript:void(0)\"></a>"+"            </span>";
}
tstr+="<a title=\""+_386+"\" href=\"http://www."+XN.env.domain+"/profile.do?id="+tObj.author+"\" class=\""+_385+"\" namecard=\""+tObj.author+"\">"+tObj.name+"</a> ";
if(_38a){
tstr+="<a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\""+tObj.vipIconUrl+"\"></a>";
}
tstr+="</div>"+"      <div class=\"reply\">"+"            <p class=\"content\"  style=\"display: block\">"+_38d+"            </p>";
tstr+="<div class=\"control-box clearfix\">";
tstr+="<span class=\"time\"> "+tObj.time+" </span>";
tstr+="<div class=\"btn-box\">";
if(!tObj.vocal_url&&XN.user&&XN.user.id&&(tObj.liked!==undefined)&&(tObj.likeCount!==undefined)){
var _390="<a style=\"margin-left: 10px;\" class=\"ilike_comment\" comment-data=\"{'stype':'share','cid':'{{commentId}}', 'rid':'{{resourceId}}', 'uid':'{{userId}}', 'oid':'{{ownerId}}', 'roid':'{{resourceUserId}}', 'name':'{{userName}}', 'url':'{{url}}', 'liked':{{islike}} }\" href=\"javascript:void(0)\">{{comment}}</a>",_391={commentId:tObj.id,ownerId:tObj.author,resourceId:_37e,resourceUserId:_378,userId:XN.user.id,userName:XN.user.name,url:"http://blog.renren.com/blog/"+this.ownerId+"/"+this.blogId,islike:tObj.liked,comment:tObj.liked?((tObj.likeCount===0)?"\u53d6\u6d88":tObj.likeCount+" \u53d6\u6d88"):((tObj.likeCount===0)?"\u559c\u6b22":tObj.likeCount+" \u559c\u6b22")},_392=Mustache.to_html(_390,_391);
tstr+=_392;
}
if(_382!==tObj.author){
tstr+="&nbsp; <a onclick=\"share_reply_comment("+_37e+","+tObj.author+",'"+tObj.name+"',"+tObj.id+");return false\" href=\"#nogo\">\u56de\u590d</a>";
}
tstr+="</div>";
tstr+="</div>";
tstr+="      </div>"+"</dd>";
}
dl.innerHTML=tstr;
return dl;
};
var _393={shareId:_377,owner:_378,commentId:_37a()};
$("tempLoading_"+_377).style.visibility="visible";
var xhr=new XN.net.xmlhttp({url:url,data:XN.array.toQueryString(_393),onSuccess:function(r){
$("tempLoading_"+_377).style.visibility="hidden";
var j=XN.json.parse(r.responseText);
if(j.code!==0){
XN.DO.alert(j.msg);
return;
}
if(j.code==0){
if(!j.hasMore){
$("showMore_"+_377).hide();
}
var _397=$("commContainer_"+_377);
_397.insertBefore(_37c(j.comments,_377),_397.findFirstClass("replies"));
}
},onError:function(r){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
}});
}
object.define("mvc/ui/tags","object/mvc, dom, events",function(_399,_39a){
var mvc=_399("object/mvc"),dom=_399("dom"),_39d=_399("events");
_39a.Tags=new Class(function(){
Class.mixin(this,_39d.Events);
this.option=property(function(self){
return self.__option;
},function(self,_3a0){
self.__option=_3a0;
});
this.defaultOption=property(function(){
return {maxCount:20,maxSelectedCount:5,maxShowCount:10,swtichText:["\u5c55\u5f00>>","<<\u6536\u8d77"],errors:{type:"\u4e0d\u80fd\u8f93\u5165\u7279\u6b8a\u7b26\u53f7",maxLength:"\u8d85\u8fc710\u4e2a\u5b57\u7b26\u5566",empty:"\u8bf7\u5148\u8f93\u5165\u5185\u5bb9",repeat:"\u4e0d\u80fd\u6dfb\u52a0\u91cd\u590d\u5143\u7d20",overrange:"\u603b\u5171\u4e0d\u80fd\u6dfb\u52a0\u8d85\u8fc75\u4e2a\u9009\u4e2d\u6807\u7b7e\uff0c\u6bcf\u4e2a\u6807\u7b7e\u7528\u7a7a\u683c\u5206\u5f00",overrange2:"\u6807\u7b7e\u603b\u6570\u4e0d\u80fd\u8d85\u8fc720\u4e2a\uff0c\u6bcf\u4e2a\u6807\u7b7e\u7528\u7a7a\u683c\u5206\u5f00"},tpl:"<ul class=\"ui-tags\">                        {{#items}}                            {{^checked}}                                <li data-tag=\"{{tagData}}\" model-id=\"{{_id}}\">                                    <a class=\"tag-record\" href=\"javascript:\">{{tagName}}</a>                                    <a style=\"display: none;\" class=\"tag-server-remove\" data-tag='{\"tag\": \"{{tagName}}\"}' href=\"javascript:\"></a>                                </li>                            {{/checked}}                            {{#checked}}                                <li class=\"checked\" data-tag=\"{{tagData}}\" model-id=\"{{_id}}\">                                    <a class=\"tag-record\" href=\"javascript:\">{{tagName}}</a>                                    <a style=\"display: none;\" class=\"tag-server-remove\" data-tag='{\"tag\": \"{{tagName}}\"}' href=\"javascript:\"></a>                                </li>                            {{/checked}}                        {{/items}}                    </ul>"};
});
this.recordsLoaded=function(self,e){
var _3a3=e.records,_3a4=self.get("option").maxShowCount;
if(_3a3.length<=_3a4&&self.switchEl){
self.switchEl.hide();
}
if(_3a4&&_3a4>0&&self.switchEl){
_3a3=e.records.slice(0,_3a4);
}
self.renderTags(_3a3);
if(self.inputEl){
self.inputEl.hasTags=e.records;
self.inputEl.selectedTags=self.selectedTags;
}
};
this.renderTags=function(self,_3a6){
var _3a7=self.get("option"),html,li;
html=Mustache.to_html(_3a7.tpl,{"items":_3a6});
self.listEl.setHTML(html);
if(self.switchEl){
self.switchEl.setHTML(self.extended?_3a7.swtichText[1]:_3a7.swtichText[0]);
self.listEl.getElement("ul").grab(self.switchEl,"bottom");
}
};
this.switchTags=function(self){
var _3ab=self.get("option"),_3ac;
if(_3ab.maxShowCount&&_3ab.maxShowCount>0){
_3ac=self.extended?self.model.records.slice(0,_3ab.maxShowCount):self.model.records;
self.extended=!self.extended;
self.switchEl.setHTML(self.extended?_3ab.swtichText[1]:_3ab.swtichText[0]);
}else{
_3ac=self.model.records;
}
self.renderTags(_3ac);
};
this.switchTag=function(self,e){
var el=e.srcElement||e.target,_3b0=dom.wrap(el).getParent("li"),id,_3b2;
id=parseInt(_3b0.getAttribute("model-id"));
_3b2=self.model.propSelector("_id",id)[0];
if(_3b2.checked){
_3b0.removeClass("checked");
_3b2.checked=false;
self.fireEvent("tag unselected",{element:_3b0,data:_3b2});
self.handleSelectedTag(_3b0,false);
}else{
if(self.handleSelectedTag(_3b0,true)){
_3b0.addClass("checked");
_3b2.checked=true;
self.fireEvent("tag selected",{element:_3b0,data:_3b2});
}
}
};
this.handleSelectedTag=function(self,tag,_3b5){
var _3b6=self.selectedTags,_3b7=self.get("option"),_3b8=0;
var _3b9=tag.getElement(".tag-record")||tag.getElement(".text");
tag.tagValue=_3b9.innerHTML;
if(_3b5){
if(_3b6.length+1>_3b7.maxSelectedCount){
self.fireEvent("show error",{error:_3b7.errors.overrange});
return false;
}
if(_3b6.indexOf(tag)==-1){
_3b6.push(tag);
}
}else{
if(tag.nodeName.toLowerCase()=="li"){
for(_3b8=0;_3b8<_3b6.length;_3b8++){
if(tag.getAttribute("model-id")==_3b6[_3b8].getAttribute("model-id")){
_3b6.splice(_3b8,1);
break;
}
}
}else{
if(_3b6.indexOf(tag)!=-1){
_3b6.splice(_3b6.indexOf(tag),1);
}
}
}
return true;
};
this.addTags=function(self,e){
var str=self.inputEl.value,_3bd=self.get("option"),tags;
if(_3bd.valid(str)){
tags=str.split(" ");
tags.forEach(function(tag){
var _3c0=self.model.propSelector("tagName",tag);
if(_3c0.length>0){
_3c0.forEach(function(_3c1){
_3c1.checked=true;
});
}else{
self.model.createRecord({tagName:tag,checked:true});
}
});
self.renderTags(self.model.records);
if(!self.extended){
self.switchTags();
}
}else{
self.fireEvent("valid error",{"error":_3bd.errorMsg});
self.inputError();
}
};
this.delTag=function(self,e){
var el=e.srcElement||e.target,_3c5=dom.wrap(el).getParent("li"),id,_3c7;
id=parseInt(_3c5.getAttribute("model-id"));
if(_3c7=self.model.removeRecord(id)){
_3c5.dispose();
self.fireEvent("tag removed",{element:_3c5,data:_3c7});
self.handleSelectedTag(_3c5,false);
}
};
this.showErrorBox=function(self,_3c9){
self.errorBox.setHTML(_3c9);
if(!self.timer){
self.timer=setTimeout(function(){
self.timer=null;
},2000);
}
};
this.toArray=function(self){
var _3cb=self.selectedTags,arr=[];
_3cb.forEach(function(tag){
arr.push(tag.tagValue);
});
return arr;
};
this.initialize=function(self,_3cf){
var _3d0={};
object.extend(_3d0,self.get("defaultOption"));
self.set("option",object.extend(_3d0,_3cf));
self.model=new mvc.Model({items:_3cf.items});
self.extended=false;
self.selectedTags=[];
self.el=dom.getElement(_3cf.el);
if(!self.el){
return false;
}
self.el.addClass("share-tags");
_3cf=self.get("option");
if(_3cf.selectedCount){
_3cf.maxSelectedCount-=_3cf.selectedCount;
_3cf.maxCount-=_3cf.selectedCount;
}
self.controller=new mvc.Controller({init:function(){
self.listEl=dom.getElement(_3cf.list);
if(_3cf.input){
self.inputEl=new _39a.MultiInput({el:_3cf.input,maxCount:_3cf.maxCount,maxSelectedCount:_3cf.maxSelectedCount,errors:_3cf.errors});
self.inputEl.addEvent("label removed",function(e){
self.handleSelectedTag(e.label,false);
});
self.inputEl.addEvent("label created",function(e){
self.handleSelectedTag(e.label,true);
});
self.inputEl.addEvent("show error",function(e){
self.showErrorBox(e.error);
});
}
if(_3cf.switcher){
self.switchEl=dom.getElement(_3cf.switcher);
}
if(_3cf.add){
self.addEl=dom.getElement(_3cf.add);
self.addEl.hide();
}
if(_3cf.errorBox){
self.errorBox=dom.getElement(_3cf.errorBox);
}
},el:_3cf.el,events:[[_3cf.switcher,"click",self.switchTags.bind(self)],[_3cf.switchOne,"click",self.switchTag.bind(self)],[_3cf.add,"click",self.addTags.bind(self)],[_3cf.del,"click",self.delTag.bind(self)]],models:[[self.model,"loaded records",self.recordsLoaded.bind(self)]]});
self.model.load();
self.addEvent("show error",function(e){
self.showErrorBox(e.error);
});
};
});
_39a.MultiInput=new Class(function(){
Class.mixin(this,_39d.Events);
this.option=property(function(self){
return self.__option;
},function(self,_3d7){
self.__option=_3d7;
});
this.defaultOption=property(function(){
return {labelInputTpl:"<input></input>",labelTpl:"<a class=\"label\" href=\"javascript:\"><span class=\"text\">{{labelText}}</span><span class=\"close\"></span></a>",maxLength:10,maxCount:20,maxSelectedCount:5,errors:{type:"\u8bf7\u4e0d\u8981\u8f93\u5165\u7279\u6b8a\u7b26\u53f7",maxLength:"\u8d85\u8fc710\u4e2a\u5b57\u7b26\u5566",empty:"\u8bf7\u8f93\u5165\u6807\u7b7e\u540d",repeat:"\u8bf7\u52ff\u6dfb\u52a0\u91cd\u590d\u6807\u7b7e",overrange:"\u603b\u5171\u4e0d\u80fd\u6dfb\u52a0\u8d85\u8fc75\u4e2a\u9009\u4e2d\u6807\u7b7e\uff0c\u6bcf\u4e2a\u6807\u7b7e\u7528\u7a7a\u683c\u5206\u5f00",overrange2:"\u6807\u7b7e\u603b\u6570\u4e0d\u80fd\u8d85\u8fc720\u4e2a\uff0c\u6bcf\u4e2a\u6807\u7b7e\u7528\u7a7a\u683c\u5206\u5f00"}};
});
this.initialize=function(self,_3d9){
var _3da={};
object.extend(_3da,self.get("defaultOption"));
self.set("option",object.extend(_3da,_3d9));
self.addEvent("label created",self.updateInput.bind(self));
self.addEvent("label removed",self.updateInput.bind(self));
self.labels=[];
self._initEl();
};
this.updateInput=function(self){
var _3dc=self.get("option"),_3dd=self.labels,_3de=[];
_3dd.forEach(function(_3df){
var text=_3df.getElement(".text").innerHTML;
_3de.push(text);
});
self.el.value=_3de.join(" ");
};
this._initEl=function(self){
var _3e2=self.get("option");
self.el=dom.getElement(_3e2.el);
self.elAttributes={};
self.elAttributes.placeholder=self.el.getAttribute("placeholder");
self.wrap=dom.wrap(document.createElement("div"));
self.wrap.style.width=self.el.style.width;
self.wrap.addClass("multiBox");
self.wrap.addEvent("click",function(){
self.currentLabel.getElement("input").focus();
});
self.addLabelBox();
self.addErrorLabel();
self.el.hide();
self.el.grab(self.wrap,"after");
};
this.addErrorLabel=function(self){
var _3e4=dom.wrap(document.createElement("span"));
_3e4.addClass("error");
_3e4.hide();
self.currentLabel.grab(_3e4,"after");
self.errLabel=_3e4;
};
this.addLabelBox=function(self){
var _3e6=self.get("option"),_3e7=dom.wrap(document.createElement("span")),_3e8=Mustache.to_html(_3e6.labelInputTpl),_3e9;
_3e7.setHTML(_3e8);
_3e7.addClass("labelBox");
_3e9=_3e7.getElement("input");
if(self.elAttributes.placeholder&&self.elAttributes.placeholder!=""){
if(!XN.browser.IE){
_3e9.setAttribute("placeholder",self.elAttributes.placeholder);
}
dom.wrap(_3e9);
}
self.currentLabel=_3e7;
self.wrap.grab(self.currentLabel,"bottom");
self.currentLabel.delegate("input","keydown",self.inputChange.bind(self));
self.currentLabel.delegate("input","keyup",self.inputChangeUp.bind(self));
self.currentLabel.getElement("input").addEvent("blur",self.inputBlur.bind(self));
};
this.inputBlur=function(self,e){
var _3ec=self.get("option"),el=e.srcElement||e.target,_3ee=dom.wrap(el).value,_3ef;
if(_3ee!=""){
self._valid(_3ee,true,function(err){
if(err){
self.errLabel.setHTML(err);
self.errLabel.show();
}else{
self.errLabel.hide();
_3ef=self.createLabel({labelText:_3ee});
if(_3ef){
self.currentLabel.grab(_3ef,"before");
self.labels.push(_3ef);
self.currentLabel.getElement("input").value="";
self.fireEvent("label created",{label:_3ef});
}
}
});
}
};
this.inputChange=function(self,e){
var _3f3=self.get("option"),el=e.srcElement||e.target,_3f5=dom.wrap(el).value,_3f6;
if(e.keyCode==32&&_3f5!=""){
XN.event.stop(e);
self._valid(_3f5,true,function(err){
if(err){
self.errLabel.setHTML(err);
self.errLabel.show();
}else{
self.errLabel.hide();
_3f6=self.createLabel({labelText:_3f5});
if(_3f6){
self.currentLabel.grab(_3f6,"before");
self.labels.push(_3f6);
self.currentLabel.getElement("input").value="";
self.fireEvent("label created",{label:_3f6});
}
}
});
}
};
this.inputChangeUp=function(self,e){
var _3fa=self.get("option"),el=e.srcElement||e.target,_3fc=dom.wrap(el).value;
if(_3fc!=""){
self._valid(_3fc,false,function(err){
if(err){
self.errLabel.setHTML(err);
self.errLabel.show();
}else{
self.errLabel.hide();
}
});
}else{
self.errLabel.hide();
}
};
this._valid=function(self,_3ff,_400,cb){
var reg=/^(\w|[\u4E00-\u9FA5]|-|_)*$/,_403=self.labels,_404=self.get("option"),_405=0,_406=self.hasTags,_407=0;
if(_400){
_403.forEach(function(_408){
if(self.selectedTags.indexOf(_408)!=-1){
_407++;
}
});
if(self.selectedTags.length+_403.length-_407+1>_404.maxSelectedCount){
self.fireEvent("show error",{error:_404.errors.overrange});
return;
}
}
if(_400){
if(self.hasTags.length+_403.length+1>_404.maxCount){
self.fireEvent("show error",{error:_404.errors.overrange2});
return;
}
}
for(var i=0,len=_403.length;i<len;i++){
if(_403[i].getElement(".text").innerHTML==_3ff){
cb(_404.errors.repeat);
return;
}
}
for(var i=0,len=_406.length;i<len;i++){
if(_406[i].tagName==_3ff){
cb(_404.errors.repeat);
return;
}
}
if(_3ff==""){
cb(_404.errors.empty);
return;
}
if(!reg.test(_3ff)){
cb(_404.errors.type);
return;
}
for(var i=0;i<_3ff.length;i++){
if(_3ff.charCodeAt(i)>10000){
_405+=2;
}else{
_405+=1;
}
}
if(_405>_404.maxLength){
cb(_404.errors.maxLength);
return;
}
cb();
};
this.createLabel=function(self,data){
var _40d=self.get("option"),_40e;
_40e=Mustache.to_html(_40d.labelTpl,data);
_40e=dom.wrap(dom.getDom(_40e).firstChild);
_40e.delegate(".close","click",function(e){
if(self.labels.indexOf(_40e)!=-1){
self.labels.splice(self.labels.indexOf(_40e),1);
_40e.dispose();
self.fireEvent("label removed",{label:_40e});
}
});
return _40e;
};
});
});
object.define("tags/edit","dom, events, mvc/ui/tags",function(_410,_411){
var dom=_410("dom"),_413=_410("events"),_414=_410("mvc/ui/tags");
this.TagsEdit=new Class(function(){
Class.mixin(this,_413.Events);
this.option=property(function(self){
return self.__option;
},function(self,_417){
self.__option=_417;
});
this.defaultOption=property(function(){
return {tpl:"<ul>                        {{#items}}                            {{#all}}                                {{#current}}                                    <li class=\"checked\">                                        {{#untag}}                                            <a class=\"tag-record\" ui-async=\"async\" href=\"{{baseUrl}}&type={{type}}&tag={{tagNameUrl}}&untag={{untag}}\">{{tagName}}</a>                                        {{/untag}}                                        {{^untag}}                                            <a class=\"tag-record\" ui-async=\"async\" href=\"{{baseUrl}}&type={{type}}\">{{tagName}}</a>                                        {{/untag}}                                    </li>                                {{/current}}                                {{^current}}                                    <li>                                        {{#untag}}                                            <a class=\"tag-record\" ui-async=\"async\" href=\"{{baseUrl}}&type={{type}}&tag={{tagNameUrl}}&untag={{untag}}\">{{tagName}}</a>                                        {{/untag}}                                        {{^untag}}                                            <a class=\"tag-record\" ui-async=\"async\" href=\"{{baseUrl}}&type={{type}}\">{{tagName}}</a>                                        {{/untag}}                                    </li>                                {{/current}}                            {{/all}}                            {{^all}}                                {{#current}}                                    <li class=\"checked\">                                        <a class=\"tag-record\" ui-async=\"async\" href=\"{{baseUrl}}&type={{type}}&tag={{tagNameUrl}}\">{{tagName}}</a><a class=\"tag-server-remove tag-record\" href=\"javascript:\" tagName=\"{{tagName}}\" style=\"display:none\" data-tag='{\"tag\": \"{{tagName}}\"}'></a>                                    </li>                                {{/current}}                                {{^current}}                                    <li>                                        <a class=\"tag-record\" ui-async=\"async\" href=\"{{baseUrl}}&type={{type}}&tag={{tagNameUrl}}\">{{tagName}}</a><a class=\"tag-server-remove tag-record\" href=\"javascript:\" tagName=\"{{tagName}}\" style=\"display:none\" data-tag='{\"tag\": \"{{tagName}}\"}'></a>                                    </li>                                {{/current}}                            {{/all}}                        {{/items}}                    </ul>",tagTpl:"<a href=\"{{baseUrl}}&tag={{tagNameUrl}}\" class=\"tag-record\">{{tagName}}</a>                    <a style=\"display: none;\" class=\"tag-server-remove hover-show\" href=\"javascript:\" data-tag='{\"tag\": \"{{tagName}}\", \"shareId\": {{shareId}}, \"isCollection\": {{isCollection}} }' tagname=\"{{tagName}}\" ></a>",btn:"#tags-edit",DEL_TAG_ALL:"http://share.renren.com/share/tag/deleteUserShareTag",DEL_TAG_ONE:"http://share.renren.com/share/tag/deleteShareTag",DEL_COLLECTION:"http://share.renren.com/share/tag/deleteCollectionTag",GET_TAG:"http://share.renren.com/share/tag/userTags",ADD_TAGS:"http://share.renren.com/share/tag/addShareTag",ADD_COLLECTION_TAGS:"http://share.renren.com/share/tag/addCollectionTag",maxSelectedCount:5};
});
this.initialize=function(self,_419){
var _41a={};
object.extend(_41a,self.get("defaultOption"));
self.set("option",object.extend(_41a,_419));
_419=self.get("option");
self.el=dom.getElement(_419.el);
self.listEl=dom.getElement(_419.list);
self.btn=dom.getElement(_419.btn);
if(self.el&&self.listEl){
self.initPlane();
}
self.initDelegates();
};
this.initPlane=function(self){
var _41c=self.get("option"),data=self.el.getData("tags"),tpl=_41c.tpl,html;
data=JSON.parse(data);
self.listData=self.handleData(data);
self.renderPlane();
};
this.renderPlane=function(self){
var _421=self.get("option"),html;
html=Mustache.to_html(_421.tpl,self.listData);
self.listEl.setHTML(html);
};
this.handleData=function(self,data){
var type=data.type,_426=XN.user.id,_427=data.currentTag,_428=false;
data.items.unshift({tagName:"\u672a\u5206\u7c7b",type:type,untag:1,all:true});
data.items.unshift({tagName:"\u5168\u90e8",type:type,all:true});
data.items.forEach(function(item){
item.type=type;
item.userId=_426;
item.baseUrl=data.baseUrl;
item.tagNameUrl=encodeURIComponent(item.tagName);
if(item.tagName==_427){
item.current=true;
_428=true;
}
});
if(!_428){
data.items[0].current=true;
}
return data;
};
this.ismouseleave=function(self,_42b,_42c){
var p=_42b.relatedTarget;
while(p&&p!=_42c){
try{
p=p.parentNode;
}
catch(error){
p=_42c;
}
}
return p!==_42c;
};
this.initDelegates=function(self){
var body;
if(self.el&&self.listEl){
self.el.delegate(".tags-edit","click",function(e){
self.switchEditBtn(self.btn);
});
}
body=dom.getElement("body");
body.delegate(".tag-server-remove","click",function(e){
var btn=e.srcElement||e.target;
self.removeTag(dom.wrap(btn));
XN.event.stop(e);
});
body.delegate(".share-tags li","mouseover",function(e){
var _434;
_434=dom.wrap(this).getElement(".tag-server-remove");
if(_434&&_434.hasClass("hover-show")){
_434.show();
}
});
body.delegate(".share-tags li","mouseout",function(e){
var _436,_437;
_436=dom.wrap(this).getElement(".tag-server-remove");
if(_436&&_436.hasClass("hover-show")&&!Sizzle.contains(this,e.relatedTarget||e.toElement)){
_436.hide();
}
});
body.delegate(".tag-server-add","click",function(e){
var _439=self.get("option"),el=e.srcElement||e.target,data=JSON.parse(dom.wrap(el).getData("tag")),_43c=el.getParent("li"),_43d,_43e,_43f;
data.userId=XN.user.id;
_43f=data.baseUrl;
_43d=_43c.getParent("ul").getElements("li").length-2;
if(_43d>=_439.maxSelectedCount){
_43e=_43c.getParent("ul").getElement(".tag-error-box");
_43e.show();
setTimeout(function(){
_43e.hide();
},3000);
return null;
}
new XN.net.xmlhttp({url:_439.GET_TAG,data:XN.array.toQueryString(data),onSuccess:function(e){
var json=JSON.parse(e.responseText),_442;
if(json.items.length==0){
XN.Do.showError("\u5df2\u7ecf\u6ca1\u6709\u6807\u7b7e\u4e86");
return;
}
XN.Do.confirm({title:"\u9009\u62e9\u6807\u7b7e",msg:" <div class=\"share-tags clearfix\" id=\"share-tags-add\">                                    <div class=\"share-list\" id=\"share-tags-add-list\"></div>                                    <input style=\"width: 300px;\" id=\"tag-input\" placeholder=\"\u81ea\u5b9a\u4e49\u6807\u7b7e\">                                    <span id=\"tag-error-box\">\u603b\u5171\u4e0d\u80fd\u6dfb\u52a0\u8d85\u8fc75\u4e2a\u9009\u4e2d\u6807\u7b7e\uff0c\u6bcf\u4e2a\u6807\u7b7e\u7528\u7a7a\u683c\u5206\u5f00</span>                                </div>",callBack:function(r){
if(r){
var _444=_442.toArray(),post={};
if(_444.length>0){
post.shareId=data.shareId;
post.userId=data.userId;
post.tags=_444;
}else{
return null;
}
new XN.net.xmlhttp({url:data.isCollection?_439.ADD_COLLECTION_TAGS:_439.ADD_TAGS,data:XN.array.toQueryString({post:JSON.stringify(post)}),onSuccess:function(e){
var json=JSON.parse(e.responseText),_448=XN.json.parse(self.el.getData("tags")),_449=false,li,html,obj;
if(json.code===0){
_444.forEach(function(item){
_449=false;
obj={};
obj.shareId=data.shareId;
obj.isCollection=data.isCollection||0;
obj.tagName=item;
obj.tagNameUrl=encodeURIComponent(item);
obj.baseUrl=_43f;
li=dom.wrap(document.createElement("li"));
li.setHTML(Mustache.to_html(_439.tagTpl,obj));
_43c.grab(li,"before");
_448.items.forEach(function(_44e){
if(!_449){
if(_44e.tagName==obj.tagName){
_449=true;
}
}
});
if(!_449){
_448.items.push({"tagName":obj.tagName});
}
});
self.el.setAttribute("data-tags",JSON.stringify(_448));
self.initPlane();
}else{
XN.Do.showError(json.msg);
}
},method:"post"});
}
}});
_442=new _414.Tags({el:"#share-tags-add",list:"#share-tags-add-list",switchOne:".tag-record",errorBox:"#tag-error-box",input:"#tag-input",selectedCount:_43d,maxShowCount:20,items:json.items});
},method:"get"});
});
};
this.removeTag=function(self,btn){
var _451=self.get("option"),data=JSON.parse(btn.getData("tag")),url;
data.userId=XN.user.id;
if(data.isCollection){
url=_451.DEL_COLLECTION;
}else{
url=data.shareId?_451.DEL_TAG_ONE:_451.DEL_TAG_ALL;
}
XN.Do.confirm({title:"\u5220\u9664\u6807\u7b7e",message:"\u786e\u5b9a\u5220\u9664"+data.tag+"\u6807\u7b7e\u5417\uff1f",callback:function(r){
if(r){
new XN.net.xmlhttp({url:url,data:XN.array.toQueryString({post:JSON.stringify(data)}),onSuccess:function(e){
var json=JSON.parse(e.responseText);
if(json.code===0){
if(!data.shareId){
self.removeTagAll(data.tag);
}else{
btn.getParent("li").dispose();
}
}else{
XN.Do.showError(json.msg);
}
},method:"post"});
}
}});
};
this.removeTagAll=function(self,_458){
var tags=dom.getElements("[tagName="+_458+"]");
tags.forEach(function(tag){
tag.getParent("li").dispose();
});
};
this.switchEditBtn=function(self,btn){
if(btn.getAttribute("opened")==="true"){
self.listEl.getElements(".tag-record").forEach(function(_45d){
if(_45d.hasClass("tag-server-remove")){
_45d.hide();
}else{
_45d.setAttribute("ui-async","async");
_45d.href=_45d.getAttribute("link-data");
}
});
btn.setAttribute("opened","false");
btn.setHTML("<span class=\"icon-edit\"></span>\u7ba1\u7406\u6807\u7b7e");
}else{
self.listEl.getElements(".tag-record").forEach(function(_45e){
if(_45e.hasClass("tag-server-remove")){
_45e.show();
}else{
_45e.removeAttribute("ui-async");
_45e.setAttribute("link-data",_45e.href);
_45e.href="javascript:;";
}
});
btn.setHTML("<span class=\"icon-edit\"></span>\u9000\u51fa\u7ba1\u7406");
btn.setAttribute("opened","true");
}
};
});
});
object.use("tags/edit",function(te){
XN.dom.ready(function(){
new te.TagsEdit({el:"#share-tags-show",list:"#share-tags-list"});
});
});
(function(){
if(!!XN.app.share.shareGetInterfaced){
return;
}
XN.app.share.shareGetInterfaced=true;
var _460="",_461="",_462=null,_463=false;
XN.app.share.addEvent("getInterface",function(o){
if(!o||!o.url||!o.url.indexOf("popup.do")===-1){
return;
}
_460=document.getElementsByName("srccmturl")[0];
_461=document.getElementsByName("srccmtdata")[0];
_462=$("comment_on_firstshare");
if(!_460||!_461||!_462){
return;
}
_460=_460.value;
_461=_461.value;
_462.checked=_463=true;
$(_462).addEvent("click",function(){
_463=this.checked;
});
});
XN.app.share.addEvent("postSuccess",function(d){
if(!d||!d.body||!_463){
return;
}
new XN.net.xmlhttp({url:_460,data:_461+d.body});
});
})();

