XN.namespace("XN.ui");
(function(ns){
selectors={};
function sortByName(_2){
return _2.sort(function(a,b){
return a.name.localeCompare(b.name);
});
}
getFriendSelectorMenu=function(id){
return selectors[id];
};
ns.friendSelectorMenu=function(p){
this._ID=XN.util.createObjID();
selectors[this._ID]=this;
this.config=this.config||{};
$extend(this.config,{tip:"\u8bf7\u9009\u62e9\u597d\u53cb",url:"http://friend."+XN.env.domain+"/friendsSelector.do",aurl:"http://friend."+XN.env.domain+"/friendsSelector.do",multi:false,friendsCountPerPage:12,showSelectAllCheckbox:false,param:{}});
$extend(this.config,p);
if(this.config.url.indexOf("sg.renren.com/s/m")!=-1){
this.config.aurl="http://friend.renren.com/friendSelectorForVip";
}
if(this.config.url.indexOf("sg.renren.com/s/f")!=-1){
this.config.url="http://friend."+XN.env.domain+"/friendsSelector.do";
}
XN.log("\u597d\u53cb\u9009\u62e9\u5668"+this._ID+"\u663e\u793a\u5168\u9009:"+this.getConfig("showSelectAllCheckbox"));
this.init();
};
ns.friendSelectorMenu.prototype=$extend({},XN.ui.element);
var _7=ns.friendSelectorMenu.prototype;
$extend(_7,{_selected:"",_ready:false,mode:"normal",isReady:function(){
return this._ready;
},isLoading:function(){
return this._isLoading;
},getConfig:function(_8){
return this.config[_8];
},getID:function(id){
return "mfsm_"+this._ID+"_"+id;
},getEl:function(id){
if(id=="input"){
return $(this.getConfig("input"));
}
return $(this.getID(id));
},getFriendID:function(id){
return this.getID("friend_"+id);
},getFriendEl:function(id){
return $(this.getFriendID(id));
},getSelectedFriends:function(){
var _d=this._selected.split(",");
_d.shift();
return _d;
},reset:function(){
this._selected="";
this.refresh();
},init:function(){
var _e=this;
var _f=$element("span");
_f.setAttribute("id",this.getID("button"));
_f.addClass("frsAutoDown");
this.frame=_f;
this.buttonFloat=this.getConfig("buttonFloat")||"left";
this.desOnBottom=this.getConfig("buttonFloat")?"<span class=\"float-left\" style=\"color:#666;line-height:18px;\">"+this.getConfig("desOnBottom")+"</span>":"";
this.selectAllHtml=this.getConfig("showSelectAllCheckbox")?"<span style=\"float:left\"><label for=\""+this.getID("selectAll")+"\">&nbsp;<input id=\""+this.getID("selectAll")+"\" type=\"checkbox\" name=\""+this.getID("selectAll")+"\" onfocus=\"this.blur()\"/>\u5168\u9009</label></span>":"";
var _10=$element("div");
_10.addClass("autoRst").addClass("radio-choose");
_10.setContent(["<p class=\"tips\">","<span class=\"float-left\">"+this.getConfig("tip")+"</span>",this.selectAllHtml,"<span class=\"float-right\" id=\""+this.getID("selectContainer")+"\">","</span>","</p>","<div class=\"holder\">","<form><ul id=\""+this.getID("list")+"\"></ul></form>","</div>","<div class=\"actionBtns\">",this.desOnBottom,"<input style=\"display:none;\" id=\""+this.getID("submit")+"\" onclick=\"getFriendSelectorMenu("+this._ID+").fireEvent( 'submit' );\" type=\"button\" class=\"input-button  float-"+this.buttonFloat+"\" value=\"\u786e\u5b9a\" />","</div>"].join(""));
this.menu=new XN.ui.menu({button:_f,menu:_10,alignType:this.getConfig("alignType")||"3-2",offsetX:this.getConfig("offsetX")||0,offsetY:this.getConfig("offsetY")||0,alignWith:this.getEl("input")});
this.menu.onShow=function(){
_f.delClass("frsAutoDown");
_f.addClass("frsAutoUp");
};
this.menu.onHide=function(){
_f.addClass("frsAutoDown");
_f.delClass("frsAutoUp");
};
_f.addEvent("click",function(){
if(_e._ready){
return;
}
if(_e._isLoading){
return;
}
_e.loadFriends();
});
if(this.getConfig("multi")){
this.getEl("submit").show();
}
if(this.getConfig("showSelectAllCheckbox")){
this.getEl("selectAll").addEvent("click",function(e){
var el=XN.event.element(e||event);
if(el.checked){
_e.selectAll();
}else{
_e.deselectAll();
}
});
}
},isSelected:function(uid){
return new RegExp(","+uid+"(?!d)").test(this._selected);
},mark:function(uid){
var _15=this;
setTimeout(function(){
if(!_15.getFriendEl(uid).checked){
_15.markAsDeselect(uid);
}else{
_15.markAsSelected(uid);
}
},0);
},markAsSelected:function(uid){
this._selected+=","+uid;
this.fireEvent("select",uid);
XN.log("mfsm select:"+uid);
this.menu.refresh();
},markAsDeselect:function(uid){
this._selected=this._selected.replace(new RegExp(","+uid+"(?!d)","g"),"");
this.fireEvent("deselect",uid);
this.menu.refresh();
},selectFriends:function(fs){
var _19=this;
XN.array.each(fs,function(i,v){
_19.select(v);
});
return this;
},deselectFriends:function(fs){
var _1d=this;
XN.array.each(fs,function(i,v){
_1d.deselect(v);
});
return this;
},select:function(uid){
if(isUndefined(uid)){
return;
}
if(this.isSelected(uid)){
return;
}
this.markAsSelected(uid);
if(this.getFriendEl(uid)){
this.getFriendEl(uid).checked=true;
}
},deselect:function(uid){
if(!this.isSelected(uid)){
return;
}
this.markAsDeselect(uid);
if(this.getFriendEl(uid)){
this.getFriendEl(uid).checked=false;
}
},selectAll:function(){
var _22=this.getEl("list").getElementsByTagName("input");
var i=0;
while(_22[i]){
_22[i].checked=true;
this.markAsSelected(_22[i].id.match(/\d+/g)[1]);
i+=1;
}
XN.log("select all");
this.fireEvent("selectAll");
},deselectAll:function(){
var _24=this.getEl("list").getElementsByTagName("input");
var i=0;
while(_24[i]){
_24[i].checked=false;
this.markAsDeselect(_24[i].id.match(/\d+/g)[1]);
i+=1;
}
XN.log("deselect all");
this.fireEvent("deselectAll");
},refresh:function(){
var _26=this;
if(_26.mode=="normal"){
_26.renderList(0,_26._allFriends);
}else{
_26.renderList(0,_26._filterResults);
}
if(this.getConfig("showSelectAllCheckbox")){
_26.refreshSelectAllCheckbox();
}
},refreshSelectAllCheckbox:function(){
var frs,i=0;
var _29=true;
var _2a=this;
if(_2a.mode=="normal"){
frs=_2a._allFriends;
}else{
frs=_2a._filterResults;
}
var j=frs.length;
if(j>0){
while(i<j){
var uid=frs[i].id;
if(!_2a.isSelected(uid)){
_29=false;
break;
}
i++;
}
}else{
if(j==0){
_29=false;
}
}
_2a.getEl("selectAll").checked=_29;
},renderList:function(n,_2e){
XN.log(_2e);
var i=0;
var j=_2e.length;
var id,uid;
var _33=[];
while(i<=j){
if(!_2e[i]){
break;
}
if((i+1)%3==1){
_33.push("<li>");
}
uid=_2e[i].id;
id=this.getFriendID(uid);
_33.push("<span class=\"userCell\" onclick=\"getFriendSelectorMenu("+this._ID+").mark('"+uid+"');\">");
if(this.getConfig("multi")){
_33.push("<input ");
if(this.isSelected(uid)){
_33.push("checked=\"true\" ");
}
_33.push("id=\""+id+"\" type=\"checkbox\" name=\"user\" />");
}else{
_33.push("<input id=\""+id+"\" uid=\""+uid+"\" type=\"radio\" name=\"user\" />");
}
_33.push("&nbsp;<label for=\""+id+"\">"+_2e[i].name+"</label>");
_33.push("</span>");
if((i+1)%3==0){
_33.push("</li>");
}
i++;
}
if(_33.length&&_33[_33.length-1]!=="</li>"){
_33.push("</li>");
}
this.getEl("list").innerHTML=_33.join("");
},loadFriends:function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var _35=this;
var p={};
p["init"]=true;
p["uid"]=true;
p["uhead"]=true;
p["uname"]=true;
p["group"]=true;
p["net"]=false;
p["param"]=this.getConfig("param");
$extend(p,this.getConfig("initParam"));
this.getEl("list").innerHTML="<li>\u52a0\u8f7d\u4e2d...</li>";
new XN.NET.xmlhttp({useCache:true,url:this.getConfig("aurl"),method:"get",data:"p="+XN.JSON.build(p),onSuccess:function(r){
r=XN.JSON.parse(r.responseText);
_35._onload(r);
}});
},renderFilter:function(){
var _38=this;
this.filter=new XN.util.DS_friends({url:this.getConfig("aurl")||this.getConfig("url"),qkey:this.getConfig("qkey"),useCache:true});
var _39=["<select id=\""+this.getID("select")+"\">"];
_39.push("<option value=\"\">\u5168\u90e8\u597d\u53cb</option>");
XN.array.each(this._groups,function(i,v){
if(v!==""){
_39.push("<option value=\""+v+"\">"+v+"</option>");
}
});
_39.push("</select>");
this.getEl("selectContainer").innerHTML=_39.join("");
this.getEl("select").onchange=function(){
_38.filterByGroup(this.value);
};
},filterByGroup:function(_3c){
var _3d=this;
if(_3c===""){
this.resetFilter();
}else{
this.getEl("list").innerHTML="<li>\u6b63\u5728\u67e5\u8be2...</li>";
this.mode="filter";
this.filter.group=_3c;
this.filter.query("",function(r){
XN.log(r);
sortByName(r);
_3d._filterResults=r;
_3d.refresh();
});
}
},resetFilter:function(){
this.mode="normal";
this.refresh();
},getUserByID:function(id){
id=String(id);
var rt=null;
XN.array.each(this._allFriends,function(i,v){
if(String(v.id)==id){
rt=v;
$extend(rt,{profile:"http://www."+XN.env.domain+"/profile.do?id="+v.id});
return false;
}
});
return rt;
},_onload:function(r){
this.config.qkey=r.qkey;
this._allFriends=r.candidate;
sortByName(this._allFriends);
this._groups=r.groups;
XN.log(this._groups);
this.renderFilter();
this.resetFilter();
this.menu.refresh();
this.isLoading=false;
this._ready=true;
this.fireEvent("load");
}});
XN.event.enableCustomEvent(_7);
})(XN.ui);
