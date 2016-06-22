var errorlogs_refreshing = false;
var errorlogs_offset = 0;
/* var accesslogs_refreshing = false;
var accesslogs_offset = 0; */
var prevhtml;

$(window).focus(function() {
	$("link[rel='icon']").attr("href","assets/img/accept.png");
});

function loadinto(data,elem,warn,cb) {
	if (warn) {
		if (data != prevhtml) {
			prevhtml = data;
			if (!document.hasFocus()) {
				$("link[rel='icon']").attr("href","assets/img/error.png");
			}
		} else {
			return;
		}
	}
	var scroll = false;
	if ($(elem)[0].scrollHeight - $(elem).scrollTop() == $(elem).outerHeight()) {
		scroll = true;
	}
	$(elem).html($(elem).html() + data);
	if (scroll) {
		$(elem).scrollTop($(elem)[0].scrollHeight - $(elem).outerHeight());
	}
}

$("#refresh_errorlogs").click(function() {
	if (errorlogs_refreshing) {return;}
	errorlogs_refreshing = true;
	$("#refresh_errorlogs").addClass("disabled");
	$.get("ajax/errorlog/get.php?offset=" + errorlogs_offset,function(data) {
		loadinto(data,$(".logs:nth-child(1)"),true);
		errorlogs_offset = $(".logs:nth-child(1)").html().length + 1;
		$("#refresh_errorlogs").removeClass("disabled");
		errorlogs_refreshing = false;
	});
});
$("#clear_errorlogs").click(function() {
	$.post("ajax/errorlog/clear.php");
	$(".logs:nth-child(1)").html("==== Error Log Generated By PHP logs.venner.io ====\r\n");
});

/*$("#refresh_accesslogs").click(function() {
	if (accesslogs_refreshing) {return;}
	accesslogs_refreshing = true;
	$("#refresh_accesslogs").addClass("disabled");
	$.get("ajax/accesslog/get.php?offset=" + accesslogs_offset,function(data) {
		loadinto(data,$(".logs:nth-child(2)"));
		accesslogs_offset = $(".logs:nth-child(2)").html().length + 1;
		$("#refresh_accesslogs").removeClass("disabled");
		accesslogs_refreshing = false;
	});
});
$("#clear_accesslogs").click(function() {
	$.post("ajax/accesslog/clear.php");
	$(".logs:nth-child(2)").html("==== Access Log Generated By PHP logs.venner.io ====\r\n");
});*/

function refresh() {
	$("#refresh_errorlogs").click();
	//$("#refresh_accesslogs").click();
}
window.setInterval(refresh,1000)
refresh();