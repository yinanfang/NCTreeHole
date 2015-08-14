// JavaScript Document

var tm;
var tMenu;
var sectionMap = {red:{color:"#e04242",arrow:"redArrow"},orange:{color:"#f47d31",arrow:"orangeArrow"},maroon:{color:"#d31245",arrow:"maroonArrow"},blue:{color:"#14b6ea",arrow:"blueArrow"},green:{color:"#6fb118",arrow:"greenArrow"}}
var visibleArrow;
var addressInitialized = false;
var pendingSection;
var pendingSubSection;

var contentMap = {
	aboutUs:{
		content:"#whoWeAre_content",
		changebg:true,
		bgclass:"whoWeAre",
		sideContent:"whoWeAre_bubble",
		title:"About Us",
		paginate:true},
	whyWereDoingThis:{
		content:"#whyWereDoingThis_content",
		changebg:true,
		bgclass:"whyWereDoingThis",
		sideContent:"whyWereDoingThis_bubble",
		title:"Why We're Doing This",
		paginate:true},
	leadership:{
		content:"#ourPartners_content",
		changebg:true,
		bgclass:"ourPartners",
		sideContent:"ourPartners_bubble",
		title:"Leadership",
		paginate:true},
	news:{
		content:"#news_content",
		changebg:false,
		title:"News",
		paginate:true},
	blog:{
		content:"#blog_content",
		changebg:false,
		title:"Blog",
		paginate:true},
	blog_categories:{
		content:"#blog_categories_content",
		changebg:false,
		title:"Blog",
		paginate:true},
	media_documents:{
		content:"#media_documents_content",
		changebg:false,
		title:"Media Documents",
		paginate:false},
	make_a_donation:{
		content:"#make_a_donation_content",
		changebg:false,
		title:"Make a Donation",
		paginate:false},
	donate_an_object:{
		content:"#donate_an_object_content",
		changebg:false,
		title:"Donate an Object",
		paginate:false},
	legacy_giving:{
		content:"#legacy_giving_content",
		changebg:false,
		title:"Legacy Giving",
		paginate:true},
	get_involved:{
		content:"#get_involved_content",
		changebg:true,
		bgclass:"getInvolved",
		sideContent:"getInvolved_bubble",
		title:"Get Involved",
		paginate:true},
	volunteer:{
		content:"#volunteer_content",
		changebg:true,
		bgclass:"volunteer",
		sideContent:"volunteer_bubble",
		title:"Volunteer",
		paginate:false},
	become_a_partner:{
		content:"#become_a_partner_content",
		changebg:true,
		bgclass:"becomeAPartner",
		sideContent:"becomeAPartner_bubble",
		title:"Membership",
		paginate:true}
};

var museumPlanContentMap = {
	here_I_am_content:{
		content:"#here_I_am_content",
		title:"Exhibitions"},
	changing_exhibition_content:{
		content:"#changing_exhibition_content",
		title:"Changing Exhibition"},
	martini_bar_content:{
		content:"#martini_bar_content",
		title:"Martini Bar"},
	offices_behind_house_content:{
		content:"#offices_behind_house_content",
		title:"Offices"},
	collections_storage_content:{
		content:"#collections_storage_content",
		title:"Collections Storage"},
	multipurpose_meeting_content:{
		content:"#multipurpose_meeting_content",
		title:"Multi-Purpose Space"},
	lectures_films_content:{
		content:"#lectures_films_content",
		title:"Lectures and Films"},
	archives_research_content:{
		content:"#archives_research_content",
		title:"Archives and Research"},
	perfomring_arts_theatre_content:{
		content:"#perfomring_arts_theatre_content",
		title:"Performing Arts Theatre"},
	lobby_content:{
		content:"#lobby_content",
		title:"Lobby"},
	shop_content:{
		content:"#shop_content",
		title:"Shop"},
	restaurant_content:{
		content:"#restaurant_content",
		title:"Restaurant"}
}

var coreExhibitContentMap = {
	being_us_content:{
		content:"#being_us_content",
		title:"Being Us"},
	being_family_content:{
		content:"#being_family_content",
		title:"Being Family"},
	being_me_in_america_content:{
		content:"#being_me_in_america_content",
		title:"Being Me In America"},
	being_me_content:{
		content:"#being_me_content",
		title:"Being Me"},
	contemplateion_zone_content:{
		content:"#contemplateion_zone_content",
		title:"Contemplation Zone"}
}

