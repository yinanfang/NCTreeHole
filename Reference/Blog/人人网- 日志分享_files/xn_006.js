(function(){
var _1={AD_PREFIX:"ad",AD1_PREFIX:"ad1",ADBOX_PREFIX:"adbox",CUPID_PREFIX:"cupid",ID:"id",JOINCHAR:"_",WIDGET_STEP_DEFAULT:"0",JEBE_JSON:"jebe_json",JEBE_TEMPLATE:"jebe_template",AD_WIDGETDATA_NOTSET:"notset",TEMP_DIV_ID:"jebe_ad_prepare",NEXTLOADTIME_DEFAULT:900000,ENDLESS_REFRESH_COUNT:-1,JOINCHAR_QUERY_REGEXP:/_/gm,JS_VERSION:jebe_json.ad_js_version};
var _2="";
var _3={RESOURCE_DOMAIN:"http://jebe.xnimg.cn/",WIDGETBOX_DOMAIN:"http://jebe.xnimg.cn/widgetbox/main/content/",PREVIEW_AD_URL:"http://bolt.jebe.renren.com/bolt/creative/widgetCreativeJson.htm?creativeID="};
if(!XN.jebe){
XN.jebe={};
}
var _4=XN.jebe;
XN.jebe.timestamp=(new Date).getTime();
XN.jebe.addRefreshButtonForNoTitle=function(_5,_6,_7){
if(!_5.isFirstAd||!_5.isShowButtonAdzone){
return;
}
var _8="has-flash";
var _9=_5.adzoneId+"_widgetRefresh_"+_5.time;
if(!_6||!_7[_6]){
var _a=$(_9);
if(_a&&_a.parentNode.className.indexOf(_8)==-1){
_a.parentNode.className+=" "+_8;
_a.style.zIndex="9999";
}
}
};
XN.jebe.addWidgetBoxCss=function(){
var _b=document.createElement("style"),h=document.getElementsByTagName("head")[0],_c=".Widget .side-item{padding-top:10px;border-top:1px solid #CEE1EE}\t\t\t\t\t.Widget .share-sidebar .side-item-body,.Widget .side-item-body,#ad100000000001{padding:0 0 10px}\t\t\t\t\t.Widget .side-item-header{position:relative;margin:0;padding:0 0 8px;text-align:right}\t\t\t\t\t.Widget .side-item-header h4{float:left;color:#333;font-weight:bold}\t\t\t\t\t.Widget .side-item-header h4 .title{display:inline-block;width:180px}\t\t\t\t\t.Widget .side-item-header h4 .long_title{display:inline-block;width:100%;text-align:left}\t\t\t\t\t.Widget .side-item-header h4 span,.selfHelp .self-big h4.commonchar,.selfHelp .self-text h4.commonchar,.selfHelp .under h4.commonchar{font-weight:normal}\t\t\t\t\t.Widget .side-item-body .from-sponsor{color:#AAA}\t\t\t\t\t.Widget .side-item-body .btnspace{float:right;margin:10px 0 15px}\t\t\t\t\t.side-item .info p{overflow:hidden;word-wrap:break-word;word-break:break-all}\t\t\t\t\t.side-item-body .fans{margin:0 0 5px;line-height:18px;word-break:break-all;word-wrap:break-word}\t\t\t\t\t.side-item-body .fansapp{height:78px;margin:0 0 5px;line-height:18px;word-break:break-all;word-wrap:break-word}\t\t\t\t\t.side-item-body .infoapp{height:83px;margin:0 0 5px;line-height:18px;word-break:break-all;word-wrap:break-word}\t\t\t\t\t.side-item .footer a,.template .footer a img,.sponsors .footer a img,.wide-sponsors .footer a{text-decoration:none;outline:none;blr:expression(this.onFocus=this.blur())}\t\t\t\t\t.template .side-item-body p,.imgtemplate .side-item-body p,.sponsors .side-item-body p,.wide-sponsors .side-item-body p,.commend-page .side-item-body p,.selected .side-item-body p,.s4-preview-holder .sponsors .side-item-body p,.s4-preview-holder .wide-sponsors .side-item-body p{margin-bottom:.5ex}\t\t\t\t\t.template .figure,.selected .figure,.commend-page .figure,.sponsors .figure,.wide-sponsors .figure,.s4-preview-holder .template .figure,.s4-preview-holder  .sponsors .figure{float:left;margin-bottom:10px}\t\t\t\t\t.template .info{margin:0 0 10px 73px;color:#333}\t\t\t\t\t.sponsors .info{float:left;width:120px;height:83px;color:#333;font-size:12px}\t\t\t\t\t.wide-sponsors .info,.s4-preview-holder .sponsors .info{margin-left:108px;color:#333}\t\t\t\t\t.sponsors .side-item-header a,.wide-sponsors .side-item-header a,.sw_button_area .link,.selfHelp a,.nuomi-ad a{outline:none;blr:expression(this.onFocus=this.blur())}\t\t\t\t\t.commend-page .info{margin-left:85px;color:#333}\t\t\t\t\t.template .footer,.sponsors .footer,.wide-sponsors .footer,.s4-preview-holder .wide-sponsors .footer,.s4-preview-holder .sponsors .footer,.s4-preview-holder .template .footer,.wide-sponsors .side-item-header,.sponsors .side-item-body{clear:both}\t\t\t\t\t.wide-sponsors .footer a img{zoom:1}\t\t\t\t\t.template .info ul li a{display:inline-block}\t\t\t\t\t.sponsors .figure,.figure{position:relative;*zoom:1}\t\t\t\t\t.sponsors .figure{position:inherit;margin-right:8px}\t\t\t\t\t.template .play,.sponsors .play,.wide-sponsors .play{display:block;position:absolute;left:0;top:0;width:100px;height:80px;background:url(http://jebe.xnimg.cn/default/img/play2_1.gif) no-repeat center center;text-indent:-9999px;outline:0;opacity:.9;*filter:alpha(opacity=90)}\t\t\t\t\t.template .play:hover,.sponsors .play:hover,.wide-sponsors .play:hover{background:url(http://jebe.xnimg.cn/default/img/play2_2.gif) no-repeat center center}\t\t\t\t\t.template .play{width:64px;height:64px;background:url(http://jebe.xnimg.cn/default/img/play_a.png) no-repeat center center}\t\t\t\t\t.template .play:hover{background:url(http://jebe.xnimg.cn/default/img/play_b.png) no-repeat center center}\t\t\t\t\t.sponsors .play:hover{background-image:url(http://jebe.xnimg.cn/default/img/play21.gif)}\t\t\t\t\t.wide-sponsors .play{width:220px;height:120px}\t\t\t\t\t#sponsorsWidget a.link img{*position:relative;zoom:1}\t\t\t\t\ta.text,.s4-preview-holder a.text{color:#333;text-decoration:none}\t\t\t\t\ta.text:hover{color:#333;text-decoration:none}\t\t\t\t\t#send-gift-form{margin-bottom:10px;padding-left:20px;background:url(http://jebe.xnimg.cn/default/img/gift.gif) no-repeat left 3px}\t\t\t\t\t#send-gift-form p.submit{text-align:right}\t\t\t\t\t#send-gift-form .input-text,#send-gift-form textarea{width:190px}\t\t\t\t\t.sent-gift:after{display:block;clear:both;height:0;content:'.';visibility:hidden}\t\t\t\t\t.sent-gift{margin-bottom:5px;padding:5px;background-color:#F0F5F8;*zoom:1}\t\t\t\t\t.sent-gift .avatar{float:left;margin-right:5px}\t\t\t\t\t.sent-gift .gift,.nuomi-ad .nuomi-city{float:right}\t\t\t\t\t.sent-gift p{word-wrap:break-word}\t\t\t\t\t.wide-sponsors .footer .link:hover,.sponsors .footer .link:hover{text-decoration:underline}\t\t\t\t\t#sponsorsAdFlash,#sponsorsComments .publisher .section,.widget-ad-for-56 .avatar,.ad-show-box .img img{float:left}\t\t\t\t\t#sponsorsComments{float:right;width:350px;height:360px;background:#FFF}\t\t\t\t\t#sponsorsComments .diggs{margin-bottom:1px;padding:5px 10px 0;border-bottom:1px solid #F0F5F8;background:#F0F5F8}\t\t\t\t\t#sponsorsComments .diggers:after{display:block;clear:both;content:'.'}\t\t\t\t\t#sponsorsComments .diggs p,.sw_operate_area,.sw_vote_item,.widget-ad-for-56 .detail h4{margin-bottom:5px}\t\t\t\t\t#sponsorsComments .diggers{margin-left:20px;*zoom:1}\t\t\t\t\t#sponsorsComments .diggers li{float:left;width:50px;height:69px;margin-right:10px;text-align:center;overflow:hidden}\t\t\t\t\t#sponsorsComments .diggers li .name{*margin-top:5px}\t\t\t\t\t#sponsorsComments .publisher{height:59px;margin:0 0 1px;padding:10px 15px;border-bottom:1px solid #F0F5F8;background:#F0F5F8;*zoom:1;*overflow:hidden}\t\t\t\t\t#sponsorsComments .publisher:after{display:block;clear:both;content:'.'}\t\t\t\t\t#sponsorsComments .publisher .figure,#sponsorsComments .comment .figure{_display:inline;float:left;margin-right:5px}\t\t\t\t\t#sponsorsComments .publisher textarea{width:276px;height:22px;margin-top:0;margin-bottom:5px;resize:none}\t\t\t\t\t#sponsorsComments .publisher .text-count{float:right;color:#AAA}\t\t\t\t\t#sponsorsComments .comments{height:227px;border-bottom:1px solid #C2D8E7;background:#FFF url(http://a.xnimg.cn/imgpro/homeAd/ex/renren-bg.png) no-repeat center top;overflow:auto;word-wrap:break-word}\t\t\t\t\t#sponsorsComments.diggers-showed .comments{height:158px}\t\t\t\t\t#sponsorsComments .more-comments{height:24px;_height:22px;padding-right:20px;background:#F0F5F8;line-height:24px;text-align:right;_overflow:hidden}\t\t\t\t\t#sponsorsComments .more-comments a{line-height:24px}\t\t\t\t\t#sponsorsComments .more-comments .count{float:left;margin-left:10px;color:#888}\t\t\t\t\t#sponsorsComments .comment{padding:5px 10px;border-bottom:2px solid #FFF;background:#F0F5F8}\t\t\t\t\t#sponsorsComments .comment .section p{line-height:15px}\t\t\t\t\t#sponsorsComments .comment .x-to-hide{float:right;text-indent:-9999px;outline:0}\t\t\t\t\t#sponsorsComments .comment .reply,.loadMask .maskView span,.loadMask-small .maskView span{margin-left:10px}\t\t\t\t\t.sw_mobile_num_input{width:120px;height:15px;padding:2px;color:#AAA;vertical-align:middle}\t\t\t\t\t.sw_button_img{margin-right:5px;vertical-align:middle}\t\t\t\t\t.ad_btn{position:absolute;left:0;bottom:0;padding:5px 0 7px 10px;text-align:left;z-index:1}\t\t\t\t\t.btn_bg,.btn_bg1{position:absolute;left:0;bottom:0;width:100%}\t\t\t\t\t.btn_bg_gray{background:#000;opacity:.50;filter:Alpha(Opacity=50)}.ad_btn a{display:inline-block;width:86px;height:21px;margin-bottom:2px;margin-top:5px;margin-left:1px;border:1px solid #8B8B8B;vertical-align:top;1margin-left:10px}\t\t\t\t\t.ad_btn a:hover{margin-bottom:0;margin-top:5px;border:1px solid #333;border-bottom:3px solid #333}\t\t\t\t\t#aShare{width:54px}\t\t\t\t\t.ad_join_btn{background:url(http://jebe.xnimg.cn/default/img/i-want-join-button.png) -1px -1px no-repeat}\t\t\t\t\t.ad_buy_btn{background:url(http://jebe.xnimg.cn/20100624/1755/a_main_L3gO_57_040250.png) -1px -1px no-repeat}\t\t\t\t\t.ad_download_btn{background:url(http://jebe.xnimg.cn/20100305/2006/a_main_hatH_ac_073157.png) -1px -1px no-repeat}\t\t\t\t\t.ad_share_btn{background:url(http://jebe.xnimg.cn/default/img/sw_share_button.png) -1px -1px no-repeat}\t\t\t\t\t.ad_like_btn{background:url(http://jebe.xnimg.cn/default/follow-button1.gif) -1px -1px no-repeat}\t\t\t\t\t.home .side-item .sw_mobile_backinfo li{margin-bottom:1px;padding:5px 3px 5px 5px;background:#F3FAFF}\t\t\t\t\t.sw_mobile_backinfo li .img{display:block;float:left}\t\t\t\t\t.sw_mobile_backinfo li .info_area{display:block;float:left;padding-left:5px}\t\t\t\t\t.sw_block,.widget-ad-for-56 .avatar img{display:block}\t\t\t\t\t.sw_mobile_backinfo li .info_area span,.selfHelp .will a,#ad1000000063 .will a{color:#888}\t\t\t\t\t.sw_mobile_backinfo li .info_area span span{color:#333;font-weight:700}\t\t\t\t\t.sw_vote_title{margin-bottom:10px;font-weight:700}\t\t\t\t\t.sw_vote_icon{background:url(http://jebe.xnimg.cn/default/img/someicons.gif) 0 1px no-repeat;vertical-align:middle}\t\t\t\t\t.sw_vote_title_text,.link img,.ad110429 input,.ad110429 label{vertical-align:middle}\t\t\t\t\t.sw_vote_item input{height:16px}\t\t\t\t\t.sw_vote_p{display:block;float:left;width:35px}\t\t\t\t\t.sw_vote_itemtext_holder{display:block;position:relative;float:left;width:170px;height:15px;padding-left:10px}\t\t\t\t\t.sw_vote_itemtext_holder .sw_vote_itemtext{position:absolute;left:9px;*top:2px;_top:0;vertical-align:middle;white-space:nowrap}\t\t\t\t\t.sw_vote_more{background:#005EAC;color:#FFF}\t\t\t\t\t.sw_vote_less{background:#CEE1EE;color:#666}\t\t\t\t\t.sw_vote_info{margin:12px 0;color:#888}\t\t\t\t\t.sw_vote_item input{font-family:tahoma, verdana, arial, STHeiTi, simsun, sans-serif;vertical-align:middle}\t\t\t\t\t.sw_vote_item label{font-weight:normal;font-family:tahoma, verdana, arial, STHeiTi, simsun, sans-serif;vertical-align:middle}\t\t\t\t\t.sw_button_area{margin-top:12px}\t\t\t\t\t.sw_button_area a:hover{text-decoration:none}\t\t\t\t\t.sw-refresh-button{display:block;position:absolute;top:-3px;right:0;width:14px;height:22px;background:url(http://a.xnimg.cn/imgpro/icons/wbPage.gif) no-repeat 0 0;text-indent:-9999px;z-index:999;overflow:hidden;outline:0 none}\t\t\t\t\t.sw-refresh-button:hover{background-position:0 -22px}\t\t\t\t\t.sw-x-button{display:none;position:absolute;top:-3px;right:0;width:14px;height:22px;background:url(http://jebe.xnimg.cn/default/img/action-bottons.gif) 0 -75px no-repeat;text-indent:-9999px;z-index:999;overflow:hidden;outline:0 none}\t\t\t\t\t.sw-x-button:hover{background-position:0 -116px}\t\t\t\t\t.sw-buttons-holder{position:absolute;top:0;right:0}\t\t\t\t\t.s4-preview-holder .side-item{margin-bottom:10px;border-bottom:1px solid #FFF}\t\t\t\t\t.s4-preview-holder .side-item-header{padding:0 0 8px;text-align:right}\t\t\t\t\t.s4-preview-holder .side-item-header h4{float:left;color:#333;font-size:12px;text-align:left}\t\t\t\t\t.s4-preview-holder .side-item-body,.wide-sponsors .side-item-body{padding:0 0 7px}\t\t\t\t\t.s4-preview-holder .sponsors .figure,.s4-preview-holder  .figure,.wide-sponsors,.sponsors,.ifr-wrap{position:relative}\t\t\t\t\t.s4-preview-holder .wide-sponsors .play{display:block;position:absolute;left:0;top:0;width:220px;height:120px;background:url(http://jebe.xnimg.cn/default/img/play1_1.gif) no-repeat scroll 85px 45px transparent;text-indent:-9999px;opacity:.9;outline:0 none}\t\t\t\t\t.s4-preview-holder .wide-sponsors .play:hover{background-position:85px -55px}\t\t\t\t\t.s4-preview-holder .template .info{margin:0 0 10px 73px;color:#333}\t\t\t\t\t#sponsorsWidget .sw-buttons-holder{top:0;zoom:1}\t\t\t\t\t.selfHelp{width:240px}\t\t\t\t\t.selfHelp div{padding:10px 0;_zoom:1;overflow:hidden}\t\t\t\t\t.selfHelp div.addedtop{width:213px;margin:0 auto;padding:22px 0 22px 5px;border:1px solid #B8D4E8!important;background:#F0F5F8}\t\t\t\t\t.selfHelp div.under .inner-under{border:none}\t\t\t\t\t.selfHelp div.under{width:240px;border-bottom:1px solid #CEE1EE}\t\t\t\t\t.selfHelp div.under a.closebtn,.selfHelp div.inner-under .closebtn,.self-big div.under a.closebtn,.self-big div.inner-under .closebtn{position:absolute;left:218px;top:10px;width:14px;height:14px;background:url(http://a.xnimg.cn/imgpro/bg/cs_home.png) no-repeat scroll -225px -24px transparent}\t\t\t\t\t.selfHelp div.under .closebtn:hover{background-position:-225px -38px}\t\t\t\t\t.selfHelp div.under .closebtn span,.selfHelp div.inner-under .closebtn span,.self-big div.under .closebtn span,.self-big div.inner-under .closebtn span,.has-flash a.advert-more,.Widget .has-flash a.advert-more,#ad100000000072 .selfHelp .has-flash a.advert-more,#adla100000000072 .selfHelp .has-flash a.advert-more,#ad100000000073 .selfHelp .has-flash a.advert-more,#ad100000000071 .selfHelp .has-flash a.advert-more,#ad100000000070 .selfHelp .has-flash a.advert-more{display:none}\t\t\t\t\t.selfHelp div.inner-under .closebtn:hover{background-position:-225px -38px}\t\t\t\t\t.selfHelp div.under .closebtn:hover{background-position:-225px -38px}\t\t\t\t\t.self-big div.inner-under .closebtn:hover{background-position:-225px -38px}\t\t\t\t\t.selfHelp .self-big h4,.selfHelp .self-text h4,.selfHelp .under h4{margin:0;padding:0 0 10px;border:none;font-weight:bold}\t\t\t\t\t.selfHelp .img{display:inline;float:left;width:77px;height:77px;margin:0 5px 0 10px;}\t\t\t\t\t.selfHelp img{display:block;margin:0 auto}\t\t\t\t\t.selfHelp .rr{margin:0 80px 0 5px;padding-left:13px;word-wrap:break-word}\t\t\t\t\t.selfHelp .rr.rrnew{margin:0 80px 0 5px;padding-left:0}\t\t\t\t\t.selfHelp .adr{display:inline-block;padding-top:5px;color:#5CBC5C}\t\t\t\t\t.selfHelp p a{color:#000}\t\t\t\t\t.selfHelp p a:link,.selfHelp p a:visited,.selfHelp p a:hover,.selfHelp p a:active{color:#000;text-decoration:none}\t\t\t\t\t.selfHelp .will{margin:0 10px 0 -2px;padding:0 0 10px;text-align:right}\t\t\t\t\t.self-big,.self-text{width:240px;padding:10px 0;border-bottom:1px solid #CEE1EE}\t\t\t\t\t.self-text .txt,.self-text .txt:hover{color:#000;text-decoration:none}\t\t\t\t\t.self-text .addr{color:#009600}\t\t\t\t\t.self-text a:hover{text-decoration:underline}\t\t\t\t\t.wide-sponsors .side-item-body{position:relative;padding:0 0 7px;z-index:999}\t\t\t\t\t.side-item-body .figureWide{position:absolute;top:0;right:0;z-index:999}\t\t\t\t\t.nobtborder{border-bottom:none!important}\t\t\t\t\t.noborder{border:none !important}\t\t\t\t\t.text-link-ad{padding:6px 0;font-weight:bold}\t\t\t\t\t.loadMask{position:absolute;top:121px;right:0;width:200px;height:40px;z-index:9999}\t\t\t\t\t.loadMask .maskBg,.loadMask-small .maskBg{position:absolute;left:3px;top:3px;width:200px;height:40px;background:#888;z-index:1;opacity:.3;filter:alpha(opacity=30)}\t\t\t\t\t.loadMask .maskView,.loadMask-small .maskView{position:absolute;left:0;top:0;width:198px;height:38px;border:1px solid #888;background:#FFF;line-height:38px;font-size:14px;z-index:100}\t\t\t\t\t.suspendWb{position:absolute;top:121px;right:0;width:297px;height:248px;z-index:9999}\t\t\t\t\t.side-item-body .userPic img{margin:0 0 4px;vertical-align:middle}\t\t\t\t\t.suspendWb .suspendBg,.suspendWb-small .suspendBg{position:absolute;left:3px;top:3px;width:297px;height:248px;background:#888;z-index:1;opacity:.3;filter:alpha(opacity=30)}\t\t\t\t\t.suspendWb .suspendView,.suspendWb-small .suspendView{position:absolute;left:0;top:0;width:295px;height:246px;border:1px solid #888;background:#FFF;z-index:100}\t\t\t\t\t.suspendWb .suspendView img,.suspendWb-small .suspendView img{border:0;vertical-align:middle}\t\t\t\t\t.loadMask-small{position:absolute;top:81px;right:120px;width:200px;height:40px;z-index:9999}\t\t\t\t\t.suspendWb-small{position:absolute;top:81px;right:120px;width:297px;height:248px;z-index:9999}\t\t\t\t\t.nuomi-ad .nuomi-ad-header{height:18px;padding:10px 10px 0 0}\t\t\t\t\t.nuomi-ad h4{float:left;width:80px}\t\t\t\t\t.nuomi-ad h4 a:link,.nuomi-ad h4 a:visited{color:#333}\t\t\t\t\t.nuomi-ad h4 a:hover{text-decoration:none}\t\t\t\t\t.nuomi-ad del{color:#888;text-decoration:line-through}\t\t\t\t\t.nuomi-ad-body a.nuomi-pic{float:left;width:150px;margin:4px 0 0}\t\t\t\t\t.nuomi-ad-body a.nuomi-title{float:left;margin:7px 0 4px;+margin-top:10px}\t\t\t\t\t.nuomi-ad-body p{float:left;width:100%}\t\t\t\t\t.nuomi-ad-body p a{display:inline-block;margin-right:10px}\t\t\t\t\t.nuomi-ad-body p a:link,.nuomi-ad-body p a:visited{color:#000}\t\t\t\t\t.nuomi-ad-body p a:hover{text-decoration:none}\t\t\t\t\t.ifr-wrap div{position:absolute;left:0;top:0;cursor:pointer}\t\t\t\t\t.navigation .banner .float-right{overflow:visible}\t\t\t\t\t.hideAd{display:block;position:absolute;bottom:0;right:-25px;width:12px;padding:5px;*padding-bottom:3px;background:#EEF5FB;line-height:12px;color:#779CB7;text-decoration:none;overflow:hidden}\t\t\t\t\t.hideAd:link,.hideAd:visited{color:#779CB7}\t\t\t\t\t.hideAd:hover{background:#CCE3F1;color:#779CB7;text-decoration:none}\t\t\t\t\t.praiseInfo .hasBg{display:block;padding:5px 0;background:#F3FAFF}\t\t\t\t\t.sw_backinfo .userPic img{position:relative;top:1px}\t\t\t\t\t.footer a{float:left;*padding-bottom:1px;outline:none}\t\t\t\t\t.footer a.sms-link{float:none}\t\t\t\t\t.wide-sponsors .side-item-header,.sponsors .side-item-header{height:15px}\t\t\t\t\t.side-item{*zoom:1}\t\t\t\t\t.share-ads,#ad100000000075 p{margin:0}\t\t\t\t\t.ad110429 .box{position:relative;padding:10px;background:#F0F5F8;background:#F0F5F8 url(http://jebe.xnimg.cn/default/img/logo.png) no-repeat 90% 90%}\t\t\t\t\t.ad110429 .tl,.ad110429 .tr,.ad110429 .bl,.ad110429 .br{position:absolute;width:4px;height:4px;background:url(http://jebe.xnimg.cn/default/img/corner.png) no-repeat;overflow:hidden}\t\t\t\t\t.ad110429 .tl{left:0;top:0;background-position:0 0}\t\t\t\t\t.ad110429 .tr{top:0;right:0;background-position:-4px 0}\t\t\t\t\t.ad110429 .bl{left:0;bottom:0;background-position:0 -4px}\t\t\t\t\t.ad110429 .br{bottom:0;right:0;background-position:-4px -4px}\t\t\t\t\t.ad110429 .box .icon{margin-right:8px}\t\t\t\t\t.ad110429 .box .ql,.ad110429 .box .qr{display:inline-block;width:10px;height:7px;background:url(http://a.xnimg.cn/imgpro/home/home_icon.png) no-repeat;vertical-align:top}\t\t\t\t\t.ad110429 .box .ql{margin-right:.5ex;background-position:0 -333px}\t\t\t\t\t.ad110429 .box .qr{margin-left:.5ex;background-position:-10px -333px}\t\t\t\t\t.ad110429 input{margin-right:3px}\t\t\t\t\t.ad110429 label{line-height:normal;font-weight:normal}\t\t\t\t\t.ad110429 li{margin-top:10px}\t\t\t\t\t.widget-ad-for-56{margin-bottom:8px;zoom:1;overflow:hidden}\t\t\t\t\t.widget-ad-for-56 .detail{margin-left:80px}\t\t\t\t\t.widget-ad-for-56 #content{width:auto!important;color:#333;text-decoration:none!important}\t\t\t\t\t.advert-con{position:relative;border:none !important;font-size:12px}\t\t\t\t\t.advert-con .advert-title{height:16px;padding-bottom:8px;line-height:16px}\t\t\t\t\t.advert-con .advert-title .advert-link:link,.advert-con .advert-title .advert-link:visited{color:#005EAC;font-weight:bold;font-size:12px;text-decoration:none}\t\t\t\t\t.advert-con .advert-title .advert-link:hover{color:#005EAC;text-decoration:underline}\t\t\t\t\t.advert-con .advert-more{display:block;position:absolute;top:0;right:0;width:25px;height:18px;background:url(http://jebe.xnimg.cn/default/newpager.png) no-repeat 0 -18px;text-indent:-9999em;z-index:1;overflow:hidden;outline:0 none}\t\t\t\t\t.advert-con .advert-more:hover{display:block;background-position:0 -90px}\t\t\t\t\t.advert-con:hover a.advert-more{display:block}\t\t\t\t\t.has-flash{behavior:expression(function(ele){ele.runtimeStyle.behavior='none';Expressions.pseudo.hover(ele, 'has-flash_hover')}(this))}\t\t\t\t\t.has-flash:hover a.advert-more,.has-flash_hover a.advert-more{display:block;position:absolute;top:0;right:23px;width:25px;height:18px;background:url(http://jebe.xnimg.cn/default/newpager.png) no-repeat 0 -18px;text-indent:-9999em;z-index:9999px;overflow:hidden;outline:0 none}\t\t\t\t\t.has-flash a.advert-more:hover{background-position:0 -90px;cursor:pointer}\t\t\t\t\t.advert-con .advert-main .side-item.wide-sponsors{margin-top:0 !important}\t\t\t\t\t#ad100000000072 .advert-con a.advert-more,#adla100000000072 .advert-con a.advert-more,#ad100000000073 .advert-con a.advert-more{top:13px}\t\t\t\t\t.Widget .advert-con a.advert-more{display:inline-block;position:absolute;top:10px;right:0;width:25px;height:18px;background:url(http://jebe.xnimg.cn/default/newpager.png) 0 -18px no-repeat;text-indent:-9999em;z-index:1;overflow:hidden;outline:0 none}\t\t\t\t\t.Widget .has-flash:hover a.advert-more,.Widget .has-flash_hover a.advert-more{display:inline-block;position:absolute;top:15px;right:5px;width:25px;height:18px;background:url(http://jebe.xnimg.cn/default/newpager.png) no-repeat 0 -18px;text-indent:-9999em;z-index:9999;overflow:hidden;outline:0 none}\t\t\t\t\t.Widget .advert-con .advert-more:hover{background-position:0 -90px;cursor:pointer}\t\t\t\t\t.Widget .has-flash a.advert-more:hover{background-position:0 -90px;cursor:pointer}\t\t\t\t\t#ad100000000072 .selfHelp .advert-con,#adla100000000072 .selfHelp .advert-con,#ad100000000073 .selfHelp .advert-con,#ad100000000071 .selfHelp .advert-con,#ad100000000070 .selfHelp .advert-con{padding:0;border-top:1px solid #CEE1EE !important}\t\t\t\t\t#ad100000000072 .selfHelp .advert-con .advert-main,#adla100000000072 .selfHelp .advert-con .advert-main,#ad100000000073 .selfHelp .advert-con .advert-main,#ad100000000071 .selfHelp .advert-con .advert-main,#ad100000000070 .selfHelp .advert-con .advert-main{padding:0}\t\t\t\t\t#ad100000000072 .selfHelp .advert-con .advert-more,#adla100000000072 .selfHelp .advert-con .advert-more,#ad100000000073 .selfHelp .advert-con .advert-more,#ad100000000071 .selfHelp .advert-con .advert-more,#ad100000000070 .selfHelp .advert-con .advert-more{top:22px}\t\t\t\t\t#ad100000000072 .selfHelp .advert-con .advert-more:hover,#adla100000000072 .selfHelp .advert-con .advert-more:hover,#ad100000000073 .selfHelp .advert-con .advert-more:hover,#ad100000000071 .selfHelp .advert-con .advert-more:hover,#ad100000000070 .selfHelp .advert-con .advert-more:hover{background-position:-20px -38px;cursor:pointer}\t\t\t\t\t#ad100000000072 .selfHelp .has-flash:hover a.advert-more,#adla100000000072 .selfHelp .has-flash:hover a.advert-more,#ad100000000072 .selfHelp .has-flash_hover a.advert-more,#adla100000000072 .selfHelp .has-flash_hover a.advert-more,#ad100000000073 .selfHelp .has-flash:hover a.advert-more,#ad100000000073 .selfHelp .has-flash_hover a.advert-more,#ad100000000071 .selfHelp .has-flash:hover a.advert-more,#ad100000000071 .selfHelp .has-flash_hover a.advert-more,#ad100000000070 .selfHelp .has-flash:hover a.advert-more,#ad100000000070 .selfHelp .has-flash_hover a.advert-more{display:block;display:inline-block;position:absolute;top:15px;right:5px;width:25px;height:18px;background:url(http://jebe.xnimg.cn/default/newpager.png) no-repeat 0 -18px;text-indent:-9999em;z-index:9999px;overflow:hidden;outline:0 none}\t\t\t\t\t#ad1000000063 .under{padding:10px 0;border-bottom:1px solid #CEE1EE;line-height:140%}\t\t\t\t\t#ad1000000063 .under .rr{margin-right:5px}\t\t\t\t\t#ad1000000063 div h4{padding-bottom:10px}#ad1000000063 .selfHelp .img{margin-left:0}\t\t\t\t\t#ad1000000063 .will{clear:both;margin-right:10px;padding:0 0 10px;color:#888;text-align:right}\t\t\t\t\t#ad1000000063 p a:link,#ad1000000063 p a:visited,#ad1000000063 p a:hover,#ad1000000063 p a:active{color:#000;text-decoration:none}\t\t\t\t\t#ad1000000063 .under,#ad1000000063 div.nobtborder{margin-bottom:0!important}\t\t\t\t\t#ad1000000063 .selfHelp .img{width:85px}\t\t\t\t\t#ad1000000060 .wide-sponsors,#ad1000000060 .sponsors{position:static}\t\t\t\t\t#ad1000000060 .wide-sponsors .side-item-body{position:static;z-index:auto}\t\t\t\t\t#ad1000000060 .wide-sponsors .side-item-header,#ad1000000060 .sponsors .side-item-header{height:auto}\t\t\t\t\t#ad1000000060 .wide-sponsors .side-item-header,#ad1000000060 .sponsors .side-item-body{clear:none}\t\t\t\t\t.adspicholder{display:block;float:left;width:75px;heith:75px}\t\t\t\t\t.ads-wrap{margin:3px 0 0 85px;word-wrap:break-word;word-break:break-all}\t\t\t\t\t.ads-description{margin-top:5px;line-height:18px}\t\t\t\t\t.side-item  a.ads-linkout{display:inline;color:#888;text-decoration:none !important}\t\t\t\t\t.vote-con{margin-bottom:-5px9;font-size:12px;font-weight:normal}\t\t\t\t\t.vote-main li{position:relative;height:25px;margin-bottom:5px;background:#F7F7F7;*zoom:1}\t\t\t\t\t.vote-main li input,.vote-main li span{position:absolute;z-index:1}\t\t\t\t\t.vote-main li input{left:10px;top:6px;*top:2px}\t\t\t\t\t.vote-main li .choice-word{left:35px;top:6px;color:#000}\t\t\t\t\t.vote-main li .choice-percent{top:6px;right:5px}\t\t\t\t\t.vote-main li .choice-bg{position:absolute;left:0;top:0;width:0;height:25px;background:#D8DBE1}\t\t\t\t\t.side-item-body .voteUserPic,.vote-info .fans-avatar{display:inline-block;float:left;width:25px;height:25px;margin-right:5px;margin-top:2px}\t\t\t\t\t.side-item-body .voteUserPic img,.vote-info .fans-avatar img{width:100%;height:100%}\t\t\t\t\t.side-item-body .fans p{height:28px;padding-top:1px;line-height:1.2em}\t\t\t\t\t.fans-avatar-opt{display:inline-block;display:inline;float:left;width:25px;height:25px;margin:2px 5px 0 0;}\t\t\t\t\t.fans-avatar-opt img{float:left;width:100%;height:100%}\t\t\t\t\t.vote-main li .votePic{width:100%;margin-left:245px}\t\t\t\t\t.vote-info{margin-bottom:10px;margin-bottom:5px9}\t\t\t\t\t.vote-info p{margin:10px 0 6px;color:#666}\t\t\t\t\t.vote-info .vote-fans{*height:28px;min-height:28px}\t\t\t\t\t.vote-list li{background:none}\t\t\t\t\t.vote-list .voteTxt{position:absolute;left:0;width:240px;height:25px;background:#F7F7F7}\t\t\t\t\t.vote-list li .votePic{width:auto}\t\t\t\t\t.vote-list .votePic a{margin-top:0}\t\t\t\t\t.vote-list .votePic a img,.fans-avatar img{opacity:.4;filter:alpha(opacity=40)}\t\t\t\t\t.vote-list .votePic a:hover img,.fans-avatar:hover img,.vote-list .votePic .fans-self img{opacity:1;filter:alpha(opacity=100)}\t\t\t\t\t.vote-main .voteTxt .choice-word{top:2px}\t\t\t\t\t.ad-contrainer{padding:0;border-bottom:1px solid #CEE1EE;zoom:1}\t\t\t\t\t.ad-show-box{margin-bottom:0;padding-bottom:10px}\t\t\t\t\t.ad-show-box .header{position:relative;font-weight:bold}\t\t\t\t\t.ad-show-box .img{float:left;margin:0}\t\t\t\t\t.ad-show-box .discribe{float:right;width:130px;height:75px;font-family:'宋体';outline:0 none}\t\t\t\t\t.ad-show-box .ad-content{display:block;width:130px;height:75px;color:#000;text-decoration:none;word-wrap:break-word;word-break:break-all}\t\t\t\t\t.ad-show-box .close-btn{display:none;position:absolute;top:0;right:0;width:18px;height:18px;background:url(http://jebe.xnimg.cn/default/close-btn.png) 0 0 no-repeat;cursor:pointer;outline:medium none}\t\t\t\t\t.ad-show-box .close-btn:hover{background:url(http://jebe.xnimg.cn/default/close-hover.png) no-repeat 0 0;}\t\t\t\t\t.ad-show-box:hover .close-btn{display:block}\t\t\t\t\t.ad-show-box .footer{padding:6px 0 1px}\t\t\t\t\t.ad-show-box .footer a:hover{text-decoration:underline}\t\t\t\t\t.ad-show-box .footer .like-ad{padding:0 0 0 16px;background:url(http://jebe.xnimg.cn/default/iFeeds-and-Requests-101102.png) no-repeat scroll left -1559px transparent;*line-height:18px;_line-height:16px;cursor:pointer}\t\t\t\t\t.ad-close{padding:0 0 0 5px}\t\t\t\t\t.ad-close .close-reason{width:150px;color:#999}\t\t\t\t\t.ad-close .ad-confirm-btn,.ad-close .ad-cancel-btn{padding:1px 8px;border:1px solid #8B8B8B;background:url(http://jebe.xnimg.cn/default/icons2.png) no-repeat scroll -1px -300px transparent;color:#666;text-shadow:1px 1px #FFF}\t\t\t\t\t.thank-slogan{padding:10px;text-align:center}\t\t\t\t\t.thank-slogan .thanks{padding:20px 10px;border:1px solid #CFC274;background:#FFF9D7;line-height:20px;font-size:12px;font-family:'宋体','Microsoft Yahei','微软雅黑','黑体';-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}\t\t\t\t\t.ad-standard-65{margin-bottom:-7px;padding-top:10px}\t\t\t\t\t.sideBar .c .ad-area{padding-bottom:1px}\t\t\t\t\t#ad1000000060 .has-flash:hover a.advert-more{top:2px;right:2px}\t\t\t\t\t#ad1000000060 .has-flash_hover a.advert-more{top:2px;right:2px}\t\t\t\t\t.Widget #ad1000000060 .has-flash:hover a.advert-more{top:12px;right:2px}\t\t\t\t\t.Widget #ad1000000060 .has-flash_hover a.advert-more{top:12px;right:2px}\t\t\t\t\t#ad1000000065{margin-top:-5px}#ad100000000100{font-size:0}";
_b.setAttribute("id","jebe-widgetbox-style");
h.appendChild(_b);
if(_b.styleSheet){
_b.styleSheet.cssText=_c;
}else{
_b.appendChild(document.createTextNode(_c));
}
};
var _d=["100000000060","100000000065","100000000093"];
function _e(_f){
var _10=false;
for(var i=0;i<_d.length;i++){
if(_d[i]==_f){
_10=true;
break;
}
}
return _10;
};
function _11(_12,_13,_14,_15,_16){
if(!(_12==0&&_13)){
return _16;
}
var _17="<div class=\"advert-con\"><a class=\"advert-more\" name=\"jebe_button\" onfocus=\"this.blur();\" id=\""+_15+"_widgetRefresh_"+_14+"\" title=\"下一个更精彩\" href=\"javascript:;\">下一个更精彩</a><div class=\"advert-main\">";
var _18="</div></div>";
return _17+_16+_18;
};
function _19(_1a,_1b,_1c,_1d){
_1a.time=_1c;
_1a.isShowButtonAdzone=_1d;
_1a.isFirstAd=(_1b==0);
_1a.widgetRefresh=_1a.adzoneId+"_widgetRefresh_"+_1a.time;
};
var _1e={"conId":window["conId"],jebe:XN.jebe,isVip:XN.user.isVip,isHideAds:XN.user.hideAds,share:XN.app.share,IE:XN.browser.IE,loadFile:XN.loadFile,isBlank:XN.string.isBlank,sendStats:XN.net.sendStats,domReady:XN.dom.ready,extend:$extend,pointerX:XN.event.pointerX,pointerY:XN.event.pointerY,delEvent:XN.event.delEvent,addEvent:XN.event.addEvent,each:XN.array.each,getUid:function(){
return XN.cookie.get(_1.ID);
},getCreateId:function(){
return XN.string.getQuery("js_url");
},xmlHttp:function(obj){
return new XN.net.xmlhttp(obj);
},refreshOld:function(_1f){
if(XN.jebe.refreshOld){
XN.jebe.refreshOld(_1f);
}
}};
var _20={resetJebeJson:function(){
window[_1.JEBE_JSON]={};
},makeKeyForWidget:function(_21,_22,_23,_24){
var arr=[];
arr.push(_21);
arr.push(_22);
arr.push(_23);
if(_24){
arr.push(_24);
}
return arr.join(_1.JOINCHAR);
},fillUrlWithParams:function(url,obj){
var _25=0;
var _26="";
for(var key in obj){
if(_25==0){
_26+=key+"="+obj[key];
}else{
_26+="&"+key+"="+obj[key];
}
_25++;
}
var _27=url.indexOf("?")==-1?"?":"&";
return url+_27+_26;
}};
var _28=0;
var _29=[];
_4.Container=function(){
this.adzones={};
this.widgets={};
this.uid="0";
this.nextLoadTime=_1.NEXTLOADTIME_DEFAULT;
this.maxUpdateCount=0;
this.refreshIndex=0;
this.nextCheckTimer=null;
this.uniqId=_28++;
_29[this.uniqId]=this;
};
_4.Container.getCurrentLocation=function(url){
var l=url||location.href;
if(l.indexOf("?")>-1){
l=l.substring(0,l.indexOf("?"));
}
if(_1e.share&&_1e.share.pageInfo){
l=l+"?shareType="+_1e.share.pageInfo.type;
}
return l;
};
_4.Container.prototype={loadCurUserInfo:function(){
this.uid=_1e.getUid();
},loadDataFromJebeList:function(_2a){
try{
var _2b=this;
if(!(_2a&&_2a.list)){
this.clearAds();
}
_1e.each(_2a.list,function(i,_2c){
var _2d=_2b.updateOrInitAdzone(_2c);
_2b.clearAdzoneDomByAds(_2c);
_1e.each(_2c.ads,function(j,_2e){
var ad=new _4.Ad(_2e);
_2d.addAd(ad);
var _2f=_2b.getOrInitWidget(ad,_2c.adzone_id);
ad.setWidget(_2f);
});
});
}
catch(e){
console.error(e);
}
},loadDataFromJebeJson:function(_30){
if(_30.udpate_interval){
this.nextLoadTime=_30.udpate_interval*1000;
}
if(_30.max_update_count){
this.maxUpdateCount=_30.max_update_count;
}
this.loadCurUserInfo();
this.loadDataFromJebeList(_30);
},loadDataFromWidgetList:function(_31){
try{
var _32=this;
_1e.each(_31,function(i,_33){
var _34=_32.getWidgetByWidgetJson(_33);
if(_34){
_34.init(_33);
}
});
}
catch(e){
console.error(e);
}
},refreshSpecifyAdzones:function(_35,_36){
var _37=this;
this.updateByRefresh(_36);
var _38={"var":_1.JEBE_JSON,"userid":_37.uid,"refresh_source":_36,"refresh_idx":_37.refreshIndex,"next_load_time":_36!=0?0:_37.nextLoadTime,"tt":new Date().getTime(),"isvip":_1e.isVip,"hideads":_1e.isHideAds};
if(XN.pageId&&!_37.params.noNeedPageType){
_38.pageType=XN.pageId;
}
_38.r=encodeURIComponent(_4.Container.getCurrentLocation(_37.params.adInitLocation));
_38.type=".js";
var url=_20.fillUrlWithParams("http://ebp.renren.com/ebpn/show",_38);
_1e.loadFile(url,function(){
_37.loadDataFromJebeList(window[_1.JEBE_JSON]);
window[_1.JEBE_JSON]={};
_37.render();
_37.restartTimer();
});
},render:function(){
var _39=this;
var _3a=this.makeWidgetBoxQueryParam();
if(_3a.length==0){
this.renderAdzones();
JebeApi.CacheExcute();
return;
}
if(window[_1.JEBE_TEMPLATE]){
window[_1.JEBE_TEMPLATE]=null;
}
_1e.loadFile({type:"js",file:_39.makeWidgetBoxUrl(_3a)},function(){
_39.loadDataFromWidgetList(window[_1.JEBE_TEMPLATE]);
_39.renderAdzones();
JebeApi.CacheExcute();
},true);
},check:function(){
for(var key in this.adzones){
var _3b=this.adzones[key].adzoneId;
var con=$(_1.AD_PREFIX+_2+_3b);
if(con){
_1e.isBlank($(_1e.conId).innerHTML)?con.hide():con.show();
}
var _3c=$(_1.CUPID_PREFIX+_3b);
if(_3c){
_1e.isBlank($(_1e.conId).innerHTML)?_3c.hide():_3c.show();
}
}
},addWidget:function(_3d){
this.widgets[_20.makeKeyForWidget(_3d.widgetId,_3d.widgetVersion,_3d.adzoneId,_3d.step)]=_3d;
},addAdzone:function(_3e){
this.adzones[_3e.adzoneId]=_3e;
_3e.container=this;
},clearAds:function(){
for(var key in this.adzones){
this.adzones[key].ads=[];
}
},getOrInitWidget:function(ad,_3f){
var _40=ad.hasStep?_20.makeKeyForWidget(ad.widgetId,ad.widgetVersion,_3f,ad.widgetData.step):_20.makeKeyForWidget(ad.widgetId,ad.widgetVersion,_3f);
var _41=this.widgets[_40];
if(!_41){
_41=ad.hasStep?new _4.Widget(ad.widgetId,ad.widgetVersion,_3f,ad.widgetData.step):new _4.Widget(ad.widgetId,ad.widgetVersion,_3f);
this.addWidget(_41);
}
return _41;
},updateOrInitAdzone:function(_42){
var _43=this.adzones[_42.adzone_id];
if(_43){
_43.nextLoadTime=_42.next_load_time;
_43.ads=[];
}else{
_43=new _4.Adzone(_42);
this.addAdzone(_43);
}
return _43;
},clearAdzoneDomByAds:function(_44){
if(_44.ads.length==0&&$(_1.AD_PREFIX+_2+_44.adzone_id)){
$(_1.AD_PREFIX+_2+_44.adzone_id).innerHTML="";
}
},getWidgetByWidgetJson:function(_45){
var _46=_45.step&&_45.step!=_1.WIDGET_STEP_DEFAULT;
var _47=_46?_20.makeKeyForWidget(_45.widget_id,_45.widget_version,_45.adzone_id,_45.step):_20.makeKeyForWidget(_45.widget_id,_45.widget_version,_45.adzone_id);
return this.widgets[_47];
},updateByRefresh:function(_48){
if(_48!=0){
this.refreshIndex=0;
}else{
this.refreshIndex++;
}
clearTimeout(this.nextCheckTimer);
},restartTimer:function(){
var _49=this;
if(this.refreshIndex<this.maxUpdateCount||this.maxUpdateCount==_1.ENDLESS_REFRESH_COUNT){
this.nextCheckTimer=setTimeout(function(){
_49.refreshSpecifyAdzones(null,0);
},this.nextLoadTime);
}
},renderAdzones:function(){
for(var key in this.adzones){
this.adzones[key].render();
}
},makeWidgetBoxQueryParam:function(){
var _4a="";
for(var key in this.widgets){
if(key&&key!="toJSONString"&&!this.widgets[key].loaded){
_4a+=key.replace(_1.JOINCHAR_QUERY_REGEXP,",")+",runtime-";
}
}
return _4a==""?_4a:_4a.substr(0,_4a.length-1);
},makeWidgetBoxUrl:function(_4b){
return _3.WIDGETBOX_DOMAIN+_4b+"-jebe_template.";
}};
_4.Widget=function(_4c,_4d,_4e,_4f){
this.widgetId=_4c;
this.widgetVersion=_4d;
this.adzoneId=_4e;
this.loaded=false;
this.step=_4f;
};
_4.Widget.makeWidgetReplacePrefix=function(_50,_51){
var arr=[];
arr.push(_1.AD_PREFIX+_2+_50);
arr.push(new Date().getTime());
arr.push(_51);
return arr.join(_1.JOINCHAR);
};
_4.Widget.prototype={init:function(_52){
this.html=_52.html;
this.js=_52.js+";init(arguments[0], arguments[1], arguments[2]);";
this.placeholder=_52.placeholder;
this.loaded=true;
},prepareAdInAdzone:function(ad,_53,_54,_55,_56){
var _57=_4.Widget.makeWidgetReplacePrefix(ad.adId,_53.jebeAdboxCode);
this.createAdDomByWidget(ad,_53,_57,_54,_55,_56);
ad.addRedundanceFromWidget();
_19(ad.adParam,_54,_55,_56);
this.executeWidgetInitJs(ad,_57);
},createAdDomByWidget:function(ad,_58,_59,_5a,_5b,_5c){
var _5d=document.createElement("div");
var _5e=this.html.replace(new RegExp(this.placeholder,"gm"),_59);
_5e=_11(_5a,_5c,_5b,ad.widget.adzoneId,_5e);
_5d.innerHTML=_5e;
_5d=Sizzle("div",_5d)[0];
_58.appendChild(_5d);
},executeWidgetInitJs:function(ad,_5f){
try{
var h=this.html;
if(ad.widgetData!=null&&ad.widgetData!=_1.AD_WIDGETDATA_NOTSET){
(function(){
eval(arguments[3]);
})(ad.widgetData,ad.adParam,new _4.WidgetQuery(_5f),this.js);
}else{
(function(){
eval(arguments[2]);
})(ad.adParam,new _4.WidgetQuery(_5f),this.js);
}
}
catch(e){
console.error(e);
}
}};
_4.Ad=function(_60){
this.adId=_60.ad_param.creative_id;
this.widgetId=_60.widget_id;
this.widgetVersion=_60.widget_version;
if(_60.widget!=null&&_60.widget!=_1.AD_WIDGETDATA_NOTSET&&_60.widget!=""){
this.widgetData=typeof _60.widget=="string"?eval("("+_60.widget+")"):_60.widget;
}
this.hasStep=this.widgetData&&this.widgetData.step;
this.adParam=_60.ad_param;
};
_4.Ad.prototype={setWidget:function(_61){
this.widget=_61;
},addRedundanceFromWidget:function(){
this.adParam.adzoneId=this.widget.adzoneId;
this.adParam.widgetId=this.widget.widgetId;
this.adParam.widgetVersion=this.widget.widgetVersion;
this.adParam.step=this.widget.step;
}};
_4.Adzone=function(_62,_63){
_4.Adzone.initBasicAdzone(this,_62,_63);
_4.Adzone.addDom2Adzone(this);
_4.Adzone.dealSpecialAdzoneDom(this);
_4.Adzone.fillForSupportApp(this);
};
_4.Adzone.initBasicAdzone=function(_64,_65,_66){
_64.adzoneId=_65.adzone_id;
_64.nextLoadTime=_4.Adzone.makeNextLoadTimeByJson(_65);
_64.ads=[];
_64.refreshTimeRemain=_64.nextLoadTime;
_64.renderEle=_66;
};
_4.Adzone.addDom2Adzone=function(_67){
if(_67.renderEle!=null){
_67.con=_67.renderEle.parentNode;
_67.con.jebeAdboxCode=_1.ADBOX_PREFIX+_67.adzoneId;
_67.hasCon=true;
return;
}
var idd=_4.Adzone.makeSuffixByAdzoneId(_67.adzoneId);
_67.con=$(_1.AD1_PREFIX+idd)?$(_1.AD1_PREFIX+idd):$(_1.AD_PREFIX+_2+_67.adzoneId);
_67.hasCon=_67.con?true:false;
if(_67.hasCon){
_67.con.jebeAdboxCode=_1.ADBOX_PREFIX+_67.adzoneId;
}
};
_4.Adzone.dealSpecialAdzoneDom=function(_68){
if(_68.hasCon&&_4.Adzone.makeSuffixByAdzoneId(_68.adzoneId)=="000000065"){
_68.con.style.display="";
}
};
_4.Adzone.makeNextLoadTimeByJson=function(_69){
return _69.next_load_time?(_69.next_load_time>=60000?_69.next_load_time:60000):900000;
};
_4.Adzone.fillForSupportApp=function(_6a){
_6a.w=108;
_6a.isFirst=true;
_6a.defAds=["<div style=\"height:210px;overflow:hidden;border-bottom:1px solid #E9E9E9;text-align:left;display:table;*position:relative;width:100%;\"><div style=\"vertical-align:middle;display:table-cell;*position:absolute;*top:50%;\"><div style=\"width:104px;margin:0 auto;text-align:center;vertical-align:middle;*position:relative;*top:-50%;\"><strong><a href=\"http://wenda.renren.com\" target=\"_blank\" style=\"display:block; \">我的问题人人回答</a></strong> <a style=\"display:block;text-decoration:none;\" href=\"http://wenda.renren.com\" target=\"_blank\" > <img src=\"http://app.xnimg.cn/application/logo/20090923/14/55/L905376565791SJS.gif\" style=\"margin:10px 0;\"/> <p style=\"text-decoration:none;color:#808080;\">\"人人问答\"是人人网最新推出的问答互动平台，上\"人人问答\"，再多的问题也不怕！</p></a></div></div></div>","<div style=\"height:210px;overflow:hidden;border-bottom:1px solid\n#E9E9E9;text-align:left;display:table;*position:relative;width:100%;\">\n<div style=\n\"vertical-align:middle;display:table-cell;*position:absolute;*top:50%;\n\"> <div style=\"width:104px;margin:0\nauto;text-align:center;vertical-align:middle;*position:relative;*top:-50%;\"> <strong><a href=\"http://ads.renren.com\" style=\"display:block;\" target=\"_blank\" >人人广告精准投放</a></strong> <a style=\"display:block;text-decoration:none;\" href=\"http://ads.renren.com\" target=\"_blank\" > <img src=\"http://jebe.xnimg.cn/20100120/2055/a_main_xsOG_e0_040253.jpg\" style=\"margin:10px 0;\"/> <p style=\"text-decoration:none;color:#808080;margin-bottom:10px;\">为您提供精确到“人”的定向广告服务。操作简易、效果显著，广告也能DIY，赶快来试试吧</p> </a> </div> </div> </div>","<div style=\"height:210px;overflow:hidden;border-bottom:1px solid\n#E9E9E9;text-align:left;display:table;*position:relative;width:100%;\">\n<div style=\n\"vertical-align:middle;display:table-cell;*position:absolute;*top:50%;\n\"> <div style=\"width:104px;margin:0\nauto;text-align:center;vertical-align:middle;*position:relative;*top:-50%;\"> <strong><a href=\"http://apps.renren.com/petparty\" style=\"display:block;\" target=\"_blank\" >宠物派</a></strong> <a style=\"display:block;text-decoration:none;\" href=\"http://apps.renren.com/petparty\" target=\"_blank\" > <img src=\"http://jebe.xnimg.cn/20100120/2056/a_main_wOo9_e1_040253.JPG\" style=\"margin:10px 0;\"/> <p style=\"text-decoration:none;color:#808080;margin-bottom:10px;\">DIY你的宠物，每天都有新花样，无限精彩，尽在宠物派</p> </a> </div> </div> </div>"];
_6a.topCon=$(_1.CUPID_PREFIX+_6a.adzoneId);
_6a.hasTopCon=_6a.topCon?true:false;
_6a.subCons=[];
_6a.adboxCount=0;
if(_6a.hasTopCon){
var _6b=_6a.topCon.childNodes;
_1e.each(_6b,function(i,v){
if(v.nodeType==1){
_6a.subCons.push(v);
var _6c=v.childNodes;
v.adBoxes=[];
_1e.each(_6c,function(j,n){
if(n.nodeType==1){
n.jebeAdboxCode=_1.ADBOX_PREFIX+_6a.adzoneId+(++(_6a.adboxCount));
v.adBoxes.push(n);
}
});
}
});
}
};
_4.Adzone.makeSuffixByAdzoneId=function(_6d){
return (_6d+"").substr(3,10);
};
_4.Adzone.getOrInitInterimDom=function(){
var jj=$(_1.TEMP_DIV_ID);
if(!jj){
jj=document.createElement("div");
jj.style.height="0px";
jj.style.overflow="hidden";
jj.id=_1.TEMP_DIV_ID;
document.body.appendChild(jj);
}
return jj;
};
_4.Adzone.prototype={addAd:function(ad){
this.ads.push(ad);
},removeAll:function(){
this.ads.length=0;
},render:function(){
var _6e=new Date().valueOf();
var _6f=_e(this.adzoneId);
if(this.prepareAds(_6e,_6f)){
this.show(_6e);
}else{
this.refreshTimeRemain=this.nextLoadTime;
}
if(this.hasTopCon){
if(this.prepareCupidAds(_6e,_6f)){
this.showCupidAd();
}else{
this.refreshTimeRemain=this.nextLoadTime;
}
}
},prepareAds:function(_70,_71){
if(!this.hasCon){
return false;
}
var jj=_4.Adzone.getOrInitInterimDom();
jj.innerHTML="";
jj.jebeAdboxCode=this.con.jebeAdboxCode;
for(var i=0;i<this.ads.length;i++){
var ad=this.ads[i];
var _72=ad.widget;
if(_72.loaded){
_72.prepareAdInAdzone(ad,jj,i,_70,_71);
}
}
return true;
},show:function(_73){
var jj=_4.Adzone.getOrInitInterimDom();
this.con.innerHTML="";
if(jj){
this.addButton(jj,_73);
if(this.ads.length==2&&(this.adzoneId=="100000000065"||this.adzoneId=="100000000093")){
var _74=document.createElement("div");
_74.className="side-item ads-content";
var ads=document.createElement("div");
ads.className="side-item-body clearfix";
var ul=document.createElement("div");
while(jj.firstChild){
ul.appendChild(jj.firstChild);
}
ads.appendChild(ul);
_74.appendChild(ads);
this.con.appendChild(_74);
ul.lastChild.style.paddingTop="10px";
ul.lastChild.className="ad-standard-65";
}else{
if(this.ads.length==3||this.ads.length==2||(this.ads.length==1&&this.ads[0].adParam.engine&&this.ads[0].adParam.engine=="1"&&this.ads[0].widgetId=="33"&&this.adzoneId=="100000000075")){
var tt=document.createElement("div");
tt.className="selfHelp";
while(jj.firstChild){
tt.appendChild(jj.firstChild);
}
if(tt.lastChild.nodeType==3){
tt.lastElementChild.className="self-text nobtborder";
}else{
tt.lastChild.className="self-text nobtborder";
}
var kk=document.createElement("div");
kk.className="will";
if(this.adzoneId!="100000000072"&&this.adzoneId!="100000000070"){
var ll=document.createElement("a");
ll.innerHTML="我要推广";
ll.href="http://bolt.jebe.renren.com/introduce.htm";
ll.target="_blank";
kk.appendChild(ll);
}
tt.appendChild(kk);
this.con.appendChild(tt);
}else{
if(this.ads.length==5){
var ul=document.createElement("ul");
ul.className="banners";
ul.id="promotion_banners";
while(jj.firstChild){
ul.appendChild(jj.firstChild);
}
var _75=ul.getElementsByTagName("li");
var _76;
var _77;
for(var i=1;i<=_75.length;i++){
if(i==1){
_75[i-1].setAttribute("style","display: block;");
}
_75[i-1].setAttribute("switcher","banners_"+i);
}
if(ul.lastChild.nodeType==3){
ul.lastElementChild.className="self-text nobtborder";
}else{
ul.lastChild.className="self-text nobtborder";
}
var kk=document.createElement("div");
kk.className="will";
var ll=document.createElement("a");
ll.innerHTML="我要推广";
ll.href="http://bolt.jebe.renren.com/introduce.htm";
ll.target="_blank";
kk.appendChild(ll);
ul.appendChild(kk);
this.con.appendChild(ul);
}else{
if(this.ads.length==0){
return;
}
for(var i=0;i<jj.childNodes.length;i++){
var _78=jj.childNodes[i];
if(this.con.className==_78.className&&this.con.tagName==_78.tagName){
while(_78.firstChild){
this.con.appendChild(_78.firstChild);
}
}else{
this.con.appendChild(_78);
i--;
}
}
if(this.ads.length==1){
return;
}
if(this.con.lastChild.nodeType==3){
this.con.lastElementChild.className="self-text nobtborder";
}else{
this.con.lastChild.className="self-text nobtborder";
}
var kk=document.createElement("div");
kk.className="will";
var ll=document.createElement("a");
ll.innerHTML="我要推广";
ll.href="http://bolt.jebe.renren.com/introduce.htm";
ll.target="_blank";
kk.appendChild(ll);
this.con.appendChild(kk);
}
}
}
}
},addButton:function(_79,_7a){
if(this.ads){
for(var i=0;i<this.ads.length;i++){
if(this.ads[i].adParam&&this.ads[i].adParam.monitor_url){
var url=this.ads[i].adParam.monitor_url;
url=decodeURIComponent(url);
if(this.ads[i].adParam.engine=="0"){
url=url.replace(/\[timestamp\]/g,XN.jebe.timestamp);
}
url="http://"+url.replace("http://","");
var reg=new RegExp("(^http)://(\\w)+.(\\w)+");
if(reg.test(url)){
try{
_1e.sendStats(url);
}
catch(e){
console.error(e);
}
}
}
}
}
if(this.adzoneId!="100000000060"){
if(this.adzoneId!="100000000065"&&this.adzoneId!="100000000077"&&this.adzoneId!="100000000078"&&this.adzoneId!="100000000069"&&this.adzoneId!="100000000074"&&this.adzoneId!="100000000067"&&this.adzoneId!="100000000093"&&this.adzoneId!="100000000001"&&this.adzoneId!="100000000100"&&this.adzoneId!="100000000101"&&this.adzoneId!="100000020005"&&this.adzoneId!="100000020006"&&this.adzoneId!="100000020007"&&this.adzoneId!="100000020008"&&this.adzoneId!="100000020009"&&this.adzoneId!="100000020010"&&this.adzoneId!="100000020011"&&this.adzoneId!="100000020012"&&this.adzoneId!="100000020013"&&this.adzoneId!="100000020014"){
for(var p=0;p<_79.childNodes.length;p++){
if(_79.childNodes[p].nodeType==1&&!this.renderEle){
_79.childNodes[p].style.borderTop="1px solid #CEE1EE ";
break;
}
}
}
}
if(this.adzoneId=="100000000060"&&$("ad1000000060")&&$("ad1000000060").className!="Widget"&&(window.location+"").indexOf("#//")>-1){
if(_1e.IE){
if(_79.childNodes[0]){
_79.childNodes[0].style.borderTop="1px solid #CEE1EE";
}
}else{
if(_79.childNodes[1]){
_79.childNodes[1].style.borderTop="1px solid #CEE1EE";
}
}
}
this.addMouseEvent(this.adzoneId,_7a);
},addMouseEvent:function(_7b,_7c){
var _7d=_7b,_7e=this.container;
if(_7b=="100000000060"){
var _7f="ad1000000060";
}else{
if(_7b=="100000000065"){
var _7f="ad1000000065";
}else{
var _7f="ad"+_7b;
}
}
var _80="";
if(_7e.adzones[_7d].ads[0]&&_7e.adzones[_7d].ads[0].adParam){
_80=_7e.adzones[_7d].ads[0].adParam.click_url;
if(_7e.adzones[_7d].ads[0].adParam.engine==1){
_80=_80.replace(/(url=)[^&]+/g,"$1");
}
}
var mss=0;
var _81=true;
var i=0;
function _82(){
var sw=$(_7f);
var lx=[],ly=[];
lx[0]=function getleft(el){
var _83=el.offsetLeft;
if(el.offsetParent!=null){
_83+=arguments.callee(el.offsetParent);
}
return _83;
}(sw);
lx[1]=sw.offsetWidth+lx[0];
ly[0]=function gettop(el){
var _84=el.offsetTop;
if(el.offsetParent!=null){
_84+=arguments.callee(el.offsetParent);
}
return _84;
}(sw);
ly[1]=sw.offsetHeight+ly[0];
return function(e){
var e=e||window.event;
var x=_1e.pointerX(e);
var y=_1e.pointerY(e);
if(x>lx[1]||x<lx[0]||y>ly[1]||y<ly[0]){
_81=true;
_1e.delEvent("opi","mousemove",arguments.callee);
}
};
};
if(location.pathname.toLowerCase()=="/home.do"){
_1e.addEvent(_7f,"mouseover",function(){
if(_81&&(new Date()-mss)>1000){
_81=false;
mss=new Date();
_1e.addEvent("opi","mousemove",_82());
new Image().src=_80+"http://about:blank?abflag=mouseover&t="+Math.random();
}
});
}
var _85=function(_86){
return _86.getFullYear()+"-"+((_86.getMonth()+1)<10?"0":"")+(_86.getMonth()+1)+"-"+(_86.getDate()<10?"0":"")+_86.getDate()+" "+(_86.getHours()<10?"0":"")+_86.getHours()+":"+(_86.getMinutes()<10?"0":"")+_86.getMinutes()+":"+(_86.getSeconds()<10?"0":"")+_86.getSeconds();
};
var _87=function(ads){
var _88=[];
var _89=ads[0].adId;
var _8a=_89.substring(0,_89.length-5);
var _8b=_8a.substring(0,_8a.length-4);
_88.push(_8b);
_88.push(_8a);
_88.push(_89);
return _88;
};
var _8c=this.ads;
if($(_7b+"_widgetRefresh_"+_7c)){
_1e.addEvent(_7b+"_widgetRefresh_"+_7c,"click",function(){
_1e.refreshOld(0);
widget_refresh=1;
setTimeout(function(){
_7e.refreshSpecifyAdzones([_7d],3);
},100);
var _8d="http://rest.widgetbox.jebe.renren.com/widgetboxs/rest/widget?";
var _8e=encodeURIComponent(_85(new Date()));
var _8f=_87(_8c);
var _90=_8c[0].widgetId;
var _91=encodeURIComponent(location.href);
var _92=[];
_92.push(_8d);
_92.push("log_tag=widgetRefresh&count=1&member_id=0");
_92.push("&user_id="+XN.user.id);
_92.push("&adzone_id="+_7b);
_92.push("&time="+_8e);
_92.push("&campaign_id="+_8f[0]);
_92.push("&adgroup_id="+_8f[1]);
_92.push("&creative_id="+_8f[2]);
_92.push("&referer="+_91);
_92.push("&widget_id="+_90);
var _93=_92.join("");
new XN.net.xmlhttp({url:_93,method:"get",onSuccess:function(){
},onError:function(){
}});
return false;
});
}
},getCurAdBox:function(_94){
var _95=null;
var _96=this.getCurActiveCon();
if(_96!=null){
if(_94<_96.adBoxes.length){
_95=_96.adBoxes[_94];
}
}
return _95;
},getCurActiveCon:function(){
var _97=null;
for(var i=0;i<this.subCons.length;i++){
var v=this.subCons[i];
if(v.style.left==-this.w+"px"){
_97=v;
}
}
return _97;
},prepareCupidAds:function(_98,_99){
var _9a=this.getCurActiveCon();
if(_9a==null){
return false;
}
var _9b=0;
var _9c=_9a.adBoxes;
for(var i=0;i<this.ads.length&&_9b<_9c.length;i++){
var ad=this.ads[i];
var _9d=ad.widget;
if(_9d.loaded){
_9d.prepareAdInAdzone(ad,this.getCurAdBox(_9b++),i,_98,_99);
}
}
for(var j=0;j<this.defAds.length&&_9b<_9c.length;j++,_9b++){
_9c[_9b].innerHTML=this.defAds[j];
}
_9a.style.left=-this.w+"px";
return true;
},showCupidAd:function(){
var _9e=this;
var _9f=this.subCons;
var _a0=this.w,s=10;
var _a1=this.isFirst?0:1000;
this.isFirst=false;
setTimeout(function(){
(function(){
_a0=_a0-s;
if(_a0<0){
s+=_a0;
}
_1e.each(_9f,function(i,v){
if(v.nodeType!=1){
return;
}
var l=parseInt(v.style.left);
v.style.left=l+s+"px";
});
if(_a0>0){
setTimeout(arguments.callee,100);
}else{
_9e.refreshTimeRemain=_9e.nextLoadTime;
}
})();
},_a1);
}};
_4.WidgetQuery=function(_a2){
this.prefix=_a2;
};
_4.WidgetQuery.prototype={getElementById:function(id){
return $(this.prefix+id);
},getElementsByName:function(_a3){
return document.getElementsByName(this.prefix+_a3);
}};
_4.API={};
JebeApi=_4.API;
JebeApi.RequestCache=[];
JebeApi.CacheExcute=function(){
var _a4=JebeApi.RequestCache;
var _a5=[];
if(_a4.length>0){
for(var i=0;i<_a4.length;i++){
for(var a=0;a<_a4[i].requests.length;a++){
_a5.push(_a4[i].requests[a]);
}
}
var _a6=function(_a7){
var _a8=eval("{"+_a7.responseText+"}");
for(var j=0;j<_a8.length;j++){
if(_a5[j].callback){
_a5[j].callback(_a8[j]);
}
}
JebeApi.CacheClear();
};
var _a9=function(){
};
new XN.net.xmlhttp({url:"http://rest.widgetbox.jebe.renren.com/widgetboxs/rest/execute.htm",method:"post",data:"&content="+encodeURIComponent(XN.JSON.build(_a5)),onSuccess:_a6,onError:_a9});
}
};
JebeApi.CacheClear=function(){
JebeApi.RequestCache=[];
};
JebeApi.RestRequests=function(_aa,_ab,_ac){
this.uid=XN.cookie.get("id");
this.adID=_aa;
this.widgetID=_ab;
this.widgetVersion=_ac;
this.requests=[];
};
JebeApi.RestRequests.prototype={add:function(_ad,_ae){
_ad.uid=this.uid;
_ad.adID=this.adID;
_ad.widgetID=this.widgetID;
_ad.widgetVersion=this.widgetVersion;
_ad.callback=_ae;
this.requests.push(_ad);
},send:function(_af,_b0){
var _b1=this;
if(this.requests.length>0){
if(!_af){
_af=function(){
};
}
if(!_b0){
_b0=function(){
};
}
new XN.net.xmlhttp({url:"http://rest.widgetbox.jebe.renren.com/widgetboxs/rest/execute.htm",method:"post",data:"&content="+encodeURIComponent(XN.JSON.build(_b1.requests)),onSuccess:_af,onError:_b0});
}
},cache:function(){
JebeApi.RequestCache.push(this);
}};
JebeApi.RequestParam=function(_b2,_b3,_b4,key,_b5){
this.serviceType=_b2;
this.methodType=_b3;
this.parameter=_b4;
this.key=key;
this.concurrent=false;
};
JebeApi.PersonRequest={serviceType:"1",newActionRequest:function(_b6,_b7,_b8,_b9){
return new JebeApi.RequestParam(this.serviceType,_b6,_b7,_b8,_b9);
},getFriendList:function(_ba,_bb,_bc){
return this.newActionRequest("1",_ba,_bb,_bc);
},getFriendListByFans:function(_bd,_be,_bf){
return this.newActionRequest("2",_bd,_be,_bf);
},getFriendListByIsFans:function(_c0,_c1,_c2){
return this.newActionRequest("3",_c0,_c1,_c2);
},getFriendListByVoted:function(_c3,_c4,_c5){
return this.newActionRequest("4",_c3,_c4,_c5);
},getFriendListByZaned:function(_c6,_c7,_c8){
return this.newActionRequest("5",_c6,_c7,_c8);
},getFriendListByFansXce:function(_c9,_ca,_cb){
return this.newActionRequest("6",_c9,_ca,_cb);
},getFriendListByVotedHbase:function(_cc,_cd,_ce){
return this.newActionRequest("7",_cc,_cd,_ce);
},getFriendListByZanedHbase:function(_cf,_d0,_d1){
return this.newActionRequest("8",_cf,_d0,_d1);
},getFriendsListBySocial:function(_d2,_d3,_d4){
return this.newActionRequest("10",_d2,_d3,_d4);
},getCountBySocial:function(_d5,_d6,_d7){
return this.newActionRequest("11",_d5,_d6,_d7);
},getJoinedBySocial:function(_d8,_d9,_da){
return this.newActionRequest("12",_d8,_d9,_da);
},getFriendListByVideolikeHbase:function(_db,_dc,_dd){
return this.newActionRequest("14",_db,_dc,_dd);
}};
JebeApi.ActionRequest={serviceType:"2",newActionRequest:function(_de,_df,_e0,_e1){
return new JebeApi.RequestParam(this.serviceType,_de,_df,_e0,_e1);
},smsRequest:function(_e2,_e3,_e4){
return this.newActionRequest("4",_e2,_e3,_e4);
},becomeFansRequest:function(_e5,_e6,_e7){
return this.newActionRequest("5",_e5,_e6,_e7);
},isFans:function(_e8,_e9,_ea){
return this.newActionRequest("6",_e8,_e9,_ea);
},getFansCount:function(_eb,_ec,_ed){
return this.newActionRequest("7",_eb,_ec,_ed);
},getPageName:function(_ee,_ef,_f0){
return this.newActionRequest("8",_ee,_ef,_f0);
},vote:function(_f1,_f2,_f3){
return this.newActionRequest("9",_f1,_f2,_f3);
},getVoteCounts:function(_f4,_f5,_f6){
return this.newActionRequest("10",_f4,_f5,_f6);
},zan:function(_f7,_f8,_f9){
return this.newActionRequest("11",_f7,_f8,_f9);
},getZanCounts:function(_fa,_fb,_fc){
return this.newActionRequest("12",_fa,_fb,_fc);
},sendWidgetClickLog:function(_fd,_fe,_ff){
return this.newActionRequest("15",_fd,_fe,_ff);
},sendVideoLike:function(_100,_101,_102){
return this.newActionRequest("16",_100,_101,_102);
},getVideo:function(_103,_104,_105){
return this.newActionRequest("17",_103,_104,_105);
},setVideo:function(_106,_107,_108){
return this.newActionRequest("18",_106,_107,_108);
},AddPage2Friend:function(_109,_10a,_10b){
return this.newActionRequest("19",_109,_10a,_10b);
},likeAd:function(_10c,_10d,_10e){
return this.newActionRequest("20",_10c,_10d,_10e);
},unLikeAd:function(_10f,_110,_111){
return this.newActionRequest("21",_10f,_110,_111);
},getAdLikeCount:function(_112,_113,_114){
return this.newActionRequest("22",_112,_113,_114);
},getLikedAds:function(_115,_116,_117){
return this.newActionRequest("23",_115,_116,_117);
},blockAd:function(_118,_119,_11a){
return this.newActionRequest("24",_118,_119,_11a);
},sendFeed:function(_11b,_11c,_11d){
return this.newActionRequest("25",_11b,_11c,_11d);
}};
JebeApi.DataRequest={serviceType:"3",newDataRequest:function(_11e,_11f,_120,_121){
return new JebeApi.RequestParam(this.serviceType,_11e,_11f,_120,_121);
},newAddRequest:function(_122,key,_123,_124,_125){
return this.newDataRequest("1",{"primaryKey":_122,"key":key,"value":_123},_124,_125);
},newAddMuchRequest:function(_126,map,_127,_128){
return this.newDataRequest("2",{"primaryKey":_126,"map":map},_127,_128);
},newRemoveRequest:function(_129,key,_12a,_12b){
return this.newDataRequest("3",{"primaryKey":_129,"key":key},_12a,_12b);
},newRemoveMuchRequest:function(_12c,_12d,_12e){
return this.newDataRequest("4",{"primaryKey":_12c},_12d,_12e);
},newGetRequest:function(_12f,key,_130,_131){
return this.newDataRequest("5",{"primaryKey":_12f,"key":key},_130,_131);
},newGetMuchRequest:function(_132,_133,_134){
return this.newDataRequest("6",{"primaryKey":_132},_133,_134);
},newAddOneRequest:function(_135,_136,_137){
return this.newDataRequest("7",{"primaryKey":_135},_136,_137);
},voteRequest:function(_138,map,_139,_13a){
return this.newDataRequest("8",{"primaryKey":_138,"map":map},_139,_13a);
},getVoteCountRequest:function(_13b,key,_13c,_13d){
return this.newDataRequest("9",{"primaryKey":_13b,"key":key},_13c,_13d);
},zanRequest:function(_13e,map,_13f,_140){
return this.newDataRequest("10",{"primaryKey":_13e,"map":map},_13f,_140);
},getZanCountRequest:function(_141,key,_142,_143){
return this.newDataRequest("11",{"primaryKey":_141,"key":key},_142,_143);
},getQuestionaryList:function(_144,_145,_146){
return this.newDataRequest("13",_144,_145,_146);
},answerQuestionary:function(_147,_148,_149){
return this.newDataRequest("16",_147,_148,_149);
}};
var _14a=XN.cookie.get("id");
var _14b=[];
var _14c=_1e.getCreateId();
if($("sponsorsWidget")){
$("sponsorsWidget").id="ad1000000060";
$("ad1000000060").style.display="";
}
var _14d=null;
var _14e=null;
var _14f=900000;
var _150=20000;
var _151=new Array();
var _152=[1,1,1,1,1,1,1];
var _153=new Array();
var _154=new Date().valueOf();
function _155(_156){
var _157=_29[_28-1];
if(_151[_156]){
_151[_156]++;
}else{
_151[_156]=1;
}
if(_151[_156]>=_152[_156]){
var d=new Date().valueOf();
var max=_153[_156]||0;
if(d-_154>max){
_154=d;
_151[_156]=0;
_157.refreshSpecifyAdzones(null,_156);
}
}
};
_1e.jebe.refreshAd=_155;
(function(){
var _158=false;
var _159=function(o){
var r=o.url||location.href,_15a=o.container;
if(r.match(/http:\/\/huodong\.renren\.com\/renrenxiangai/ig)){
_15a.maxUpdateCount=0;
}else{
if(r.match(/http:\/\/www\.renren\.com\/home/ig)){
if((!o.container.adzones[100000000037]||_15a.adzones[100000000037].ads.length==0)&&(!_15a.adzones[100000000066]||_15a.adzones[100000000066].ads.length==0)){
if($("header-wide-banner")){
$("header-wide-banner").hide();
}
}
}else{
if(((!_15a.adzones[100000000003]||_15a.adzones[100000000003].ads.length==0)||(!_15a.adzones[100000000004]||_15a.adzones[100000000004].ads.length==0))&&((!_15a.adzones[100000000051]||_15a.adzones[100000000051].ads.length==0)||(!_15a.adzones[100000000052]||_15a.adzones[100000000052].ads.length==0))){
if($("banner")){
$("banner").hide();
}
if($("header-wide-banner")){
$("header-wide-banner").hide();
}
}
}
}
};
renderLater=function(o){
o.container.render();
_20.resetJebeJson();
_159(o);
(function(){
if(o.container.nextCheckTimer){
clearTimeout(o.container.nextCheckTimer);
o.container.refreshSpecifyAdzones(null,0);
}else{
if(o.container.maxUpdateCount>0||o.container.maxUpdateCount==-1){
o.container.nextCheckTimer=setTimeout(arguments.callee,o.container.nextLoadTime);
}
}
})();
};
previewAd=function(o){
var _15b=o.container;
jebe_ad_render=true;
_1e.xmlHttp({url:_3.PREVIEW_AD_URL+_14c,method:"get",onSuccess:function(req){
var _15c=eval("("+req.responseText+")"),_15d=_15b.adzones[_15c.adzone_id];
if(_15d){
_15d.removeAll();
}else{
_15d=new _4.Adzone({adzone_id:_15c.adzone_id});
_15b.addAdzone(_15d);
}
if(!_15c.data.ad_param.click_url){
_15c.data.ad_param.click_url="http://ebp.renren.com/ebpn/click.html?aid="+_14c+"&mc=7%5ec2305772640469516287%5ec"+_14c+"%5ec0%5ec0%5ec0%5ec0%5ec1289451174%5ec1000000_"+(_1e.getUid())+"%7c1%7c1983-01-01%7c27%7c4%7c0086110000000000%7c0_0086000000000000%7c0%7c0%7c0%7c0086110000000000%5ec100000000037%5ec10414574138294274&url=";
}
var ad=new _4.Ad(_15c.data);
_15d.addAd(ad);
var _15e=_15b.getOrInitWidget(ad,_15d.adzoneId);
ad.setWidget(_15e);
renderLater(o);
},onError:function(){
}});
};
renderOrShowLater=function(o){
o.container.loadDataFromJebeJson(o.adInitJson);
jebe_ad_render=false;
if(!o.createId){
renderLater(o);
return false;
}
previewAd(o);
};
_4.dispatcher=function(o){
_1e.extend(o.container,{params:o});
if(o.layerPrefix){
_2=o.layerPrefix;
}else{
_2="";
}
if(!_158&&!document.getElementById("jebe-widgetbox-style")){
XN.jebe.addWidgetBoxCss();
_158=true;
}
if(o.adInitJson){
renderOrShowLater(o);
}else{
var _15f={"userid":_1e.getUid(),"tt":new Date().getTime(),"isvip":_1e.isVip,"hideads":_1e.isHideAds,r:o.adInitLocation};
XN.loadFile({type:"js",file:"http://ebp.renren.com/ebpn/show?"+XN.array.toQueryString(_15f)},function(){
_1e.extend(o,{adInitJson:window[_1.JEBE_JSON]});
_20.resetJebeJson();
renderOrShowLater(o);
});
}
};
})();
_1e.domReady(function(){
_4.container=new _4.Container();
_4.dispatcher({createId:_1e.getCreateId(),container:_4.container,adInitJson:window[_1.JEBE_JSON],layerPrefix:""});
});
})();

