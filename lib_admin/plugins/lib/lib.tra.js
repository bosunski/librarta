	var successImg = '<img src="/images/crt.png" alt="" />';
	var target = $("#info");
	var currentError = false;
	function showMain() {
		$("#ajaxContent").hide();
		$("#maincontent").show();
	}
	function hideMain() {
		$("#ajaxContent").show();
		$("#maincontent").hide();
	}

	function getSuccessText(text) {
		return '<div class="congrats"><center>'+successImg+'<h4>'+text+'</h4></center></div>';
	}
	/*@name renewTra
  	  @description : Renews a borrow;
	*/
	function renewTra(lib_no, acc_no) {
		if(confirm("Are you sure you want to renew this book?")) {
			var url = '/lib_ajax/dynamic_data.php?data=renewBook&lib_no='+lib_no+'&acc_no='+acc_no;
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						createModal('Renewal Status', "Book Renewal Successful.");
					break;

					default:
						createModal('Error Status', info, 'error');
					break;
				}
			});
		}
		
	}

	/*@name renewTra
  	  @description : Renews a borrow;
	*/
	function delTra(lib_no, acc_no) {
		if(confirm("Are you sure you want to Terminate this borrow?")) {
			var url = '/lib_ajax/dynamic_data.php?data=delTra&lib_no='+lib_no+'&acc_no='+acc_no;
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						createModal('Cancel Transaction', getSuccessText("Done Successfully."), '');
					break;

					default:
						createModal('Error Status', "An Has Occured, Please try again.", 'error');
					break;
				}
			});

			return true;
		}
		
	}
	
	/*	@name refreshApp
  		@description : Updates the Page;
	*/
	function refreshApp() {
		loadUsageChart();
		var refreshInterval = setInterval(function() {
			var url = '/lib_ajax/dynamic_data.php?data=getAll';
			$.getJSON(url, function(data) {
				var booklist = data['booksList'];

				/* Updates Admin list */
				updateAdmin(data['adminlist']);

				/* Updates Book list */
				updateBooks(data['booksList']);

				/* Updates Borrow list */
				updateBorrows(data['borrowsList']);
				
				updateOthers(data['otherData']);
			});
		}, 4000);
	}

	/*	@name update_small_stats
  		@description : Updates the little stats above the page
	*/
	function update_small_stats(result) {

	}

	/*	@name set_crumb
  		@description : Updates the breadcrumb
	*/
	function set_crumb(text) {
		var target = $(".breadcrumb");
		$(".breadcrumb li:last-child").remove();
		target.append('<li class="active">'+text+'</li>');
	}


	/*	@name loaadBooks
  		@description : Load The 5 latest Books
	*/
	function loadBooks() {
		showLoader($("#lib_books .books-list"));
		$.getJSON('/lib_ajax/dynamic_data.php?data=books&limit=5', function(result) {
			setTimeout(function() {
					updateBooks(result);
				}, 1000);
		});
		return true;
	}


	/*	@name loadBorrows
  		@description : Load The 5 latest Borrows
	*/
	function loadBorrows() {
		showLoader($(".borrows-list"));
		$.getJSON('/lib_ajax/dynamic_data.php?data=borrows&limit=5', function(result) {
			setTimeout(function() {
				updateBorrows(result);
			}, 1000);
		});
		return true;
	}

	/*	@name cancel
  		@description : Cancels an operation
	*/
	function cancel(find, replace, ajax) {
		$("#adminForm").submit(function() {
			return false();
		});
		$(find).slideUp('fast');
		$(replace).slideDown('fast').show();
		if(ajax == 1)
			$(".ajax").html("Library Usage");
		else
			$(".ajax2").html("Image Slide");
	}


	/* gets the current user section from the server as Password */
	function serveMylevel() {
		var trunc = ["backs", "addNewUser", "newAdmin"];
		$.get("/lib_ajax/verifylevel.php", function(data, status) {
			if(data != 'ZmU3NDYzMDUwNWM2ZDM0MjU5OGNjZGYyMmNlZDI4N2ExMjBiZDQ1NTcxOTMwOTUxOGVzdXBlckRVUEVS') {
				for(i = 0; i < trunc.length; i++) {
					$("#"+trunc[i]).remove();
				}
			}
		});
	}

	function setHeader(text) {
		$(".ajax").html(text);
	}
	/* Show AJA loader */
	function showLoader(target) {
		$(target).html('<center style="display:block;"id="loading..."><img src="/images/loading11.gif"/></center>');
		target.show();
	}

	/* Clear with Delay */
	function clearT(target) {
		setTimeout(function() {
			target.slideUp('fast').empty();
		}, 4000);
	}

	/* Clear without delay */
	function clearFast(target) {
			target.empty();
	}

	/* Administrator registration */
	function addAdmin() {
		alert("yah");
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
				createModal('Error Status', "AN ERROR HAS OCCURED AND CANNOT LOCK THE SESSION.", 'error');
			}
		});
	}

