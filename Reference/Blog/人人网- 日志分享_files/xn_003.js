(function(){
var _1;
(function(){
object.use("dom",function(_2){
_1=_2;
});
})();
var _3=function(_4,_5,_6){
if(_4=="show"){
$("share_comment_"+_5).style.display="block";
}else{
if(_4=="hide"){
$("share_comment_"+_5).style.display="none";
$("share_footer_"+_5).style.display="block";
$("share_"+_5).scrollIntoView();
}
}
};
var _7=function(_8,_9){
var _9=_9||_a();
return _9?_1.getElement("#boxcont_"+_9+"_"+_8):_1.getElement("#boxcont_"+_8);
};
var _b=function(_c,_d){
var _d=_d||_a();
return _d?_1.getElement("#"+_d+"_comment_"+_c):_1.getElement("#comment_"+_c);
};
var _e=function(_f,_10){
var _11=_7(_10);
_11.getElement(".statuscmtlist:not(.for-reply-adding):last").grab(_f,"bottom");
};
var _12=function(_13,_14){
var _15=_7(_13,_14),_16,_17,_18;
_17=_15.getElements(".statuscmtitem");
if(!_17[1].hasClass("statuscmtitem-hot")){
_16=_17[1];
}else{
_18=_15.getElements(".statuscmtitem-hot");
_16=_17[1+_18.length];
}
return _16.id.match(/\d+/)[0];
};
var _19=function(d,_1b){
var _1c=d.shareId;
var _1d=d.shareOwner;
var _1b=_1b||"0101090901";
var _1e={"action":"add","auth":99,"body":encodeURIComponent(XN.string.ltrim(d.comment.replace(/[\r\n]/g," ")).replace(/"/g,"&quot;"))};
new XN.NET.xmlhttp({url:"http://share.renren.com/share/submit.do",data:"shareId="+_1c+"&shareUserId="+_1d+"&post="+XN.json.build(_1e)+"&from="+_1b,onSuccess:function(r){
var res=XN.json.parse(r.responseText);
if(res.status==1){
XN.DO.showError("\u5206\u4eab\u5931\u8d25\uff1a"+res.msg);
}
},onError:function(){
XN.DO.showError("\u5206\u4eab\u5931\u8d25\uff01");
}});
};
var _21=function(_22,_23,_24,_25,_26,_27){
var _28,_29=Sizzle(".page-detail-new").length>0?true:false;
_2a(_22,_23,_24,_25,_26,_27);
return _29?Mustache.to_html(_2b(),_22):Mustache.to_html(_2c(),_22);
};
var _2d=function(_2e,_2f,_30){
var _31,_32=Sizzle(".page-detail-new").length>0?true:false;
_2a(_2e,_2f,_30);
return _32?Mustache.to_html(_33(),_2e):Mustache.to_html(_34(),_2e);
};
var _a=function(){
if(XN.app.share.CommentManger&&XN.app.share.CommentManger.activeTab){
return XN.app.share.CommentManger.activeTab;
}
if(_1.getElement("#friendCmts_comment_list")){
return "friendCmts";
}
if(_1.getElement("#allCmts_comment_list")){
return "allCmts";
}
};
var _2c=function(){
return "{{#hasMore}}                <div id=\"showMore_{{share_id}}\" class=\"statuscmtitem statuscmtitem-small show-more\">                    <a href=\"javascript:\" onclick=\"share_show_more_comments({{share_id}}, {{share_owner}}, undefined, undefined, '{{stype}}', '{{option}}')\">\u663e\u793a\u8f83\u65e9\u4e4b\u524d\u7684\u8bc4\u8bba</a>                </div>            {{/hasMore}}            <div class=\"statuscmtlist {{largeList}}\" id=\"commContainer_{{share_id}}\">                {{#comments}}                    <div class=\"statuscmtitem clearfix\" onmouseover=\"$(this).addClass('statuscmtitem-hover');\" onmouseout=\"$(this).delClass('statuscmtitem-hover');\" id=\"comment_{{id}}\" {{iescript}}>                        {{^showDelete}}                            <span class=\"float-right\"><a target=\"_blank\" href=\"{{reportUrl}}\" class=\"reply-report\" style=\"display: none;\">\u4e3e\u62a5</a></span>                        {{/showDelete}}                        {{#showDelete}}                            <span class=\"float-right\">                                <a class=\"x-to-hide\" onclick=\"share_delete_comment(this, {{share_id}}, {{share_owner}}, {{id}}, '{{stype}}', {{author}});\" href=\"javascript:void(0)\"></a>                            </span>                        {{/showDelete}}                        {{#whisper}}                            <span class=\"float-right whisper\">\u6084\u6084\u8bdd</span>                        {{/whisper}}                        <a class=\"minfriendpic\" target=\"_blank\" style=\"background-image: url({{headUrl}})\" namecard=\"{{author}}\" title=\"{{name}}\" href=\"http://name.renren.com/{{author}}\"></a>                        <p class=\"replybody\">                            <a title=\"{{liveUserTitle}}\" target=\"_blank\" href=\"http://name.renren.com/{{author}}\" class=\"{{liveUserClass}}\" namecard=\"{{author}}\">{{name}}</a>:                            {{#iconUrl}}                                <a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\"{{vipIconUrl}}\"></a>                            {{/iconUrl}}                            <span class=\"replycontent\">{{{cmtBody}}}</span>                            <br />                            <span style=\"{{hiddenBtns}}\" class=\"btn-box\">                                {{#showIlike}}                                    <a class=\"{{lkClass}}\" comment-data=\"{'stype':'{{type}}','cid':'{{id}}', 'rid':'{{share_id}}', 'uid':'{{userId}}', 'oid':'{{author}}', 'roid':'{{share_owner}}', 'name':'{{userName}}', 'url':'{{lkUrl}}', 'liked':{{lkIslike}} }\" onclick=\"detailLog('{{share_owner}}', '{{share_id}}', '{{likeLog}}', '{{shareType}}')\" href=\"javascript:void(0)\">{{lkContent}}</a>                                {{/showIlike}}                                {{#showReply}}                                    <a class=\"btn-reply\" onclick=\"share_reply_comment({{share_id}}, {{author}}, '{{name}}', {{id}}, '{{stype}}') ;detailLog('{{share_owner}}', '{{share_id}}', '01030323000', '{{shareType}}');return false\" href=\"#nogo\">\u56de\u590d</a>                                {{/showReply}}                            </span>                            <span class=\"time\">{{time}}</span>                        </p>                    </div>                {{/comments}}            </div>            {{#showCommentBox}}                <div>                    <div class=\"statuscmtlist for-reply-adding\">                        <div class=\"statuscmtitem reply-adding actived\">                            <div>                                <form method=\"post\" onsubmit=\"return false;\" id=\"comment_form_{{share_id}}\" onkeydown=\"if(event.keyCode == 13 && event.ctrlKey) {share_add_comment_submit({{share_id}}, {{share_owner}});}\">                                    <span id=\"user_head{{userId}}\" style=\"background-image: url({{userImg}});\" class=\"minfriendpic\"></span>                                    <textarea name=\"comment\" id=\"comment{{share_id}}\" class=\"cmtbody\"></textarea>                                        <div id=\"shareVerify_{{share_id}}\" style=\"display: none;\">                                            <label for=\"schoolInfoCode\"> <em>*</em>\u9a8c\u8bc1\u7801: </label>                                            <input type=\"text\" tabindex=\"21\" maxlength=\"5\" size=\"5\" id=\"shareInfoCode{{share_id}}\" name=\"shareInfoCode{{share_id}}\" class=\"inputtext validate-code\">                                        </div>                                    <div class=\"reply-nav clearfix\">                                        <a href=\"#emotion\" onclick=\"return false;\" id=\"addEmoBtn{{share_id}}\" class=\"newsfeed-emo\">\u8868\u60c5</a>                                        <a href=\"#nogo\" onclick=\"return false;\" id=\"mentionBtn{{share_id}}\" class=\"mention-btn\">\u70b9\u540d</a>                                        <label style=\"margin-left:10px\"> <input id=\"doShare{{share_id}}\" type=\"checkbox\" style=\"margin-right:3px\">\u540c\u65f6\u5206\u4eab</label>                                        <input type=\"button\" id=\"submit_comment\" name=\"submit_comment\" value=\"\u53d1\u8868\u8bc4\u8bba\" class=\"input-button\" onclick=\"share_add_comment_submit({{share_id}}, {{share_owner}});\">                                    </div>                                    <input type=\"hidden\" id=\"repetNo\" name=\"repetNo\" value=\"0\">                                    <input type=\"hidden\" id=\"replyToCommentId\" name=\"replyToCommentId\" value=\"0\">                                    <input type=\"hidden\" id=\"shareId\" name=\"shareId\" value=\"{{share_id}}\">                                    <input type=\"hidden\" id=\"shareOwner\" name=\"shareOwner\" value=\"{{share_owner}}\">                                </form>                            </div>                        </div>                    </div>                </div>            {{/showCommentBox}}";
};
var _2b=function(){
return "{{#hasMore}}                <div id=\"showMore_{{share_id}}\" class=\"statuscmtitem statuscmtitem-small show-more\">                    <a href=\"javascript:\" onclick=\"share_show_more_comments({{share_id}}, {{share_owner}}, undefined, undefined, '{{stype}}', '{{option}}')\">\u663e\u793a\u8f83\u65e9\u4e4b\u524d\u7684\u8bc4\u8bba</a>                </div>            {{/hasMore}}            <div class=\"statuscmtlist {{largeList}}\" id=\"commContainer_{{share_id}}\">                {{#comments}}                    <div class=\"statuscmtitem clearfix\" onmouseover=\"$(this).addClass('statuscmtitem-hover');\" onmouseout=\"$(this).delClass('statuscmtitem-hover');\" id=\"comment_{{id}}\" {{iescript}}>                        {{#showDelete}}                            <span class=\"float-right\">                                <a class=\"x-to-hide\" onclick=\"share_delete_comment(this, {{share_id}}, {{share_owner}}, {{id}}, '{{stype}}', {{author}});\" href=\"javascript:void(0)\"></a>                            </span>                        {{/showDelete}}                        {{#whisper}}                            <span class=\"float-right whisper\">\u6084\u6084\u8bdd</span>                        {{/whisper}}                        <a class=\"minfriendpic\" target=\"_blank\" style=\"background-image: url({{headUrl}})\" namecard=\"{{author}}\" title=\"{{name}}\" href=\"http://name.renren.com/{{author}}\"></a>                        <p class=\"replybody\">                            <a title=\"{{liveUserTitle}}\" target=\"_blank\" href=\"http://name.renren.com/{{author}}\" class=\"{{liveUserClass}}\" namecard=\"{{author}}\">{{name}}</a>:                            {{#iconUrl}}                                <a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\"{{vipIconUrl}}\"></a>                            {{/iconUrl}}                            <span class=\"replycontent\">{{{cmtBody}}}</span>                        </p>                        <p class=\"replyinfo clearfix\">                            {{^showDelete}}                                {{#showReply}}                                    <span class=\"float-right\"><a target=\"_blank\" href=\"{{reportUrl}}\" class=\"reply-report\"  class=\"reply-report\">\u4e3e\u62a5</a></span>                                {{/showReply}}                            {{/showDelete}}                            <span class=\"time\">{{time}}</span>                            {{^showReply}}                                <span class=\"float-right\">                                    <a href=\"http://share.renren.com/share/{{comment_share_owner_id}}/{{comment_share_id}}#friendCmts\" target=\"_blank\" class=\"reply-origin\" onclick=\"detailLog('{{share_owner}}', '{{share_id}}', '01030324100', '{{shareType}}')\">\u67e5\u770b\u6e90\u8bc4\u8bba</a>                                    {{^showDelete}}                                        <span class=\"pipe\">|</span>                                        <a target=\"_blank\" href=\"{{reportUrl}}\" class=\"reply-report\"  class=\"reply-report\">\u4e3e\u62a5</a>                                    {{/showDelete}}                                </span>                            {{/showReply}}                            <span style=\"{{hiddenBtns}}\" class=\"btn-box\">                                {{#showIlike}}                                    <a class=\"{{lkClass}}\" comment-data=\"{'stype':'{{type}}','cid':'{{id}}', 'rid':'{{share_id}}', 'uid':'{{userId}}', 'oid':'{{author}}', 'roid':'{{share_owner}}', 'name':'{{userName}}', 'url':'{{lkUrl}}', 'liked':{{lkIslike}} }\" href=\"javascript:void(0)\" onclick=\"detailLog('{{share_owner}}', '{{share_id}}', '{{likeLog}}', '{{shareType}}')\">{{lkContent}}</a>                                {{/showIlike}}                                {{#showReply}}                                    | <a class=\"btn-reply\" onclick=\"share_reply_comment({{share_id}}, {{author}}, '{{name}}', {{id}}, '{{stype}}') ;detailLog('{{share_owner}}', '{{share_id}}', '01030322900', '{{shareType}}');return false\" href=\"#nogo\">\u56de\u590d</a>                                {{/showReply}}                            </span>                        </p>                    </div>                {{/comments}}            </div>            {{#showCommentBox}}                <div>                    <div class=\"statuscmtlist for-reply-adding\">                        <div class=\"statuscmtitem reply-adding actived\">                            <div>                                <form method=\"post\" onsubmit=\"return false;\" id=\"comment_form_{{share_id}}\" onkeydown=\"if(event.keyCode == 13 && event.ctrlKey) {share_add_comment_submit({{share_id}}, {{share_owner}});}\">                                    <span id=\"user_head{{userId}}\" style=\"background-image: url({{userImg}});\" class=\"minfriendpic\"></span>                                    <textarea name=\"comment\" id=\"comment{{share_id}}\" class=\"cmtbody\"></textarea>                                        <div id=\"shareVerify_{{share_id}}\" style=\"display: none;\">                                            <label for=\"schoolInfoCode\"> <em>*</em>\u9a8c\u8bc1\u7801: </label>                                            <input type=\"text\" tabindex=\"21\" maxlength=\"5\" size=\"5\" id=\"shareInfoCode{{share_id}}\" name=\"shareInfoCode{{share_id}}\" class=\"inputtext validate-code\">                                        </div>                                    <div class=\"reply-nav clearfix\">                                        <a href=\"#emotion\" onclick=\"return false;\" id=\"addEmoBtn{{share_id}}\" class=\"newsfeed-emo\">\u8868\u60c5</a>                                        <a href=\"#nogo\" onclick=\"return false;\" id=\"mentionBtn{{share_id}}\" class=\"mention-btn\">\u70b9\u540d</a>                                        <label style=\"margin-left:10px\"> <input id=\"doShare{{share_id}}\" type=\"checkbox\" style=\"margin-right:3px\">\u540c\u65f6\u5206\u4eab</label>                                        <input type=\"button\" id=\"submit_comment\" name=\"submit_comment\" value=\"\u53d1\u8868\u8bc4\u8bba\" class=\"input-button\" onclick=\"share_add_comment_submit({{share_id}}, {{share_owner}});\">                                    </div>                                    <input type=\"hidden\" id=\"repetNo\" name=\"repetNo\" value=\"0\">                                    <input type=\"hidden\" id=\"replyToCommentId\" name=\"replyToCommentId\" value=\"0\">                                    <input type=\"hidden\" id=\"shareId\" name=\"shareId\" value=\"{{share_id}}\">                                    <input type=\"hidden\" id=\"shareOwner\" name=\"shareOwner\" value=\"{{share_owner}}\">                                </form>                            </div>                        </div>                    </div>                </div>            {{/showCommentBox}}";
};
var _34=function(){
return "{{#comments}}<div class=\"statuscmtitem clearfix\" onmouseover=\"$(this).addClass('statuscmtitem-hover');\" onmouseout=\"$(this).delClass('statuscmtitem-hover');\" id=\"{{commentType}}comment_{{id}}\" {{iescript}}>                        {{^showDelete}}                            <span class=\"float-right\"><a target=\"_blank\" href=\"{{reportUrl}}\" class=\"reply-report\" style=\"display: none;\">\u4e3e\u62a5</a></span>                        {{/showDelete}}                        {{#showDelete}}                            <span class=\"float-right\">                                <a class=\"x-to-hide\" onclick=\"share_delete_comment(this, {{share_id}}, {{share_owner}}, {{id}}, '{{stype}}', {{author}});\" href=\"javascript:void(0)\"></a>                            </span>                        {{/showDelete}}                        {{#whisper}}                            <span class=\"float-right whisper\">\u6084\u6084\u8bdd</span>                        {{/whisper}}                        <a class=\"minfriendpic\" target=\"_blank\" style=\"background-image: url({{headUrl}})\" namecard=\"{{author}}\" title=\"{{name}}\" href=\"http://name.renren.com/{{author}}\"></a>                        <p class=\"replybody\">                            <a title=\"{{liveUserTitle}}\" target=\"_blank\" href=\"http://name.renren.com/{{author}}\" class=\"{{liveUserClass}}\" namecard=\"{{author}}\">{{name}}</a>:                            {{#iconUrl}}                                <a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\"{{vipIconUrl}}\"></a>                            {{/iconUrl}}                            <span class=\"replycontent\">{{{cmtBody}}}</span>                            <br />                            <span style=\"{{hiddenBtns}}\" class=\"btn-box\">                                {{#showIlike}}                                    <a class=\"{{lkClass}}\" comment-data=\"{'stype':'{{type}}','cid':'{{id}}', 'rid':'{{share_id}}', 'uid':'{{userId}}', 'oid':'{{author}}', 'roid':'{{share_owner}}', 'name':'{{userName}}', 'url':'{{lkUrl}}', 'liked':{{lkIslike}} }\" onclick=\"detailLog('{{share_owner}}', '{{share_id}}', '01030322700', '{{shareType}}')\" href=\"javascript:void(0)\">{{lkContent}}</a>                                {{/showIlike}}                                {{#showReply}}                                    <a class=\"btn-reply\" onclick=\"share_reply_comment({{share_id}}, {{author}}, '{{name}}', {{id}}, '{{stype}}') ;detailLog('{{share_owner}}', '{{share_id}}', '01030323000', '{{shareType}}');return false\" href=\"#nogo\">\u56de\u590d</a>                                {{/showReply}}                            </span>                            <span class=\"time\">{{time}}</span>                        </p>                    </div>        {{/comments}}";
};
var _33=function(){
return "{{#comments}}<div class=\"statuscmtitem clearfix\" onmouseover=\"$(this).addClass('statuscmtitem-hover');\" onmouseout=\"$(this).delClass('statuscmtitem-hover');\" id=\"{{commentType}}comment_{{id}}\" {{iescript}}>                        {{#showDelete}}                            <span class=\"float-right\">                                <a class=\"x-to-hide\" onclick=\"share_delete_comment(this, {{share_id}}, {{share_owner}}, {{id}}, '{{stype}}', {{author}});\" href=\"javascript:void(0)\"></a>                            </span>                        {{/showDelete}}                        {{#whisper}}                            <span class=\"float-right whisper\">\u6084\u6084\u8bdd</span>                        {{/whisper}}                        <a class=\"minfriendpic\" target=\"_blank\" style=\"background-image: url({{headUrl}})\" namecard=\"{{author}}\" title=\"{{name}}\" href=\"http://name.renren.com/{{author}}\"></a>                        <p class=\"replybody\">                            <a title=\"{{liveUserTitle}}\" target=\"_blank\" href=\"http://name.renren.com/{{author}}\" class=\"{{liveUserClass}}\" namecard=\"{{author}}\">{{name}}</a>:                            {{#iconUrl}}                                <a title=\"VIP\" target=\"_blank\" href=\"http://i.renren.com/index.action?wc=290000\"><img alt=\"VIP\" src=\"{{vipIconUrl}}\"></a>                            {{/iconUrl}}                            <span class=\"replycontent\">{{{cmtBody}}}</span>                        </p>                        <p class=\"replyinfo clearfix\">                            {{^showDelete}}                                {{#showReply}}                                    <span class=\"float-right\"><a target=\"_blank\" href=\"{{reportUrl}}\" class=\"reply-report\"  class=\"reply-report\">\u4e3e\u62a5</a></span>                                {{/showReply}}                            {{/showDelete}}                            <span class=\"time\">{{time}}</span>                            <span style=\"{{hiddenBtns}}\" class=\"btn-box\">                                {{#showIlike}}                                    <a class=\"{{lkClass}}\" comment-data=\"{'stype':'{{type}}','cid':'{{id}}', 'rid':'{{share_id}}', 'uid':'{{userId}}', 'oid':'{{author}}', 'roid':'{{share_owner}}', 'name':'{{userName}}', 'url':'{{lkUrl}}', 'liked':{{lkIslike}} }\" href=\"javascript:void(0)\" onclick=\"detailLog('{{share_owner}}', '{{share_id}}', '01030322700', '{{shareType}}')\">{{lkContent}}</a>                                {{/showIlike}}                                {{#showReply}}                                    <a class=\"btn-reply\" onclick=\"share_reply_comment({{share_id}}, {{author}}, '{{name}}', {{id}}, '{{stype}}') ;detailLog('{{share_owner}}', '{{share_id}}', '01030322900', '{{shareType}}');return false\" href=\"#nogo\">\u56de\u590d</a>                                {{/showReply}}                            </span>                        </p>                    </div>        {{/comments}}";
};
var _2a=function(_35,_36,_37,_38,_39,_3a){
var _3b=parseInt(XN.cookie.get("id"),10),_3c=Sizzle(".page-detail-new").length>0?true:false;
_39=_39||_a();
_35.userId=XN.user.id;
_35.userName=XN.user.name;
_35.userImg=XN.user.tinyPic;
_35.share_id=_36;
_35.share_owner=_37;
_35.showCommentBox=_38;
_35.largeList=_39?"statuscmtlist-large":"";
_35.commentType=_39?_39+"_":"";
_35.src=_35.needVerfy?"http://icode."+XN.env.domain+"/getcode.do?t=shareInfoCode"+_36+"&r="+Math.random():"";
_35.iescript=XN.browser.IE6?"onmouseover=$(this).addClass('statuscmtitem-hover'); onmouseout=$(this).delClass('statuscmtitem-hover');":"";
_35.hiddenBtns=_3a?"display:none;":"";
if(!Array.isArray(_35.comments)){
_35.comments=[_35.comments];
}
_35.comments.forEach(function(_3d){
_3d.liveUserClass=_3d.keepUse?"lively-user":"";
_3d.liveUserTitle=_3d.keepUse?"\u8fde\u7eed\u767b\u5f557\u5929, \u5373\u53ef\u83b7\u5f97\u6a59\u540d\u7279\u6743":_3d.name;
_3d.reportUrl="http://admin.renren.com/admin/newuserreport.do?type=30&owner="+_37+"&contentId="+_3d.id+"&userId="+_3d.author+"&origURL="+encodeURIComponent(document.location.href);
_3d.isVip=_3d.isVip;
_3d.iconUrl=_3d.vipIconUrl;
_3d.type="share";
if(_3d.vocal_url&&_3d.vocal_length){
var reg=/^回复.+[:：](?!\/)/,_3f=reg.test(_3d.body)?_3d.body.match(reg)[0]:"";
_3d.cmtBody=_3f+"<a class=\"vocal-player vocal-player-tiny\"                 data-vocal=\"{'url': '"+_3d.vocal_url+"', 'time': "+_3d.vocal_length+",'ownerId':"+_3d.replyerId+",'voiceId':"+_3d.commentId+", 'sourceOwner':"+_37+", 'sourceId':"+_36+", 'ugcType':9}\" href=\"javascript:;\">                    <span class=\"btn\"></span>                    <span class=\"time\"><span class=\"num\">"+_3d.vocal_length+"</span>\u79d2</span>                </a>";
}else{
_3d.cmtBody=_3d.body;
}
_3d.showIlike=!_3d.vocal_url;
if(_3d.showIlike){
_3d.lkUrl="http://share.renren.com/share/"+_37+"/"+_36;
_3d.lkIslike=_3d.liked;
if(_3c){
_3d.lkTxt=_3d.lkIslike?" \u53d6\u6d88\u8d5e":" \u8d5e";
_3d.lkContent=_3d.likeCount>0?_3d.likeCount+_3d.lkTxt:_3d.lkTxt;
_3d.lkClass=_3d.liked?"ilike_comment ilike_comment_liked":"ilike_comment";
}else{
_3d.lkContent=_3d.likeCount>0?_3d.likeCount:"";
_3d.lkClass=_3d.liked?"ilike_comment_icon ilike_comment_liked":"ilike_comment_icon";
}
}
_3d.showReply=((_3b!==_3d.author)&&(_39!="allCmts"));
_3d.shareType=$("shareType")?$("shareType").value:-1;
if(_39=="allCmts"){
_3d.likeLog=_3c?"01030324400":"01030324500";
}else{
_3d.likeLog=_3c?"01030322700":"01030322800";
}
});
};
var _40,_41,_42,_43,_44,_45,_46,_47,_48,_49,_4a,_4b,_4c,_4d,_4e,_4f,_50,_51,_52,_53,_54;
_40=function(_55,_56,_57){
var _58={};
switch(_55.type){
case "blog":
switch(_57){
case "more":
_58={"bfrom":138527552,"blogId":_55.id,"owner":_55.owner,"cmtId":_56.id};
break;
case "delete":
_58={"bfrom":1020340800,"id":_56.id,"owner":_55.owner};
break;
case "doShare":
_58={"blogId":_55.id,"ownerId":_55.owner,"isBlogShare":1,"body":_56.body};
}
break;
}
return XN.array.toQueryString(_58);
};
_41=function(_59){
var _5a=_45(_59);
return _5a.getElement(Mustache.to_html("#{{type}}_doShare_{{id}}",_59));
};
_42=function(_5b){
var _5c=_45(_5b);
return _5c.getElement(Mustache.to_html("#{{type}}_whisper_{{id}}",_5b));
};
_43=function(_5d,_5e,_5f){
_54(_5d,_5e,_5f);
return Mustache.to_html(_2c(),_5e);
};
_44=function(_60){
var _61=_45(_60);
_61.comment.value="";
_61.submit_comment.disabled=false;
};
_45=function(_62){
return _1.getElement(Mustache.to_html("#{{type}}_comment_form_{{id}}",_62));
};
_46=function(_63){
var _64=Mustache.to_html("#{{type}}_{{id}}",_63);
return _1.getElement(_64);
};
_47=function(_65){
return "http://icode."+XN.env.domain+"/getcode.do?t="+_65.type+"InfoCode"+_65.id+"&r="+Math.random();
};
_48=function(_66,_67){
return "http://admin.renren.com/admin/newuserreport.do?type=30&owner="+_66.owner+"&contentId="+_66.id+"&userId="+_67.author+"&origURL="+encodeURIComponent(document.location.href);
};
_49=function(_68){
return Mustache.to_html("http://{{type}}.renren.com/{{type}}/{{owner}}/{{id}}",_68);
};
_4a=function(_69,_6a){
return XN.user.id==_6a.author||_69.owner==XN.user.id||XN.user.isAdmin;
};
_4b=function(_6b,_6c){
var url;
switch(_6b.type){
case "blog":
switch(_6c){
case "add":
url="http://blog.renren.com/PostComment.do";
break;
case "more":
url="http://blog.renren.com/AjaxGetBlogCommentList.do";
break;
case "delete":
url="http://blog.renren.com/DelComment.do";
break;
case "doShare":
url="http://blog.renren.com/share/createShareBlog";
break;
}
break;
}
return url;
};
_4c=function(_6e){
return false;
};
_4d=function(_6f){
var _70=_45(_6f),_71=_70.comment.value;
if(XN.STRING.isBlank(_71)){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
return false;
}
if(_71.length>500){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc7500\u5b57");
return false;
}
return true;
};
_4e=function(_72,_73){
var _74=_45(_72),_75=_41(_72),url,_77;
if(_75.checked){
url=_4b(_72,"doShare");
_77=_40(_72,{"body":_74.comment.value},"doShare");
new XN.net.xmlhttp({url:url,data:_77,onSuccess:function(r){
var res=XN.json.parse(r.responseText),p;
if(res.code!=0){
p=XN.DO.alert({message:"<div style=\"width:100%;text-align:center\">"+res.msg+"</div>",autoHide:3});
p.header.hide();
p.footer.hide();
}
}});
}
};
_4f=function(_7b){
object.use("xn.mention",function(_7c,xn){
xn.mention.Mention.init([{obj:$(_7b.type+"_comment_"+_7b.id),button:$(_7b.type+"_mentionBtn_"+_7b.id),ugcId:_7b.id,ugcType:_7b.type,ownerId:_7b.owner}]);
});
XN.loadFiles(["http://s.xnimg.cn/csspro/module/minieditor.css","http://s.xnimg.cn/jspro/xn.ui.emoticons.js"],function(){
setTimeout(function(){
new XN.ui.emoticons({input:$(_7b.type+"_comment_"+_7b.id),button:$(_7b.type+"_addEmoBtn_"+_7b.id),btnAlignType:"4-1",url:"http://status.renren.com/getubblist.do?type=2"});
},0);
});
};
_50=function(_7e){
var _7f=_46(_7e);
return _7f.getElements(".statuscmtitem")[1];
};
_51=function(_80){
var _81=_46(_80);
_81.getElement(".show-more").dispose();
};
_52=function(_82,_83){
var _84=_46(_82);
return _84.getElement("#comment_"+_83);
};
_53=function(_85,_86){
var _87=_52(_85,_86);
return _87&&_87.dispose();
};
_54=function(_88,_89,_8a){
var _8b=parseInt(XN.user.id),_8c=_88.type;
_89.userId=XN.user.id;
_89.userName=XN.user.name;
_89.userImg=XN.user.tinyPic;
_89.share_id=_88.id;
_89.share_owner=_88.owner;
_89.commentType=_88.type?_88.type+"_":"";
_89.type=_88.type;
_89.stype=_88.type;
_89.option=JSON.stringify(_8a);
_89.src=_89.needVerfy?_47(_88):"";
_89.iescript=XN.browser.IE6?"onmouseover=$(this).addClass('statuscmtitem-hover'); onmouseout=$(this).delClass('statuscmtitem-hover');":"";
object.extend(_89,_8a);
_89.hiddenBtns=_8a&&_8a.hiddenBtns?"display:none;":"";
if(!Array.isArray(_89.comments)){
_89.comments=[_89.comments];
}
_89.comments.forEach(function(_8d){
_8d.liveUserClass=_8d.keepUse?"lively-user":"";
_8d.liveUserTitle=_8d.keepUse?"\u8fde\u7eed\u767b\u5f557\u5929, \u5373\u53ef\u83b7\u5f97\u6a59\u540d\u7279\u6743":_8d.name;
_8d.reportUrl=_47(_88,_8d);
_8d.iconUrl=_8d.vipIconUrl;
_8d.type=_88.type;
_8d.showIlike=!_8d.vocal_url;
if(_8d.showIlike){
_8d.lkUrl=_49(_88);
_8d.lkIslike=_8d.liked||0;
_8d.lkContent=_8d.likeCount>0?_8d.likeCount:"";
_8d.lkClass=_8d.liked?"ilike_comment_icon ilike_comment_liked":"ilike_comment_icon";
}
_8d.showReply=(_8b!==_8d.author);
_8d.showDelete=_4a(_88,_8d);
if(_8d.vocal_url&&_8d.vocal_length){
var reg=/^回复.+[:：](?!\/)/,_8f=reg.test(_8d.body)?_8d.body.match(reg)[0]:"",_90,_91;
_91={url:_8d.vocal_url,time:_8d.vocal_length,ownerId:_8d.replyerId,voiceId:_8d.commentId,sourceOwner:_88.owner,sourceId:_88.id,ugcType:_88.typeNum};
_90="<a class=\"vocal-player vocal-player-tiny href=\"javascript:;\" data-vocal={{dataVocal}} >                    <span class=\"btn\"></span>                    <span class=\"time\"><span class=\"num\">{{vocal_length}}</span>\u79d2</span>                </a>";
_8d.cmtBody=_8f+Mustache.to_html(_90,{"vocal_length":_91.time,"dataVocal":JSON.stringify(_91)});
}else{
_8d.cmtBody=_8d.body;
}
});
};
share_init_textarea=function(_92,_93,_94){
if(_93){
_4f({"id":_92,"type":_93,"owner":_94});
return;
}
object.use("xn.mention",function(_95,xn){
xn.mention.Mention.init([{obj:$("comment"+_92),button:$("mentionBtn"+_92),ugcId:"",ugcType:"share",ownerId:XN.user.id}]);
});
XN.loadFiles(["http://s.xnimg.cn/csspro/module/minieditor.css","http://s.xnimg.cn/jspro/xn.ui.emoticons.js"],function(){
setTimeout(function(){
new XN.ui.emoticons({input:$("comment"+_92),button:$("addEmoBtn"+_92),btnAlignType:"4-1",url:"http://status.renren.com/getubblist.do?type=2"});
},0);
});
};
share_show_comments=function(_97,_98){
var _99=_1.getElement("#boxcont_"+_97),url="http://share."+XN.env.domain+"/share/comment/getcomments",_9b=_1.getElement("#show_link_"+_97),_9c=_1.getElement("#show_link_"+_97).getElement(".change-text"),_9d;
_9d={shareId:_97,owner:_98,commentId:0};
if(!_99.getAttribute("inited")){
new XN.net.xmlhttp({url:url,data:XN.array.toQueryString(_9d),onSuccess:function(r){
var _9f=_21(JSON.parse(r.responseText),_97,_98,true);
_99.innerHTML=_9f;
_99.show();
_9b.addClass("icon-open");
_9c.setHTML("\u6536\u8d77\u8bc4\u8bba");
_99.setAttribute("inited",true);
share_init_textarea(_97);
share_reply_comment(_97);
},onError:function(){
alert("\u52a0\u8f7d\u56de\u590d\u5931\u8d25");
}});
}else{
_99.toggle();
_9b.toggleClass("icon-open");
if(_9b.hasClass("icon-open")){
_9c.setHTML("\u6536\u8d77\u8bc4\u8bba");
share_reply_comment(_97);
}else{
_9c.setHTML("\u8bc4\u8bba");
}
}
try{
_3("show",_97,_98);
}
catch(e){
}
};
share_reply_comment=function(_a0,id,_a2,cid,_a4){
var _a5=$("comment_form_"+_a0),_a6;
if($("doShare"+_a0)){
$("doShare"+_a0).checked=false;
}
if(_a4){
ugc_reply_comment({"id":_a0,"type":_a4},id,_a2,cid);
return;
}
if(!id){
new XN.FORM.inputHelper(_a5.comment).focus();
}else{
_a5.repetNo.value=id;
if(cid){
_a5.replyToCommentId.value=cid;
}
if(!window._replyTextFix){
window._replyTextFix={};
}
_a6=_a5.comment.value;
if(!!_replyTextFix[_a0]){
_a6=_a6.replace(_replyTextFix[_a0].preText,"");
}
_replyTextFix[_a0]={preText:"\u56de\u590d"+_a2+":"};
_a5.comment.value=_replyTextFix[_a0].preText+_a6;
new XN.FORM.inputHelper(_a5.comment).focus();
}
};
share_add_comment_submit=function(_a7,_a8,_a9,_aa,_ab){
if(_aa){
if(_ab){
_ab=JSON.parse(_ab);
}
ugc_add_comment_submit({"id":_a7,"owner":_a8,"type":_aa},_a9,_ab);
return;
}
var _ac=$("comment_form_"+_a7),_ad=_ac.comment.value,_ae=$("ajax_msgerror"),url="http://share."+XN.env.domain+"/share/comment/addterm",d;
if(XN.STRING.isBlank(_ad)){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
return false;
}
if(_ad.length>500){
XN.DO.showError("\u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc7500\u5b57");
return false;
}
if(_ae){
_ae.parentNode.removeChild(_ae);
}
d=XN.form.serialize("comment_form_"+_a7,"hash");
if(_a()=="allCmts"){
d.all=1;
}
_ac.submit_comment.disabled=true;
new XN.net.xmlhttp({url:url,data:XN.form.serialize("comment_form_"+_a7),onSuccess:function(r){
var _b2=JSON.parse(r.responseText),_b3,_b4;
if(_b2.code!=0){
if(_b2.needVerfy==1||_b2.needVerfy==2){
if(!$("shareVerify_"+_a7)){
return;
}
if($("shareVerify_"+_a7).style.display!="none"){
XN.DO.alert("\u60a8\u7684\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u9a8c\u8bc1\u7801");
}
if(_b2.needVerfy==2){
$("shareVerify_"+_a7).needVerify2=true;
}else{
$("shareVerify_"+_a7).needVerify2=false;
}
try{
_b3=$("shareVerifyPic_"+_a7);
if(!_b3){
var img=new Image();
img.className="validate-num";
img.id="shareVerifyPic_"+_a7;
img.onclick=function(){
this.src+=Math.random();
return false;
};
img.style.verticalAlign="middle";
img.src="http://icode."+XN.env.domain+"/getcode.do?t=shareInfoCode"+_a7+"&r="+Math.random();
$("shareVerify_"+_a7).appendChild(img);
}else{
_b3.src+=Math.random();
_b3.show();
}
$("shareVerify_"+_a7).show();
}
catch(e){
XN.log(e.description);
}
}else{
XN.DO.showError(_b2.msg);
}
}else{
var msg=JSON.parse(_b2.msg),_b7,_b8;
_b7=_2d({comments:msg},_a7,_a8);
_b8=_1.getDom(_b7).firstChild;
_e(_b8,_a7);
XN.app.share.fireEvent("commentSubmitSuccess");
if($("shareVerify_"+_a7)&&$("shareVerify_"+_a7).needVerify2){
$("shareVerify_"+_a7).hide();
}
if($("comment"+_a7)){
$("comment"+_a7).value="";
}
try{
if(!!$("doShare"+_a7)&&$("doShare"+_a7).checked){
_19(d,_a9);
}
if(!!$("doShare")&&$("doShare").checked){
_19(d,_a9);
}
if(!!$("doShare")){
$("doShare").checked=false;
$("doShare").disabled=false;
}
if(!!$("doShare"+_a7)){
$("doShare"+_a7).checked=false;
$("doShare"+_a7).disabled=false;
}
if($("sysnblog")){
$("sysnblog").checked=true;
$("sysnblog").disabled=false;
}
}
catch(e){
XN.log(e.description);
}
}
if($("shareVerifyPic_"+_a7)&&$("shareInfoCode"+_a7)){
$("shareVerifyPic_"+_a7).src+=Math.random();
$("shareInfoCode"+_a7).value="";
$("shareInfoCode"+_a7).blur();
}
_ac.submit_comment.disabled=false;
if(_b2==0){
_ac.comment.value="";
_ac.repetNo.value=0;
_ac.replyToCommentId.value=0;
}
},onError:function(){
alert("\u56de\u590d\u5931\u8d25");
_ac.submit_comment.disabled=false;
}});
};
share_delete_comment=function(obj,_ba,_bb,_bc,_bd,_be){
if(_bd){
ugc_delete_comment({"id":_ba,"owner":_bb,"type":_bd},_bc,_be);
return;
}
var _bf="\u786e\u5b9a\u8981\u5220\u9664\u5417?";
if(XN.page&&XN.page.data&&(XN.page.data.type==1||XN.page.data.type==3)&&XN.page.data.isAdmin){
_bf+="<label style=\"display:block;margin-top:5px;\"><input id=\"banReply\" type=\"checkbox\" value=\"1\"> \u540c\u65f6\u5c06\u8be5\u7528\u6237\u52a0\u5165\u9ed1\u540d\u5355</label>";
}
XN.DO.confirm({title:"\u5220\u9664\u8be5\u8bc4\u8bba",msg:_bf,callBack:function(r){
if(r){
var _c1=_b(_bc),_c2;
_c2={share_id:_ba,share_owner:_bb,comment_id:_bc};
try{
var _c3=Sizzle("#comment_"+_bc+" > a.avatar")[0].getAttribute("href");
_c3=_c3.match(/\bid=(\d+)\b/)[1];
var ban=jQuery("#banReply").is(":checked")?1:0;
if(ban){
jQuery.post("http://page.renren.com/ajaxBanFans",{pid:XN.page.data.id,ban:ban,createId:_c3});
}
}
catch(e){
XN.log(e);
}
new XN.NET.xmlhttp({url:"http://share."+XN.env.domain+"/share/deletecomment.do",data:"post="+encodeURIComponent(JSON.stringify(_c2)),onSuccess:function(){
_c1.dispose();
},onError:function(){
XN.Do.showError("\u5220\u9664\u9519\u8bef");
}});
}
}});
};
share_show_more_comments=function(_c5,_c6,_c7,_c8,_c9,_ca){
if(_c9){
if(_ca){
_ca=JSON.parse(_ca);
}
ugc_show_more_comments({"id":_c5,"owner":_c6,"type":_c9},_ca);
return;
}
var _cb=$("tempLoading_"+_c5),_cc,xhr,url;
if(_a()=="allCmts"){
url="http://share."+XN.env.domain+"/share/comment/moreurlcomment";
}else{
url="http://share."+XN.env.domain+"/share/comment/getcomments";
}
_cc={shareId:_c5,owner:_c6,commentId:_12(_c5,_c7)};
if(_a()=="allCmts"){
_cc.md5=XN.app.share.CommentManger.getOptions("shareUrlMd5");
}
xhr=new XN.net.xmlhttp({url:url,data:XN.array.toQueryString(_cc),onSuccess:function(r){
var _d0=JSON.parse(r.responseText),_d1,_d2,_d3;
_d2=_c7?$("boxcont_"+_c7+"_"+_c5):$("boxcont_"+_c5);
if(_d0.code!==0){
XN.DO.alert(_d0.msg);
return;
}
if(!_d0.hasMore){
_7(_c5,_c7).getElement("#showMore_"+_c5).hide();
}
_d0.hasMore=false;
_d1=_21(_d0,_c5,_c6,false,_c7,_c8);
_d3=_1.getDom(_d1).firstChild;
_d2.insertBefore(_d3,_d2.findFirstClass("statuscmtlist"));
},onError:function(r){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
}});
};
function share_show_add_comment(obj,_d6){
var _d7=obj.parentNode;
remove_node(_d7);
var _d8=$("add_comment_input"+_d6);
show(_d8);
var _d9=$("add_comment_button"+_d6);
_d9.disabled=false;
var _da="comment"+_d6;
$(_da).focus();
return false;
}
ugc_show_comments=function(_db,_dc,_dd){
var _de=_43(_db,_dc,_dd),_df;
_df=_46(_db);
_df.setHTML(_de);
};
ugc_reply_comment=function(_e0,uid,_e2,cid){
var _e4=_45(_e0),_e5;
if(!uid){
new XN.FORM.inputHelper(_e4.comment).focus();
}else{
_e4.repetNo.value=uid;
if(cid){
_e4.replyToCommentId.value=cid;
}
window._replyTextFix=window._replyTextFix||{};
_e5=_e4.comment.value;
if(_replyTextFix[_e0.id]){
_e5=_e5.replace(_replyTextFix[_e0.id].preText,"");
}
_replyTextFix[_e0.id]={preText:"\u56de\u590d"+_e2+":"};
_e4.comment.value=_replyTextFix[_e0.id].preText+_e5;
new XN.FORM.inputHelper(_e4.comment).focus();
}
};
ugc_fresh_code=function(_e6){
return true;
};
ugc_append_comment=function(_e7,_e8,_e9,_ea){
var _eb=_43(_e7,_e8,_ea),_ec=_46(_e7),_ed;
_ed=_1.getDom(_eb);
_ec.grab(_ed,_e9);
};
ugc_add_comment_submit=function(_ee,_ef,_f0){
var _f1=_45(_ee),_f2=_4c(_ee),url=_4b(_ee,"add"),_f4=_f1.comment.value,d;
if(_4d(_ee)){
_f1.submit_comment.disabled=true;
_f2&&_f2.dispose();
d=XN.form.serialize(_f1,"hash");
new XN.net.xmlhttp({url:url,data:XN.form.serialize(_f1),onSuccess:function(r){
var _f7=JSON.parse(r.responseText);
if(_f7.code!=0){
if(_f7.needVerfy==true){
ugc_fresh_code(_ee,true);
}else{
XN.DO.showError(_f7.msg);
}
}else{
ugc_append_comment(_ee,{"comments":_f7},"bottom",_f0);
ugc_fresh_code(_ee);
_4e(_ee,_ef);
}
_44(_ee);
},onError:function(){
XN.Do.showError("\u56de\u590d\u5931\u8d25");
_f1.submit_comment.disabled=false;
}});
}
};
ugc_show_more_comments=function(_f8,_f9){
var url=_4b(_f8,"more"),_fb=_50(_f8),_fc;
_fc=_40(_f8,{"id":_fb.id.match(/\d+/)[0]},"more");
new XN.net.xmlhttp({url:url,data:_fc,onSuccess:function(r){
var _fe=JSON.parse(r.responseText),_ff,_100,_101;
if(_fe.code!==0){
XN.DO.alert(_fe.msg);
return;
}
_51(_f8);
ugc_append_comment(_f8,_fe,"top",_f9);
},onError:function(r){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
}});
};
ugc_delete_comment=function(_103,_104,_105){
var url=_4b(_103,"delete"),msg="\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u8bc4\u8bba\u5417\uff1f",_108="\u5220\u9664\u8be5\u8bc4\u8bba",_109;
_109=_40(_103,{"id":_104,"owner":_105},"delete");
XN.Do.confirm({title:_108,msg:msg,callBack:function(r){
if(r){
new XN.NET.xmlhttp({url:url,data:_109,onSuccess:function(){
_53(_103,_104);
},onError:function(){
XN.Do.showError("\u5220\u9664\u9519\u8bef");
}});
}
}});
};
ugc_select_button=function(_10b,_10c,_10d){
var _10e=_41(_10c),_10f=_42(_10c);
if(_10e&&_10f&&_10b.checked){
switch(_10d){
case "doShare":
_10f.checked=false;
break;
case "whisper":
_10e.checked=false;
break;
}
}
};
})();

