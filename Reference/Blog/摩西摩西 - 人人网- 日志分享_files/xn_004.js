(function(){
function Cache(){
this._cache={};
}
Cache.prototype={add:function(_1,_2){
this._cache[_1]=_2;
},del:function(_3){
delete this._cache[_3];
return null;
},get:function(_4){
return this._cache[_4];
}};
var _5=function(_6){
var _7=Object.prototype.toString.call(_6).replace(/\[object ([^\]]*)\]/,"$1").toLowerCase();
if(_7.indexOf("html")!=-1){
_7="element";
}
return _7;
};
function UIClassFactory(_8){
var _9=function(_a){
if(!(this instanceof arguments.callee)){
return new arguments.callee(_a);
}
this.config={};
$extend(this.config,_8);
this.ID=XN.util.createObjID();
$extend(this.config,_a);
return this.init();
};
$extend(_9.prototype,{name:"",init:function(){
},getConfig:function(_b){
return this.config[_b];
},setConfig:function(_c,_d){
this.config[_c]=_d;
return this;
},getId:function(_e){
return this.name+"_"+this.ID+"_"+_e;
},getEl:function(_f){
return $(this.getId(_f));
}});
return _9;
}
function XHR(obj){
var _11=false,_12=$extend({},obj),_13=null,_14;
if(obj.waitTime&&obj.onTimeout){
_11=true;
_12.onSuccess=function(r){
window.clearTimeout(_14);
obj.onSuccess(r);
};
_12.onError=function(r){
window.clearTimeout(_14);
obj.onError(r);
};
_14=setTimeout(function(){
obj.onTimeout.call(_13);
try{
_13.abort();
}
catch(e){
XN.log(e);
}
},obj.waitTime);
}
_13=new XN.net.xmlhttp(_12);
return _13;
}
var _17=new Cache();
var _18=new Cache();
XN.ui.emotions=UIClassFactory({url:"http://status."+XN.env.domain+"/getubblist.do?type=1&t="+Math.random(),container:"",isShowVipEmos:false,emoKind:{"0":{name:"\u9ed8\u8ba4\u8868\u60c5",forvip:0,active:1},"1":{name:"\u963f\u72f8",forvip:1},"2":{name:"\u56e7\u56e7\u718a",forvip:1}},onParseEmo:function(emo,evt){
XN.log(emo);
}});
$extend(XN.ui.emotions.prototype,{name:"emotions",emoList:[],init:function(){
if(this.getConfig("container").getAttribute("emo_obj_id")){
return _18.get(this.getConfig("container").getAttribute("emo_obj_id"));
}
this.getEmotions();
return this;
},getEmotions:function(){
var _1b=this,url=this.getConfig("url"),_1d=function(){
XN.DO.showError("\u83b7\u53d6\u8868\u60c5\u5217\u8868\u5931\u8d25\uff0c\u8bf7\u7a0d\u5019\u91cd\u8bd5");
};
if(_17.get(url)&&_17.get(url).ubbList&&_17.get(url).ubbList.length>0){
_1b.buildPanelHtml();
return false;
}
new XHR({url:url,method:"GET",onSuccess:function(r){
window.setTimeout(function(){
_17.add(url,r.responseText);
_1b.buildPanelHtml();
},0);
},onError:_1d,waitTime:5000,onTimeout:_1d});
},formatData:function(_1f){
var d=$extend({},this.getConfig("emoKind")),_21;
for(var key in d){
d[key].data=[];
}
for(var i=0,len=_1f.length;i<len;i++){
_21=_1f[i];
d[_21.kind].data.push(_21);
}
for(var key in d){
if(!d[key].data.length){
delete d[key];
}
}
return d;
},getSingleEmoHtml:function(_25,_26){
var _27=(XN.browser.IE6?" onmouseover=\"this.style.borderColor='#808080'\" onmouseout=\"this.style.borderColor='#B8D4E8'\"":""),tpl="<li title={{alt}} {{_ie6patch}}><img emosrc=\"http://a.xnimg.cn{{src}}\" alt=\"{{alt}}\" emotion=\"{{ubb}}\" preview=\"{{preview}}\" forvip=\"{{forvip}}\" /></li>";
_25["preview"]=_25.size==2?1:0;
_25["forvip"]=_26.forvip?1:0;
_25["_ie6patch"]=XN.browser.IE6?_27:"";
for(var key in _25){
tpl=tpl.replace(new RegExp("{{"+key+"}}","g"),_25[key]);
}
return tpl;
},buildPanelHtml:function(){
var _2a=XN.json.parse(_17.get(this.getConfig("url")));
if(_2a.emoKind){
this.emoKind=_2a.emoKind;
}
this.emoList=this.formatData(_2a.ubbList);
this.config["isShowVipEmos"]=_2a.canParseVipEmos;
var emo=this.emoList,_2c=0,_2d=this,_2e=[],_2f=this.getConfig("emoKind"),_30=[],_31=[];
var i=0,d=null;
for(var _34 in emo){
d=emo[_34];
_30.push("<ul class=\"emo-list\" style=\"display:"+(d.active?"block":"none")+"\" id=\""+this.getId("emoList"+_34)+"\">");
i=0;
while(d.data[i]){
_30.push(this.getSingleEmoHtml(d.data[i],d));
i++;
}
_30.push("</ul>");
_31.push("<li id=\""+this.getId("emoTab"+_34)+"\"><a href=\"javascript:;\" onfocus=\"this.blur()\"> "+d.name+" </a></li>");
}
var _35=["<div class=\"m-editor-emo-holder\" id=\""+this.getId("emoHolder")+"\" style=\"padding:1px\">","<div class=\"emo-header\" id=\""+this.getId("emoTabHolder")+"\" style=\"display:none\">","<ul class=\"emo-tab\" id=\""+this.getId("emoTab")+"\">",_31.join(""),"</ul>","<div class=\"emo-tab-switch\" id=\""+this.getId("emoTabSwitch")+"\" style=\"display:none\">","<a href=\"javascript:;\" title=\"\u524d\u4e00\u7ec4\u8868\u60c5\" class=\"left\" id=\""+this.getId("movLeft")+"\" ><span ></span></a>","<a href=\"javascript:;\" title=\"\u540e\u4e00\u7ec4\u8868\u60c5\" class=\"right\" id=\""+this.getId("movRight")+"\" ><span ></span></a>","</div>","</div>","<div class=\"emo-holder\" id=\""+this.getId("emoList")+"\">",_30.join(""),"</div>","<div class=\"notVip-tip clearfix\" id=\""+this.getId("notVipTip")+"\" style=\"display:none;\">","<div class=\"emotion-icon\">","   <img src=\"http://xnimg.cn/imgpro/icons/grade/cjbq.png\"  />","\t<p>\u8d85\u7ea7\u8868\u60c5</p>","</div>","<p>\u5bf9\u4e0d\u8d77\uff0c\u8be5\u529f\u80fd\u9700\u8981<span class=\"red\">\u7b49\u7ea79\u7ea7\u4ee5\u4e0a</span>\u6216\u8005<span class=\"red\">\u5f00\u901aVIP</span>\u624d\u53ef\u4ee5\u4f7f\u7528\u3002</p>","\t<p class=\"btn\">","\t<a href=\"http://i.renren.com/pay/pre?wc=370000\" class=\"join-vip\" target=\"_blank\"></a>","\t<a href=\"http://sc.renren.com/scores/myscore\" class=\"lookup-class\" target=\"_blank\"></a>\u6216","</p>","</div>","</div>"].join("");
this.getConfig("container").setContent(_35);
this.cacheEls();
this.showFirstGroupEmos();
setTimeout(function(){
_2d.renderTabs();
_2d.fireEvent("renderEmotions");
},0);
},renderTabs:function(){
var _36=0,tv=this.tabView=new XN.ui.tabView({activeClass:"current"}),_38="",_39=this;
for(var _3a in this.emoList){
tv.addTab({label:_39.getId("emoTab"+_3a),active:_39.emoList[_3a].active,onActive:(function(i){
return function(){
var _ct=tv.getCurrentTab().label.id||tv.getCurrentTab().label,_3d=$(_39.getId("emoList"+i));
_3d.show();
if(!_39.emoList.imgRended){
_3d.innerHTML=_3d.innerHTML.replace(/emosrc/g,"src");
_39.emoList[i].imgRended=true;
}
$(_ct.replace("emoTab","emoList")).hide();
if(_39._previewHolder){
_39._previewHolder.hide();
}
_39.hideNotVip();
_39.fireEvent("tabSwitch",$(_39.getId("emoTab"+i)),$(_39.getId("emoList"+i)));
};
})(_3a),onClick:(function(i){
return function(){
_39.fireEvent("tabClick",$(_39.getId("emoTab"+i)),$(_39.getId("emoList"+i)));
};
})(_3a)});
_36++;
}
this.uiEmoTabHolder[_36>1?"show":"hide"]();
if(_36>0){
this.initTabSwitcher();
}
},initTabSwitcher:function(){
var _3f=false,_40=this;
this.emoHolderInitX=this.getEl("emoTabHolder").realLeft();
this.emoHolderWidth=this.getEl("emoTabHolder").offsetWidth;
this.emoHolderMaxX=this.emoHolderInitX+this.emoHolderWidth;
for(var _41 in this.emoList){
if(!_3f){
_3f=(this.getEl("emoTab"+_41).realLeft()+this.getEl("emoTab"+_41).offsetWidth)>this.emoHolderMaxX?true:false;
}
}
if(!_3f){
return false;
}
this.getEl("emoTabSwitch").show();
this.tabArray=[];
this.curTab=0;
for(var _41 in _40.emoList){
this.tabArray.push(_41);
}
XN.event.addEvent(_40.getEl("movLeft"),"click",function(){
_40.curTab=(--_40.curTab<=0?0:_40.curTab);
_40.moveTab(_40.tabArray[_40.curTab],_40.curTab,_40.tabArray);
});
XN.event.addEvent(_40.getEl("movRight"),"click",function(){
_40.curTab=(++_40.curTab==_40.tabArray.length?_40.tabArray.length-1:_40.curTab);
_40.moveTab(_40.tabArray[_40.curTab],_40.curTab,_40.tabArray);
});
},moveTab:function(_42,_43,_44){
var x=this.getEl("emoTab"+_42).realLeft(),w=this.getEl("emoTab"+_42).offsetWidth,_47=0;
if(_43>0){
$(this.getEl("movLeft").getElementsByTagName("span")[0]).style.borderRightColor="#B8D4E8";
}
if(_43==0){
$(this.getEl("movLeft").getElementsByTagName("span")[0]).style.borderRightColor="#CCC";
}
if(_43==_44.length-1){
$(this.getEl("movRight").getElementsByTagName("span")[0]).style.borderLeftColor="#CCC";
}
if(_43<_44.length-1){
$(this.getEl("movRight").getElementsByTagName("span")[0]).style.borderLeftColor="#B8D4E8";
}
_47=this.emoHolderInitX-x;
this.uiEmoTab.style.left=(parseInt(XN.element.getStyle(this.uiEmoTab,"left"))+_47)+"px";
},initEvent:function(){
var _48=this;
XN.event.addEvent(this.uiEmoHolder,"click",function(e){
var evt=e||window.event;
_48.parseEmotion(evt);
!evt.cancelBubbled?evt.stopPropagation():evt.cancelBubbled=true;
});
XN.event.addEvent(this.uiEmoHolder,"mouseover",function(e){
XN.event.stop(e||window.event);
_48.previewEmotion(e);
});
XN.event.addEvent(this.uiEmoHolder,"mouseout",function(e){
_48.hidePreviewEmotion(e);
});
},parseEmotion:function(e){
var img=XN.event.element(e),_4f=this,_50=img.tagName.toLowerCase();
this.fireEvent("emoConClick");
if(!(/li|img/).test(_50)){
return false;
}
if(_50=="li"){
img=img.getElementsByTagName("img")[0];
}
if(!img){
return false;
}
var _51=parseInt(img.getAttribute("forvip")),ubb=img.getAttribute("emotion"),_53=this.getConfig("isShowVipEmos");
if(_51&&!_53){
_4f.showNotVip(e);
}else{
_4f.getConfig("onParseEmo").call(_4f,{imgsrc:img.src,ubb:ubb,forvip:_51},e);
}
},hide:function(){
this.uiEmoHolder.hide();
if(this._previewHolder){
this._previewHolder.hide();
}
},cacheEls:function(){
this.uiEmoList=this.getEl("emoList");
this.uiEmoHolder=this.getEl("emoHolder");
this.uiEmoTabHolder=this.getEl("emoTabHolder");
this.uiEmoTab=this.getEl("emoTab");
this.uiNotVipTip=this.getEl("notVipTip");
},showFirstGroupEmos:function(){
var _54=this,el;
for(var _56 in this.emoList){
if(this.emoList[_56].active){
el=$(_54.getId("emoList"+_56));
el.innerHTML=el.innerHTML.replace(/emosrc/g,"src");
}
}
this.uiEmoHolder.show();
this.initEvent();
return true;
},hideEmotion:function(){
if(this._previewHolder){
this._previewHolder.hide();
}
if(this._emoHolder){
this._emoHolder.hide();
}
},showNotVip:function(e){
XN.event.stop(e||window.event);
this.uiEmoList.hide();
this.uiNotVipTip.show();
if(this._previewHolder){
this._previewHolder.hide();
}
this.fireEvent("showNotVip");
},hideNotVip:function(e){
this.uiNotVipTip.hide();
this.uiEmoList.show();
},previewEmotion:function(e){
var img=XN.event.element(e),_5b=this,_5c=img.tagName.toLowerCase();
if(_5c=="li"){
img=img.getElementsByTagName("img")[0];
}
if(_5c!="li"&&_5c!="img"){
if(this._previewHolder){
this._previewHolder.hide();
}
return false;
}
if(!img){
return false;
}
var _5d=parseInt(img.getAttribute("preview"));
if(_5d){
var _5e=this.config.container;
if(!XN.element.hasClassName(_5e.parentNode,"emo-attach")){
if(this._previewHolderAttach){
this._previewHolderAttach.style.display="none";
}
if(!this._previewHolder){
var fix=this._previewHolder=new XN.ui.fixPositionElement({alignWith:this.uiEmoList,tagName:"div",alignType:"2-2",offsetX:(XN.browser.IE6?-1:(XN.browser.IE?1:0)),offsetY:(XN.browser.IE?1:0)});
fix.container.setStyle("background:#fff;padding:1px;width:50px;height:50px;border:1px solid #B8D4E8;");
fix.container.className="meditor-emo-preview";
fix.container.id=this.getId("mEditorPreviewHolder");
fix.setContent("<img id=\""+this.getId("previewIMG")+"\" class=\"m-editor-preview-img\" src=\""+img.src+"\" />");
XN.event.addEvent(this.getEl("mEditorPreviewHolder"),"mouseover",function(){
var _60=fix.alignType=="1-1"?"2-2":"1-1";
if(XN.browser.IE6){
var _61=fix.alignType=="1-1"?-1:1;
fix.setOffsetX(_61);
}
fix.setAlignType(_60);
});
}
this.getEl("previewIMG").src=img.src;
this._previewHolder.show();
}else{
if(this._previewHolder){
this._previewHolder.hide();
}
if(!this._previewHolderAttach){
var fix=this._previewHolderAttach=document.createElement("div");
fix.style.cssText="background:#fff;padding:1px;width:50px;height:50px;border:1px solid #B8D4E8;position:absolute;top:35px;";
fix.className="meditor-emo-preview";
fix.id=this.getId("mEditorPreviewHolder_attach");
fix.innerHTML="<img id=\""+this.getId("previewIMG_attach")+"\" class=\"m-editor-preview-img\" src=\""+img.src+"\" />";
_5e.style.position="relative";
_5e.appendChild(fix);
fix.style.right="2px";
fix.style.left="auto";
XN.event.addEvent(this.getEl("mEditorPreviewHolder_attach"),"mouseover",function(){
if(fix.style.left=="auto"){
fix.style.right="auto";
fix.style.left="2px";
}else{
if(fix.style.right=="auto"){
fix.style.right="2px";
fix.style.left="auto";
}
}
});
}
this.getEl("previewIMG_attach").src=img.src;
this._previewHolderAttach.style.display="block";
}
}
},hidePreviewEmotion:function(e){
el=XN.event.element(e);
var _63=this.config.container.parentNode,_64=XN.element.hasClassName(_63,"emo-attach");
if(el.tagName.toLowerCase()=="ul"&&this._previewHolder&&!_64){
this._previewHolder.hide();
}
if(el.tagName.toLowerCase()=="ul"&&this._previewHolderAttach&&_64){
this._previewHolderAttach.style.display="none";
}
}});
XN.event.enableCustomEvent(XN.ui.emotions.prototype);
XN.ui.quickSwfupload=UIClassFactory({uploadUrl:"http://upload."+XN.env.domain+"/uploadservice.fcgi?pagetype=gossipAddPhoto&societyguester="+XN.cookie.get("societyguester")+"&hostid="+XN.cookie.get("id")+"&t="+XN.cookie.get("t"),swfPath:"http://s.xnimg.cn/jspro/swfupload.v2.2.0.1/swfupload.swf",replaceElId:null,onUploadSuccess:function(obj){
XN.log(obj);
},onUploadProgress:function(_66,_67,_68){
XN.log(_66,_67,_68);
},buttonTxt:null,buttonWidth:null,buttonHeight:null,buttonStyle:".text {text-align:left;color:#005EAC;font-family:tahoma,simsun;font-size:12px;font-family:Tahoma,Verdana,simsun,sans-serif;}"});
$extend(XN.ui.quickSwfupload.prototype,{name:"miniUpload",init:function(){
if(!$(this.getConfig("replaceElId"))){
XN.log("\u5fc5\u987b\u4f20\u5165\u4e00\u4e2a\u88abflash\u66ff\u6362\u7684\u5143\u7d20");
return false;
}
if(!window.SWFUpload){
XN.log("\u4f9d\u8d56\u7684swfupload.js\u6ca1\u6709\u5f15\u5165");
return false;
}
if(!this.getConfig("buttonTxt")){
this.config["buttonTxt"]=$(this.getConfig("replaceElId")).innerHTML;
}
if(!this.getConfig("buttonWidth")){
this.config["buttonWidth"]=$(this.getConfig("replaceElId")).offsetWidth;
}
if(!this.getConfig("buttonHeight")){
this.config["buttonHeight"]=$(this.getConfig("replaceElId")).offsetHeight;
}
this.renderUI();
return this;
},renderUI:function(){
var _69=this;
this.uploader=new SWFUpload({upload_url:_69.getConfig("uploadUrl"),flash_url:_69.getConfig("swfPath"),file_size_limit:"10 MB",file_types:"*.jpg;*.jpeg;*.png;*.bmp;*.gif",file_types_description:"All Image Files",file_upload_limit:60,file_queue_limit:0,debug:false,button_placeholder_id:_69.getConfig("replaceElId"),button_cursor:SWFUpload.CURSOR.HAND,button_width:_69.getConfig("buttonWidth"),button_height:_69.getConfig("buttonHeight"),button_image_url:"http://a.xnimg.cn/a.gif",button_text:_69.getConfig("buttonTxt"),button_text_style:_69.getConfig("buttonStyle"),button_text_top_padding:2,button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,button_cursor:SWFUpload.CURSOR.HAND,button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,file_queued_handler:function(){
this.startUpload();
},upload_error_handler:function(_6a,_6b,_6c){
XN.DO.showError(_6c+""+_6b+""+_6a);
},upload_progress_handler:function(_6d,_6e,_6f){
_69.getConfig("onUploadProgress").call(_69,_6d,_6e,_6f);
},upload_success_handler:function(_70,r){
var _72=XN.json.parse(r);
$extend(_72,{file:_70});
_69.getConfig("onUploadSuccess").call(_69,_72);
}});
}});
var _73=new Cache();
getEmoticonsInstance=function(_74){
return _73.get(_74);
};
XN.ui.emoticons=UIClassFactory({input:null,button:null,atButton:null,isShowVipEmos:false,showAddPhoto:false,keepShow:true,hideEmoBtn:false,emoBtnDes:"\u8868\u60c5",emoPopDelay:0,emoPopFixed:false,btnAlignWith:null,btnAlignType:"3-2",btnOffsetX:0,btnOffsetY:-1,onShowEmoPop:XN.func.empty,onEmoTabSwitch:XN.func.empty,onEmoTabClick:XN.func.empty,onEmoConClick:XN.func.empty,onEmoNotVip:XN.func.empty});
$extend(XN.ui.emoticons.prototype,{name:"miniEditor",pos:{},init:function(){
if(!$(this.getConfig("input"))){
XN.log("\u5fc5\u987b\u4f20\u5165\u8981\u8d4b\u503c\u7684input");
return false;
}
if(this.getConfig("input").getAttribute("eicons_obj_id")){
return _73.get(this.getConfig("input").getAttribute("eicons_obj_id"));
}
this.setConfig("emoTrigger",[]);
this.input=$(this.getConfig("input"));
this.initEvent();
this.initEmotions();
if(this.getConfig("showAddPhoto")){
this.initQuickSwfupload();
}
if(this.getConfig("atBtn")){
this.initMentionBtn();
}
this.input.setAttribute("eicons_obj_id",this.ID);
_73.add(this.ID,this);
return this;
},initEvent:function(){
var el=this.input;
var fun=this.getInputPos.bind(this);
XN.event.addEvent(el,"keyup",fun);
if(!XN.browser.WebKit){
XN.event.addEvent(el,"focus",fun);
}else{
XN.event.addEvent(el,"blur",fun);
}
XN.event.addEvent(el,"mouseup",fun);
XN.dom.ready(fun);
},initEmotions:function(){
var _77=this;
this.emotionsContainer=new XN.ui.fixPositionElement({alignWith:_77.getConfig("btnAlignWith")||_77.input,tagName:"div",alignType:_77.getConfig("btnAlignType"),offsetX:_77.getConfig("btnOffsetX"),offsetY:_77.getConfig("btnOffsetY")});
this.emotionsContainer.frame.style.width="338px";
this.emotionsContainer.container.addClass("m-editor");
this.emotionsContainer.hide();
if(this.getConfig("emoPopFixed")){
this.emotionsContainer.frame.style.position="fixed";
}
setTimeout(function(){
_77.initEmoEvents();
},0);
},hideEmoPop:function(){
this.emotionsContainer.hide();
if(this.emotions&&this.emotions._previewHolder){
this.emotions._previewHolder.hide();
}
this.showEmoBtn(true);
this.fireEvent("hideEmoticons");
},showEmoPop:function(evt){
var _79=this,fun=(function(){
setTimeout(function(){
this.showEmoBtn(false);
this.emotionsContainer.show();
this.fireEvent("showEmoticons");
this.getConfig("onShowEmoPop").bind(this)();
}.bind(this),this.getConfig("emoPopDelay"));
}).bind(this),_7b=(function(){
this.getConfig("onEmoTabSwitch").bind(this)();
}).bind(this);
scProxy=(function(){
this.getConfig("onEmoTabClick").bind(this)();
}).bind(this);
sVipProxy=(function(){
this.getConfig("onEmoNotVip").bind(this)();
}).bind(this);
sECProxy=(function(){
this.getConfig("onEmoConClick").bind(this)();
}).bind(this);
if(!this.emotions){
var _79=this,cfg={container:_79.emotionsContainer.container,isShowVipEmos:_79.getConfig("isShowVipEmos"),onParseEmo:function(_7d,evt){
_79.setValue(_7d.ubb);
if(!evt.ctrlKey&&!_79.getConfig("keepShow")){
_79.hideEmoPop();
}
}};
$extend(cfg,this.getConfig("url")?{url:_79.getConfig("url")}:{});
this.emotions=new XN.ui.emotions(cfg);
this.emotions.addEvent("renderEmotions",fun);
this.emotions.addEvent("tabSwitch",_7b);
this.emotions.addEvent("tabClick",scProxy);
this.emotions.addEvent("showNotVip",sVipProxy);
this.emotions.addEvent("emoConClick",sECProxy);
}else{
fun();
}
XN.event.stop(evt||window.event);
},showEmoBtn:function(_7f){
if(this.getConfig("hideEmoBtn")){
return false;
}
this.getEl("emoBtn")&&this.getEl("emoBtn")[_7f===true?"show":"hide"]();
},initEmoEvents:function(){
var _80=this,_81=this.showEmoPop.bind(this);
if(this.getConfig("button")){
this.getConfig("emoTrigger").push({el:_80.getConfig("button"),evt:"click"});
}
XN.array.each(this.getConfig("emoTrigger"),function(i,v){
if(_5(v)==="string"){
var _84=v.split(":");
v={el:_84[0],evt:_84[1]};
}
if(v.evt.toLowerCase()=="focus"){
v.evt="click";
}
XN.event.addEvent(v.el,v.evt,_81);
});
XN.event.addEvent(document,"click",this.hideEmoPop.bind(this));
if(this.input.mention){
this.input.mention.addEvent("refocus",function(){
_80.getInputPos();
});
}
},initQuickSwfupload:function(){
},initMentionBtn:function(){
var _85=this;
XN.event.addEvent(this.getConfig("atBtn"),"click",function(){
var _86="@",_87=XN.form.help(_85.input).getRealValue();
if(_87.slice(_85.pos.start-1,_85.pos.start)=="@"){
_86="";
}
_85.setValue(_86);
setTimeout(function(){
if(_85.input.mention){
_85.input.mention.check();
_85.input.mention.addEvent("refocus",function(){
_85.getInputPos();
});
}
},0);
});
},pos:{},getInputPos:function(evt){
try{
this.pos=XN.form.help(this.input).cursorPosition();
}
catch(e){
this.pos={"start":0,"end":0,"item":[0,0]};
XN.log(e);
}
},setValue:function(val){
var el=this.input,_8b=this,_8c=XN.form.help(el).getRealValue();
el.value=_8c.slice(0,_8b.pos.start)+val+_8c.slice(_8b.pos.end);
XN.form.help(el).focus(_8b.pos.start+val.length);
if(XN.browser.WebKit){
window.setTimeout(function(){
_8b.getInputPos();
},0);
}else{
_8b.getInputPos();
}
},fireFocus:function(){
if(document.createEvent){
var evt=document.createEvent("MouseEvents");
evt.initEvent("click",true,false);
this.input.dispatchEvent(evt);
}else{
this.input.fireEvent("onfocus");
}
}});
XN.event.enableCustomEvent(XN.ui.emoticons.prototype);
})();