/* UNLOCKS THE SCREEN */
	function unlockSESSION() {
		var target = $("#info");
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
									createModal('Error Status', "AN ERROR HAS OCCURED AND CANNOT UNLOCK THE SESSION.", 'error');
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

	function loadAdmins() {
		showLoader($("#lib_admin .users-list"));
		$.getJSON('/lib_ajax/dynamic_data.php?data=admin', function(result) {
			
				setTimeout(function() {
					updateAdmin(result);
				}, 1000);
			
		});

		return true;
	}

	/*@name updateBooks
 	  @description : update Books list 
	*/
	function updateBooks(result) {
		$("#lib_books .books-list").empty();
		 $("ul.products-list").empty();
		var numBooks = 0;
		$.each(result, function(i, field) {
			numBooks++;
				var bookList = '<li class="item"><div class="product-img"><img hieght="50px" width="50px" src="/lib_admin/img/book.png" alt="Product Image"></div><div class="product-info">';
				bookList +=  '<a realbookid="'+field['book_id']+'" id="'+field['acc_no']+'" href="#Home" class="product-title">'+field['title']+'<span class="label label-warning pull-right">'+field['acc_no']+'</span></a>';
                bookList += '<span class="product-description">'+field['author']+'</span></div></li>';
				$("ul.products-list").append(bookList);
		});

		//Attaching click event to the list
		attach_event_books();
	}

	/*@name updateBorrows
 	  @description : updateBorrows list 
	*/
	function updateBorrows(result) {
		$(".borrows-list").empty();
		var count = 0;
		$.each(result, function(i, field) {
			var due_date = new Date(field['due_date']);
			var borrowList = '<tr id="Borrow'+count+'"><td><a class="borrow_list_each" id="'+field['acc_no']+'" href="#Home">'+field['acc_no']+'</a></td><td>'+field['title']+'</td><td><div class="lafgbel lafgbel'+count+' lafbel-success">';
			borrowList += '<span class="days'+count+'"></span>-<span class="hours'+count+'"></span>-<span class="minutes'+count+'"></span>-<span class="seconds'+count+'"></span></div></td>';
			borrowList +=  '<td><div class="sparkbar" data-color="#00a65a" data-height="20"><a href="#Home" class="user_borrow_each'+field['acc_no']+'" id="'+field['lib_no']+'">'+field['lib_no']+'</a></div></td>';
            borrowList += '</tr>';
			$(".borrows-list").append(borrowList);
			var tt = getTimeRemaining(due_date);
			if(tt.total <= 0) {
				$(".lafgbel"+count).html('+'+(-1*tt.days)-1+' day(s) due');
				$(".lafgbel"+count).css("color", "red");
			} else {
				initializeClock('Borrow'+count, due_date, count);
			}
				
			count++;
		});

		attach_event_borrows();
	}

	/*@name updateOthers
 	  @description : updates the little stats on the top 
	*/
	function updateOthers(data) {
		$(".users-number").html(data['users']+' Users');
		$(".books-number").html(data['books']+' Books');
		$(".borrows-number").html(data['borrows']+' Transactions');
	}

	/*@name loadBorrowDetail
 	  @description : loads Details of a Transaction 
	*/
	function loadBorrowDetail(acc_no, lib_no) {
		showMain();
		set_crumb('View Borrow');
		$(".ajax2").html('load');
		$(".ajax2").html('Loading... Please wait.');
		var target = $("#loaderGIF2");
		var space = $("#loadPlaceAjax2");
		var adPlace = $("#eachBook");
		space.children().hide();
		showLoader(target);
		target.show();
		var button = '<button onclick="cancel(\'#eachBook\', \'#libCarousel\', 2)" ';
		button += 'class="pull-left btn btn-danger btn-sm btn-flat" id=""><i class="fa fa-arrow-circle-left"></i>';
		button += ' Close </button><button onclick="" class="pull-left btn btn-sm btn-primary btn-flat borrow_Rbook" id="">'; 
		button += 'Renew <i class="fa fa-arrow-circle-right"></i></button><button onclick="" class="pull-left btn btn-sm btn-default btn-flat borrow_Tbook" id="">Terminate <i class="fa fa-arrow-circle-right"></i></button>';	
		

		/* Generating the clicked Borrow */
		/* Performing Ajax stuffs */
		setTimeout(function() {
			target.empty();
			$(".ajax2").html('Details of this borrow');
			$.getJSON("/lib_ajax/dynamic_data.php?data=getBorrow&acc_no="+acc_no+"&lib_no="+lib_no, function(result) {
				//Emptying space
				adPlace.empty();
				adPlace.append("<label>Book Access no.:  "+result['acc_no']+"</label><br/>");
				adPlace.append("<label>Call number:  "+result['call_number']+"</label><br/>");
				adPlace.append("<label>Book title:  "+result['title']+"</label><br/>");
				adPlace.append("<label>Author:  "+result['author']+"</label><br/>");
				adPlace.append("<label>Publisher:  "+result['publisher']+"</label><br/>");
				adPlace.append("<label>ISBN:  "+result['ISBN']+"</label><br/>");
				adPlace.append("<label>Date Borrowed:  "+result['date']+"</label><br/>");
				adPlace.append("<label>Due Date:  "+result['due_date']+"</label><br/>");
				adPlace.append("<label id=\"acc_no\" style=\"display:none;\">"+result['acc_no']+"</label><br/>");
				adPlace.append(button);
				adPlace.slideDown('fast').show();

				// Attaching listener to the buttons
				$(".borrow_Rbook").click(function() {
					renewTra(lib_no, acc_no);
				});
				$(".borrow_Tbook").click(function() {
					if(delTra(lib_no, acc_no))
						cancel('#eachBook', '#libCarousel', 2);
				});
			});
		}, 2000);
	}

	/*@name updateAdmin
 	  @description : update admin list 
	*/
	function updateAdmin(result) {
		$("#lib_admin .users-list").empty();
		$("ul.contacts-list").empty();
		var numAdmin = 0;
		$.each(result, function(i, field) {
			var section = (field['section'] == 'superDUPER') ? 'General' : field['section'];
			numAdmin++;
			if(section != null) {
				var userList = '<li><img src=\"/lib_admin/img/default.png\" alt=\"User Image\">';
				userList +=  '<a id="'+field['admin_id']+'" class="each_admin_list" class=\"users-list-name\" href=\"#Home\">'+field['fname']+' '+field['lname']+'</a>';
                userList += '<span class=\"users-list-date\">'+section+'</span></li>';
				$("ul.users-list").append(userList);
			

				var contactList = '<li><a id="'+field['admin_id']+'" href=\"#\"><img class=\"contacts-list-img\" src=\"/lib_admin/img/default.png\">';
                contactList += '<div class=\"contacts-list-info\"><span class=\"contacts-list-name\">'+field['fname']+' '+field['lname']+'</span></div></a></li>';

            	 $("ul.contacts-list").append(contactList);
            }
		});
		$("#numAdmin").html(numAdmin + " Administrators");

		/* Adding Click event to each Admin*/
		attach_event_admins();
	}

	/*@name delBook
 	  @description : deletes a book
 	  @bug: does not return data
	*/
	function delBook(acc_no, realbookID, data=null) {
		if(confirm('Are you sure you want to delete this book?')) {
			var url = '/lib_ajax/dynamic_data.php?data=del_book&book_id='+realbookID+'&acc_no='+acc_no;
			$.get(url, function(info, status) {
				switch(info) {
					case 'done':
						data.remove();
					break;
					default:
						createModal('Error Status', info, 'error');
						return false;
					break;
				}
			});
		}
	}
	/*@name attach_event_admins
 	  @description : attaches click event to admin list 
	*/
	function attach_event_for_actions() {
		$(".del_book").click(function() {
			var acc_no = $(this).attr('id');
			var tr = $("#book_tr"+acc_no);
			var realbookID = tr.attr('realbookid');

			//A Bug lies here
			delBook(acc_no, realbookID, tr);
			
		});

		$(".ed_book").click(function() {
			var acc_no = $(this).attr('id');
			var realbookID = $("#book_tr"+acc_no).attr('realbookid');
			var initialValues = [$("#authort"+acc_no).html(), $("#titlet"+acc_no).html(), $("#publishert"+acc_no).html(), $("#ISBNt"+acc_no).html(), $("#call_numbert"+acc_no).html(), $("#acc_not"+acc_no).html()];
			//alert(realbookID);
			$("#actsOFA").hide();
			$(".book_text"+acc_no).each(function() {
				$(this).hide();
			});
			$(".book_input"+acc_no).each(function() {
				$(this).show();
			});
			$("#book_tr"+acc_no).change(function() {
				//The data of that row has changed so we need to submit them submit them
				var author = $("#author"+acc_no).val();
				var title= $("#title"+acc_no).val();
				var publisher = $("#publisher"+acc_no).val();
				var ISBN = $("#ISBN"+acc_no).val();
				var call_number = $("#call_number"+acc_no).val();
				var access_no = $("#acc_no"+acc_no).val();

				var newValues = [author, title, publisher, ISBN, call_number, access_no];

				var data = 'book_id='+realbookID+'&acc_no='+access_no+'&title='+title+'&publisher='+publisher+'&ISBN='+ISBN+'&call_number='+call_number+'&author='+author;

				if((author.length && title.length && publisher.length && ISBN.length && call_number.length && access_no.length > 0) && (initialValues != newValues)) {
					$.ajax({
						type: 'POST',
						url: '/lib_ajax/dynamic_data.php?data=ed_book',
						data: data,
						cache: false,
						success: function(echo) {
							$("#authort"+acc_no).html(author);
							$("#titlet"+acc_no).html(title);
							$("#publishert"+acc_no).html(publisher);
							$("#ISBNt"+acc_no).html(ISBN);
							$("#call_numbert"+acc_no).html(call_number);
							$("#acc_not"+acc_no).html(access_no);

						}
					});
				} else {
					createModal('Error Status', "Please enter Something?", 'error');
				}
				
			});
			$(".book_input"+acc_no).mouseup(function() {
				return false;
			});

			$(document).mouseup(function() {
					$("#actsOFA").show();
					$(".book_text"+acc_no).each(function() {
						$(this).show();
					});
					$(".book_input"+acc_no).each(function() {
						$(this).hide();
					});

			});
		});
	}
	/*@name attach_event_admins
 	  @description : attaches click event to admin list 
	*/
	function attach_event_admins() {
			$("a.each_admin_list").each(function() {
			$(this).click(function() {
				set_crumb('Edit Administrator');
				//$(this).attr('disabled', '');
				var target = $("#loaderGIF");
				$(".ajax").html("Loading... Please wait.");
				var userid = $(this).attr("id");
				var uData = new Array();

				var name = $(this).html();
				var space = $("#loadPlaceAjax");
				var adPlace = $("#eachAdmin");
				space.children().hide();
				showLoader(target);
				target.show();
				var button = $("#ajaxButtonsCopy").html();	

				/* Generating the clicked ADministrator */
				/* Performing Ajax stuffs */
				setTimeout(function() {
					$(".ajax").html(name);
					target.empty();
					$.getJSON("/lib_ajax/dynamic_data.php?data=getUserAdmin&id="+userid, function(result) {
						//Emptying space
						adPlace.empty();
						var section = (result['section'] == 'superDUPER') ? 'General' : result['section'];
						adPlace.append("<label>SECTION: "+section+"</label><br/>");
						adPlace.append("<label>EMAIL: "+result['email']+"</label><br/>");
						adPlace.append("<label>USERNAME: "+result['username']+"</label><br/>");
						adPlace.append("<label id=\"userSalt\" style=\"display:none;\">"+result['admin_id']+"</label><br/>");
						adPlace.append(button);
						adPlace.slideDown('fast');
					});
				}, 2000);
			});
		});
	}

	/*@name attach_event_books
 	  @description : attaches click event to each list 
	*/
	function attach_event_books() {
			$("a.product-title").each(function() {
				$(this).on('click', function() {
					set_crumb('View Book');
					var target = $("#loaderGIF2");
					$(".ajax2").html("Loading... Please wait.");
					var name = $(this).html();
					var acc_no = $(this).attr("id");
					var realbookID = $(this).attr("realbookid");

					var space = $("#loadPlaceAjax2");
					var adPlace = $("#eachBook");
					space.children().hide();
					showLoader(target);
					target.show();
					var button = '<button onclick="cancel(\'#eachBook\', \'#libCarousel\', 2)" ';
					button += 'class="pull-left btn btn-default btn-sm btn-flat" id=""><i class="fa fa-arrow-circle-left"></i>';
					button += ' Cancel </button><button onclick="" class="pull-left btn btn-sm btn-primary btn-flat borrow_Nbook" id="">'; 
					button += 'Edit Details <i class="fa fa-arrow-circle-right"></i></button><button class="pull-left btn btn-sm btn-danger btn-flat button_Dbook'+acc_no+'" id="">';	
					button += 'Delete Book <i class="fa fa-arrow-circle-right"></i></button>';

					/* Generating the clicked ADministrator */
					/* Performing Ajax stuffs */
					setTimeout(function() {
						$(".ajax2").html(name);
						target.empty();
						$.getJSON("/lib_ajax/dynamic_data.php?data=getBook&acc_no="+acc_no, function(result) {
							//Emptying space
							adPlace.empty();

							adPlace.append("<div><label>Book Access no.:  "+result['acc_no']+"</label><br/>");
							adPlace.append("<label>Call number:  "+result['call_number']+"</label><br/>");
							adPlace.append("<label>Book title:  "+result['title']+"</label><br/>");
							adPlace.append("<label>Author:  "+result['author']+"</label><br/>");
							adPlace.append("<label>Publisher:  "+result['publisher']+"</label><br/>");
							adPlace.append("<label>ISBN:  "+result['ISBN']+"</label><br/>");
							adPlace.append("<label>Date Added:  "+result['date']+"</label><br/>");
							adPlace.append("<label id=\"acc_no\" style=\"display:none;\">"+result['acc_no']+"</label></div>");
							adPlace.append("<label>Book Availability:  "+result['bStatus']+"</label><br/>");
							adPlace.append(button);
							adPlace.slideDown('fast');
							$(".button_Dbook"+acc_no).click(function() {
								delBook(acc_no, realbookID, null);
								cancel('#eachBook', '#libCarousel', 2);
							});	
						});
					}, 2000);
					
					
				});
		});
	}


	/*@name attach_event_borrows
 	  @description : attaches click event to each list 
	*/
	function attach_event_borrows() {
			$("a.borrow_list_each").each(function() {
			$(this).on('click', function() {
				var acc_no = $(this).attr("id");
				var lib_no = $('.user_borrow_each'+acc_no).attr('id');
				loadBorrowDetail(acc_no, lib_no);
			});
		});
	}
/*@name uDelete
  @description : deletes admin 
*/
function uDelete() {
	if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS ADMINISTRATOR?')) {
		var admin_id = $("#userSalt").html();
		var url = '/lib_ajax/dynamic_data.php?data=delete&admin_id='+admin_id;
		var adPlace = $("#eachAdmin");
		$.get(url, function(info, status) {
			switch(info) {
				case "done":
					alert('ADMINISTRATOR DELETED!');
					cancel(adPlace);
					adPlace.empty();
					$("#"+admin_id).parent().remove();
				break;
				default:
					alert(info);
				break;
			}
		});
 		
 	} else {

 	}
}

