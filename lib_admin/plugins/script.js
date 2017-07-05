	function clearT(target) {
		setTimeout(function() {
			target.slideUp('fast').html('');
		}, 4000);
	}

function clearI() {
	$("#lForm :input").each(function() {
		$(this).val("");
	});
}

function goHome() {
	window.location = "bigChill.php";
}


//var suc = $(".password").clone();
$(document).ready(function() {
	clearI();
	$("#subL").click(function login() {
		var username = $("#uname").val();
		var password = $("#pass").val();
		if(password != '' && username != '') {
			$("#subL").addClass("disabled");
			$(".loader").html('<img src="lib_content/loading11.gif"/>');

			//Delaying to show the loader.
			setTimeout(function login() {
					$.post("lib_ajax/process.php", $("#lForm :input").serializeArray(),
						function(info) {
							
							switch(info) {
								case "true":
									 {
										$(".acc_cont").fadeOut(3000);
										$(".acc_cont").empty();
										//$(".acc_cont").fadeIn(4000).load("lib_ajax/success.php");
										setTimeout(goHome, 1000);
									
									}
								break;
								case "false":
									{
										$(".loader").fadeOut('slow');
										$(".info").html('<p style="color:red;">Unable to Login at this moment. Please try again later.</p>').slideDown('fast');
										$("#subL").removeClass("disabled");
										clearT($(".info"));
									}
								break;
								default:
									{
										$(".loader").empty();
										$(".info").html(info).slideDown('fast');
										$("#subL").removeClass("disabled");
										clearT($(".info"));
									}
							}
					});
				}, 
			2000);
		} else {
			$(".info").empty();
			$(".info").html('<p style="color:red;">Some of the input(s) is/are Empty, kindly check them.</p>');
		}
		$("#lForm").submit(function() {
			return false;
		});
	});
});