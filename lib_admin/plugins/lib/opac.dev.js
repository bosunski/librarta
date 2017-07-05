var generalKEY = '';
	var catKEY ='';
	var circKEY = '';
	var abspath = '';
	var dir = '';
	$.getJSON('plugins/lib/getConf.php?data=getKeys', function(data) {
		generalKEY = data['general'];
		catKEY = data['cat'];
		circKEY = data['circ'];
		dir = data['dir'];
	});

/* Clear with Delay */
	function clearT(target) {
		setTimeout(function() {
			target.slideUp('fast').empty();
		}, 4000);
	}

/*@name viewBooks
  @description : loads all the books
*/
function viewbooks() {
	window.location = "#Home";
	var space = $('#maincontent');
	setTimeout(function() {
		space.load('../lib_tpl/opac_books.tpl', function() {
			var url = '../lib_ajax/dynamic_data.php?data=books&limit=all';
			$.getJSON(url, function(result) {
				if(result.length <= null) {
					space.html("Books List is Empty");
				} else {
					setTimeout(function() {
						$("#bookList").empty();
						var count = 0;
						var limit = 10;
						$.each(result, function(i, field) {
							var  strpClass = ((count % 2) == 0) ? 'even' : 'odd'; 
							var check_input = '<input type="checkbox" name="select_book[]" id="'+field['acc_no']+'"/>';
							var actionS = field['bStatus'];
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
				}
			});
		});
	}, 2000); space.show();
}

/* LOCKS THE SCREEN */
	function lockSESSION() {
		$('#lkscr').css('z-index', 2).slideDown('slow');
		$(".wrapper").slideUp('fast');
		$("body").addClass("hold-transition lockscreen");
		$("#lpassword").val("");
	}

/* UNLOCKS THE SCREEN */
	function unlockSESSION() {
		var target = $("#info");
		var password = $("#lpassword").val();
		if(password != '' && password != null) {
			if(password == 'OPAC') {
				$('#lkscr').css('z-index', 2).slideUp('fast');
				$(".wrapper").slideDown('slow');
				$("body").removeClass("hold-transition lockscreen");
				viewbooks();
			} else {
				target.empty().hide();
				target.html("<h4 style=\"color:red;\">Incorrect Details. Please try again.</h4>").slideDown('fast');
				clearT(target);
			}
		} else {
			target.empty().hide();
			target.html('<h4 style="color:red;">Please enter password!</h4>').slideDown('fast');
			clearT(target);
		}
		$("#lockForm").submit(function() {
			return false;
		});
	}

	function createModal(header, body, type) {
		$(".modal-title").html(header);
		$(".modal-body").html(body);
		switch(type) {
			case 'confirm':
				$(".modal-footer").append('<button type="button" class="returnTrue btn btn-default btn-flat pull-left" data-dismiss="modal">Ok</button>');
			break;
			case 'error':
				$(".modal").addClass('modal-danger');
			break;
			case 'success':
				$(".modal").addClass('modal-success');
			break;
		}
		$(".modal").slideDown('fast');
		$(".dismissMe").click(function() {
			$(".modal").slideUp('fast');
		})
	}

	function getHelp() {
		var helpText = '<h4>We hope this steps will help you:</h4>';
			helpText += '<ol>';
			helpText += '<li>Enter the passphrase as stated beneath the text box.</li>  ';
			helpText += '<li>Press the Enter key to access the OPAC.</li>  ';
			helpText += '<li>Once inside the OPAC, wait for it to load.</li>  ';
			helpText += '<li>After loading, input the *keyword of the material you are looking for inside the Search box at the top of the page.</li>  ';
			helpText += '<li>After typing your keyword(this can be the name of the Author or the title), the list is filtered base on what you type.</li>  ';
			helpText += '<li>Look through the filtered result to find what you are looking for.</li>';
			helpText += '</ol>';
			helpText += '<h5>* = Any word you know about the material.</h5>';
		createModal('OPAC Help', helpText, '');
	}
	$(document).ready(function() {
		lockSESSION();
		/* This part deals with the unlocking and locking of the screen 
		*/
		$("#lockOP").click(function() {
			lockSESSION();
		});

		$("#unlockOP").click(function(){
			unlockSESSION();
		});
		$("#lockForm").submit(function() {
			return false;
		});

		$("#helpOPAC").click(function(){
			getHelp();
		});
		$("#helpOPAC2").click(function(){
			getHelp();
		});
		
	});