/*@name pReset
  @description : resets Password 
*/
function pReset() {
	if(confirm('ARE YOU SURE YOU WANT TO RESET THE PASSWORD?')) {
		var admin_id = $("#userSalt").html();
		var url = '/lib_ajax/dynamic_data.php?data=resetPass&admin_id='+admin_id;
		var adPlace = $("#eachAdmin");
		$.get(url, function(info, status) {
			switch(info.length) {
				case 8:
					createModal('Password Reset',getSuccessText('PASSWORD RESET COMPLETE! \n THE NEW PASSWORD IS '+ info),'');
					adPlace.empty();
					$("#ajaxrow1").slideDown('fast');
					$(".ajax").html('Library Usage');
				break;

				default:
					createModal('Error Status', info, 'error');
				break;
			}
		});
 		
 	} else {

 	}
} 

/*@name changeSection
  @description : Changes Section 
*/

function changeSection(section) {
	if(confirm('ARE YOU SURE YOU WANT TO DO THIS?')) {
		var admin_id = $("#userSalt").html();
		var url = '/lib_ajax/dynamic_data.php?data=changeSection&admin_id='+admin_id+'&section='+section;
		var adPlace = $("#eachAdmin");
		$.get(url, function(info, status) {
			switch(info) {
				case 'done':
					createModal('Change Section', getSuccessText('SECTION CHANGE IS COMPLETE!'), '');
					adPlace.empty();
					$("#ajaxrow1").slideDown('fast');
					$(".ajax").html('Library Usage');
				break;

				default:
					createModal('Error Status',info, 'error');
				break;
			}
		});
 		
 	} else {

 	}
}