$(document).ready(function(e) {
	$('#chargify').load('../wp-content/themes/Velvet/donate_form.php');
	
	$("#container").fadeIn();
	tMenu = new xylem.ToggleMenu($("#navButtons"),$("#navRevealArrows"));
	
	tm = new xylem.TransitionManager($('.scrollable'),$(window),onSectionChange,onSectionChangeFinished);
	tm.initialize();
	
	resizeReposition();
	$(window).resize(onWindiwResize);
	
	$(".contentButton").click(onContentButtonClick);
	
	$.address.init(function(e){
		addressInitialized = true;
		//initializes the page
		$(window).trigger('scroll');
	}).change(onAddressChange);
	
	$("#r_home #who_we_are_btn").goofyBackground();
	$("#r_home #make_a_donation_btn").goofyBackground({speedY:-1});
	$("#r_home #here_i_am_btn").goofyBackground({speedX:-1});
	
	$("#homeBubble").click(function(){
		$("#homeRolloverContent").fadeIn();
		$("#homeBubble").fadeOut();
	});
	
	$("#homeRolloverClose").click(function(){
		$("#homeRolloverContent").fadeOut();
		$("#homeBubble").fadeIn();
	});
	
	initPagination();
	
	//museum stuff
	
	$("#conceptual_space_plan_mp").click(resetMuseumPlan);
	$("#conceptual_space_plan_ce").click(resetMuseumPlan);
	
	$("#the_core_exhibit_mp").click(resetCoreExhibit);
	$("#the_core_exhibit_ce").click(resetCoreExhibit);
	
	$(".museumBubbleClicker").click(function(e) {
		$(".museumBubble").fadeTo("fast",.2);
        $(".museumBubble[data-id='"+$(this).attr("data-id")+"']").stop().fadeTo("fast",1);
		
		//$(this).parent().parent().paginationPlus({defaultHiddenSelector:contentMap[$(this).attr("data-content")].content});
		var myData = museumPlanContentMap[$(this).attr("data-content")]
		
		$("#museum_plan_content_sections .sectionTitle").find("h1").empty().text(myData.title);
		$("#museum_plan_content_sections .currentContent").hide().removeClass('currentContent');
		$("#museum_plan_content_sections "+myData.content).fadeIn().addClass('currentContent');
    });
	
	$(".coreExhibitClicker").click(function(e){
		var myData = coreExhibitContentMap[$(this).attr("data-content")];
		
		$("#the_core_exhibit_content_holder .sectionTitle").find("h1").empty().text(myData.title);
		$("#the_core_exhibit_content_holder .currentContent").hide().removeClass('currentContent');
		$("#the_core_exhibit_content_holder "+myData.content).fadeIn().addClass('currentContent');
		$("#the_core_exhibit_content_holder "+myData.content).paginationPlus();
	});
	
	// Reset tab stops
	$('input, select, textarea').each(function(indexInArray, valueOfElement) {
		$(this).attr('tabindex', 1000 + indexInArray);
	});
	
	initSectionResets();
	
	
});

function initSectionResets(){
	$("#l_who_we_are").data("resetFunction", resetAboutUs);
	$("#l_museum_plan").data("resetFunction", resetMuseumPlan);
	$("#l_the_core_exhibit").data("resetFunction", resetCoreExhibit);
	$("#l_blog").data("resetFunction", resetBlog);
	$("#l_news").data("resetFunction", resetNews);
	$("#l_donation").data("resetFunction", resetDonation);
	$("#l_get_involved").data("resetFunction", resetGetInvolved);
}


function resetMuseumPlan(){
	$(".museumBubble").fadeTo("fast",1);
	
	$("#museum_plan_content_sections .sectionTitle").find("h1").empty().text("Conceptual Space Plan");
	$("#museum_plan_content_sections .currentContent").hide().removeClass('currentContent');
	$("#museum_plan_content_sections #museum_plan_main_content").fadeIn().addClass('currentContent');
}

function resetCoreExhibit(){
	$("#the_core_exhibit_content_holder .sectionTitle").find("h1").empty().text("the Core Exhibit");
	$("#the_core_exhibit_content_holder .currentContent").hide().removeClass('currentContent');
	$("#the_core_exhibit_content_holder #core_exhibit_content").fadeIn().addClass('currentContent');
}

function resetAboutUs(){
	var addressArr = $.address.value().split("/");
	var addressSubSecVal = addressArr[2];
	
	if(addressSubSecVal == undefined || addressSubSecVal.length == 0)
	{
		softResetSubSection($("#who_who_we_are"));
	}
}

function resetBlog(){
	
	var addressArr = $.address.value().split("/");
	var addressSubSecVal = addressArr[2];
	
	if(addressSubSecVal == undefined || addressSubSecVal.length == 0)
	{
		softResetSubSection($("#mostRecent"));
	}
	
}

function resetNews(){
	var addressArr = $.address.value().split("/");
	var addressSubSecVal = addressArr[2];
	
	if(addressSubSecVal == undefined || addressSubSecVal.length == 0)
	{
		softResetSubSection($("#news_btn"));
	}
}

function resetDonation(){
	var addressArr = $.address.value().split("/");
	var addressSubSecVal = addressArr[2];
	
	if(addressSubSecVal == undefined || addressSubSecVal.length == 0)
	{
		softResetSubSection($("#make_a_donation_button"));
	}
}

function resetGetInvolved(){
	var addressArr = $.address.value().split("/");
	var addressSubSecVal = addressArr[2];
	
	if(addressSubSecVal == undefined || addressSubSecVal.length == 0)
	{
		softResetSubSection($("#get_get_involved"));
	}
}

function softResetSubSection(btn)
{
	btn.addClass("selected");
	btn.siblings().removeClass("selected");
		
	transitionContent(btn,btn.attr("data-content"),btn.attr("data-bg"));
}

