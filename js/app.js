$(document).bind("mobileinit", function(){
	$.mobile.pushStateEnabled = true;
});

  $('.ui-content a[href^=#]').bind('click vclick', function (ev) {
        location.hash = $(this).attr('href');
        return false;
    });


$(document).delegate("#main", "pageinit", function() {
	var menuStatus;
	
	// Show menu
	$("a.showMenu").click(function(){
		if (menuStatus != true){
			$("#menu").css({marginLeft: "0px"}, 100);
			$(".ui-page-active").animate({
				marginLeft: "165px"
			  }, 300, function(){menuStatus = true});
			  return false;
		  } else {
			$(".ui-page-active").animate({
				marginLeft: "0px"
			  }, 300, function(){menuStatus = false});
			$("#menu").animate({marginLeft: "-175px"}, 600);
			return false;
		  }
	});

});

$('#menu, .pages').live("swipeleft", function(){
	if (menuStatus){
	$(".ui-page-active").animate({
		marginLeft: "0px"
	  }, 300, function(){menuStatus = false});
	  }
});

$('.pages').live("swiperight", function(){
	if (!menuStatus){
	$(".ui-page-active").animate({
		marginLeft: "165px"
	  }, 300, function(){menuStatus = true});
	  }
});

$('div[data-role="page"]').live('pagebeforeshow',function(event, ui){
	menuStatus = false;
	$(".pages").css("margin-left","0");
});

// Menu behaviour
$("#menu li a").click(function(){
//	$("#menu").animate({marginLeft: "0px"}, 100);
	var p = $(this).parent();
	if($(p).hasClass('active')){
		$("#menu li").removeClass('active');
	} else {
		$("#menu li").removeClass('active');
		$(p).addClass('active');
	}
});

// Tabs
$('div[data-role="navbar"] a').live('click', function () {
	$(this).addClass('ui-btn-active');
	$('div.content_div').hide();
	$('div#' + $(this).attr('data-href')).show();
});

// Link to schedule detail pages
$('#schedule-grid li').click(function(){
	var anchor = $(this).attr('id');
	anchor = anchor.replace(/\s+/g, '');
	window.location.hash = anchor;
});

$(document).delegate(".alpha-list", "pageinit", function() {
	$('#slider').sliderNav({arrows: true});
});

$(function() {
	$(document).delegate('#tab-nav a', 'click', function() {
	    $('#tab-nav a').removeClass("active");
		$(this).addClass("active");
	    $('#tab-content').removeClass("active");
        $('#tab-content').children().hide('slow');
	    $('#'+$(this).attr('data-tab')).show('slow');
          //  $("html,body").animate({scrollTop:0},500);
            $(this).addClass("ui-btn-active");
	});
});
$(function() {
	$(document).delegate('#track-select', 'click', function() {
	    $('#track-menu').slideToggle('slow');
	});
});
$(function() {
	$(document).delegate('#track-menu li', 'click', function() {
		if ($(this).attr('id') == 'All') {
			$('#tab-content ul li').slideDown('slow');
			$('#track span').html('All');
		} else {
			$('#tab-content ul li').slideUp();
			$('#tab-content ul li.'+$(this).attr('id')).slideDown();

			$('#track span').html($(this).html());
		}
	});
});

$(function() {
	$(document).delegate('#map-select', 'click', function() {
	    $('.map-type').slideToggle('slow');
	});
});
$(document).delegate(".gps_map", "pageinit", function() {
	$.mobile.hidePageLoadingMsg();
});

//Infinite Scroller
function initInfScroller(){
	$('.infScroll').infinitescroll({
	    navSelector  : ".loadMoreButton",            
	    nextSelector : ".infscrtrigger a",    
	    itemSelector : "#results li",
	    loading:{finishedMsg:'',msgText:'Loading...' },
	    doneText: "",
	    localMode:true
		},function(addedItems){
			if(addedItems && addedItems.length >0){
				$("<li>/").addClass("admob inlineAd").insertBefore(addedItems[addedItems.length-2]);
				var ord=Math.random()*10000000000000000;
				var url="http://ad.doubleclick.net/adj/pcw.main.mobile/default;sz=1x3;ord="+ ord;
				$.getScript(url);
			}
	});
	
	//Disable default scrolling behavior and toggle on button click.
	$(window).unbind('.infscr');
	$(".infscrtrigger").live('vclick',function(event){
		event.preventDefault();
		$(this).remove();
		$('.articleList').infinitescroll('retrieve');
	});
}