/*@name renewBook
  @description : renews Borrowed Book 
*/
function renewBook(acc_no, lib_no) {
	alert("O yes");
}

/*@name getTimeRemaining
  @description : gets the remaining time 
*/
function getTimeRemaining(endtime){  
	var t = Date.parse(endtime) - Date.parse(new Date());  
	var seconds = Math.floor( (t/1000) % 60 );  
	var minutes = Math.floor( (t/1000/60) % 60 );  
	var hours = Math.floor( (t/(1000*60*60)) % 24 );  
	var days = Math.floor( t/(1000*60*60*24) );  
	return {    'total': t,    'days': days,    
			'hours': hours,    'minutes': minutes,    
			'seconds': seconds  };
}

/*@name initializeClock
  @description : starts the countdown
*/
function initializeClock(id, endtime, attche) {  
	var clock = $("#"+id);  
	var daysSpan = $('.days'+attche);  
	var hoursSpan = $('.hours'+attche);  
	var minutesSpan = $('.minutes'+attche);  
	var secondsSpan = $('.seconds'+attche);

	//Updates the Clock every sec
	function updateClock() {    
		var t = getTimeRemaining(endtime);    
		daysSpan.html(('0' + t.days).slice(-2));    
		hoursSpan.html(('0' + t.hours).slice(-2));    
		minutesSpan.html(('0' + t.minutes).slice(-2));    
		secondsSpan.html(('0' + t.seconds).slice(-2));    
		if(t.total <= 0) {
			clearInterval(timeinterval);    
		}  
	} 
	updateClock();  
	var timeinterval = setInterval(updateClock,1000);
}