function onAddressChange(e){
	var addressArr = e.value.split("/");
	var addressSecVal = addressArr[1];
	var addressSubSecVal = addressArr[2];
	
	pendingSection = addressSecVal;
	
	if(addressSecVal.length>0)tm.scrollToSection("#l_"+addressSecVal);
	if(addressSubSecVal && addressSubSecVal.length>0) pendingSubSection = addressSubSecVal;
	
	if((addressSecVal == pendingSection) && (addressSubSecVal && addressSubSecVal.length>0)) 
	{
		var subSectionBtn = $('.contentButton[data-content="'+addressSubSecVal+'"]');
		transitionContent(subSectionBtn,addressSubSecVal,subSectionBtn.attr("data-bg"));
	}
}

function onSectionChange(){
	$("#navButtons").stop();
	$("#navButtons").animate({backgroundColor:sectionMap[this.attr('data-color')].color});
	
	//$(".navArrow").stop();
	if(visibleArrow) visibleArrow.fadeOut();
	$("#"+sectionMap[this.attr('data-color')].arrow).fadeIn();
	
	visibleArrow = $("#"+sectionMap[this.attr('data-color')].arrow);
	
	if( $(this).attr("id") == $('.scrollable').last().attr("id"))
	{
		$("#footer").animate({"bottom":0});
	}
	else if(parseInt($("#footer").css("bottom"),10)==0)
	{
		$("#footer").animate({"bottom":-$("#footer").outerHeight(true)});
	}
}

function onSectionChangeFinished(vDiffSection){
	var addressArr = $.address.value().split("/");
	var addressSecVal = addressArr[1];
	var addressSubSecVal = (pendingSubSection && pendingSubSection.length>0)? pendingSubSection:"";
	var $me = $(this);
	
	$.address.value($me.attr('id').substring(2)+"/"+addressSubSecVal);
	$.address.update();
	
	var resetFunction = $me.data('resetFunction');
	if(resetFunction && vDiffSection) resetFunction.apply();
	if(pendingSubSection && pendingSubSection.length>0) 
	{
		//var subSectionBtn = $('.contentButton[data-content="'+pendingSubSection+'"]');
		//transitionContent(subSectionBtn,subSectionBtn.attr("data-content"),subSectionBtn.attr("data-bg"));
		pendingSubSection="";
	}
}

/** 
 * Initialisation function for pagination
 */
function initPagination() {
	/*$("#who_who_we_are").trigger('click');
	$("#news_btn").trigger('click');
	$("#get_get_involved").trigger('click');
	$("#make_a_donation_button").trigger('click');
	$("#mostRecent").trigger('click');*/
	
	transitionContent($("#who_who_we_are"),$("#who_who_we_are").attr("data-content"),$("#who_who_we_are").attr("data-bg"));
	transitionContent($("#news_btn"),$("#news_btn").attr("data-content"),$("#news_btn").attr("data-bg"));
	transitionContent($("#get_get_involved"),$("#get_get_involved").attr("data-content"),$("#get_get_involved").attr("data-bg"));
	transitionContent($("#make_a_donation_button"),$("#make_a_donation_button").attr("data-content"),$("#make_a_donation_button").attr("data-bg"));
	transitionContent($("#mostRecent"),$("#mostRecent").attr("data-content"),$("#mostRecent").attr("data-bg"));
}

function onContentButtonClick()
{
	var rootVal = $.address.value().split("/")[1];
	var gotoAddr = rootVal+"/"+$(this).attr("data-content");
	
	$.address.value(gotoAddr);
	$.address.update();
	//transitionContent($(this),$(this).attr("data-content"),$(this).attr("data-bg"));
}

function transitionContent(dataObj, dataContent, dataBG)
{
	//$(this).parent().parent().paginationPlus({defaultHiddenSelector:contentMap[$(this).attr("data-content")].content});
	var myData = contentMap[dataContent]
	
	if(contentMap[dataContent].changebg)
	{
		var bgTarget = $("#"+dataBG);
		if(bgTarget.data("bgclass")) bgTarget.removeClass(bgTarget.data("bgclass"));
		bgTarget.addClass(myData.bgclass).data("bgclass",myData.bgclass);
		$("#"+contentMap[dataContent].sideContent).siblings().hide();
		$("#"+contentMap[dataContent].sideContent).fadeIn('fast');
	}
	
	dataObj.siblings().removeClass("selected");
	dataObj.addClass("selected");
	dataObj.parent().siblings('.sectionTitle').find("h1").empty().text(myData.title);
	dataObj.parent().siblings('.currentContent').hide().removeClass('currentContent');
	dataObj.parent().siblings(myData.content).fadeIn().addClass('currentContent');
	
	if(myData.paginate)
	{
		dataObj.parent().siblings(myData.content).paginationPlus();
	}
}


// what happens when the page is resized? THIS IS WHAT HAPPENS!
function resizeReposition()
{
	$(".content_panel, .fullHeightListener").height($(window).height());
	
	if(addressInitialized)tm.onScrollFinished();
}

function onWindiwResize()
{
	resizeReposition();
}

