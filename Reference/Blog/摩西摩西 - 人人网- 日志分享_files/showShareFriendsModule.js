object.define("xn/showShareFriend",function(_1,_2){
(function(){
var _3=0;
function _4(_5){
XN.loadFiles(["http://s.xnimg.cn/csspro/module/friendSelector.css","http://s.xnimg.cn/jspro/xn.ui.multiFriendSelectorBox.js","http://s.xnimg.cn/jspro/xn.ui.pager.js"],function(){
setTimeout(function(){
XN.ui.multiFriendSelectorBoxForProfile=function(p){
var _6=this;
XN.ui.multiFriendSelectorBox.call(this,p);
this.config.selectedClassName="no_select_class";
};
XN.ui.multiFriendSelectorBoxForProfile.prototype=$extend({},XN.ui.multiFriendSelectorBox.prototype);
XN.ui.multiFriendSelectorBoxForProfile.prototype.deselect=function(){
};
XN.ui.multiFriendSelectorBoxForProfile.prototype.buildFriendInnerHTML=function(p){
return "<div style=\"padding: 4px; height: 64px; width: 134px;\"><a class=\"picbox\" style=\"border: 1px solid rgb(177, 193, 225); padding: 2px; display: block; float: left; margin-right: 3px; height: 50px;\" onclick=\"location.href='http://www."+XN.env.domain+"/profile.do?pma=p_profile_m_pub_sharefriendsall_a_profile&id="+p.id+"'\" href=\"http://www."+XN.env.domain+"/profile.do?id="+p.id+"\"\"><span class=\"pic\" style=\"background-image: url("+p.head+"); width: 50px; height: 50px; display: block;\"></span></a><h4 style=\"padding-left: 60px;\"><a style=\"height: 12px;\" onclick=\"location.href='http://www."+XN.env.domain+"/profile.do?pma=p_profile_m_pub_sharefriendsall_a_profile&id="+p.id+"'\" href=\"http://www."+XN.env.domain+"/profile.do?id="+p.id+"\">"+p.name.slice(0,4)+"</a></h4></div>";
};
if(isFunction(_5)){
_5();
}
_4=_7;
},0);
});
};
function _7(_8){
if(isFunction(_8)){
_8();
}
};
function _9(_a){
var _b="cross_page_multiFriendSelector"+_3;
_3++;
var _c=XN.DO.alert({title:_a.title,msg:"<div id=\""+_b+"\"></div>",width:500,yes:"关闭",callBack:function(r){
}});
_c.hide();
try{
var s=new XN.ui.multiFriendSelectorBoxForProfile({createInputElements:false,url:_a.url+"?t="+Math.random(),noFilter:true,autoLoad:false,noCompleteButton:true,noCancelButton:true,noSearchInput:true,noTabView:true,param:{guest:_a.uids},friendsCountPerPage:30});
s.addEvent("load",function(){
if(!s._friendsCount){
if(isFunction(_a.noUser)){
_a.noUser();
}
_c.hide();
return;
}
_c.show();
});
s.addEvent("noFriends",function(){
if(isFunction(_a.noUser)){
_a.noUser();
}
_c.hide();
});
$(_b).setContent(s);
s.loadFriends();
}
catch(e){
_c.hide();
}
};
showShareFriends=function(id){
var _d=function(){
_9({uids:id,url:"http://friend."+XN.env.domain+"/shareFriends",title:"你们的共同好友"});
};
countKey="sg_friendumayknow";
_4(_d);
};
shareSameOriginFrineds=function(_e,id,_f){
XN.net.sendStats("http://rcd.renren.com/ajaxHomeReconnectStat?param=SgCardRcd_indivExp|"+XN.user.id+"|"+"|"+id+"|"+_f);
function _10(_11){
var _12=XN.DO.alert({title:_e||"推荐好友",msg:_16(_11),width:500,yes:"关闭",callBack:function(r){
}});
};
new XN.net.xmlhttp({url:"http://www.renren.com/newnamecardpop?uid="+id+"&data-type="+_f,data:"",method:"get",onSuccess:function(r){
_10(JSON.parse(r.responseText).infoList);
}});
};
comm_addFriend_cb=function(id,_13,_14,_15){
if(!_15){
_15="NULL";
}
top.showRequestFriendDialog(id,_13,_14,"","",function(){
Sizzle("#comm"+id)[0].innerHTML="已发送";
});
XN.net.sendStats("http://rcd.renren.com/ajaxHomeReconnectStat?param=SgCardRcd_addFriend|"+XN.user.id+"|"+id+"|"+_15);
};
function _16(_17){
var _18=["<div class=\"originFrineds clearfix\" id=\"comm_originFrineds\" style=\"height:340px; overflow:auto; overflow-x:hidden;\">"],_19=_17.length,p;
for(var i=0;i<_19;i++){
p=_17[i];
var _1a="<p style=\"float:left; width:60px; line-height:24px; color:#888;\" id=\"comm"+p.id+"\">&nbsp;</p>";
var reg=/\d{1,}8$/;
if(p.isFriend=="false"||p.isFriend==false){
_1a="<p style=\"float:left; width:60px; line-height:24px; color:#888;\" id=\"comm"+p.id+"\"><a href=\"#nogo\" style=\"display:block;color:#888888;font-size: 12px;background: url(http://a.xnimg.cn/imgpro/icons/plus-green.png) no-repeat 6px 7px;width:31px;height: 24px;line-height: 24px;padding-left: 20px;text-decoration:none;margin-top:5px;\" onmouseover=\"this.style.background='url(http://a.xnimg.cn/n/core/cssimg/add-btn.png) no-repeat left center';this.style.color='#fff';\" onmouseout=\"this.style.background='url(http://a.xnimg.cn/imgpro/icons/plus-green.png) no-repeat 6px 7px';this.style.color='#666';\" onclick=\"top.comm_addFriend_cb('"+p.id+"','"+p.name+"','"+p.tinyimg+"');\">好友</a></p>";
}
_18.push(["<div style=\"padding: 4px; height: 64px; width: 134px; float:left; display:inline;\">","<a target=\"_blank\" class=\"picbox\" style=\"border: 1px solid rgb(177, 193, 225); padding: 2px; display: block;"," float: left; margin-right: 3px; height: 50px;\" onclick=\"XN.net.sendStats('http://rcd.renren.com/ajaxHomeReconnectStat?param=imgToPrf|",XN.user.id,"|",p.id,"|null');\"  href=\"http://www.",XN.env.domain,"/profile.do?id=",p.id,"\"><span class=\"pic\" style=\"background-image: url(",p.tinyimg,"); width: 50px; height: 50px; display: block;\"></span></a><h4 style=\"float:left;\">","<a target=\"_blank\" style=\"height: 12px;\" onclick=\"XN.net.sendStats('http://rcd.renren.com/ajaxHomeReconnectStat?param=nameToPrf|",XN.user.id,"|",p.id,"|null');\"  href=\"http://www.",XN.env.domain,"/profile.do?id=",p.id,"\">",p.name.slice(0,4),"</a></h4>",_1a,"</div>"].join(""));
}
_18.push("</div>");
return _18.join("");
};
})();
});