/*@name addBooks
  @description : called to attach an event for book addition
*/
function addBook() {
	
		$("#nBookForm").submit(function() {
			return false;
		});
		var counti = 0;//fixes the issue of returning input empty when none is empty
		$("#nBookForm :input").each(function(position) {
			$(this).css('border-color','green');
			if($(this).val() == '') {
				counti++;
				$(this).css('border-color','red');
			} else {

			}
		});

			if(counti != 0) {
				alert("Some input(s) is/are Empty.");
			} else {
				$("#sendAddBook").addClass("disabled");
				$.post("/lib_ajax/dynamic_data.php?data=newBook", $("#nBookForm :input").serializeArray(), function(info) {
					switch(info) {
						case 'done':
							createModal('New Book', getSuccessText("New Book has been added succcessfully."), '');
							$("#nBookForm :input").each(function(position) {
								$(this).val("");
							});
							$("#sendAddBook").removeClass("disabled");
						break;

						case 21:
							createModal('Error Status', info, 'error');
							lockSESSION();
						break;

						default:
							createModal('Error Status', info, 'error');
							$("#sendAddition").removeClass("disabled");
						break;
					}
				});


			}
}

/*@name viewBooks
  @description : loads all the books
*/
function viewbooks() {
	window.location = "#Home";
	var oldSpace = $("#maincontent");
	oldSpace.slideUp('fast');
	var space = $('#ajaxContent');
	showLoader(space);
	setTimeout(function() {
		space.load('/lib_tpl/books.tpl', function() {
			showLoader($("#bookList"));
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

					attach_event_for_actions();
					/* Setting the Data tables plugin */
					$(function () {
       					$("#books_Table").DataTable();
       				 });   
				}, 0000);
				 
			});
		});
	}, 0000); space.show();
}

