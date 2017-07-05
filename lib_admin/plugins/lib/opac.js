/*@name viewBooks
  @description : loads all the books
*/
function viewbooks() {
	window.location = "#Home";
	var oldSpace = $("#maincontent");
	oldSpace.slideUp('fast');
	var space = $('#ajaxContent');
	//showLoader(space);
	setTimeout(function() {
		space.load('/lib_tpl/books.tpl', function() {
			//showLoader($("#bookList"));
			var url = '/lib_ajax/dynamic_data.php?data=books&limit=all';
			$.getJSON(url, function(result) {
				
				setTimeout(function() {
					$("#bookList").empty();
					var count = 0;
					var limit = 10;
					$.each(result, function(i, field) {
						var  strpClass = ((count % 2) == 0) ? 'even' : 'odd'; 
						var check_input = '<input type="checkbox" name="select_book[]" id="'+field['acc_no']+'"/>';
						var actionS = '<img class="ed_book" id="'+field['acc_no']+'" style="cursor:pointer;" src="/images/action_edit.png"/><img class="del_book" id="'+field['acc_no']+'" style="cursor:pointer;" src="/images/action_delete.png"/>';
						var eachbook = '<tr realbookID="'+field['book_id']+'" id="book_tr'+field['acc_no']+'"class="'+strpClass+'" role="row">';
						//Preparing for Editing
						var accBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['acc_no']+'" type="text" name="acc_no" id="acc_no'+field['acc_no']+'"/>';
						var titleBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['title']+'" type="text" name="title" id="title'+field['acc_no']+'"/>';
						var authorBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['author']+'" type="text" name="author" id="author'+field['acc_no']+'"/>';
						var publisherBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['publisher']+'" type="text" name="publisher" id="publisher'+field['acc_no']+'"/>';
						var call_numberBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['call_number']+'" type="text" name="call_number" id="call_number'+field['acc_no']+'"/>';
						var ISBNBox = '<input class="liveEdit book_input'+field['acc_no']+'" value="'+field['ISBN']+'" type="text" name="ISBN" id="ISBN'+field['acc_no']+'"/>';
						//----------------------------
						eachbook += '<td>'+check_input+'</td><td><span id="acc_not'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['acc_no']+'</span>'+accBox+'</td>';
						eachbook += '<td><span id="titlet'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['title']+'</span>'+titleBox+'</td><td><span id="authort'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['author']+'</span>';
						eachbook += authorBox+'</td><td><span id="publishert'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['publisher']+'</span>'+publisherBox+'</td><td><span id="call_numbert'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['call_number']+'</span>'+call_numberBox+'</td>';
						eachbook += '<td><span id="ISBNt'+field['acc_no']+'" class="book_text book_text'+field['acc_no']+'">'+field['ISBN']+'</span>'+ISBNBox+'</td><td>'+actionS+'</td></tr>';
						$("#bookList").append(eachbook);
						count++;
					});

					//attach_event_for_actions();
					/* Setting the Data tables plugin */
					$(function () {
       					$("#books_Table").DataTable();
       				 });   
				}, 0000);
				 
			});
		});
	}, 0000); space.show();
}

/* LOCKS THE SCREEN */
	function lockSESSION() {
		$.get('/lib_ajax/lock.php', function(data) {
			if(data == 'lock') {
				$('#lkscr').css('z-index', 2).slideDown('slow');
				$(".wrapper").slideUp('fast');
				$("body").addClass("hold-transition lockscreen");
				$("#lpassword").val("");
			} else {
				alert("AN ERROR HAS OCCURED AND CANNOT LOCK THE SESSION.");
			}
		});
	}

/* UNLOCKS THE SCREEN */
	function unlockSESSION() {
		var password = $("#lpassword").val();
		if(password != '' && password != null) {
			$.post('/lib_ajax/process.php', $("#lockForm :input").serializeArray(), function(info) {
				switch(info) {
					case 'true':
						{
							$.get('/lib_ajax/unlock.php', function(data) {
								if(data == 'unlock') {
									$('#lkscr').css('z-index', 2).slideUp('fast');
									$(".wrapper").slideDown('slow');
									$("body").removeClass("hold-transition lockscreen");
								} else {
									alert(data + "AN ERROR HAS OCCURED AND CANNOT LOCK THE SESSION.");
								}
							});
						}
					break;

					case 'false':
						{
							target.empty().hide();
							target.html("<h4 style=\"color:red;\">Unable to login. Please try again.</h4>").slideDown('fast');
							clearT(target);
						}
					break;
					default:
						target.empty().hide();
						target.html(info).slideDown('fast');
						clearT(target);
					break;
				}
			});
		} else {
			target.empty().hide();
			target.html('<p style="color:red;">Please enter password!</p>').slideDown('fast');
			clearT(target);
		}
		$("#lockForm").submit(function() {
			return false;
		});
	}

	$(document).ready(function() {
		lockSESSION();
	});