/*function to view the borrows*/
function viewBorrow () {
	var oldSpace = $('#maincontent');
	oldSpace.slideUp('fast');
	var space = $('#ajaxContent');
	showLoader(space);
	setTimeout(function () {
		space.load('/lib_tpl/borrow.tpl', function(){
			showLoader($('#borrowList'));
			var url = '/lib_ajax/dynamic_data.php?data=borrows&limit=all';
			$.getJSON(url, function(result) {
				setTimeout(function() {
					$('#borrowList').empty();
					var count = 0;
					var limit = 10;
					$.each(result, function(i, field) {
						var due_date = field['due_date'];
						var strpClass = ((count % 2) == 0) ? 'even' : 'odd';
						var eachbook = '<tr id="fborrow'+count+'" class="'+strpClass+'" role="row">';
						eachbook += '<td class="sorting_1"><a id="'+field['acc_no']+'" class="borrow_list_each" href="#Home">'+field['acc_no']+'</a></td>';
						eachbook += '<td>'+field['title']+'</td><td class="lafgbel'+count+'"><span class="days'+count+'"></span>-<span class="hours'+count+'"></span>-<span class="minutes'+count+'"></span>-<span class="seconds'+count+'"></span></td><td>'+field['lib_no']+'</td><td>'+field['fname']+'</td></tr>';
						$("#borrowList").append(eachbook);
						
						var tt = getTimeRemaining(due_date);
						if(tt.total <= 0) {
							$(".lafgbel"+count).html('+'+(-1*tt.days)-1+' day(s) due');
							$(".lafgbel"+count).css("color", "red");
						} else {
							initializeClock('Borrow'+count, due_date, count);
						}
						count++;
					});
					/* setting the data tables pluging for borrowList*/
					$(function () {
						$('#example1').DataTable();
					});

					attach_event_borrows();
				}, 2000);
			});
		}); 
	}, 4000); space.show();
	
}

function loadUsageChart() {
	 $.get('/lib_ajax/dynamic_data.php?data=pie', function(result) {
	 	var sth = result;
	 	var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
	 	var pieChart = new Chart(pieChartCanvas);
        var pieOptions = {
          segmentShowStroke: true,
          segmentStrokeColor: "#fff",
          segmentStrokeWidth: 2,
          percentageInnerCutout: 0,
          animationSteps: 100,
          animationEasing: "easeOutBounce",
          animateRotate: true,
          animateScale: false,
          responsive: true,
          maintainAspectRatio: true,
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        pieChart.Doughnut(result, pieOptions);
	 });
        
}
/*@name prepBorrow
/*@description prepares borrow form 
*/
function prepBorrow() {
		showMain();
		$("#loadPlaceAjax").children().hide();
		//$("#ajaxrow1").slideDown('fast');
		setHeader('Borrow a Book');
		var adPlace = $("#eachAdmin");
		var space = $("#ajaxrow1");
		space.hide();
		adPlace.empty();

		// #newAdmin Patch
		$("#newAdmin").hide();
		//Loading Starts
		adPlace.load("/lib_tpl/borrowForm.tpl #borrowForm", function() {
			$(".borrow_Nbook").click(function() {
				if(currentError == true) {
				} else {
					var url = '/lib_ajax/dynamic_data.php?data=borrow';
					$.post(url, $("#bForm :input").serializeArray(), function(info) {
						switch(info) {
							case 'done':
								createModal('Borrow Book', getSuccessText("Borrow Successful"), '');
							break;

							case 'false':
								createModal('Error Status', "Not Done", '');
							break;

							case 'duplicate':
								if(confirm('THIS USER HAS ALREADY BORROW THIS BOOK.\n Press OK to View Details, otherwise Cancel.')) {
									loadBorrowDetail($(".acc_no").val(), $(".lb_number").val());
								}
							break;
							default:
								//##Improvement check wether the book has not been borrowed already
							break;
						}
					});
				}
			});

			//Canceling submit
			$("#bForm").submit(function() {
				return false;
			});
			$(".lb_number").blur(function() {
 				var lb_number = $(this).val();
 				if(lb_number != '') {
 					var url = '/lib_ajax/dynamic_data.php?data=chklbno&lib_no='+lb_number;
 					$.get(url, function(info, status) {
	 					switch(info) {
	 						case 'true':
	 							$("#lb_number_status").html("<span style=\"color:green;\">Library number verified.</span>");
	 							currentError = false;
	 						break;

	 						case 'false':
	 							$("#lb_number_status").html("<span style=\"color:red;\">Invalid Library number.</span>");
	 							currentError = true;
	 						break;

	 						default:
	 							$("#lib_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>");
	 							currentError = true;
	 						break;
	 					}
 					});
 				}
 				
 			});

			//Verifying the Book access code
 			$(".acc_no").blur(function() {
 				var acc_no = $(this).val();
 				if(acc_no != '') {
 					var url = '/lib_ajax/dynamic_data.php?data=chkaccno&acc_no='+acc_no;
 					$.get(url, function(info, status) {
	 					switch(info) {
	 						case 'true':
	 							$("#acc_number_status").html("<span style=\"color:green;\">Access number verified.</span>");
	 							currentError = false;
	 						break;

	 						case 'false':
	 							$("#acc_number_status").html("<span style=\"color:red;\">Invalid Access number.</span>");
	 							currentError = true;
	 						break;

	 						default:
	 							$("#acc_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>" + info);
	 							currentError = true;
	 						break;
	 					}
 					});
 				}
 				
 			});
		});
		//Loading Ends
		adPlace.show();
}

/*------------------------------------------------------------------------@name prepBorrow
/*------------------------------------------------------------------------@description prepares borrow form 
*/
function prepTrans() {
		showMain();
		//$("#loadPlaceAjax2").children().hide();
		//$("#ajaxrow1").slideDown('fast');
		//setHeader('Borrow a Book');
		var adPlace = $("#transact");
		var space = $("#ajaxrow1");
		space.hide();
		adPlace.empty();

		// #newAdmin Patch
		$("#newAdmin").hide();
		//Loading Starts
		adPlace.load("/lib_tpl/borrowForm.tpl #borrowForm", function() {
			$(".borrow_Nbook").click(function() {
				if(currentError == true) {
				} else {
					var url = '/lib_ajax/dynamic_data.php?data=borrow';
					$.post(url, $("#bForm :input").serializeArray(), function(info) {
						switch(info) {
							case 'done':
								alert("Done");
							break;

							case 'false':
								alert("Not Done");
							break;

							case 'duplicate':
								if(confirm('THIS USER HAS ALREADY BORROW THIS BOOK.\n Press OK to Renew, otherwise Cancel.')) {
									renewTra($(".lb_number").val(), $(".acc_no").val());
								}
							break;
						}
					});
				}
			});

			//Canceling submit
			$("#bForm").submit(function() {
				return false;
			});
			$(".lb_number").blur(function() {
 				var lb_number = $(this).val();
 				var url = '/lib_ajax/dynamic_data.php?data=chklbno&lib_no='+lb_number;
 				$.get(url, function(info, status) {
 					switch(info) {
 						case 'true':
 							$("#lb_number_status").html("<span style=\"color:green;\">Library number verified.</span>");
 							currentError = false;
 						break;

 						case 'false':
 							$("#lb_number_status").html("<span style=\"color:red;\">Invalid Library number.</span>");
 							currentError = true;
 						break;

 						default:
 							$("#lib_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>");
 							currentError = true;
 						break;
 					}
 				});
 			});

			//Verifying the Book access code
 			$(".acc_no").blur(function() {
 				var acc_no = $(this).val();
 				var url = '/lib_ajax/dynamic_data.php?data=chkaccno&acc_no='+acc_no;
 				$.get(url, function(info, status) {
 					switch(info) {
 						case 'true':
 							$("#acc_number_status").html("<span style=\"color:green;\">Access number verified.</span>");
 							currentError = false;
 						break;

 						case 'false':
 							$("#acc_number_status").html("<span style=\"color:red;\">Invalid Access number.</span>");
 							currentError = true;
 						break;

 						default:
 							$("#acc_number_status").html("<span style=\"color:red;\">Cannot communicate with the server.</span>" + info);
 							currentError = true;
 						break;
 					}
 				});
 			});
		});
		//Loading Ends
		adPlace.show();
}
/*Edit profile*/
function editProfile() {
	var oldSpace = $("#ajaxrow1");
	$(".ajax").text("Edit profile");
	var space = $("#ajaxrow1");
	var target = $("#loaderGIF");
	space.slideUp("fast");
	showLoader(target);
	setTimeout (function () {
		target.empty();
		$("#profile_form").load('/lib_tpl/borrowForm.tpl #profileForm', function () {
			var url = "/lib_ajax/dynamic_data.php?data=getProfile";
			$.getJSON(url, function (result) {
				var fname = result['fname'];
				var lname = result['lname'];
				var username = result['uname'];

				$(".p_fname").val(fname);
				$(".p_lname").val(lname);
				$(".p_uname").val(username);

			});
		}); $("#profile_form").show();
	}, 2000);	
}


/*Edit profile*/
function editSettings() {
	var oldSpace = $("#ajaxrow1");
	$(".ajax").text("Edit Library Settings");
	var space = $("#ajaxrow1");
	var target = $("#loaderGIF");
	space.slideUp("fast");
	showLoader(target);
	setTimeout (function () {
		target.empty();
		$("#lib_settingsPlace").load('/lib_tpl/borrowForm.tpl #settingsForm', function () {
			var url = "/lib_ajax/dynamic_data.php?data=getSettings";
			$.getJSON(url, function (result) {
				var lib_name = result['lib_name'];
				var due_period = result['due_period'];
				var school = result['school'];
				var libStatus = result['status'];
				var skin = result['skin'];
				var layout = result['layout'];

				$(".p_libname").val(lib_name);
				$(".p_school").val(school);
				$(".p_due").val(due_period);
				$(".p_staus").val(libStatus);
				$(".s_layout").val(layout);
				$(".s_skin").val(skin);
				$(".s_layout").change(function() {
					$("body").attr('class', '');
					$("body").addClass($(".s_layout").val());
					$("body").addClass($(".s_skin").val());
				});
				$(".s_skin").change(function() {
					$("body").attr('class', '');
					$("body").addClass($(".s_layout").val());
					$("body").addClass($(".s_skin").val());
				});
			});
		}); 
		$("#lib_settingsPlace").show();
	}, 2000);
}

//this function validates and saves the profile
function saveSettings() {
	//alert ('k');
	//This disables the submit button
	$("#sForm").submit(function () {
		return false;
	});
	var is_empty = 0;
	$('#sForm :input').each(function () {
		//this part verifies if any textbox is empty
			if($(this).val() == ''){
				if($(this).attr('type') != 'checkbox') {
					is_empty++;
					$(this).css('border-color', 'red');
				}
				
			}  
	});

	if(is_empty == 0) {	
		var newLibName = $(".p_libname").val();
		var url = "/lib_ajax/dynamic_data.php?data=setSettings";
		//communicating with the server
		$.post(url, $("#sForm :input").serializeArray(), function (response) {
			switch(response) {
				case 'done':
					createModal('Library Settings', getSuccessText("SETTINGS UPDATED."), '');
					$(".lib_Name").html(newLibName);
					$("body").attr('class', '');
					$("body").addClass($(".s_layout").val());
					$("body").addClass($(".s_skin").val());
					cancel('#lib_settingsPlace', '#ajaxrow1')
				break;
				default:
					createModal('Error Status', response, 'error');
				break;
			}
		});
	} else {
		createModal('Error Status', "Check the inputs for empty slots", 'error');
	}
}




//this function validates and saves the profile
function saveProfile () {
	//alert ('k');
	//This disables the submit button
	$("#pForm").submit(function () {
		return false;
	});
	var is_empty = 0;
	$('#pForm :input').each(function () {
		//this part verifies if any textbox is empty
		if ($(this).attr('type')=='text'){
			if($(this).val() =='' || $(this).val()==null){
				is_empty++;
				$(this).css('border-color', 'red');
			}
		}  
	});

	if(is_empty == 0) {	
		var successText = getSuccessText('Update Successful.');
		var newName = $(".p_fname").val() + ' ' + $(".p_lname").val();
		var url = "/lib_ajax/dynamic_data.php?data=setProfile";
		//communicating with the server
		$.post(url, $("#pForm :input").serializeArray(), function (response) {
			switch(response) {
				case 'done':
					createModal('Profile Update', successText, '');
					$(".adminName").html(newName);
				break;
				default:
					createModal('Error Status', response, 'error');
				break;
			}
		});
	}
}

//function to show recently added books details
function showBookDetails () {
	$("a.product-title").each(function() {
		$(this).click(function() {
			alert('a click');
		});
	});	
}

function createModal(header, body, type='') {
		$(".modal-title").html(header);
		$(".modal-body").html(body);
		switch(type) {
			case 'confirm':
				$(".modal-footer").append('<button type="button" class="returnTrue btn btn-default btn-flat pull-left" data-dismiss="modal">Ok</button>');
			break;
			case 'error':
				$(".modal").removeClass('modal-success');
				$(".modal").addClass('modal-danger');
			break;
			case 'success':
				$(".modal").removeClass('modal-danger');
				$(".modal").addClass('modal-success');
			break;
			default:
				$(".modal").removeClass('modal-danger');
				$(".modal").removeClass('modal-success');
			break;
		}
		$(".modal").slideDown('fast').show();
		$(".dismissM").click(function() {
			$(".modal").slideUp('fast').hide()
		})
	}